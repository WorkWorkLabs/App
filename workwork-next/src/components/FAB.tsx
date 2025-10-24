'use client'
import { useRouter } from "next/navigation";

export default function FAB() {
  const router = useRouter();
  const onClick = async () => {
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