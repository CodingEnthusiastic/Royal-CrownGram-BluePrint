import React, { useState } from "react";
import RetroWindow from "./RetroWindow";
import { royalUsers } from "@/data/mockData";

interface AllianceTrackerProps {
  currentUserId: string;
}

const AllianceTracker: React.FC<AllianceTrackerProps> = ({ currentUserId }) => {
  const [alliances, setAlliances] = useState<Record<string, boolean>>({
    "queen-eleanor": true,
    "prince-edward": true,
  });

  const otherRoyals = Object.values(royalUsers).filter((u) => u.id !== currentUserId);

  const toggleAlliance = (userId: string) => {
    setAlliances((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <RetroWindow title="⚔ KINGDOM ALLIANCES">
      <div className="space-y-2">
        {otherRoyals.map((royal) => {
          const allied = alliances[royal.id] ?? false;
          return (
            <div key={royal.id} className="flex items-center justify-between p-2 border border-border bg-muted">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 pixel-border-thin overflow-hidden">
                  <img src={royal.avatar} alt={royal.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-pixel text-[8px] text-primary">{royal.name}</p>
                  <p className="font-terminal text-xs text-muted-foreground">{royal.kingdom}</p>
                </div>
              </div>
              <button
                onClick={() => toggleAlliance(royal.id)}
                className={`retro-btn text-[7px] ${allied ? "retro-btn-accent" : ""}`}
              >
                {allied ? "⚔ ALLIED" : "🤝 FORM ALLIANCE"}
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-3 border-t-2 border-border pt-2">
        <p className="font-terminal text-xs text-muted-foreground">
          Active Alliances: {Object.values(alliances).filter(Boolean).length} / {otherRoyals.length}
        </p>
      </div>
    </RetroWindow>
  );
};

export default AllianceTracker;
