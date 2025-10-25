'use client'

import React from 'react'
import Link from 'next/link'

type Item = {
  id: string
  title: string
  type: string
  price: string
  currency: string
  description: string
  contact: string
  link?: string
}

const STORAGE_KEY = 'ww_products_items'

export default function ProductsPage() {
  const [items, setItems] = React.useState([] as Item[])
  const [form, setForm] = React.useState({
    id: '',
    title: '',
    type: '服务',
    price: '',
    currency: 'USD',
    description: '',
    contact: '',
    link: ''
  } as Item)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch (e) {
      console.warn('加载本地上架数据失败', e)
    }
  }, [])

  const update = (patch: Partial<Item>) => setForm((prev: Item) => ({ ...prev, ...patch }))

  const publish = async () => {
    if (!form.title.trim()) { alert('请填写标题'); return }
    if (!form.price.trim()) { alert('请填写价格'); return }
    setSaving(true)
    try {
      const newItem: Item = { ...form, id: String(Date.now()) }
      const next = [newItem, ...items]
      setItems(next)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      alert('已发布到本地列表（示例存储），后续可接入后端 API')
      setForm({ id: '', title: '', type: '服务', price: '', currency: 'USD', description: '', contact: '', link: '' })
    } catch (e) {
      console.error(e)
      alert('发布失败，请稍后重试')
    } finally {
      setSaving(false)
    }
  }

  const remove = (id: string) => {
    const next = items.filter((i: Item) => i.id !== id)
    setItems(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return (
    <div className="page" id="me-products" style={{ padding: 16 }}>
      <div className="ww-profile-header" style={{ alignItems: 'center' }}>
        <div className="tg-title" style={{ fontSize: 18 }}>我的产品/服务上架</div>
        <div className="tg-button-group">
          <Link href="/me" className="tg-button tg-button-secondary">返回我的</Link>
        </div>
      </div>

      <div className="ww-stack" style={{ marginTop: 12 }}>
        {/* 上架表单 */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">发布表单</div>
            <div className="ww-card-subtitle">适合数字游民上架个人产品/服务（本地示例存储）</div>

            <div className="ww-mini-list" style={{ marginTop: 8 }}>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>标题</label>
                <input value={form.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ title: e.target.value })} placeholder="如：远程咨询/英文简历润色/AI 工具订阅" />
              </div>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>类型</label>
                <select value={form.type} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update({ type: e.target.value })}>
                  <option>服务</option>
                  <option>产品</option>
                  <option>课程</option>
                  <option>工具</option>
                  <option>住宿</option>
                </select>
              </div>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>价格</label>
                <input value={form.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ price: e.target.value })} placeholder="如：49 / 0.1" />
                <select value={form.currency} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update({ currency: e.target.value })}>
                  <option>USD</option>
                  <option>CNY</option>
                  <option>SOL</option>
                </select>
              </div>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>描述</label>
                <textarea value={form.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => update({ description: e.target.value })} placeholder="简要说明服务内容、交付时间与注意事项" />
              </div>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>联系</label>
                <input value={form.contact} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ contact: e.target.value })} placeholder="如：Email/Telegram/钱包地址" />
              </div>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>链接</label>
                <input value={form.link} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ link: e.target.value })} placeholder="可选：详情页或支付链接" />
              </div>
              <div className="ww-row" style={{ gap: 8, marginTop: 8 }}>
                <button className="ww-button" onClick={publish} disabled={saving}>{saving ? '发布中…' : '发布上架'}</button>
                <button className="ww-button ww-button-secondary" onClick={() => setForm({ id: '', title: '', type: '服务', price: '', currency: 'USD', description: '', contact: '', link: '' })}>清空表单</button>
              </div>
            </div>
          </div>
        </div>

        {/* 已上架列表 */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">已上架</div>
            {items.length === 0 ? (
              <div className="ww-card-subtitle">尚无上架项，发布后将在此展示</div>
            ) : (
              <div className="tg-grid" style={{ marginTop: 8 }}>
                {items.map((item: Item) => (
                  <div key={item.id} className="tg-grid-item" style={{ alignItems: 'flex-start' }}>
                    <div className="tg-grid-icon" />
                    <div className="tg-grid-title" style={{ fontWeight: 600 }}>{item.title}</div>
                    <div className="tg-grid-subtitle">{item.type} · {item.price} {item.currency}</div>
                    <div className="tg-grid-subtitle" style={{ whiteSpace: 'pre-wrap' }}>{item.description}</div>
                    <div className="ww-row" style={{ gap: 8, marginTop: 6 }}>
                      {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="ww-button">打开链接</a>}
                      <button className="ww-button ww-button-secondary" onClick={() => navigator.clipboard?.writeText(item.contact || '')}>复制联系</button>
                      <button className="ww-button ww-button-secondary" onClick={() => remove(item.id)}>下架</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}