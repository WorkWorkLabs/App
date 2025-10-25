import Link from 'next/link'

export default function JobsPage() {
  return (
    <div className="page" id="apps-jobs">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>招聘 · 预览</h1>
        <Link href="/apps" className="tg-button">返回应用中心</Link>
      </div>
      <div className="tg-list" style={{ marginTop: 8 }}>
        <div className="tg-list-item">
          <div className="tg-avatar">💼</div>
          <div className="tg-content">
            <div className="tg-title">React 前端开发<span className="tg-badge">远程</span></div>
            <div className="tg-caption">时薪 $50-80 · 3 个月</div>
            <div className="tg-body">熟悉 Next.js / TypeScript / Tailwind。</div>
          </div>
        </div>
        <div className="tg-list-item">
          <div className="tg-avatar">🔍</div>
          <div className="tg-content">
            <div className="tg-title">产品经理 (Web3)<span className="tg-badge">远程</span></div>
            <div className="tg-caption">月薪 $5k-8k</div>
            <div className="tg-body">有链上产品经验优先。</div>
          </div>
        </div>
      </div>
    </div>
  )
}