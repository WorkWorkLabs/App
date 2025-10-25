'use client'
export default function AppsPage() {
  return (
    <div className="page" id="apps">
      <div className="tg-header"><h1>应用中心</h1></div>
      <div className="tg-grid">
        <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">住宿</div><div className="tg-grid-subtitle">开发中</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">教育</div><div className="tg-grid-subtitle">规划中</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">活动</div><div className="tg-grid-subtitle">已上线</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">招聘</div><div className="tg-grid-subtitle">已上线</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">交通</div><div className="tg-grid-subtitle">规划中</div></div>
      </div>
      <div className="tg-section" style={{ marginTop: 12 }}>
        <div className="tg-header"><h1>Solana生态项目</h1></div>
        <div className="tg-list" style={{ marginTop: 8 }}>
          <a className="tg-list-item" href="https://gib.work/" target="_blank" rel="noopener noreferrer">
            <div className="tg-avatar">Sol</div>
            <div className="tg-content">
              <div className="tg-title">Gibwork</div>
              <div className="tg-caption">https://gib.work/</div>
            </div>
          </a>
          <a className="tg-list-item" href="https://sns.id/" target="_blank" rel="noopener noreferrer">
            <div className="tg-avatar">Sol</div>
            <div className="tg-content">
              <div className="tg-title">SNS ID</div>
              <div className="tg-caption">https://sns.id/</div>
            </div>
          </a>
          <a className="tg-list-item" href="https://www.solanasim.com/" target="_blank" rel="noopener noreferrer">
            <div className="tg-avatar">Sol</div>
            <div className="tg-content">
              <div className="tg-title">Solana SIM</div>
              <div className="tg-caption">https://www.solanasim.com/</div>
            </div>
          </a>
        </div>
      </div>
      <div className="tg-message">
        <div className="tg-message-text">🚀 更多功能正在开发中</div>
        <div className="tg-subtitle" style={{ fontSize: 12, color: "var(--tg-theme-subtitle-text-color)" }}>我们正在努力为数字游民打造更完整的生态系统</div>
      </div>
    </div>
  );
}