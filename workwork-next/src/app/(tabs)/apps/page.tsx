'use client'
import Link from 'next/link'
import React from 'react'
import { Row, Col, Card, Typography, List, Avatar } from 'antd'

const ACard: any = Card

const ecosystem = [
  { title: 'Gibwork', url: 'https://gib.work/' },
  { title: 'SNS ID', url: 'https://sns.id/' },
  { title: 'Solana SIM', url: 'https://www.solanasim.com/' },
]

export default function AppsPage() {
  return (
    <div className="page" id="apps">
      <div className="tg-header"><h1>App Center</h1></div>

      <Row gutter={[12, 12]}>
        <Col xs={24} sm={12} md={8}>
          <Link href="/apps/housing">
            <ACard hoverable>
              <Typography.Text>🏨 Housing – Nomad Community</Typography.Text>
            </ACard>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Link href="/apps/education">
            <ACard hoverable>
              <Typography.Text>🎓 Education</Typography.Text>
            </ACard>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Link href="/apps/events">
            <ACard hoverable>
              <Typography.Text>🎉 Events</Typography.Text>
            </ACard>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Link href="/apps/jobs">
            <ACard hoverable>
              <Typography.Text>💼 Jobs</Typography.Text>
            </ACard>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Link href="/apps/transport">
            <ACard hoverable>
              <Typography.Text>🚇 Transport</Typography.Text>
            </ACard>
          </Link>
        </Col>
      </Row>

      <div className="tg-section" style={{ marginTop: 12 }}>
        <div className="tg-header"><h1>Solana Ecosystem Projects</h1></div>
        <div style={{ marginTop: 8 }}>
          <List
            itemLayout="horizontal"
            dataSource={ecosystem}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a href={item.url} target="_blank" rel="noopener noreferrer">Go</a>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar>Sol</Avatar>}
                  title={item.title}
                  description={item.url}
                />
              </List.Item>
            )}
          />
        </div>
      </div>

      <div className="tg-message">
        <div className="tg-message-text">🚀 More features are in development</div>
        <div className="tg-subtitle" style={{ fontSize: 12, color: "var(--tg-theme-subtitle-text-color)" }}>We are building a more complete ecosystem for nomads</div>
      </div>
    </div>
  );
}