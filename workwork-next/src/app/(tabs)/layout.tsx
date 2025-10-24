import React from "react";
import TabBar from "@/components/TabBar";
import FAB from "@/components/FAB";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      {children}
      <TabBar />
      <FAB />
    </div>
  );
}