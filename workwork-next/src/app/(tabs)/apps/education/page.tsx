'use client'
import Link from 'next/link'
import React from 'react'
import { Modal, Typography, Space, Tag, Button, List, message } from 'antd'
import { useWallet } from '@solana/wallet-adapter-react'

export default function EducationPage() {
  const { connected, publicKey, signMessage } = useWallet()
  const ORDERS_KEY = 'WW_ORDERS'
  type Course = { id: string; title: string; overview: string; price: number; currency: string }
  const [courseOpen, setCourseOpen] = React.useState(false)
  const [selected, setSelected] = React.useState(null as Course | null)

  const onApply = (course: Course) => {
    setSelected(course)
    setCourseOpen(true)
  }
  const purchaseSelected = () => {
    const course = selected
    if (!course) return
    const okxRaw = (window as any)?.okxwallet?.solana?.publicKey ?? (window as any)?.okxwallet?.solana?.address ?? null
    const okxLinked = !!okxRaw
    const phantomLinked = !!(connected && publicKey)
    if (!okxLinked && !phantomLinked) {
      Modal.confirm({
        title: 'Wallet not connected',
        content: 'You need to connect a wallet before purchasing. Go to Me to connect?',
        okText: 'Go to Me',
        cancelText: 'Cancel',
        onOk: () => { try { window.location.href = '/me' } catch {} },
      })
      return
    }
    Modal.confirm({
      title: 'Confirm purchase?',
      content: `${course.title} · Price: ${course.price} ${course.currency}`,
      okText: 'Confirm Purchase',
      cancelText: 'Cancel',
      onOk: async () => {
        const buyer = okxLinked ? String(okxRaw) : (publicKey?.toBase58() ?? '')
        const text = `Solana Pay · Purchase\nTitle: ${course.title}\nPrice: ${course.price} ${course.currency}\nBuyer: ${buyer}\nTime: ${new Date().toISOString()}`
        const data = new TextEncoder().encode(text)

        const okx = (window as any)?.okxwallet?.solana
        try {
          if (okx && typeof okx.signMessage === 'function') {
            await okx.signMessage(data)
          } else if (typeof signMessage === 'function') {
            await signMessage(data)
          } else {
            Modal.info({ title: 'Wallet signing unavailable', content: 'Please connect Phantom to sign the payment (Solana Pay, mock).' })
            return
          }
          message.success('Signature complete')
        } catch (e) {
          message.error('Signature canceled or failed')
          return
        }

        const order = { id: 'o' + Date.now(), title: course.title, price: course.price, currency: course.currency, status: 'pending_payment', createdAt: Date.now(), buyer, courseId: course.id }
        try {
          const raw = localStorage.getItem(ORDERS_KEY)
          const arr = raw ? JSON.parse(raw) : []
          arr.unshift(order)
          localStorage.setItem(ORDERS_KEY, JSON.stringify(arr.slice(0, 200)))
        } catch (e) {}
        Modal.info({ title: 'Awaiting seller confirmation', content: 'Order created, awaiting seller confirmation and delivery (Mock)' })
        setCourseOpen(false)
      },
    })
  }
  return (
    <div className="page" id="apps-education">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Education · Preview</h1>
        <Link href="/apps" className="tg-button">Back to App Center</Link>
      </div>
      <div className="tg-list" style={{ marginTop: 8 }}>
        <div className="tg-list-item">
          <div className="tg-avatar">🎓</div>
          <div className="tg-content">
            <div className="tg-title">Frontend Bootcamp<span className="tg-badge">Course</span></div>
            <div className="tg-caption">React/Next.js Basics</div>
            <div className="tg-actions">
              <div className="tg-action-primary" onClick={() => onApply({ id: 'fe-camp', title: 'Frontend Bootcamp', overview: 'React/Next.js Basics', price: 199, currency: 'USD' })}>Apply</div>
            </div>
          </div>
        </div>
        <div className="tg-list-item">
          <div className="tg-avatar">📚</div>
          <div className="tg-content">
            <div className="tg-title">English Improvement<span className="tg-badge">Course</span></div>
            <div className="tg-caption">Speaking & Business Writing</div>
            <div className="tg-actions">
              <div className="tg-action-primary" onClick={() => onApply({ id: 'en-boost', title: 'English Improvement', overview: 'Speaking & Business Writing', price: 149, currency: 'USD' })}>Apply</div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={selected?.title || 'Course Overview'}
        open={courseOpen}
        onCancel={() => setCourseOpen(false)}
        footer={(
          <Space>
            <Button onClick={() => setCourseOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={purchaseSelected}>Purchase</Button>
          </Space>
        )}
      >
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Typography.Text>{selected?.overview}</Typography.Text>
          <Tag color="gold">Price: {selected?.price} {selected?.currency}</Tag>
          <Typography.Text type="secondary">
            Purchase will create a mock order under Me → My Orders → Pending Payment
          </Typography.Text>
        </Space>
      </Modal>
    </div>
  )
}