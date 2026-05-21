import { useState } from "react";
import { ToastProvider } from "./components/Toast";
import Header from "./components/Header";
import CalendarTab from "./tabs/CalendarTab";
import ThemeTab from "./tabs/ThemeTab";
import ProductionTab from "./tabs/ProductionTab";
import ThumbnailTab from "./tabs/ThumbnailTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("production");
  const [navigationTarget, setNavigationTarget] = useState(null);

  function navigateToProduction(channelId, projectId) {
    setNavigationTarget({ channelId, projectId });
    setActiveTab("production");
  }

  return (
    <ToastProvider>
      <div className="app">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="main">
          {activeTab === "calendar" && (
            <CalendarTab onNavigateToProduction={navigateToProduction} />
          )}
          {activeTab === "themes" && (
            <ThemeTab onNavigateToProduction={navigateToProduction} />
          )}
          {activeTab === "production" && (
            <ProductionTab
              navigationTarget={navigationTarget}
              onClearNavigation={() => setNavigationTarget(null)}
            />
          )}
          <ThumbnailTab visible={activeTab === "thumbnail"} />
        </main>
      </div>
    </ToastProvider>
  );
}
