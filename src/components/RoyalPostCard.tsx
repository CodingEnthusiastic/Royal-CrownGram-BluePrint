import React from "react";
import { useNavigate } from "react-router-dom";
import RetroWindow from "./RetroWindow";
import WaxSeal from "./WaxSeal";
import { RoyalPost, royalUsers } from "@/data/mockData";

interface RoyalPostCardProps {
  post: RoyalPost;
  onSealToggle: (postId: string) => void;
}

const RoyalPostCard: React.FC<RoyalPostCardProps> = ({ post, onSealToggle }) => {
  const navigate = useNavigate();
  const user = royalUsers[post.userId];

  return (
    <RetroWindow
      title={post.isDecree ? `⚜ ROYAL DECREE — ${user.kingdom.toUpperCase()}` : `📜 ${user.name} — ${user.kingdom}`}
      className={`w-full ${post.isDecree ? "gold-glow" : ""}`}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 mb-3 cursor-pointer hover:opacity-80"
        onClick={() => navigate(`/profile/${user.id}`)}
      >
        <div className="w-10 h-10 pixel-border-thin overflow-hidden flex-shrink-0">
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-primary text-glow">{user.name}</span>
            {user.isVerified && <span className="text-xs" title="Verified Royal">👑</span>}
            {post.isDecree && <span className="font-pixel text-[8px] text-decree-gold bg-royal-burgundy px-2 py-0.5 border border-decree-gold">DECREE</span>}
          </div>
          <span className="font-terminal text-sm text-muted-foreground">{user.title} of {user.kingdom}</span>
        </div>
      </div>

      {/* Image */}
      <div
        className="pixel-border-thin overflow-hidden mb-3 cursor-pointer"
        onClick={() => navigate(`/post/${post.id}`)}
      >
        <img src={post.image} alt="Royal post" className="w-full object-cover" style={{ imageRendering: "auto" }} />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-3">
        <WaxSeal count={post.seals} sealed={post.hasUserSealed} onToggle={() => onSealToggle(post.id)} />
        <button
          className="retro-btn text-[8px]"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          View Endorsements ({post.endorsements.length})
        </button>
      </div>

      {/* Caption */}
      <div className="border-t-2 border-border pt-2">
        <p className="font-terminal text-base text-foreground leading-relaxed">
          <span className="text-primary font-pixel text-[9px] mr-2">{user.name}:</span>
          {post.caption}
        </p>
        <p className="font-terminal text-xs text-muted-foreground mt-2">
          ⏰ {post.timestamp}
        </p>
      </div>
    </RetroWindow>
  );
};

export default RoyalPostCard;
