'use client'
export default function ExplorePage() {
  return (
    <div className="page" id="explore">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>探索 Explore</h1>
        <div className="tg-location" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14, color: 'var(--tg-theme-subtitle-text-color)' }}>当前位置</span>
          <span className="ww-chip">深圳</span>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">城市推荐</div>
        <div className="tg-grid">
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/bangkok-scenery/600/360" alt="曼谷风景" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">曼谷</div><div className="tg-grid-subtitle">热门</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/chiangmai-scenery/600/360" alt="清迈风景" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">清迈</div><div className="tg-grid-subtitle">安静</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/bali-scenery/600/360" alt="巴厘岛风景" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">巴厘岛</div><div className="tg-grid-subtitle">海岛</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/taipei-scenery/600/360" alt="台北风景" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">台北</div><div className="tg-grid-subtitle">美食</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/seoul-scenery/600/360" alt="首尔风景" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">首尔</div><div className="tg-grid-subtitle">潮流</div>
          </div>
          <div className="tg-grid-item">
            <img className="tg-grid-thumb" src="https://picsum.photos/seed/singapore-scenery/600/360" alt="新加坡风景" style={{ width: '100%', height: 96, objectFit: 'cover', borderRadius: 8 }} />
            <div className="tg-grid-title">新加坡</div><div className="tg-grid-subtitle">高效</div>
          </div>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">游民故事</div>
        <div className="tg-list">
          <div className="tg-list-item">
            <div className="tg-avatar">故</div>
            <div className="tg-content">
              <div className="tg-title">小王在台北的一个月<span className="tg-badge">故事</span></div>
              <div className="tg-caption">生活成本、社交与咖啡馆</div>
              <div className="tg-body">台北对新入门的游民非常友好，地铁方便，社区活跃。</div>
            </div>
          </div>
          <div className="tg-list-item">
            <div className="tg-avatar">事</div>
            <div className="tg-content">
              <div className="tg-title">在清迈远程的日常<span className="tg-badge">故事</span></div>
              <div className="tg-caption">慢节奏与工作效率</div>
              <div className="tg-body">社区空间多，生活节奏慢，适合深度工作与社交。</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">游民列表</div>
        <div className="tg-list">
          <div className="tg-list-item">
            <div className="tg-avatar">A</div>
            <div className="tg-content">
              <div className="tg-title">Alice · 产品经理<span className="tg-badge">附近 1.2km</span></div>
              <div className="tg-caption">清迈 · Nimman</div>
              <div className="tg-actions">
                <div className="tg-action" onClick={() => alert('已关注 Alice')}>关注</div>
                <div className="tg-action-primary" onClick={() => alert('已向 Alice 发送好友请求')}>加好友</div>
              </div>
            </div>
          </div>
          <div className="tg-list-item">
            <div className="tg-avatar">B</div>
            <div className="tg-content">
              <div className="tg-title">Bob · 前端开发<span className="tg-badge">附近 800m</span></div>
              <div className="tg-caption">曼谷 · Siam</div>
              <div className="tg-actions">
                <div className="tg-action" onClick={() => alert('已关注 Bob')}>关注</div>
                <div className="tg-action-primary" onClick={() => alert('已向 Bob 发送好友请求')}>加好友</div>
              </div>
            </div>
          </div>
          <div className="tg-list-item">
            <div className="tg-avatar">C</div>
            <div className="tg-content">
              <div className="tg-title">Carol · 设计师<span className="tg-badge">附近 3.5km</span></div>
              <div className="tg-caption">巴厘岛 · Canggu</div>
              <div className="tg-actions">
                <div className="tg-action" onClick={() => alert('已关注 Carol')}>关注</div>
                <div className="tg-action-primary" onClick={() => alert('已向 Carol 发送好友请求')}>加好友</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">线下活动</div>
        <div className="tg-list">
          <div className="tg-list-item">
            <div className="tg-avatar">E</div>
            <div className="tg-content">
              <div className="tg-title">清迈周末路跑<span className="tg-badge">活动</span></div>
              <div className="tg-caption">本周日 7:00</div>
              <div className="tg-body">一起跑步，集合地：Nimman Maya门口。</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tg-form-section">
        <div className="tg-form-header">签证/住宿热门榜单</div>
        <div className="tg-grid">
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">签证热门</div><div className="tg-grid-subtitle">泰国/印尼/新加坡</div></div>
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">住宿热门</div><div className="tg-grid-subtitle">曼谷/清迈/巴厘岛</div></div>
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">性价比</div><div className="tg-grid-subtitle">台北/清迈/胡志明</div></div>
          <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">办公空间</div><div className="tg-grid-subtitle">清迈/新加坡/首尔</div></div>
        </div>
      </div>
    </div>
  );
}