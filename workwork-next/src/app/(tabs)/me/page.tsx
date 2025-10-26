'use client'

import React from 'react'
import Link from 'next/link'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { Space, Card, Avatar, Typography, Tag, Button, Progress, Row, Col, List } from 'antd'
const ACard: any = Card

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

  // 邀请注册（mock 数据）
  type Invite = { code: string; status: 'pending' | 'joined'; createdAt: string }
  const [invites, setInvites] = React.useState([] as Invite[])
  React.useEffect(() => {
    const initial: Invite[] = [
      { code: 'WW-1A2B3C', status: 'pending', createdAt: new Date().toISOString() },
      { code: 'WW-4D5E6F', status: 'joined', createdAt: new Date().toISOString() },
      { code: 'WW-7G8H9I', status: 'pending', createdAt: new Date().toISOString() },
    ]
    setInvites(initial)
  }, [])
  const resolveInviteUrl = (code: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return `${origin}/register?invite=${code}`
  }
  const createInvite = () => {
    const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
    const code = `WW-${rand}`
    setInvites((prev: Invite[]) => [...prev, { code, status: 'pending', createdAt: new Date().toISOString() }])
    alert('Invite created')
  }
  const markJoined = (code: string) => {
    setInvites((prev: Invite[]) => prev.map(i => i.code === code ? { ...i, status: 'joined' } : i))
  }
  const joinedCount = (invites as any[]).filter((i: any) => i.status === 'joined').length

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
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <ACard>
          <Space align="center" size="large" wrap style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space align="center" size="large">
              {avatarDataUrl || avatarExists ? (
                <Avatar
                  size={80}
                  src={avatarDataUrl || (avatarExists ? '/me-avatar.png' : undefined)}
                  onError={() => {
                    if (avatarDataUrl) setAvatarDataUrl(null)
                    if (avatarExists) setAvatarExists(false)
                    return false
                  }}
                />
              ) : (
                <Avatar size={80}>NFT</Avatar>
              )}
              <div>
                <Typography.Title level={5} style={{ marginBottom: 8 }}>{username}</Typography.Title>
                <Space size="small">
                  <Typography.Text>Solana: {activeAddress ?? 'Not connected'}</Typography.Text>
                  <Button size="small" onClick={() => copy(activeAddress ?? '')}>Copy</Button>
                </Space>
                <Space size="small" style={{ marginTop: 8 }}>
                  <Tag>X</Tag>
                  <Tag>GH</Tag>
                  <Tag>TG</Tag>
                  <Tag>in</Tag>
                </Space>
                <Space size="small" style={{ marginTop: 8 }}>
                  <Tag>Level {level}</Tag>
                  <Tag color="blue">Badge: Explorer</Tag>
                </Space>
              </div>
            </Space>
            <Space wrap>
              <Link href="/me/products"><Button type="primary">My Products/Services</Button></Link>
              <Button onClick={() => { const url = `${window?.location?.origin ?? ''}/me`; navigator.clipboard?.writeText(url); alert('Card link copied'); }}>Share Card</Button>
              <Button onClick={() => alert('Edit Home (placeholder)')}>Edit Home</Button>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onAvatarFileChange} />
              <Button onClick={() => fileInputRef.current?.click()}>Change Avatar</Button>
              {avatarDataUrl && <Button onClick={onClearAvatar}>Clear Avatar</Button>}
            </Space>
          </Space>
        </ACard>

        <ACard title="💎 Wallet" extra={
          <Space wrap>
            <Button onClick={connected || okxConnected ? onDisconnect : connectWallet}>
              {connected || okxConnected ? 'Disconnect' : 'Connect Phantom'}
            </Button>
            <Button onClick={okxConnected ? disconnectOkx : connectOkx}>
              {okxConnected ? 'Disconnect OKX' : 'Connect OKX'}
            </Button>
            {(connected || okxConnected) && (
              <>
                <Button onClick={() => alert('Solayer Card (placeholder)')}>Solayer Card</Button>
                <Button onClick={() => alert('Staking (placeholder)')}>Staking</Button>
              </>
            )}
          </Space>
        }>
          <Space size="small">
            <Tag>SOL: {solBalance !== null ? solBalance.toFixed(4) : '-'}</Tag>
            <Tag>Points: {points ?? '-'}</Tag>
          </Space>
        </ACard>

        <ACard title="🎟️ WorkWork Pass">
          <Typography.Text type="secondary">For contact scenarios and task bounties; consumed per use</Typography.Text>
          <Space style={{ marginTop: 8 }}>
            <Tag>Status: Unregistered</Tag>
            <Button onClick={() => alert('Purchase (coming soon)')}>Purchase</Button>
          </Space>
        </ACard>

        <ACard title="🪙 Points System">
          <Space style={{ marginBottom: 8 }}>
            <Tag color="gold">Balance 31,615 WW</Tag>
            <Link href="/earn"><Button>Earn</Button></Link>
          </Space>
          <Progress percent={30} />
          <Typography.Text type="secondary" style={{ marginTop: 8, display: 'block' }}>
            Growth progress 30%
          </Typography.Text>
        </ACard>

        <ACard title="🎁 Invite Registration" extra={<Button onClick={createInvite}>Generate Invite</Button>}>
          <Space style={{ marginBottom: 8 }}>
            <Tag>Total: {invites.length}</Tag>
            <Tag color="green">Joined: {joinedCount}</Tag>
          </Space>
          <List
            itemLayout="horizontal"
            dataSource={invites}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Button size="small" onClick={() => copy(resolveInviteUrl(item.code))}>Copy Link</Button>,
                  item.status === 'pending'
                    ? <Button size="small" type="link" onClick={() => markJoined(item.code)}>Mark Joined</Button>
                    : <Tag color="green">Joined</Tag>
                ]}
              >
                <List.Item.Meta
                  title={item.code}
                  description={
                    <Space direction="vertical" size={0}>
                      <Typography.Text type="secondary">{new Date(item.createdAt).toLocaleString()}</Typography.Text>
                      <Typography.Text type="secondary">{resolveInviteUrl(item.code)}</Typography.Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </ACard>

        <ACard title="🧾 Posts">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space style={{ justifyContent: 'space-between', width: '100%' }}>
              <Tag>My posts: 12</Tag>
              <Button onClick={() => alert('Go to Feed')}>Go to Feed</Button>
            </Space>
            <Space style={{ justifyContent: 'space-between', width: '100%' }}>
              <Tag>My favorites: 5</Tag>
              <Button onClick={() => alert('View Favorites')}>Favorites</Button>
            </Space>
          </Space>
        </ACard>

        <ACard title="🎯 Levels & NFT Badges">
          <Typography.Text type="secondary">Explorer / Builder / Leader</Typography.Text>
          <Space style={{ marginTop: 8 }}>
            <Tag color="green">Explorer</Tag>
            <Tag>Builder</Tag>
            <Tag>Leader</Tag>
          </Space>
          <Progress percent={30} style={{ marginTop: 8 }} />
          <Typography.Text type="secondary" style={{ marginTop: 4, display: 'block' }}>
            70% remaining to reach LV2
          </Typography.Text>
        </ACard>

        <ACard title="My Orders">
          <Row gutter={[12, 12]}>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button block onClick={() => alert('View pending payment orders')}>Pending Payment</Button>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button block onClick={() => alert('View pending review orders')}>Pending Review</Button>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button block onClick={() => alert('View used orders')}>Used</Button>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button block onClick={() => alert('View all orders')}>All Orders</Button>
            </Col>
          </Row>
        </ACard>

        <ACard title="👣 Footprint">
          <Typography.Text type="secondary">Coming soon</Typography.Text>
        </ACard>
      </Space>
    </div>
  )
}