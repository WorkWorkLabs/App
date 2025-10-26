import Link from 'next/link'

export default function EventsPage() {
  return (
    <div className="page" id="apps-events">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Events · Preview</h1>
        <Link href="/apps" className="tg-button">Back to App Center</Link>
      </div>
      <div className="tg-list" style={{ marginTop: 8 }}>
        <div className="tg-list-item">
          <div className="tg-avatar">🎉</div>
          <div className="tg-content">
            <div className="tg-title">Tech Meetup<span className="tg-badge">Event</span></div>
            <div className="tg-caption">Networking & Demos</div>
            <div className="tg-body">Run together. Meet at: Nimman Maya entrance.</div>
          </div>
        </div>
        <div className="tg-list-item">
          <div className="tg-avatar">☕</div>
          <div className="tg-content">
            <div className="tg-title">Music Festival<span className="tg-badge">Event</span></div>
            <div className="tg-caption">Live bands & food</div>
            <div className="tg-body">Product/Frontend/Operations themed meetup.</div>
          </div>
        </div>
      </div>
    </div>
  )
}