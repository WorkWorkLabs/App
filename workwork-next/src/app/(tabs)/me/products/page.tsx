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
    type: 'Service',
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
      console.warn('Failed to load local listing data', e)
    }
  }, [])

  const update = (patch: Partial<Item>) => setForm((prev: Item) => ({ ...prev, ...patch }))

  const publish = async () => {
    if (!form.title.trim()) { alert('Please enter a title'); return }
    if (!form.price.trim()) { alert('Please enter a price'); return }
    setSaving(true)
    try {
      const newItem: Item = { ...form, id: String(Date.now()) }
      const next = [newItem, ...items]
      setItems(next)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      alert('Published to local list (demo storage); backend API can be integrated later')
      setForm({ id: '', title: '', type: 'Service', price: '', currency: 'USD', description: '', contact: '', link: '' })
    } catch (e) {
      console.error(e)
      alert('Publish failed. Please try again later')
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
        <div className="tg-title" style={{ fontSize: 18 }}>List My Products/Services</div>
        <div className="tg-button-group">
          <Link href="/me" className="tg-button tg-button-secondary">Back to Me</Link>
        </div>
      </div>

      <div className="ww-stack" style={{ marginTop: 12 }}>
        {/* 上架表单 */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">Publish Form</div>
            <div className="ww-card-subtitle">Suitable for digital nomads to list personal products/services (local demo storage)</div>

            <div className="ww-mini-list" style={{ marginTop: 8 }}>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>Title</label>
                <input value={form.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ title: e.target.value })} placeholder="e.g., Remote Consulting / English Resume Polishing / AI Tool Subscription" />
              </div>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>Type</label>
                <select value={form.type} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update({ type: e.target.value })}>
                  <option>Service</option>
                  <option>Product</option>
                  <option>Course</option>
                  <option>Tool</option>
                  <option>Accommodation</option>
                </select>
              </div>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>Price</label>
                <input value={form.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ price: e.target.value })} placeholder="e.g., 49 / 0.1" />
                <select value={form.currency} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update({ currency: e.target.value })}>
                  <option>USD</option>
                  <option>CNY</option>
                  <option>SOL</option>
                </select>
              </div>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>Description</label>
                <textarea value={form.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => update({ description: e.target.value })} placeholder="Briefly describe service content, delivery time, and notes" />
              </div>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>Contact</label>
                <input value={form.contact} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ contact: e.target.value })} placeholder="e.g., Email/Telegram/Wallet Address" />
              </div>
              <div className="ww-row" style={{ gap: 8 }}>
                <label style={{ width: 88 }}>Link</label>
                <input value={form.link} onChange={(e: React.ChangeEvent<HTMLInputElement>) => update({ link: e.target.value })} placeholder="Optional: detail page or payment link" />
              </div>
              <div className="ww-row" style={{ gap: 8, marginTop: 8 }}>
                <button className="ww-button" onClick={publish} disabled={saving}>{saving ? 'Publishing…' : 'Publish Listing'}</button>
                <button className="ww-button ww-button-secondary" onClick={() => setForm({ id: '', title: '', type: 'Service', price: '', currency: 'USD', description: '', contact: '', link: '' })}>Clear Form</button>
              </div>
            </div>
          </div>
        </div>

        {/* 已上架列表 */}
        <div className="ww-card">
          <div>
            <div className="ww-card-title">Listed</div>
            {items.length === 0 ? (
              <div className="ww-card-subtitle">No listings yet; published items will appear here</div>
            ) : (
              <div className="tg-grid" style={{ marginTop: 8 }}>
                {items.map((item: Item) => (
                  <div key={item.id} className="tg-grid-item" style={{ alignItems: 'flex-start' }}>
                    <div className="tg-grid-icon" />
                    <div className="tg-grid-title" style={{ fontWeight: 600 }}>{item.title}</div>
                    <div className="tg-grid-subtitle">{item.type} · {item.price} {item.currency}</div>
                    <div className="tg-grid-subtitle" style={{ whiteSpace: 'pre-wrap' }}>{item.description}</div>
                    <div className="ww-row" style={{ gap: 8, marginTop: 6 }}>
                      {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="ww-button">Open Link</a>}
                      <button className="ww-button ww-button-secondary" onClick={() => navigator.clipboard?.writeText(item.contact || '')}>Copy Contact</button>
                      <button className="ww-button ww-button-secondary" onClick={() => remove(item.id)}>Unlist</button>
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