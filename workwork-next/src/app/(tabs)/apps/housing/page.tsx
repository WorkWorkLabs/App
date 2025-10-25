import Link from 'next/link'

export default function HousingPage() {
  return (
    <div className="page" id="apps-housing">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>住宿 · 预览</h1>
        <Link href="/apps" className="tg-button">返回应用中心</Link>
      </div>
      <div className="tg-grid" style={{ marginTop: 8 }}>
        <div className="tg-grid-item"><div className="tg-grid-icon">🏠</div><div className="tg-grid-title">曼谷 民宿/公寓</div><div className="tg-grid-subtitle">热门</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon">🏘️</div><div className="tg-grid-title">清迈 长租</div><div className="tg-grid-subtitle">安静</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon">🏝️</div><div className="tg-grid-title">巴厘岛 海边</div><div className="tg-grid-subtitle">海岛</div></div>
      </div>
      <div className="tg-message">
        <div className="tg-message-text">这是示例预览界面，后续将接入真实数据。</div>
      </div>
    </div>
  )
}