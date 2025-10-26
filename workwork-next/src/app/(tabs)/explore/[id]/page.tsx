'use client'

import React, { useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Typography, Space, Tag, Button, Input, List, Avatar, message, Divider, Modal } from 'antd'

const { Title, Text, Paragraph } = Typography

// 本地发布帖类型 & 存储键
type PublishedPost = {
  id: string
  title: string
  location?: string
  caption?: string
  body: string
  createdAt: number
}
const STORAGE_KEY = 'WW_PUBLISHED_POSTS'
const PASS_STORAGE_KEY = 'WW_NOMAD_PASS_COUNT'
const PASS_REGISTERED_KEY = 'WW_NOMAD_PASS_REGISTERED'
const PASS_HISTORY_KEY = 'WW_NOMAD_PASS_HISTORY'

// --- Mock types & data ---
interface CommentItem {
  id: string
  author: string
  avatar: string
  time: string
  content: string
  likes: number
}

interface PostDetail {
  id: string
  title: string
  author: string
  location: string
  tags: string[]
  content: string[]
  likes: number
  tips: number
  comments: CommentItem[]
  caption?: string
  createdAt?: number
  isLocal?: boolean
}

const MOCK_POSTS: Record<string, PostDetail> = {
  'story-1': {
    id: 'story-1',
    title: 'A Month in Taipei',
    author: 'Sam',
    location: 'Taipei, Taiwan',
    tags: ['food', 'city', 'budget'],
    content: [
      '台北是我最喜欢的城市之一：安全、方便、充满烟火气。',
      '一个月的远程工作生活成本大约在 1200-1500 USD，地铁和公交非常方便。',
      '夜市的小吃非常值得每天来一轮，推荐宁夏、师大和罗东夜市。'
    ],
    likes: 32,
    tips: 6,
    comments: [
      { id: 'c1', author: 'Lena', avatar: 'L', time: '2h 前', content: '宁夏夜市的胡椒饼太好吃了！', likes: 3 },
      { id: 'c2', author: 'Kane', avatar: 'K', time: '1d 前', content: '淡水老街适合周末散步，日落很美。', likes: 5 }
    ]
  },
  'story-2': {
    id: 'story-2',
    title: 'Remote Work Daily in Chiang Mai',
    author: 'April',
    location: 'Chiang Mai, Thailand',
    tags: ['remote-work', 'coffee', 'budget'],
    content: [
      '清迈是数字游民的天堂，咖啡馆密度高且网络稳定。',
      '租房价格友好，老城步行可达的共享办公点很多。',
      '建议每周安排一次山间机车短途，放空效率更高。'
    ],
    likes: 54,
    tips: 11,
    comments: [
      { id: 'c3', author: 'Mo', avatar: 'M', time: '5h 前', content: '早上 8 点前跑到素贴山人少风景好。', likes: 2 },
      { id: 'c4', author: 'Lee', avatar: 'L', time: '3d 前', content: '尼曼的咖啡店真的太多了，推荐 Roast8。', likes: 7 }
    ]
  }
}

