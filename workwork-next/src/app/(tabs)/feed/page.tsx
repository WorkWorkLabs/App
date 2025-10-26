'use client'
import React, { useState } from 'react'
import { Segmented, Space, Card, Typography, Button } from 'antd'

const ACard: any = Card

export default function FeedPage() {
  const [active, setActive] = useState('community')

  return (
    <div className="page">
      <div className="tg-header"><h1>Feed</h1></div>

      <Segmented
        options={[
          { label: '🌐 Community', value: 'community' },
          { label: '🧰 Apps', value: 'apps' },
          { label: '📰 News', value: 'news' },
        ]}
        value={active}
        onChange={(val: any) => setActive(String(val))}
        style={{ marginBottom: 12 }}
      />

      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        <ACard title="Welcome to WorkWork!" extra={<Button type="primary">Get Started</Button>}>
          <Typography.Paragraph>
            This is your community feed. Explore updates, apps, and news.
          </Typography.Paragraph>
        </ACard>

        <ACard title="Latest App: Housing – Nomad Community">
          <Typography.Paragraph>
            Find and share housing options with nomads worldwide.
          </Typography.Paragraph>
        </ACard>

        <ACard title="Solana Ecosystem">
          <Typography.Paragraph>
            Discover projects building in the Solana ecosystem.
          </Typography.Paragraph>
        </ACard>
      </Space>
    </div>
  )
}