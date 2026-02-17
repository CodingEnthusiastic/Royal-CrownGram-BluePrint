import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/crowngram-logo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAbout, setShowAbout] = useState(false);

  const tabs = [
    { label: "📜 Royal Gazette", path: "/" },
    { label: "👑 My Court", path: "/profile/king-arthur" },
    { label: "🏰 Kingdoms", path: "/kingdoms" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-card border-b-3 border-primary">
        {/* Title Bar */}
        <div className="retro-title-bar flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>■</span>
            <span>CrownGram v1.0 — Royal Digital Communication System</span>
          </div>
          <div className="flex gap-1">
            <button className="px-2 hover:bg-primary hover:text-primary-foreground" onClick={() => setShowAbout(!showAbout)}>?</button>
            <span className="px-2">□</span>
          </div>
        </div>

        {/* Main Nav */}
        <div className="flex items-center justify-between px-4 py-2 bg-card">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo} alt="CrownGram" className="w-8 h-8 pixel-border-thin" />
            <h1 className="font-pixel text-sm text-primary text-glow hidden sm:block">CrownGram</h1>
          </div>

          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`retro-btn text-[8px] sm:text-[9px] ${
                  location.pathname === tab.path || (tab.path !== "/" && location.pathname.startsWith(tab.path))
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-1 bg-muted border-t-2 border-border font-terminal text-xs text-muted-foreground">
          <span>⚡ CONNECTION: ROYAL_NETWORK_SECURE</span>
          <span className="hidden sm:inline">📡 SIGNAL: STRONG | 🔒 ENCRYPTED</span>
          <span>⏰ ANNO DOMINI MMXXVI</span>
        </div>
      </nav>

      {/* About Pop-up */}
      {showAbout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80" onClick={() => setShowAbout(false)}>
          <div className="retro-window bg-card max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="retro-title-bar flex items-center justify-between">
              <span>About CrownGram</span>
              <button onClick={() => setShowAbout(false)} className="px-2 hover:bg-primary">✕</button>
            </div>
            <div className="p-4 font-terminal text-base space-y-3">
              <p className="text-primary font-pixel text-xs text-glow">CrownGram v1.0</p>
              <p className="text-foreground">The Official Royal Digital Communication Platform</p>
              <p className="text-muted-foreground text-sm">
                Est. MCMLXXXII. Exclusively for verified monarchs, sovereigns, and members of royal courts.
                All communications are encrypted with the Royal Cipher and archived in the Crown Archives.
              </p>
              <p className="text-muted-foreground text-sm">
                ISO 9001:2015 Certified | ISO 20121:2012 Certified
              </p>
              <div className="border-t-2 border-border pt-2">
                <p className="text-[10px] font-pixel text-decree-gold">
                  Developed for Pragyan 2026 — NIT Tiruchirappalli
                </p>
              </div>
              <button className="retro-btn w-full text-[9px]" onClick={() => setShowAbout(false)}>
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
