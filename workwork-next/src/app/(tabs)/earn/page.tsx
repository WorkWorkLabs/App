'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

type Task = { icon: string; title: string; reward: number }

const TASKS: Record<'popular' | 'onchain' | 'invite', Task[]> = {
  popular: [
    { icon: 'UP', title: 'Post a Story', reward: 60 },
    { icon: '聊', title: 'Add a nomad as a friend', reward: 60 },
    { icon: '名', title: 'Complete your profile', reward: 60 },
    { icon: '审', title: 'Submit the activity and review and confirm', reward: 60 },
  ],
  onchain: [
    { icon: '链', title: 'Make an on-chain deposit', reward: 40 },
    { icon: '桥', title: 'Pay once via QR code', reward: 80 },
  ],
  invite: [
    { icon: 'SIM', title: 'Purchase Solana SIM 1-month plan', reward: 300 },
    { icon: 'ID', title: 'Buy an SNS ID domain', reward: 200 },
    { icon: 'Gib', title: 'Browse jobs on Gibwork', reward: 60 },
    { icon: 'DeFi', title: 'Pledge assets to the Solana DeFi protocol', reward: 220 },
    { icon: 'Card', title: 'Activate Solayer payment card', reward: 240 },
  ],
}

export default function EarnPage() {
  // 使用断言避免任何类型的 useState 泛型报错
  const [tab, setTab] = useState('popular' as 'popular' | 'onchain' | 'invite')
  const wwTotal = 31615
  const claimCount = 21

  const router = useRouter()
  const onAction = (task: Task) => {
    if (task.title === 'Post a Story') {
      router.push('/explore?open=publish')
      return
    }
    alert(`Perform task: ${task.title}`)
  }

  const list: Task[] = TASKS[tab as 'popular' | 'onchain' | 'invite'] ?? []

  return (
    <div className="page" id="earn">
      {/* 头部统计卡片：保留配色，仅学习版式层级 */}
      <div className="ww-card">
        <div className="ww-left">
          <div className="ww-value">
            {wwTotal}
            <span className="ww-unit">WW</span>
          </div>
          <div className="ww-claim">Claims {claimCount}</div>
        </div>
        <div className="ww-right" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="ww-button" onClick={() => setTab('invite')}>Invite Friends</button>
          <div className="ww-badge">WW</div>
        </div>
      </div>

      {/* 顶部标签切换 */}
      <div className="ww-tabs">
        <div className={`ww-tab ${tab === 'popular' ? 'active' : ''}`} onClick={() => setTab('popular')}>
          Popular
        </div>
        <div className={`ww-tab ${tab === 'onchain' ? 'active' : ''}`} onClick={() => setTab('onchain')}>
          On-chain/Payment
        </div>
        <div className={`ww-tab ${tab === 'invite' ? 'active' : ''}`} onClick={() => setTab('invite')}>
          Solana Ecosystem
        </div>
      </div>

      {/* 任务列表：将 UP 全部替换为 WW */}
      <div className="tg-list" style={{ marginTop: 12 }}>
        {list.map((task: Task, i: number) => (
          <div className="ww-item" key={`${tab}-${i}`}>
            <div className="tg-avatar tg-avatar-large">{task.icon}</div>
            <div className="tg-content">
              <div className="tg-title">{task.title}</div>
              <div className="tg-caption">
                +{task.reward} <span className="ww-points">WW</span>
              </div>
            </div>
            <div className="ww-right">
              <button className="ww-button" onClick={() => onAction(task)}>
                Earn
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}