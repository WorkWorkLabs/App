'use client'
import Link from 'next/link'

export default function EducationPage() {
  const onApply = (course: string) => {
    alert(`已报名：${course}，我们会尽快联系你`)
  }
  return (
    <div className="page" id="apps-education">
      <div className="tg-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>教育 · 预览</h1>
        <Link href="/apps" className="tg-button">返回应用中心</Link>
      </div>
      <div className="tg-list" style={{ marginTop: 8 }}>
        <div className="tg-list-item">
          <div className="tg-avatar">🎓</div>
          <div className="tg-content">
            <div className="tg-title">前端训练营<span className="tg-badge">课程</span></div>
            <div className="tg-caption">React/Next.js 基础</div>
            <div className="tg-actions">
              <div className="tg-action-primary" onClick={() => onApply('前端训练营')}>报名</div>
            </div>
          </div>
        </div>
        <div className="tg-list-item">
          <div className="tg-avatar">📚</div>
          <div className="tg-content">
            <div className="tg-title">海外英语提升<span className="tg-badge">课程</span></div>
            <div className="tg-caption">口语与商务写作</div>
            <div className="tg-actions">
              <div className="tg-action-primary" onClick={() => onApply('海外英语提升')}>报名</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}