import React from "react";
import { motion } from "framer-motion";
import { RoyalPost, royalUsers } from "@/data/mockData";

interface DecreeBannerProps {
  decree: RoyalPost;
  onClick: () => void;
}

const DecreeBanner: React.FC<DecreeBannerProps> = ({ decree, onClick }) => {
  const user = royalUsers[decree.userId];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pixel-border bg-card gold-glow cursor-pointer mb-4"
      onClick={onClick}
    >
      <div className="retro-title-bar text-center">
        ⚜ ROYAL DECREE FROM {user.kingdom.toUpperCase()} ⚜
      </div>
      <div className="p-3">
        <p className="font-terminal text-sm text-foreground text-center">
          {decree.formalCaption}
        </p>
        <p className="font-terminal text-xs text-muted-foreground text-center mt-2">
          — {user.name}, {user.title} | {decree.timestamp}
        </p>
        <div className="text-center mt-2">
          <span className="font-pixel text-[8px] text-decree-gold">
            🔴 {decree.seals} Royal Seals Affixed
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DecreeBanner;
