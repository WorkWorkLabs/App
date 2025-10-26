'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Modal, Form, Input, message } from 'antd'

type PublishedPost = {
  id: string
  title: string
  location?: string
  caption?: string
  body: string
  createdAt: number
}

export default function ExplorePage() {
  const [publishOpen, setPublishOpen] = useState(false)
  const [form] = Form.useForm()
  const STORAGE_KEY = 'WW_PUBLISHED_POSTS'
  const [publishedPosts, setPublishedPosts] = useState([] as PublishedPost[])

  const handlePublish = async () => {
    try {
      const values = await form.validateFields()
      const post: PublishedPost = {
        id: String(Date.now()),
        title: values.title,
        location: values.location,
        caption: values.caption,
        body: values.body,
        createdAt: Date.now(),
      }
      const next = [post, ...publishedPosts]
      setPublishedPosts(next)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch (err) {}
      message.success('帖子已发布')
      setPublishOpen(false)
      form.resetFields()
    } catch (e) {}
  }
  // 监听来自 FAB 的全局事件，在 Explore 页打开发布浮窗
  useEffect(() => {
    const handler = () => setPublishOpen(true)
    document.addEventListener('ww-open-publish', handler as any)
    return () => document.removeEventListener('ww-open-publish', handler as any)
  }, [])

  // 首次加载读取本地存储的已发布帖子
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as PublishedPost[]
        setPublishedPosts(parsed)
      }
    } catch (err) {}
  }, [])
  return (
    <div className="page" id="explore">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Explore</h1>
        <div className="tg-location" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14, color: 'var(--tg-theme-subtitle-text-color)' }}>Current Location</span>
          <span className="ww-chip">Shenzhen</span>
          <button className="tg-button" onClick={() => alert('Scan QR Code (placeholder)')}>Scan QR Code</button>
          
        </div>
      </div>


      <div className="tg-form-section">
        <div className="tg-form-header">City Recommendations</div>
        <div className="tg-grid">
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/bangkok-scenery/600/360" alt="Bangkok Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Bangkok</div><div className="tg-grid-subtitle">Popular</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/chiangmai-scenery/600/360" alt="Chiang Mai Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Chiang Mai</div><div className="tg-grid-subtitle">Quiet</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/bali-scenery/600/360" alt="Bali Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Bali</div><div className="tg-grid-subtitle">Island</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/taipei-scenery/600/360" alt="Taipei Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Taipei</div><div className="tg-grid-subtitle">Cuisine</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/seoul-scenery/600/360" alt="Seoul Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Seoul</div><div className="tg-grid-subtitle">Trendy</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/singapore-scenery/600/360" alt="Singapore Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Singapore</div><div className="tg-grid-subtitle">Efficient</div>
          </div>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">Nomad Stories</div>
        <div className="tg-list">
          {publishedPosts.map((p: PublishedPost) => (
            <Link href={`/explore/${p.id}`} key={p.id} className="tg-list-item" prefetch={false} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="tg-avatar">{(p.title?.[0] ?? 'P').toUpperCase()}</div>
              <div className="tg-content">
                <div className="tg-title">{p.title}<span className="tg-badge">Story</span></div>
                <div className="tg-caption">{p.location ?? 'Unknown location'}</div>
                <div className="tg-body">{p.caption ? p.caption : p.body}</div>
              </div>
            </Link>
          ))}

          <Link href="/explore/story-1" className="tg-list-item" prefetch={false} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="tg-avatar">S</div>
            <div className="tg-content">
              <div className="tg-title">A Month in Taipei<span className="tg-badge">Story</span></div>
              <div className="tg-caption">Cost of living, social life, and cafes</div>
              <div className="tg-body">Taipei is friendly for new nomads; the metro is convenient and the community is active.</div>
            </div>
          </Link>
          <Link href="/explore/story-2" className="tg-list-item" prefetch={false} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="tg-avatar">S</div>
            <div className="tg-content">
              <div className="tg-title">Remote Work Daily in Chiang Mai<span className="tg-badge">Story</span></div>
              <div className="tg-caption">Slow pace and productivity</div>
              <div className="tg-body">Plenty of coworking spaces and a slower pace make it great for deep work and socializing.</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">Nomad List</div>
        <div className="tg-list">
          <div className="tg-list-item">
            <div className="tg-avatar">A</div>
            <div className="tg-content">
              <div className="tg-title">Alice · Product Manager<span className="tg-badge">Nearby 1.2 km</span></div>
              <div className="tg-caption">Chiang Mai · Nimman</div>
              <div className="tg-actions">
                <div className="tg-action" onClick={() => alert('Followed Alice')}>Follow</div>
                <div className="tg-action-primary" onClick={() => alert('Friend request sent to Alice')}>Add Friend</div>
              </div>
            </div>
          </div>
          <div className="tg-list-item">
            <div className="tg-avatar">B</div>
            <div className="tg-content">
              <div className="tg-title">Bob · Frontend Developer<span className="tg-badge">Nearby 800 m</span></div>
              <div className="tg-caption">Bangkok · Siam</div>
              <div className="tg-actions">
                <div className="tg-action" onClick={() => alert('Followed Bob')}>Follow</div>
                <div className="tg-action-primary" onClick={() => alert('Friend request sent to Bob')}>Add Friend</div>
              </div>
            </div>
          </div>
          <div className="tg-list-item">
            <div className="tg-avatar">C</div>
            <div className="tg-content">
              <div className="tg-title">Carol · Designer<span className="tg-badge">Nearby 3.5 km</span></div>
              <div className="tg-caption">Bali · Canggu</div>
              <div className="tg-actions">
                <div className="tg-action" onClick={() => alert('Followed Carol')}>Follow</div>
                <div className="tg-action-primary" onClick={() => alert('Friend request sent to Carol')}>Add Friend</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">Offline Events</div>
        <div className="tg-list">
          <div className="tg-list-item">
            <div className="tg-avatar">E</div>
            <div className="tg-content">
              <div className="tg-title">Chiang Mai Weekend Run<span className="tg-badge">Event</span></div>
              <div className="tg-caption">This Sunday 7:00</div>
              <div className="tg-body">Let's run together. Meet at: Nimman Maya entrance.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">Visa/Accommodation Top Picks</div>
        <div className="tg-grid">
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">Visa Hotspots</div><div className="tg-grid-subtitle">Thailand/Indonesia/Singapore</div></div>
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">Accommodation Hotspots</div><div className="tg-grid-subtitle">Bangkok/Chiang Mai/Bali</div></div>
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">Best Value</div><div className="tg-grid-subtitle">Taipei/Chiang Mai/Ho Chi Minh</div></div>
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">Coworking Spaces</div><div className="tg-grid-subtitle">Chiang Mai/Singapore/Seoul</div></div>
        </div>
      </div>

      {/* 发布帖子浮窗 */}
      <Modal
        title="发布帖子"
        open={publishOpen}
        onOk={handlePublish}
        onCancel={() => setPublishOpen(false)}
        okText="发布"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
            <Input placeholder="例如：一个月在台北的生活" />
          </Form.Item>
          <Form.Item label="地点" name="location">
            <Input placeholder="例如：台北" />
          </Form.Item>
          <Form.Item label="简述" name="caption">
            <Input placeholder="一句话简介" />
          </Form.Item>
          <Form.Item label="正文" name="body" rules={[{ required: true, message: '请输入正文' }]}>
            <Input.TextArea rows={4} placeholder="分享你的经历..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}