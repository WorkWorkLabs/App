'use client'

import React from 'react'

function copy(text: string) {
  navigator.clipboard?.writeText(text)
  alert('已复制到剪贴板')
}

export default function MePage() {
  const username = 'Yanbo'
  const solAddress = '9X3K...a1q7' // 占位地址，后续接入 Wallet Adapter
  const level = 'LV1'

  const connectWallet = () => alert('连接钱包 (Phantom / Backpack / Solflare)')

  return (
    <div className="page" id="me">
      {/* 顶部 Header：头像 / 名称+地址 / 徽章 / 按钮组 */}
      <div className="ww-profile-header">
        <div className="tg-avatar tg-avatar-large">NFT</div>
        <div className="ww-profile-main">
          <div className="tg-title" style={{ fontSize: 16 }}>{username}</div>
          <div className="ww-addr">
            <span>Solana: {solAddress}</span>
            <span className="ww-copy" onClick={() => copy(solAddress)}>复制</span>
          </div>
          <div className="ww-badge-nft">
            <span className="ww-chip">等级 {level}</span>
            <span className="ww-chip">Badge: Explorer</span>
          </div>
        </div>
        <div className="tg-button-group">
          <button className="tg-button tg-button-secondary" onClick={connectWallet}>连接钱包</button>
        </div>
      </div>

      {/* 模块布局（卡片式） */}
      <div className="ww-stack" style={{ marginTop: 12 }}>
        {/* 钱包 Wallet */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">💎 钱包 Wallet</div>
            <div className="ww-card-subtitle">SPL Token 与 NFT Pass</div>
            <div className="ww-row" style={{ marginTop: 8 }}>
              <span className="ww-chip">WW: 31,615</span>
              <span className="ww-chip">USDC: 0</span>
              <span className="ww-chip">NFT: 2</span>
            </div>
          </div>
          <div className="ww-right">
            <button className="ww-button" onClick={connectWallet}>连接</button>
          </div>
        </div>

        {/* 积分系统 */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">🪙 积分系统</div>
            <div className="ww-card-subtitle">Earn / Redeem / Convert (SPL Token: WW)</div>
            <div className="ww-row" style={{ marginTop: 8 }}>
              <span className="ww-chip">余额 31,615 WW</span>
              <button className="ww-button" onClick={() => alert('进入 Earn')}>Earn</button>
              <button className="ww-button" onClick={() => alert('进入 Redeem')}>Redeem</button>
              <button className="ww-button" onClick={() => alert('进入 Convert')}>Convert</button>
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
            <div className="ww-card-subtitle">Arweave / Shadow Drive 可选存储</div>
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

        {/* 订单（Solana Pay） */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">🧳 订单</div>
            <div className="ww-card-subtitle">Solana Pay 支付记录</div>
            <div className="ww-mini-list" style={{ marginTop: 8 }}>
              <div className="ww-row"><span className="ww-chip">WorkWork Pass · Completed</span><button className="ww-button" onClick={() => alert('查看订单')}>查看</button></div>
              <div className="ww-row"><span className="ww-chip">活动报名 · Pending</span><button className="ww-button" onClick={() => alert('重新支付')}>支付</button></div>
            </div>
          </div>
        </div>

        {/* 足迹（链上时间轴） */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">👣 足迹</div>
            <div className="ww-card-subtitle">链上行为可视化（活动参与、任务记录）</div>
            <div className="ww-timeline" style={{ marginTop: 8 }}>
              <div className="ww-timeline-item">Mint Explorer Badge</div>
              <div className="ww-timeline-item">兑换 WW → USDC (Jupiter)</div>
              <div className="ww-timeline-item">报名 Nomad Meetup (Solana Pay)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}