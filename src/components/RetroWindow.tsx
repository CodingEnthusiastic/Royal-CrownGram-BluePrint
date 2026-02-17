import React from "react";

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

const RetroWindow: React.FC<RetroWindowProps> = ({ title, children, className = "", onClose }) => {
  return (
    <div className={`retro-window bg-card ${className}`}>
      <div className="retro-title-bar flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 border border-decree-gold bg-royal-burgundy" />
          <span className="inline-block w-3 h-3 border border-decree-gold bg-royal-burgundy" />
          <span className="truncate">{title}</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-decree-gold hover:text-foreground px-1 font-pixel text-xs">
            ✕
          </button>
        )}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
};

export default RetroWindow;
