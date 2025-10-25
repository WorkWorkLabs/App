'use client'
import Link from 'next/link'
export default function AppsPage() {
  return (
    <div className="page" id="apps">
      <div className="tg-header"><h1>App Center</h1></div>
      <div className="tg-grid">
        <Link href="/apps/housing" className="tg-grid-item"><div className="tg-grid-icon">🏨</div><div className="tg-grid-title">Housing – Nomad Community</div></Link>
        <Link href="/apps/education" className="tg-grid-item"><div className="tg-grid-icon">🎓</div><div className="tg-grid-title">Education</div></Link>
        <Link href="/apps/events" className="tg-grid-item"><div className="tg-grid-icon">🎉</div><div className="tg-grid-title">Events</div></Link>
        <Link href="/apps/jobs" className="tg-grid-item"><div className="tg-grid-icon">💼</div><div className="tg-grid-title">Jobs</div></Link>
        <Link href="/apps/transport" className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">Transport</div></Link>
      </div>
      <div className="tg-section" style={{ marginTop: 12 }}>
        <div className="tg-header"><h1>Solana Ecosystem Projects</h1></div>
        <div className="tg-list" style={{ marginTop: 8 }}>
          <a className="tg-list-item" href="https://gib.work/" target="_blank" rel="noopener noreferrer">
            <div className="tg-avatar">Sol</div>
            <div className="tg-content">
              <div className="tg-title">Gibwork</div>
              <div className="tg-caption">https://gib.work/</div>
            </div>
            <div className="ww-right" style={{ marginLeft: 'auto' }}>
              <div className="tg-action-primary">Go</div>
            </div>
          </a>
          <a className="tg-list-item" href="https://sns.id/" target="_blank" rel="noopener noreferrer">
            <div className="tg-avatar">Sol</div>
            <div className="tg-content">
              <div className="tg-title">SNS ID</div>
              <div className="tg-caption">https://sns.id/</div>
            </div>
            <div className="ww-right" style={{ marginLeft: 'auto' }}>
              <div className="tg-action-primary">Go</div>
            </div>
          </a>
          <a className="tg-list-item" href="https://www.solanasim.com/" target="_blank" rel="noopener noreferrer">
            <div className="tg-avatar">Sol</div>
            <div className="tg-content">
              <div className="tg-title">Solana SIM</div>
              <div className="tg-caption">https://www.solanasim.com/</div>
            </div>
            <div className="ww-right" style={{ marginLeft: 'auto' }}>
              <div className="tg-action-primary">Go</div>
            </div>
          </a>
        </div>
      </div>
      <div className="tg-message">
        <div className="tg-message-text">🚀 More features are in development</div>
        <div className="tg-subtitle" style={{ fontSize: 12, color: "var(--tg-theme-subtitle-text-color)" }}>We are building a more complete ecosystem for nomads</div>
      </div>
    </div>
  );
}