export default function ExploreDetailPage({ params }: { params: Promise<{ id?: string }> }) {
  const { id: paramId } = React.use(params)
  const id = paramId ?? 'story-1'

  const initialPost: PostDetail = MOCK_POSTS[id] ?? {
    id,
    title: '正在加载...',
    author: 'You',
    location: 'Unknown',
    tags: [],
    content: [],
    likes: 0,
    tips: 0,
    comments: [],
    isLocal: true,
  }
  const [post, setPost] = React.useState(initialPost)
  const [commentText, setCommentText] = React.useState('')
  const [passCount, setPassCount] = React.useState(0)
  const [passRevealed, setPassRevealed] = React.useState(false)
  const [passRegistered, setPassRegistered] = React.useState(false)

  // 如果本地有发布帖与当前 id 匹配，则加载并转换为详情结构
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const list = JSON.parse(raw) as PublishedPost[]
        const found = list.find((p) => String(p.id) === String(id))
        if (found) {
          const detail: PostDetail = {
            id: found.id,
            title: found.title,
            author: 'You',
            location: found.location ?? 'Unknown',
            tags: [],
            caption: found.caption,
            content: found.body ? [found.body] : [],
            createdAt: found.createdAt,
            likes: 0,
            tips: 0,
            comments: [],
            isLocal: true,
          }
          setPost(detail)
        }
      }
    } catch (err) {}
  }, [id])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PASS_STORAGE_KEY)
      const num = raw ? parseInt(raw, 10) : NaN
      const initial = Number.isFinite(num) ? num : 100
      setPassCount(initial)
      if (!raw) localStorage.setItem(PASS_STORAGE_KEY, String(initial))
    } catch (e) {}
    try {
      const reg = localStorage.getItem(PASS_REGISTERED_KEY)
      setPassRegistered(reg === 'true')
    } catch (e) {}
  }, [])

  const likeCountLabel = useMemo(() => `${post.likes} 赞`, [post.likes])
  const tipCountLabel = useMemo(() => `${post.tips} 人打赏`, [post.tips])

  const toggleLike = () => {
    setPost((p: PostDetail) => ({ ...p, likes: p.likes + 1 }))
    message.success('已点赞')
  }

  const tip = (amount: number) => {
    setPost((p: PostDetail) => ({ ...p, tips: p.tips + 1 }))
    message.success(`已打赏 ${amount} 元（Mock）`)
  }

  const onNomadPassContact = () => {
    if (!passRegistered) {
      Modal.confirm({
        title: '尚未注册 Nomad Pass',
        content: '前往 Me 页面注册后才能使用联系功能。是否现在前往？',
        okText: '前往 Me',
        cancelText: '取消',
        onOk: () => { try { window.location.href = '/me' } catch {} },
      })
      return
    }
    if (passCount <= 0) {
      message.warning('Nomad Pass 数量不足，无法联系')
      return
    }
    Modal.confirm({
      title: '使用 Nomad Pass 联系',
      content: `是否需要消耗 1 个 Nomad Pass 进行联系？（当前剩余：${passCount}）`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        setPassCount((c: number) => {
          const next = Math.max(0, c - 1)
          try { localStorage.setItem(PASS_STORAGE_KEY, String(next)) } catch (e) {}
          return next
        })
        setPassRevealed(true)
        try {
          const rawH = localStorage.getItem(PASS_HISTORY_KEY)
          const arr = rawH ? JSON.parse(rawH) : []
          arr.unshift({ id: `h${Date.now()}`, type: 'contact', postId: post.id, author: post.author, title: post.title, time: new Date().toLocaleString() })
          localStorage.setItem(PASS_HISTORY_KEY, JSON.stringify(arr.slice(0, 50)))
        } catch (e) {}
        message.success('已消耗 1 个 Nomad Pass（Mock）。联系方式已显示')
      },
      onCancel: () => {
        message.info('已取消联系')
      },
    })
  }

  const resolveContactInfo = (p: PostDetail) => {
    const name = (p.author || 'Nomad').toLowerCase()
    return `Telegram：@${name}_nomad · Email：${name}@example.com`
  }

  const addComment = () => {
    const text = commentText.trim()
    if (!text) {
      message.warning('请输入评论内容')
      return
    }
    const newItem: CommentItem = {
      id: `c${Date.now()}`,
      author: 'You',
      avatar: 'Y',
      time: '刚刚',
      content: text,
      likes: 0
    }
    setPost((p: PostDetail) => ({ ...p, comments: [newItem, ...p.comments] }))
    setCommentText('')
    message.success('评论已发布（Mock）')
  }

  const likeComment = (cid: string) => {
    setPost((p: PostDetail) => ({
      ...p,
      comments: p.comments.map((c: CommentItem) => c.id === cid ? { ...c, likes: c.likes + 1 } : c)
    }))
  }

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        {/* 顶部信息 */}
        <Space direction="vertical" size={8} style={{ width: '100%', padding: 16, background: 'var(--tg-theme-secondary-bg-color)', borderRadius: 8 }}>
          <Space align="start" style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space size={12}>
              <Link href="/explore" prefetch={false} style={{ textDecoration: 'none', color: 'inherit' }}>返回探索</Link>
              <Title level={4} style={{ margin: 0 }}>{post.title}</Title>
            </Space>
            <Space>
              <Avatar>{post.author.charAt(0).toUpperCase()}</Avatar>
              <Space direction="vertical" size={0}>
                <Text strong>{post.author}</Text>
                <Text type="secondary">{post.location}</Text>
                {post.createdAt ? <Text type="secondary">{new Date(post.createdAt).toLocaleString()}</Text> : null}
              </Space>
            </Space>
          </Space>
          <Space wrap>
            {post.tags.map((t: string) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </Space>
        </Space>

        <Divider style={{ margin: '8px 0' }} />

        {/* 正文 */}
        <Space direction="vertical" size={8} style={{ width: '100%', padding: 16, background: 'var(--tg-theme-secondary-bg-color)', borderRadius: 8 }}>
          <Title level={5} style={{ margin: 0 }}>正文</Title>
          {post.caption && <Paragraph style={{ marginBottom: 8 }}>{post.caption}</Paragraph>}
          {post.content.map((p: string, idx: number) => (
            <Paragraph key={idx} style={{ marginBottom: 8 }}>{p}</Paragraph>
          ))}
        </Space>

        {/* 互动 */}
        <Space direction="vertical" size={8} style={{ width: '100%', padding: 16, background: 'var(--tg-theme-secondary-bg-color)', borderRadius: 8 }}>
          <Title level={5} style={{ margin: 0 }}>互动</Title>
          <Space size={12} wrap>
            <Button type="primary" onClick={toggleLike}>{likeCountLabel}</Button>
            <Button onClick={() => tip(5)}>打赏 5</Button>
            <Button onClick={onNomadPassContact}>使用 Nomad Pass 联系</Button>
            <Tag color={passRegistered ? 'green' : 'red'}>Pass {passRegistered ? '已注册' : '未注册'}</Tag>
            <Tag>Nomad Pass ×{passCount}</Tag>
            <Tag color="blue" style={{ marginLeft: 8 }}>{tipCountLabel}</Tag>
          </Space>
        </Space>

        {(post.tips > 0 || passRevealed) && (
          <Space direction="vertical" size={8} style={{ width: '100%', padding: 16, background: 'var(--tg-theme-secondary-bg-color)', borderRadius: 8 }}>
            <Title level={5} style={{ margin: 0 }}>联系方式</Title>
            <Paragraph style={{ marginBottom: 0 }}>{resolveContactInfo(post)}</Paragraph>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>（打赏或消耗 Pass 后显示，Mock）</Paragraph>
          </Space>
        )}

        {/* 评论 */}
        <Space direction="vertical" size={12} style={{ width: '100%', padding: 16, background: 'var(--tg-theme-secondary-bg-color)', borderRadius: 8 }}>
          <Title level={5} style={{ margin: 0 }}>评论</Title>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              placeholder="写下你的看法..."
              value={commentText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCommentText(e.target.value)}
            />
            <Button type="primary" onClick={addComment}>发布</Button>
          </Space.Compact>

          <List
            itemLayout="horizontal"
            dataSource={post.comments as CommentItem[]}
            renderItem={(item: CommentItem) => (
              <List.Item
                actions={[
                  <Button key={`like-${item.id}`} type="link" size="small" onClick={() => likeComment(item.id)}>
                    赞同 {item.likes}
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar>{item.avatar}</Avatar>}
                  title={
                    <Space size={8}>
                      <Text strong>{item.author}</Text>
                      <Tag>{item.time}</Tag>
                    </Space>
                  }
                  description={<Text>{item.content}</Text>}
                />
              </List.Item>
            )}
          />
        </Space>
      </Space>
    </div>
  )
}