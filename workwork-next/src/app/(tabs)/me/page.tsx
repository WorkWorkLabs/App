'use client'

import React from 'react'

function copy(text: string) {
  navigator.clipboard?.writeText(text)
  alert('已复制到剪贴板')
}

export default function MePage() {
  const username = 'Yanbo'
  const solAddress = 'work-work.sol' // 占位地址，后续接入 Wallet Adapter
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
              <span className="ww-chip">USDC: 200</span>
            </div>
          </div>
          <div className="ww-right">
            <button className="ww-button" onClick={connectWallet}>连接</button>
          </div>
        </div>

        {/* WorkWork Pass */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">🎟️ WorkWork Pass</div>
            <div className="ww-card-subtitle">用于联系人场景与任务悬赏，可按使用消耗</div>
            <div className="ww-row" style={{ marginTop: 8 }}>
              <span className="ww-chip">状态：未注册</span>
              <button className="ww-button" onClick={() => alert('注册获取 WorkWork Pass')}>注册获取</button>
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
              <button className="ww-button" onClick={() => alert('进入 Earn')}>Earn</button>
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