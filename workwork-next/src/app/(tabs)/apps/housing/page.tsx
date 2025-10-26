import Link from 'next/link'

export default function HousingPage() {
  return (
    <div className="page" id="apps-housing">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Housing · Preview</h1>
        <Link href="/apps" className="tg-button">Back to App Center</Link>
      </div>
      <div className="tg-grid" style={{ marginTop: 8 }}>
        <div className="tg-grid-item"><div className="tg-grid-icon">🏠</div><div className="tg-grid-title">Bangkok · Homestay/Apartment</div><div className="tg-grid-subtitle">Popular</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon">🏘️</div><div className="tg-grid-title">Chiang Mai · Long-term</div><div className="tg-grid-subtitle">Quiet</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon">🏝️</div><div className="tg-grid-title">Bali · Seaside</div><div className="tg-grid-subtitle">Island</div></div>
      </div>
      <div className="tg-message">
        <div className="tg-message-text">This is a preview. Real data will be integrated later.</div>
      </div>
    </div>
  )
}