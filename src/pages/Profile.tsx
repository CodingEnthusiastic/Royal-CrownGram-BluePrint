import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RetroWindow from "@/components/RetroWindow";
import RoyalPostCard from "@/components/RoyalPostCard";
import { royalUsers, royalPosts as initialPosts } from "@/data/mockData";

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);
  const [isAllied, setIsAllied] = useState(false);

  const user = userId ? royalUsers[userId] : null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RetroWindow title="⚠ ERROR 404">
          <p className="font-terminal text-foreground">Royal subject not found in the Crown Registry.</p>
          <button className="retro-btn mt-3 text-[9px]" onClick={() => navigate("/")}>
            RETURN TO GAZETTE
          </button>
        </RetroWindow>
      </div>
    );
  }

  const userPosts = posts.filter((p) => p.userId === user.id);

  const handleSealToggle = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, hasUserSealed: !p.hasUserSealed, seals: p.hasUserSealed ? p.seals - 1 : p.seals + 1 }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Profile Header */}
          <RetroWindow title={`👑 ROYAL PROFILE — ${user.name.toUpperCase()}`} className="mb-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 pixel-border overflow-hidden gold-glow">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-4xl mt-2">{user.coatOfArms}</span>
                {user.isVerified && (
                  <span className="font-pixel text-[8px] text-decree-gold bg-royal-burgundy px-2 py-1 border border-decree-gold mt-1">
                    👑 VERIFIED ROYAL
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="font-pixel text-sm text-primary text-glow">{user.name}</h2>
                <p className="font-terminal text-base text-foreground mt-1">{user.title}</p>
                <p className="font-terminal text-sm text-decree-gold">{user.kingdom}</p>

                <div className="mt-3 p-2 bg-muted border border-border">
                  <p className="font-terminal text-sm text-foreground italic">"{user.bio}"</p>
                </div>

                {/* Stats */}
                <div className="flex gap-4 mt-3">
                  {[
                    { label: "Alliances", value: user.alliances, icon: "⚔" },
                    { label: "Subjects", value: user.subjects.toLocaleString(), icon: "👥" },
                    { label: "Decrees", value: user.decrees, icon: "📜" },
                    { label: "Posts", value: userPosts.length, icon: "🖼" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-pixel text-xs text-primary">{stat.icon} {stat.value}</p>
                      <p className="font-terminal text-[11px] text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Alliance button */}
                {userId !== "king-arthur" && (
                  <button
                    className={`retro-btn mt-3 text-[9px] ${isAllied ? "retro-btn-accent" : ""}`}
                    onClick={() => setIsAllied(!isAllied)}
                  >
                    {isAllied ? "⚔ ALLIANCE FORMED" : "🤝 FORM ALLIANCE"}
                  </button>
                )}
              </div>
            </div>
          </RetroWindow>

          {/* Posts Grid Header */}
          <div className="retro-title-bar mb-2">
            📜 ROYAL PROCLAMATIONS BY {user.name.toUpperCase()} — {userPosts.length} ENTRIES
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {userPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <RoyalPostCard post={post} onSealToggle={handleSealToggle} />
              </motion.div>
            ))}
          </div>

          {userPosts.length === 0 && (
            <RetroWindow title="📭 NO PROCLAMATIONS">
              <p className="font-terminal text-muted-foreground">This royal has not yet issued any proclamations.</p>
            </RetroWindow>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
