'use client'

import React from 'react'
import Link from 'next/link'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'

function copy(text: string) {
  navigator.clipboard?.writeText(text)
  alert('Copied to clipboard')
}

export default function MePage() {
  const username = 'Yanbo'
  const level = 'LV1'

  const { connection } = useConnection()
  const { publicKey, connected, connect, disconnect } = useWallet()
  const [solBalance, setSolBalance] = React.useState(null as number | null)
  const [points, setPoints] = React.useState(null as number | null)
  // OKX 扩展直连（无需额外依赖）；如存在 window.okxwallet.solana
  const [okxAddress, setOkxAddress] = React.useState(null as string | null)
  const [okxConnected, setOkxConnected] = React.useState(false)
  const activeAddress = okxAddress ?? publicKey?.toBase58() ?? null

  const [avatarExists, setAvatarExists] = React.useState(false)
  const [avatarDataUrl, setAvatarDataUrl] = React.useState(null as string | null)
  const fileInputRef = React.useRef(null as HTMLInputElement | null)
  React.useEffect(() => {
    try {
      const s = localStorage.getItem('me-avatar-dataurl')
      if (s) setAvatarDataUrl(s)
    } catch {}
  }, [])
  React.useEffect(() => {
    let cancelled = false
    async function check() {
      try {
        const res = await fetch('/me-avatar.png', { method: 'HEAD' })
        if (!cancelled) setAvatarExists(!!res.ok)
      } catch {
        if (!cancelled) setAvatarExists(false)
      }
    }
    check()
    return () => { cancelled = true }
  }, [])

  React.useEffect(() => {
    let cancelled = false
    async function load() {
      const addr = activeAddress
      if (addr) {
        try {
          const lamports = await connection.getBalance(new PublicKey(addr))
          if (!cancelled) setSolBalance(lamports / LAMPORTS_PER_SOL)
        } catch (e) {
          console.error('getBalance error', e)
        }
        try {
          const res = await fetch(`/api/points?address=${addr}`)
          const json = await res.json()
          if (!cancelled) setPoints(json.points ?? 0)
        } catch (e) {
          console.error('points fetch error', e)
        }
      } else {
        setSolBalance(null)
        setPoints(null)
      }
    }
    load()
    return () => { cancelled = true }
  }, [activeAddress, connection])

  // Connect Phantom (preserve original logic)
  const connectWallet = async () => {
    try {
      await connect()
    } catch (e) {
      alert('Connection failed. Please ensure Phantom is installed')
      console.error(e)
    }
  }

  // Connect OKX extension: prefer window.okxwallet.solana interface
  const connectOkx = async () => {
    try {
      const okx = (window as any)?.okxwallet?.solana
      if (!okx) {
        alert('OKX Wallet extension not detected. Please install the browser extension, or connect later via OKX Connect (mobile).')
        return
      }

      const normalizeOkxAddress = (keyLike: any): string | null => {
        try {
          if (!keyLike) return null
          // PublicKey instance
          if (typeof keyLike?.toBase58 === 'function') {
            return keyLike.toBase58()
          }
          // Uint8Array
          if (typeof Uint8Array !== 'undefined' && keyLike instanceof Uint8Array) {
            return new PublicKey(keyLike).toBase58()
          }
          // String -> validate as base58 public key
          if (typeof keyLike === 'string') {
            return new PublicKey(keyLike).toBase58()
          }
          // Possibly wrapped object { publicKey: ..., address: ... }
          if (keyLike?.publicKey) return normalizeOkxAddress(keyLike.publicKey)
          if (keyLike?.address) return normalizeOkxAddress(keyLike.address)
        } catch (err) {
          console.warn('OKX address parsing failed:', err)
          return null
        }
        return null
      }

      let connectResult: any = null
      try {
        if (typeof okx.connect === 'function') {
          connectResult = await okx.connect()
          console.log('OKX connect() returned:', connectResult)
        }
      } catch (e) {
        console.warn('okx.connect() call failed:', e)
      }

      const raw = (connectResult ?? okx.publicKey ?? okx.address)
      console.log('OKX raw publicKey/address:', raw)
      const addr = normalizeOkxAddress(raw)
      if (!addr) {
        alert('OKX Wallet did not return a valid address. Please ensure the wallet is unlocked and authorized.')
        return
      }
      setOkxAddress(addr)
      setOkxConnected(true)
    } catch (e) {
      alert('Failed to connect OKX. Please retry or check extension status.')
      console.error(e)
    }
  }

  const disconnectOkx = async () => {
    try {
      const okx = (window as any)?.okxwallet?.solana
      if (okx && typeof okx.disconnect === 'function') {
        await okx.disconnect()
      }
    } catch (e) {
      console.warn('OKX extension disconnect error', e)
    } finally {
      setOkxConnected(false)
      setOkxAddress(null)
    }
  }

  const onDisconnect = async () => {
    if (okxConnected) return disconnectOkx()
    return disconnect()
  }

  const onAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setAvatarDataUrl(result)
      try { localStorage.setItem('me-avatar-dataurl', result) } catch {}
    }
    reader.readAsDataURL(file)
  }
  const onClearAvatar = () => {
    try { localStorage.removeItem('me-avatar-dataurl') } catch {}
    setAvatarDataUrl(null)
  }
  return (
    <div className="page" id="me">
      {/* 顶部 Header：头像 / 名称+地址 / 徽章 / 按钮组 */}
      <div className="ww-profile-header">
        {avatarDataUrl ? (
          <img src={avatarDataUrl} alt="Avatar" className="tg-avatar tg-avatar-large" style={{ objectFit: 'cover' }} onError={() => setAvatarDataUrl(null)} />
        ) : avatarExists ? (
          <img src="/me-avatar.png" alt="Avatar" className="tg-avatar tg-avatar-large" style={{ objectFit: 'cover' }} onError={() => setAvatarExists(false)} />
        ) : (
          <div className="tg-avatar tg-avatar-large">NFT</div>
        )}
        <div className="ww-profile-main">
          <div className="tg-title" style={{ fontSize: 16 }}>{username}</div>
          <div className="ww-addr">
            <span>Solana: {activeAddress ?? 'Not connected'}</span>
            <span className="ww-copy" onClick={() => copy(activeAddress ?? '')}>Copy</span>
          </div>
          <div className="ww-social">
            <div className="ww-icon" aria-label="X">X</div>
            <div className="ww-icon" aria-label="GitHub">GH</div>
            <div className="ww-icon" aria-label="Telegram">TG</div>
            <div className="ww-icon" aria-label="LinkedIn">in</div>
          </div>
          <div className="ww-badge-nft">
            <span className="ww-chip">Level {level}</span>
            <span className="ww-chip">Badge: Explorer</span>
          </div>
        </div>
        <div className="tg-button-group">
          <Link href="/me/products" className="tg-button tg-button-primary">My Products/Services</Link>
          <button className="tg-button tg-button-secondary" onClick={() => { const url = `${window?.location?.origin ?? ''}/me`; navigator.clipboard?.writeText(url); alert('Card link copied'); }}>Share Card</button>
          <button className="tg-button tg-button-secondary" onClick={() => alert('Edit Home (placeholder)')}>Edit Home</button>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onAvatarFileChange} />
          <button className="tg-button tg-button-secondary" onClick={() => fileInputRef.current?.click()}>Change Avatar</button>
          {avatarDataUrl && <button className="tg-button tg-button-secondary" onClick={onClearAvatar}>Clear Avatar</button>}
        </div>
      </div>

      {/* 模块布局（卡片式） */}
      <div className="ww-stack" style={{ marginTop: 12 }}>
        {/* 钱包 Wallet */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">💎 Wallet</div>
            <div className="ww-row" style={{ marginTop: 8 }}>
              <span className="ww-chip">SOL: {solBalance !== null ? solBalance.toFixed(4) : '-'}</span>
              <span className="ww-chip">Points: {points ?? '-'}</span>
            </div>
          </div>
          <div className="ww-right" style={{ display: 'flex', gap: 8 }}>
            <button className="ww-button" onClick={connected || okxConnected ? onDisconnect : connectWallet}>{connected || okxConnected ? 'Disconnect' : 'Connect Phantom'}</button>
            <button className="ww-button" onClick={okxConnected ? disconnectOkx : connectOkx}>{okxConnected ? 'Disconnect OKX' : 'Connect OKX'}</button>
            {(connected || okxConnected) && (
              <>
                <button className="ww-button" onClick={() => alert('Solayer Card (placeholder)')}>Solayer Card</button>
                <button className="ww-button" onClick={() => alert('Staking (placeholder)')}>Staking</button>
              </>
            )}
          </div>
        </div>

        {/* WorkWork Pass */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">🎟️ WorkWork Pass</div>
            <div className="ww-card-subtitle">For contact scenarios and task bounties; consumed per use</div>
            <div className="ww-row" style={{ marginTop: 8 }}>
              <span className="ww-chip">Status: Unregistered</span>
              <button className="ww-button" onClick={() => alert('Purchase (coming soon)')}>Purchase</button>
            </div>
          </div>
        </div>

        {/* 积分系统 */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">🪙 Points System</div>
            <div className="ww-row" style={{ marginTop: 8 }}>
              <span className="ww-chip">Balance 31,615 WW</span>
              <Link href="/earn" className="ww-button">Earn</Link>
            </div>
            <div className="ww-progress">
              <div className="ww-progress-bar"><div className="ww-progress-fill" /></div>
              <div className="ww-card-subtitle" style={{ marginTop: 4 }}>Growth progress 30%</div>
            </div>
          </div>
        </div>

        {/* 发帖与收藏 */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">🧾 Posts</div>
            <div className="ww-mini-list" style={{ marginTop: 8 }}>
              <div className="ww-row"><span className="ww-chip">My posts: 12</span><button className="ww-button" onClick={() => alert('Go to Feed')}>Go to Feed</button></div>
              <div className="ww-row"><span className="ww-chip">My favorites: 5</span><button className="ww-button" onClick={() => alert('View Favorites')}>Favorites</button></div>
            </div>
          </div>
        </div>

        {/* 等级与NFT徽章 */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">🎯 Levels & NFT Badges</div>
            <div className="ww-card-subtitle">Explorer / Builder / Leader</div>
            <div className="ww-row" style={{ marginTop: 8 }}>
              <span className="ww-chip">Explorer ✅</span>
              <span className="ww-chip">Builder ⏳</span>
              <span className="ww-chip">Leader ⏳</span>
            </div>
            <div className="ww-progress">
              <div className="ww-progress-bar"><div className="ww-progress-fill" /></div>
              <div className="ww-card-subtitle" style={{ marginTop: 4 }}>70% remaining to reach LV2</div>
            </div>
          </div>
        </div>

        {/* 订单（我的订单） */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">My Orders</div>
            <div className="tg-grid" style={{ marginTop: 8 }}>
              <div className="tg-grid-item" onClick={() => alert('View pending payment orders')}><div className="tg-grid-icon"></div><div className="tg-grid-title">Pending Payment</div></div>
              <div className="tg-grid-item" onClick={() => alert('View pending review orders')}><div className="tg-grid-icon"></div><div className="tg-grid-title">Pending Review</div></div>
              <div className="tg-grid-item" onClick={() => alert('View used orders')}><div className="tg-grid-icon"></div><div className="tg-grid-title">Used</div></div>
              <div className="tg-grid-item" onClick={() => alert('View all orders')}><div className="tg-grid-icon"></div><div className="tg-grid-title">All Orders</div></div>
            </div>
          </div>
        </div>

        {/* 足迹（链上时间轴） */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">👣 Footprint</div>
          </div>
        </div>
      </div>
    </div>
  )
}