import { useState } from "react";
import { Outlet } from "react-router-dom";
import ActivityBar from "./ActivityBar";
import Sidebar from "./Sidebar";
import Tabs from "./Tabs";
import Terminal from "./Terminal";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-panel font-sans text-text">
      <ActivityBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {sidebarOpen && <Sidebar />}

      <div className="flex min-w-0 flex-1 flex-col">
        <Tabs />
        <main className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-thumb]:bg-overlay-mid [&::-webkit-scrollbar-thumb:hover]:bg-overlay-soft">
          <Outlet />
        </main>
        <Terminal />
      </div>
    </div>
  );
}
