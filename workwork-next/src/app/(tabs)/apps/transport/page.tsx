import Link from 'next/link'

export default function TransportPage() {
  return (
    <div className="page" id="apps-transport">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Transport · Preview</h1>
        <Link href="/apps" className="tg-button">Back to App Center</Link>
      </div>
      <div className="tg-grid" style={{ marginTop: 8 }}>
        <div className="tg-grid-item"><div className="tg-grid-icon">✈️</div><div className="tg-grid-title">Flights</div><div className="tg-grid-subtitle">Popular routes</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon">🚇</div><div className="tg-grid-title">Metro</div><div className="tg-grid-subtitle">City rail</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon">🚕</div><div className="tg-grid-title">Ride</div><div className="tg-grid-subtitle">Taxi / Shared Mobility</div></div>
      </div>
      <div className="tg-message">
        <div className="tg-message-text">Preview only; live data integration coming soon.</div>
      </div>
      <div className="tg-tip">Use transport apps responsibly. Follow local regulations.</div>
    </div>
  )
}