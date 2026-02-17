import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RoyalPostCard from "@/components/RoyalPostCard";
import DecreeBanner from "@/components/DecreeBanner";
import AllianceTracker from "@/components/AllianceTracker";
import RetroWindow from "@/components/RetroWindow";
import { royalPosts as initialPosts, royalUsers } from "@/data/mockData";

const Feed: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);

  const decrees = posts.filter((p) => p.isDecree);
  const latestDecree = decrees[0];

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
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Boot-up header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 font-terminal text-sm text-phosphor-amber"
        >
          <p className="text-phosphor">{'>'} LOADING ROYAL GAZETTE...</p>
          <p className="text-phosphor">{'>'} AUTHENTICATING ROYAL CIPHER... OK</p>
          <p className="text-phosphor">{'>'} FETCHING PROCLAMATIONS... COMPLETE</p>
          <p className="text-phosphor cursor-blink">{'>'} DISPLAYING CHRONOLOGICAL FEED</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Main Feed */}
          <div className="flex-1 space-y-4">
            {/* Latest Decree */}
            {latestDecree && (
              <DecreeBanner decree={latestDecree} onClick={() => navigate(`/post/${latestDecree.id}`)} />
            )}

            {/* Posts */}
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <RoyalPostCard post={post} onSealToggle={handleSealToggle} />
              </motion.div>
            ))}

            {/* End of feed */}
            <div className="text-center py-6 font-terminal text-muted-foreground border-t-2 border-border">
              <p>═══════════ END OF ROYAL GAZETTE ═══════════</p>
              <p className="text-xs mt-1">All proclamations have been displayed chronologically.</p>
              <p className="text-xs">Archive records maintained by the Royal Scribe.</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-72 space-y-4">
            {/* Current User */}
            <RetroWindow title="👑 LOGGED IN AS">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 pixel-border-thin overflow-hidden">
                  <img src={royalUsers["king-arthur"].avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-pixel text-[9px] text-primary text-glow">King Arthur III</p>
                  <p className="font-terminal text-xs text-muted-foreground">Kingdom of Camelot</p>
                </div>
              </div>
              <button className="retro-btn w-full mt-3 text-[8px]" onClick={() => navigate("/profile/king-arthur")}>
                VIEW MY COURT
              </button>
            </RetroWindow>

            {/* Alliance Tracker */}
            <AllianceTracker currentUserId="king-arthur" />

            {/* System Info */}
            <RetroWindow title="📟 SYSTEM STATUS">
              <div className="font-terminal text-xs text-muted-foreground space-y-1">
                <p>SYS: CrownGram v1.0.0</p>
                <p>NET: Royal_Secure_Net</p>
                <p>ENC: 256-bit Crown Cipher</p>
                <p>USR: 3 Verified Royals</p>
                <p>MSG: {posts.length} Proclamations</p>
                <p className="text-phosphor-amber">RAM: 640KB (Should be enough)</p>
              </div>
            </RetroWindow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
