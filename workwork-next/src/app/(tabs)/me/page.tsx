'use client'

import React from 'react'
import Link from 'next/link'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'

function copy(text: string) {
  navigator.clipboard?.writeText(text)
  alert('已复制到剪贴板')
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

  // 连接 Phantom（保持原逻辑）
  const connectWallet = async () => {
    try {
      await connect()
    } catch (e) {
      alert('连接失败，请确认已安装 Phantom')
      console.error(e)
    }
  }

  // 连接 OKX 扩展：优先使用 window.okxwallet.solana 接口
  const connectOkx = async () => {
    try {
      const okx = (window as any)?.okxwallet?.solana
      if (!okx) {
        alert('检测不到 OKX Wallet 扩展。请安装浏览器扩展，或稍后接入 OKX Connect（移动端）。')
        return
      }

      const normalizeOkxAddress = (keyLike: any): string | null => {
        try {
          if (!keyLike) return null
          // PublicKey 实例
          if (typeof keyLike?.toBase58 === 'function') {
            return keyLike.toBase58()
          }
          // Uint8Array
          if (typeof Uint8Array !== 'undefined' && keyLike instanceof Uint8Array) {
            return new PublicKey(keyLike).toBase58()
          }
          // 字符串 -> 验证为有效 base58 公钥
          if (typeof keyLike === 'string') {
            return new PublicKey(keyLike).toBase58()
          }
          // 可能包装对象 { publicKey: ..., address: ... }
          if (keyLike?.publicKey) return normalizeOkxAddress(keyLike.publicKey)
          if (keyLike?.address) return normalizeOkxAddress(keyLike.address)
        } catch (err) {
          console.warn('OKX 地址解析失败:', err)
          return null
        }
        return null
      }

      let connectResult: any = null
      try {
        if (typeof okx.connect === 'function') {
          connectResult = await okx.connect()
          console.log('OKX connect() 返回:', connectResult)
        }
      } catch (e) {
        console.warn('okx.connect() 调用失败:', e)
      }

      const raw = (connectResult ?? okx.publicKey ?? okx.address)
      console.log('OKX raw publicKey/address:', raw)
      const addr = normalizeOkxAddress(raw)
      if (!addr) {
        alert('OKX Wallet 未返回有效地址，请确认钱包已解锁并授权。')
        return
      }
      setOkxAddress(addr)
      setOkxConnected(true)
    } catch (e) {
      alert('连接 OKX 失败，请重试或检查扩展状态。')
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
      console.warn('OKX 扩展断开异常', e)
    } finally {
      setOkxConnected(false)
      setOkxAddress(null)
    }
  }

  const onDisconnect = async () => {
    if (okxConnected) return disconnectOkx()
    return disconnect()
  }

  return (
    <div className="page" id="me">
      {/* 顶部 Header：头像 / 名称+地址 / 徽章 / 按钮组 */}
      <div className="ww-profile-header">
        <div className="tg-avatar tg-avatar-large">NFT</div>
        <div className="ww-profile-main">
          <div className="tg-title" style={{ fontSize: 16 }}>{username}</div>
          <div className="ww-addr">
            <span>Solana: {activeAddress ?? '未连接'}</span>
            <span className="ww-copy" onClick={() => copy(activeAddress ?? '')}>复制</span>
          </div>
          <div className="ww-social">
            <div className="ww-icon" aria-label="X">X</div>
            <div className="ww-icon" aria-label="GitHub">GH</div>
            <div className="ww-icon" aria-label="Telegram">TG</div>
            <div className="ww-icon" aria-label="LinkedIn">in</div>
          </div>
          <div className="ww-badge-nft">
            <span className="ww-chip">等级 {level}</span>
            <span className="ww-chip">Badge: Explorer</span>
          </div>
        </div>
        <div className="tg-button-group">
          <Link href="/me/products" className="tg-button tg-button-primary">我的产品/服务</Link>
          <button className="tg-button tg-button-secondary" onClick={() => { const url = `${window?.location?.origin ?? ''}/me`; navigator.clipboard?.writeText(url); alert('已复制名片链接'); }}>分享名片</button>
          <button className="tg-button tg-button-secondary" onClick={() => alert('编辑主页（占位）')}>编辑主页</button>
        </div>
      </div>

      {/* 模块布局（卡片式） */}
      <div className="ww-stack" style={{ marginTop: 12 }}>
        {/* 钱包 Wallet */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">💎 钱包 Wallet</div>
            <div className="ww-row" style={{ marginTop: 8 }}>
              <span className="ww-chip">SOL: {solBalance !== null ? solBalance.toFixed(4) : '-'}</span>
              <span className="ww-chip">积分: {points ?? '-'}</span>
            </div>
          </div>
          <div className="ww-right" style={{ display: 'flex', gap: 8 }}>
            <button className="ww-button" onClick={connected || okxConnected ? onDisconnect : connectWallet}>{connected || okxConnected ? '断开' : '连接 Phantom'}</button>
            <button className="ww-button" onClick={okxConnected ? disconnectOkx : connectOkx}>{okxConnected ? '断开 OKX' : '连接 OKX'}</button>
            {(connected || okxConnected) && (
              <>
                <button className="ww-button" onClick={() => alert('Solayer Card（占位）')}>Solayer Card</button>
                <button className="ww-button" onClick={() => alert('质押生息（占位）')}>质押生息</button>
              </>
            )}
          </div>
        </div>

        {/* WorkWork Pass */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">🎟️ WorkWork Pass</div>
            <div className="ww-card-subtitle">用于联系人场景与任务悬赏，可按使用消耗</div>
            <div className="ww-row" style={{ marginTop: 8 }}>
              <span className="ww-chip">状态：未注册</span>
              <button className="ww-button" onClick={() => alert('购买（后续开放）')}>购买</button>
            </div>
          </div>
        </div>

        {/* 积分系统 */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">🪙 积分系统</div>
            <div className="ww-row" style={{ marginTop: 8 }}>
              <span className="ww-chip">余额 31,615 WW</span>
              <Link href="/earn" className="ww-button">Earn</Link>
            </div>
            <div className="ww-progress">
              <div className="ww-progress-bar"><div className="ww-progress-fill" /></div>
              <div className="ww-card-subtitle" style={{ marginTop: 4 }}>成长值进度 30%</div>
            </div>
          </div>
        </div>

        {/* 发帖与收藏 */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">🧾 发帖</div>
            <div className="ww-mini-list" style={{ marginTop: 8 }}>
              <div className="ww-row"><span className="ww-chip">我的帖子：12</span><button className="ww-button" onClick={() => alert('跳转广场')}>去广场</button></div>
              <div className="ww-row"><span className="ww-chip">我的收藏：5</span><button className="ww-button" onClick={() => alert('查看收藏')}>收藏</button></div>
            </div>
          </div>
        </div>

        {/* 等级与NFT徽章 */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">🎯 等级与 NFT 徽章</div>
            <div className="ww-card-subtitle">Explorer / Builder / Leader</div>
            <div className="ww-row" style={{ marginTop: 8 }}>
              <span className="ww-chip">Explorer ✅</span>
              <span className="ww-chip">Builder ⏳</span>
              <span className="ww-chip">Leader ⏳</span>
            </div>
            <div className="ww-progress">
              <div className="ww-progress-bar"><div className="ww-progress-fill" /></div>
              <div className="ww-card-subtitle" style={{ marginTop: 4 }}>升级至 LV2 还需 70%</div>
            </div>
          </div>
        </div>

        {/* 订单（我的订单） */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">我的订单</div>
            <div className="tg-grid" style={{ marginTop: 8 }}>
              <div className="tg-grid-item" onClick={() => alert('查看待付款订单')}><div className="tg-grid-icon"></div><div className="tg-grid-title">待付款</div></div>
              <div className="tg-grid-item" onClick={() => alert('查看待审核订单')}><div className="tg-grid-icon"></div><div className="tg-grid-title">待审核</div></div>
              <div className="tg-grid-item" onClick={() => alert('查看已使用订单')}><div className="tg-grid-icon"></div><div className="tg-grid-title">已使用</div></div>
              <div className="tg-grid-item" onClick={() => alert('查看全部订单')}><div className="tg-grid-icon"></div><div className="tg-grid-title">全部订单</div></div>
            </div>
          </div>
        </div>

        {/* 足迹（链上时间轴） */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">👣 足迹</div>
          </div>
        </div>
      </div>
    </div>
  )
}