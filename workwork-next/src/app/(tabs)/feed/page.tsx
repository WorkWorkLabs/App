'use client'
import SegmentedControl from "@/components/SegmentedControl";
import { useRouter } from "next/navigation";

export default function FeedPage() {
  const router = useRouter();
  const onLoginClick = () => {
    router.push('/me');
  };
  const onContact = (points: number) => {
    alert(`You need to log in and spend ${points} points to contact the poster`);
  };
  return (
    <div className="page" id="feed">
      <div className="tg-header"><h1>WorkWork</h1></div>
      <div className="tg-message">
        <div className="tg-message-text">Log in to experience more features</div>
        <div className="tg-button-group">
          <button className="tg-button" onClick={onLoginClick}>Wallet Login ⭐</button>
        </div>
      </div>

      <SegmentedControl options={["All", "Following", "Events", "Jobs"]} />

      <div className="tg-list">
        <div className="tg-list-item">
          <div className="tg-avatar">A</div>
          <div className="tg-content">
            <div className="tg-title">Nomad Alice<span className="tg-badge">Event</span></div>
            <div className="tg-caption">2 hours ago</div>
            <div className="tg-body">🎉 Bangkok Nomad Meetup - This Saturday 2 PM at a cafe in Siam. Welcome!</div>
            <div className="tg-actions">
              <div>👍 12</div><div>💬 5</div><div>🔗 Share</div>
              <div className="tg-action-primary" onClick={() => onContact(5)}>Contact (5 points)</div>
            </div>
          </div>
        </div>
        <div className="tg-list-item">
          <div className="tg-avatar">B</div>
          <div className="tg-content">
            <div className="tg-title">Remote Developer Bob<span className="tg-badge">Job</span></div>
            <div className="tg-caption">5 hours ago</div>
            <div className="tg-body">🚀 Looking for React Frontend Developer — Remote, $50–80/hour, 3-month contract.</div>
            <div className="tg-actions">
              <div>👍 8</div><div>💬 12</div><div>🔗 Share</div>
              <div className="tg-action-primary" onClick={() => onContact(10)}>Contact (10 points)</div>
            </div>
          </div>
        </div>
      </div>

      <div id="publish" className="tg-section" style={{ marginTop: 16 }}>
        <div className="tg-header"><h1>Publish Content</h1></div>
        <div className="tg-form">
          <div className="tg-form-section">
            <div className="tg-form-header">Content Type</div>
            <select className="tg-input">
              <option>Post</option>
              <option>Event</option>
              <option>Job Posting</option>
              <option>Job Seeking</option>
              <option>Service Offering</option>
              <option>Request</option>
            </select>
          </div>
          <div className="tg-form-section">
            <input type="text" className="tg-input" placeholder="Title" />
            <textarea className="tg-textarea" placeholder="Share your thoughts, experience, or request..." />
          </div>
          <div className="tg-form-section">
            <input type="text" className="tg-input" placeholder="Location (optional)" />
            <select className="tg-input">
              <option>Contact requires points</option>
              <option>Contact for free</option>
              <option>Only followers can contact</option>
            </select>
          </div>
          <button className="tg-button" style={{ width: "100%", marginTop: 8 }}>Publish</button>
        </div>
      </div>
    </div>
  );
}