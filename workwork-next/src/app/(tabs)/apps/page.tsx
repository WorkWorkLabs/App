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
        <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">金融</div><div className="tg-grid-subtitle">规划中</div></div>
        <div className="tg-grid-item"><div className="tg-grid-icon"></div><div className="tg-grid-title">交通</div><div className="tg-grid-subtitle">规划中</div></div>
      </div>
      <div className="tg-message">
        <div className="tg-message-text">🚀 更多功能正在开发中</div>
        <div className="tg-subtitle" style={{ fontSize: 12, color: "var(--tg-theme-subtitle-text-color)" }}>我们正在努力为数字游民打造更完整的生态系统</div>
      </div>
    </div>
  );
}