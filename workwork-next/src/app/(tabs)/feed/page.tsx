'use client'
import SegmentedControl from "@/components/SegmentedControl";
import { useRouter } from "next/navigation";

export default function FeedPage() {
  const router = useRouter();
  const onLoginClick = () => {
    router.push('/me');
  };
  const onContact = (points: number) => {
    alert(`需要登录并消耗${points}积分才能联系发布者`);
  };
  return (
    <div className="page" id="feed">
      <div className="tg-header"><h1>WorkWork</h1></div>
      <div className="tg-message">
        <div className="tg-message-text">体验更多功能，请登录</div>
        <div className="tg-button-group">
          <button className="tg-button" onClick={onLoginClick}>钱包登录 ⭐</button>
        </div>
      </div>

      <SegmentedControl options={["全部", "关注", "活动", "招聘"]} />

      <div className="tg-list">
        <div className="tg-list-item">
          <div className="tg-avatar">A</div>
          <div className="tg-content">
            <div className="tg-title">数字游民Alice<span className="tg-badge">活动</span></div>
            <div className="tg-caption">2小时前</div>
            <div className="tg-body">🎉 曼谷数字游民聚会 - 本周六下午2点在Siam区咖啡厅，欢迎参加！</div>
            <div className="tg-actions">
              <div>👍 12</div><div>💬 5</div><div>🔗 分享</div>
              <div className="tg-action-primary" onClick={() => onContact(5)}>联系 (5积分)</div>
            </div>
          </div>
        </div>
        <div className="tg-list-item">
          <div className="tg-avatar">B</div>
          <div className="tg-content">
            <div className="tg-title">远程开发者Bob<span className="tg-badge">招聘</span></div>
            <div className="tg-caption">5小时前</div>
            <div className="tg-body">🚀 寻找React前端开发者 - 远程，时薪$50-80，周期3个月。</div>
            <div className="tg-actions">
              <div>👍 8</div><div>💬 12</div><div>🔗 分享</div>
              <div className="tg-action-primary" onClick={() => onContact(10)}>联系 (10积分)</div>
            </div>
          </div>
        </div>
      </div>

      <div id="publish" className="tg-section" style={{ marginTop: 16 }}>
        <div className="tg-header"><h1>发布内容</h1></div>
        <div className="tg-form">
          <div className="tg-form-section">
            <div className="tg-form-header">内容类型</div>
            <select className="tg-input">
              <option>普通帖子</option>
              <option>活动分享</option>
              <option>招聘信息</option>
              <option>求职信息</option>
              <option>接单服务</option>
              <option>需求发布</option>
            </select>
          </div>
          <div className="tg-form-section">
            <input type="text" className="tg-input" placeholder="标题" />
            <textarea className="tg-textarea" placeholder="分享你的想法、经验或需求..." />
          </div>
          <div className="tg-form-section">
            <input type="text" className="tg-input" placeholder="地点 (可选)" />
            <select className="tg-input">
              <option>需要积分联系</option>
              <option>免费联系</option>
              <option>仅关注者可联系</option>
            </select>
          </div>
          <button className="tg-button" style={{ width: "100%", marginTop: 8 }}>发布</button>
        </div>
      </div>
    </div>
  );
}