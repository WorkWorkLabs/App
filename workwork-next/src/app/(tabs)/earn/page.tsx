'use client'

import React, { useState } from 'react'

type Task = { icon: string; title: string; reward: number }

const TASKS: Record<'popular' | 'onchain' | 'invite', Task[]> = {
  popular: [
    { icon: 'X', title: '下载 UXUY APP 2.0!', reward: 60 },
    { icon: 'UP', title: 'Post a Story', reward: 60 },
    { icon: '聊', title: '将 @UXUYAgentBot 添加到群组', reward: 60 },
    { icon: '名', title: '将邀请链接添加到个人简介', reward: 60 },
  ],
  onchain: [
    { icon: '链', title: '完成一次链上存款', reward: 40 },
    { icon: '桥', title: '使用二维码扫码支付一次', reward: 80 },
  ],
  invite: [
    { icon: '邀', title: '邀请 1 位好友加入', reward: 100 },
    { icon: '邀', title: '邀请 5 位好友加入', reward: 600 },
  ],
}

export default function EarnPage() {
  // 使用断言避免任何类型的 useState 泛型报错
  const [tab, setTab] = useState('popular' as 'popular' | 'onchain' | 'invite')
  const wwTotal = 31615
  const claimCount = 21

  const onAction = (task: Task) => alert(`执行任务：${task.title}`)

  const list: Task[] = TASKS[tab as 'popular' | 'onchain' | 'invite']

  return (
    <div className="page" id="earn">
      {/* 头部统计卡片：保留配色，仅学习版式层级 */}
      <div className="ww-card">
        <div className="ww-left">
          <div className="ww-value">
            {wwTotal}
            <span className="ww-unit">WW</span>
          </div>
          <div className="ww-claim">领取 {claimCount}</div>
        </div>
        <div className="ww-badge">WW</div>
      </div>

      {/* 顶部标签切换 */}
      <div className="ww-tabs">
        <div className={`ww-tab ${tab === 'popular' ? 'active' : ''}`} onClick={() => setTab('popular')}>
          热门任务
        </div>
        <div className={`ww-tab ${tab === 'onchain' ? 'active' : ''}`} onClick={() => setTab('onchain')}>
          存款交互任务
        </div>
        <div className={`ww-tab ${tab === 'invite' ? 'active' : ''}`} onClick={() => setTab('invite')}>
          邀请赛
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
                赚取
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}