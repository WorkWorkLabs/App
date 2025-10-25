import Link from 'next/link'

export default function EventsPage() {
  return (
    <div className="page" id="apps-events">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>活动 · 预览</h1>
        <Link href="/apps" className="tg-button">返回应用中心</Link>
      </div>
      <div className="tg-list" style={{ marginTop: 8 }}>
        <div className="tg-list-item">
          <div className="tg-avatar">🎉</div>
          <div className="tg-content">
            <div className="tg-title">清迈周末路跑<span className="tg-badge">活动</span></div>
            <div className="tg-caption">本周日 7:00</div>
            <div className="tg-body">一起跑步，集合地：Nimman Maya门口。</div>
          </div>
        </div>
        <div className="tg-list-item">
          <div className="tg-avatar">☕</div>
          <div className="tg-content">
            <div className="tg-title">曼谷咖啡交流<span className="tg-badge">活动</span></div>
            <div className="tg-caption">周三晚 19:00</div>
            <div className="tg-body">产品/前端/运营主题交流。</div>
          </div>
        </div>
      </div>
    </div>
  )
}