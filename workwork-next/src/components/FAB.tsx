'use client'
import { useRouter, usePathname } from "next/navigation";

export default function FAB() {
  const router = useRouter();
  const pathname = usePathname();
  const onClick = async () => {
    // 在 Explore 页，直接触发发布浮窗事件，不跳转到 /feed
    if (pathname === '/explore') {
      try {
        document.dispatchEvent(new CustomEvent('ww-open-publish'));
      } catch (e) {
        // Fallback：若 CustomEvent 不可用，使用普通事件
        document.dispatchEvent(new Event('ww-open-publish'));
      }
      return;
    }
    // 其他页面维持原逻辑：跳转到 /feed 并尝试滚动到发布区
    router.push("/feed");
    setTimeout(() => {
      const target = document.getElementById("publish");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };
  return (
    <div className="tg-fab" onClick={onClick}>+</div>
  );
}