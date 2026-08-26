import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ActivityBar from "./ActivityBar";
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";
import Tabs from "./Tabs";
import Terminal from "./Terminal";
import { matchesMobile, useIsMobile } from "../utils/useIsMobile";

export default function Layout() {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(() => !matchesMobile());

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !sidebarOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSidebarOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile, sidebarOpen]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-panel font-sans text-text">
      <ActivityBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {isMobile ? (
        sidebarOpen && (
          <>
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-30 bg-panel/70"
            />
            <div className="fixed inset-y-0 left-12 z-40">
              <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </div>
          </>
        )
      ) : (
        sidebarOpen && <Sidebar />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Tabs />
        <Breadcrumb />
        <main className="flex-1 overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-3 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-thumb]:bg-overlay-mid [&::-webkit-scrollbar-thumb:hover]:bg-overlay-soft">
          <Outlet />
        </main>
        <Terminal />
      </div>
    </div>
  );
}
