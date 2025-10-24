'use client'
import React from "react";

export default function SegmentedControl({ options = [], onChange }: { options: string[]; onChange?: (idx: number) => void }) {
  const [active, setActive] = React.useState(0);
  return (
    <div className="tg-segmented-control">
      {options.map((opt, idx) => (
        <div
          key={opt}
          className={`tg-segment ${active === idx ? "active" : ""}`}
          onClick={() => { setActive(idx); onChange?.(idx); }}
        >
          {opt}
        </div>
      ))}
    </div>
  );
}