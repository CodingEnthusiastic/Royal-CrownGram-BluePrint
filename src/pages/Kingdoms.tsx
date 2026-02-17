import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RetroWindow from "@/components/RetroWindow";
import { royalUsers } from "@/data/mockData";

const Kingdoms: React.FC = () => {
  const navigate = useNavigate();
  const kingdoms = Object.values(royalUsers);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-terminal text-sm text-phosphor-amber mb-4">
          <p className="text-phosphor">{'>'} ACCESSING CROWN REGISTRY...</p>
          <p className="text-phosphor cursor-blink">{'>'} DISPLAYING ALL VERIFIED KINGDOMS</p>
        </motion.div>

        <RetroWindow title="🏰 KINGDOM REGISTRY — ALL VERIFIED REALMS">
          <div className="space-y-3">
            {kingdoms.map((royal, i) => (
              <motion.div
                key={royal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="pixel-border-thin p-3 bg-muted cursor-pointer hover:bg-secondary transition-colors"
                onClick={() => navigate(`/profile/${royal.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 pixel-border overflow-hidden flex-shrink-0">
                    <img src={royal.avatar} alt={royal.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{royal.coatOfArms}</span>
                      <div>
                        <h3 className="font-pixel text-[10px] text-primary text-glow">{royal.name}</h3>
                        <p className="font-terminal text-sm text-foreground">{royal.title}</p>
                      </div>
                      {royal.isVerified && (
                        <span className="font-pixel text-[7px] text-decree-gold bg-royal-burgundy px-1 py-0.5 border border-decree-gold ml-auto">
                          VERIFIED
                        </span>
                      )}
                    </div>
                    <p className="font-terminal text-sm text-decree-gold mt-1">{royal.kingdom}</p>
                    <div className="flex gap-4 mt-1 font-terminal text-xs text-muted-foreground">
                      <span>⚔ {royal.alliances} Alliances</span>
                      <span>👥 {royal.subjects.toLocaleString()} Subjects</span>
                      <span>📜 {royal.decrees} Decrees</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </RetroWindow>
      </div>
    </div>
  );
};

export default Kingdoms;
