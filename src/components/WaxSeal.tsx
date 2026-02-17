import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WaxSealProps {
  count: number;
  sealed: boolean;
  onToggle: () => void;
}

const WaxSeal: React.FC<WaxSealProps> = ({ count, sealed, onToggle }) => {
  const [showStamp, setShowStamp] = useState(false);

  const handleClick = () => {
    if (!sealed) {
      setShowStamp(true);
      setTimeout(() => setShowStamp(false), 600);
    }
    onToggle();
  };

  return (
    <button onClick={handleClick} className="flex items-center gap-2 group relative">
      <div className={`relative w-8 h-8 flex items-center justify-center transition-all ${sealed ? "seal-glow" : ""}`}>
        <span className={`text-2xl transition-transform ${sealed ? "scale-110" : "group-hover:scale-125"}`}>
          {sealed ? "🔴" : "⭕"}
        </span>
        <AnimatePresence>
          {showStamp && (
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-3xl"
              initial={{ scale: 2, rotate: -15, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              🔴
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className="font-terminal text-lg text-foreground">
        {count} {count === 1 ? "Seal" : "Seals"}
      </span>
    </button>
  );
};

export default WaxSeal;
