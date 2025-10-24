'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/explore", label: "探索" },
  { href: "/feed", label: "广场" },
  { href: "/apps", label: "应用" },
  { href: "/earn", label: "任务" },
  { href: "/me", label: "我的" },
];

export default function TabBar() {
  const pathname = usePathname();
  return (
    <div className="tg-tabbar">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link key={t.href} href={t.href} className={`tg-tab ${active ? "active" : ""}`}>
            <div className="tg-tab-icon" />
            <div className="tg-tab-label">{t.label}</div>
          </Link>
        );
      })}
    </div>
  );
}