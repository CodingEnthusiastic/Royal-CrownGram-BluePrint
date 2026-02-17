import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import RetroWindow from "@/components/RetroWindow";
import WaxSeal from "@/components/WaxSeal";
import { royalPosts, royalUsers } from "@/data/mockData";

const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const postData = royalPosts.find((p) => p.id === postId);
  const [post, setPost] = useState(postData);
  const [endorsementText, setEndorsementText] = useState("");

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RetroWindow title="⚠ ERROR 404">
          <p className="font-terminal text-foreground">Proclamation not found in the Royal Archives.</p>
          <button className="retro-btn mt-3 text-[9px]" onClick={() => navigate("/")}>RETURN TO GAZETTE</button>
        </RetroWindow>
      </div>
    );
  }

  const user = royalUsers[post.userId];

  const handleSealToggle = () => {
    setPost((prev) => prev ? {
      ...prev,
      hasUserSealed: !prev.hasUserSealed,
      seals: prev.hasUserSealed ? prev.seals - 1 : prev.seals + 1,
    } : prev);
  };

  const handleEndorsement = () => {
    if (!endorsementText.trim()) return;
    const newEndorsement = {
      id: `e-${Date.now()}`,
      userId: "king-arthur",
      userName: "King Arthur III",
      text: endorsementText,
      timestamp: "Just now",
    };
    setPost((prev) => prev ? {
      ...prev,
      endorsements: [...prev.endorsements, newEndorsement],
    } : prev);
    setEndorsementText("");
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Back button */}
        <button className="retro-btn text-[8px] mb-4" onClick={() => navigate(-1)}>
          ◄ BACK TO GAZETTE
        </button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <RetroWindow
            title={post.isDecree
              ? `⚜ ROYAL DECREE — FULL PROCLAMATION`
              : `📜 POST DETAIL — ${user.name.toUpperCase()}`
            }
            className={post.isDecree ? "gold-glow" : ""}
          >
            {/* User Header */}
            <div
              className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80"
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              <div className="w-14 h-14 pixel-border overflow-hidden">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-xs text-primary text-glow">{user.name}</span>
                  {user.isVerified && <span>👑</span>}
                </div>
                <p className="font-terminal text-sm text-muted-foreground">{user.title} of {user.kingdom}</p>
                <p className="font-terminal text-xs text-muted-foreground">{user.coatOfArms} {user.kingdom}</p>
              </div>
            </div>

            {/* Full Image */}
            <div className="pixel-border overflow-hidden mb-4">
              <img src={post.image} alt="Royal post" className="w-full object-cover" />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-border">
              <WaxSeal count={post.seals} sealed={post.hasUserSealed} onToggle={handleSealToggle} />
              <span className="font-terminal text-sm text-muted-foreground">
                {post.endorsements.length} Endorsements
              </span>
            </div>

            {/* Formal Caption */}
            <div className="bg-muted p-3 border border-border mb-4">
              <p className="font-pixel text-[8px] text-decree-gold mb-2">OFFICIAL CAPTION:</p>
              <p className="font-terminal text-base text-foreground leading-relaxed">{post.formalCaption}</p>
            </div>

            {/* Timestamp */}
            <p className="font-terminal text-xs text-muted-foreground mb-4">
              📅 Filed: {post.timestamp}
            </p>

            {/* Endorsements Section */}
            <div className="border-t-2 border-border pt-4">
              <div className="retro-title-bar mb-3">
                📝 ROYAL ENDORSEMENTS ({post.endorsements.length})
              </div>

              {post.endorsements.length === 0 && (
                <p className="font-terminal text-sm text-muted-foreground text-center py-4">
                  No endorsements have been issued for this proclamation.
                </p>
              )}

              <div className="space-y-2">
                {post.endorsements.map((endorsement, i) => (
                  <motion.div
                    key={endorsement.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-2 bg-muted border border-border"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="font-pixel text-[8px] text-primary cursor-pointer hover:text-glow"
                        onClick={() => navigate(`/profile/${endorsement.userId}`)}
                      >
                        {endorsement.userName}
                      </span>
                      <span className="font-terminal text-[11px] text-muted-foreground">{endorsement.timestamp}</span>
                    </div>
                    <p className="font-terminal text-sm text-foreground">{endorsement.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* Add Endorsement */}
              <div className="mt-4 p-3 border border-border bg-muted">
                <p className="font-pixel text-[8px] text-primary mb-2">ISSUE AN ENDORSEMENT:</p>
                <textarea
                  value={endorsementText}
                  onChange={(e) => setEndorsementText(e.target.value)}
                  placeholder="Your Royal Endorsement (formal language required)..."
                  className="w-full bg-background border-2 border-border p-2 font-terminal text-sm text-foreground resize-none focus:outline-none focus:border-primary"
                  rows={3}
                />
                <button
                  className="retro-btn mt-2 text-[8px] w-full"
                  onClick={handleEndorsement}
                  disabled={!endorsementText.trim()}
                >
                  📜 SUBMIT ENDORSEMENT WITH ROYAL SEAL
                </button>
              </div>
            </div>
          </RetroWindow>
        </motion.div>
      </div>
    </div>
  );
};

export default PostDetail;
