import Link from 'next/link'

export default function TransportPage() {
  return (
    <div className="page" id="apps-transport">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>交通 · 预览</h1>
        <Link href="/apps" className="tg-button">返回应用中心</Link>
      </div>
      <div className="tg-grid" style={{ marginTop: 8 }}>
        <div className="tg-grid-item"><div className="tg-grid-icon">✈️</div><div className="tg-grid-title">航班</div><div className="tg-grid-subtitle">热门航线</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon">🚇</div><div className="tg-grid-title">地铁</div><div className="tg-grid-subtitle">城市轨道</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon">🚕</div><div className="tg-grid-title">出行</div><div className="tg-grid-subtitle">打车/共享</div></div>
      </div>
      <div className="tg-message">
        <div className="tg-message-text">示例预览界面，后续将接入实况数据。</div>
      </div>
    </div>
  )
}