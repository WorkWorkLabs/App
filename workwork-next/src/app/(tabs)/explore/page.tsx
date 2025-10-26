'use client'
import Link from 'next/link'
export default function ExplorePage() {
  return (
    <div className="page" id="explore">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Explore</h1>
        <div className="tg-location" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14, color: 'var(--tg-theme-subtitle-text-color)' }}>Current Location</span>
          <span className="ww-chip">Shenzhen</span>
          <button className="tg-button" onClick={() => alert('Scan QR Code (placeholder)')}>Scan QR Code</button>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">City Recommendations</div>
        <div className="tg-grid">
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/bangkok-scenery/600/360" alt="Bangkok Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Bangkok</div><div className="tg-grid-subtitle">Popular</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/chiangmai-scenery/600/360" alt="Chiang Mai Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Chiang Mai</div><div className="tg-grid-subtitle">Quiet</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/bali-scenery/600/360" alt="Bali Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Bali</div><div className="tg-grid-subtitle">Island</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/taipei-scenery/600/360" alt="Taipei Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Taipei</div><div className="tg-grid-subtitle">Cuisine</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/seoul-scenery/600/360" alt="Seoul Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Seoul</div><div className="tg-grid-subtitle">Trendy</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/singapore-scenery/600/360" alt="Singapore Scenery" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">Singapore</div><div className="tg-grid-subtitle">Efficient</div>
          </div>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">Nomad Stories</div>
        <div className="tg-list">
          <Link href="/explore/story-1" className="tg-list-item" prefetch={false} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="tg-avatar">S</div>
            <div className="tg-content">
              <div className="tg-title">A Month in Taipei<span className="tg-badge">Story</span></div>
              <div className="tg-caption">Cost of living, social life, and cafes</div>
              <div className="tg-body">Taipei is friendly for new nomads; the metro is convenient and the community is active.</div>
            </div>
          </Link>
          <Link href="/explore/story-2" className="tg-list-item" prefetch={false} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="tg-avatar">S</div>
            <div className="tg-content">
              <div className="tg-title">Remote Work Daily in Chiang Mai<span className="tg-badge">Story</span></div>
              <div className="tg-caption">Slow pace and productivity</div>
              <div className="tg-body">Plenty of coworking spaces and a slower pace make it great for deep work and socializing.</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">Nomad List</div>
        <div className="tg-list">
          <div className="tg-list-item">
            <div className="tg-avatar">A</div>
            <div className="tg-content">
              <div className="tg-title">Alice · Product Manager<span className="tg-badge">Nearby 1.2 km</span></div>
              <div className="tg-caption">Chiang Mai · Nimman</div>
              <div className="tg-actions">
                <div className="tg-action" onClick={() => alert('Followed Alice')}>Follow</div>
                <div className="tg-action-primary" onClick={() => alert('Friend request sent to Alice')}>Add Friend</div>
              </div>
            </div>
          </div>
          <div className="tg-list-item">
            <div className="tg-avatar">B</div>
            <div className="tg-content">
              <div className="tg-title">Bob · Frontend Developer<span className="tg-badge">Nearby 800 m</span></div>
              <div className="tg-caption">Bangkok · Siam</div>
              <div className="tg-actions">
                <div className="tg-action" onClick={() => alert('Followed Bob')}>Follow</div>
                <div className="tg-action-primary" onClick={() => alert('Friend request sent to Bob')}>Add Friend</div>
              </div>
            </div>
          </div>
          <div className="tg-list-item">
            <div className="tg-avatar">C</div>
            <div className="tg-content">
              <div className="tg-title">Carol · Designer<span className="tg-badge">Nearby 3.5 km</span></div>
              <div className="tg-caption">Bali · Canggu</div>
              <div className="tg-actions">
                <div className="tg-action" onClick={() => alert('Followed Carol')}>Follow</div>
                <div className="tg-action-primary" onClick={() => alert('Friend request sent to Carol')}>Add Friend</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">Offline Events</div>
        <div className="tg-list">
          <div className="tg-list-item">
            <div className="tg-avatar">E</div>
            <div className="tg-content">
              <div className="tg-title">Chiang Mai Weekend Run<span className="tg-badge">Event</span></div>
              <div className="tg-caption">This Sunday 7:00</div>
              <div className="tg-body">Let's run together. Meet at: Nimman Maya entrance.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">Visa/Accommodation Top Picks</div>
        <div className="tg-grid">
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">Visa Hotspots</div><div className="tg-grid-subtitle">Thailand/Indonesia/Singapore</div></div>
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">Accommodation Hotspots</div><div className="tg-grid-subtitle">Bangkok/Chiang Mai/Bali</div></div>
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">Best Value</div><div className="tg-grid-subtitle">Taipei/Chiang Mai/Ho Chi Minh</div></div>
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">Coworking Spaces</div><div className="tg-grid-subtitle">Chiang Mai/Singapore/Seoul</div></div>
        </div>
      </div>
    </div>
  );
}