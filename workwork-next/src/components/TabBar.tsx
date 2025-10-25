'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

type Tab = {
  href: string;
  label: string;
  icon: 'explore' | 'feed' | 'apps' | 'earn' | 'me';
};

const tabs: Tab[] = [
  { href: "/explore", label: "探索", icon: 'explore' },
  { href: "/feed", label: "广场", icon: 'feed' },
  { href: "/apps", label: "应用", icon: 'apps' },
  { href: "/earn", label: "任务", icon: 'earn' },
  { href: "/me", label: "我的", icon: 'me' },
];

function TabIcon({ name }: { name: Tab['icon'] }) {
  switch (name) {
    case 'explore':
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8.5" cy="8.5" r="5.5" />
          <line x1="13" y1="13" x2="18" y2="18" />
        </svg>
      );
    case 'feed':
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="14" height="10" rx="2" />
          <path d="M7 14 L7 18 L11 14" />
        </svg>
      );
    case 'apps':
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="11" y="3" width="6" height="6" rx="1" />
          <rect x="3" y="11" width="6" height="6" rx="1" />
          <rect x="11" y="11" width="6" height="6" rx="1" />
        </svg>
      );
    case 'earn':
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2 L12.5 7.5 L18 8 L13.5 11.5 L15 17 L10 14 L5 17 L6.5 11.5 L2 8 L7.5 7.5 Z" />
        </svg>
      );
    case 'me':
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10" cy="6.5" r="3.5" />
          <path d="M3 18 c0 -4.5 14 -4.5 14 0" />
        </svg>
      );
    default:
      return null;
  }
}

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="tg-tabbar">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link key={t.href} href={t.href} className={`tg-tab ${active ? "active" : ""}`}>
            <div className="tg-tab-icon"><TabIcon name={t.icon} /></div>
            <div className="tg-tab-label">{t.label}</div>
          </Link>
        );
      })}
    </div>
  );
}