
import React from 'react';
import { Profile, Tweet } from '../types';
import { Heart, Repeat2, MessageCircle, MoreHorizontal, ShieldCheck, Share, BarChart2, CheckCircle2, X as XIcon, Zap } from 'lucide-react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

interface TweetCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right') => void;
}

const SingleTweet: React.FC<{ tweet: Tweet; profile: Profile }> = ({ tweet, profile }) => (
  <div className="border-b border-[#2f3336] p-4 x-bg-hover cursor-default transition-colors">
    <div className="flex gap-3">
      <div className="flex-shrink-0">
        <img 
          src={profile.avatar} 
          className="w-10 h-10 rounded-full object-cover border border-[#2f3336]" 
          alt={`${profile.name} avatar`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 truncate">
            <span className="font-bold text-[15px] text-white hover:underline decoration-1">{profile.name}</span>
            <CheckCircle2 className="w-[18px] h-[18px] text-white fill-white shrink-0" />
            <span className="text-[#71767b] text-[15px] truncate">@{profile.handle} · {tweet.timestamp}</span>
          </div>
          <MoreHorizontal className="w-4 h-4 text-[#71767b]" />
        </div>
        <p className="mt-0.5 text-[15px] leading-normal text-[#e7e9ea] whitespace-pre-wrap">{tweet.content}</p>
        <div className="flex justify-between mt-3 text-[#71767b] max-w-[425px]">
          <div className="flex items-center gap-2 group cursor-pointer hover:text-[#1d9bf0]">
            <div className="p-2 rounded-full group-hover:bg-[#1d9bf01a] transition-colors">
              <MessageCircle className="w-[18px] h-[18px]" />
            </div>
            <span className="text-[13px]">12</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer hover:text-[#00ba7c]">
            <div className="p-2 rounded-full group-hover:bg-[#00ba7c1a] transition-colors">
              <Repeat2 className="w-[18px] h-[18px]" />
            </div>
            <span className="text-[13px]">{tweet.retweets}</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer hover:text-[#f91880]">
            <div className="p-2 rounded-full group-hover:bg-[#f918801a] transition-colors">
              <Heart className="w-[18px] h-[18px]" />
            </div>
            <span className="text-[13px]">{tweet.likes}</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer hover:text-[#1d9bf0]">
            <div className="p-2 rounded-full group-hover:bg-[#1d9bf01a] transition-colors">
              <BarChart2 className="w-[18px] h-[18px]" />
            </div>
            <span className="text-[13px]">8.4K</span>
          </div>
          <div className="p-2 rounded-full hover:bg-[#1d9bf01a] transition-colors cursor-pointer hover:text-[#1d9bf0]">
            <Share className="w-[18px] h-[18px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const TweetCard: React.FC<TweetCardProps> = ({ profile, onSwipe }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Indicators for Like/Nope while dragging
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto h-[680px]">
      <motion.div
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        whileHover={{ 
          scale: 1.03,
          boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.08)"
        }}
        whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute inset-0 z-20 cursor-grab touch-none"
      >
        <div className="w-full h-full bg-black border border-[#2f3336] rounded-none sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl relative transition-shadow duration-300">
          
          {/* Visual Indicators Overlay */}
          <motion.div 
            style={{ opacity: likeOpacity }}
            className="absolute top-24 right-8 z-30 border-4 border-[#00ba7c] text-[#00ba7c] px-4 py-2 rounded-lg font-black text-4xl rotate-12 pointer-events-none"
          >
            LIKE
          </motion.div>
          <motion.div 
            style={{ opacity: nopeOpacity }}
            className="absolute top-24 left-8 z-30 border-4 border-[#f91880] text-[#f91880] px-4 py-2 rounded-lg font-black text-4xl -rotate-12 pointer-events-none"
          >
            NOPE
          </motion.div>

          {/* Improved Semantic Bridge Badge */}
          {profile.matchReason && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              whileHover={{ backgroundColor: "rgba(29, 155, 240, 0.12)" }}
              className="px-4 py-3 bg-[#1d9bf00d] border-b border-[#2f3336] flex items-center justify-between cursor-help relative overflow-hidden group/reason transition-colors duration-300"
            >
              {/* Animated Scanning Line */}
              <motion.div 
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1d9bf022] to-transparent pointer-events-none"
              />

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#1d9bf0] shadow-[0_0_12px_#1d9bf0] relative z-10" />
                  <motion.div 
                    animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[#1d9bf0] rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-[#1d9bf0] uppercase tracking-[0.3em] font-mono leading-none">Resonance detected</span>
                  <span className="text-[7px] text-[#1d9bf0] opacity-40 uppercase tracking-[0.1em] mt-0.5">Global Graph Node #77</span>
                </div>
              </div>
              
              <motion.span 
                layout
                className="text-[12px] font-bold text-white tracking-tight relative z-10 text-right italic max-w-[65%] leading-snug group-hover/reason:text-[#1d9bf0] transition-colors duration-300"
              >
                "{profile.matchReason}"
              </motion.span>
            </motion.div>
          )}

          {/* Profile Header */}
          <div className="p-4 border-b border-[#2f3336] bg-black/90 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={profile.avatar} className="w-12 h-12 rounded-full object-cover border border-[#2f3336]" alt="header avatar" />
              <div className="flex-1 min-w-0">
                 <div className="flex items-center gap-1">
                    <h2 className="font-bold text-[17px] text-white leading-tight truncate">{profile.name}</h2>
                    <CheckCircle2 className="w-[18px] h-[18px] text-white fill-white shrink-0" />
                 </div>
                 <p className="text-[#71767b] text-[14px]">@{profile.handle}</p>
              </div>
            </div>
            <button className="bg-white text-black px-4 py-1.5 rounded-full font-bold text-sm hover:bg-[#e6e6e6] transition-all hover:scale-105 active:scale-95">
              View Profile
            </button>
          </div>

          {/* Tweets Feed */}
          <div className="flex-1 overflow-y-auto no-scrollbar bg-black pointer-events-auto">
            {profile.tweets.map((tweet) => (
              <SingleTweet key={tweet.id} tweet={tweet} profile={profile} />
            ))}
            {/* End of stream footer */}
            <div className="p-10 text-center bg-[#080808]">
               <div className="w-8 h-8 border-2 border-[#2f3336] border-t-white rounded-full animate-spin mx-auto mb-4 opacity-20" />
               <p className="text-[#71767b] text-[12px] font-bold uppercase tracking-widest">Decrypted Signal History</p>
            </div>
          </div>
          
          {/* Footer Info */}
          <div className="p-4 bg-black border-t border-[#2f3336] flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-[#222]" />
                  ))}
               </div>
               <span className="text-[#71767b] text-[11px] font-medium ml-1">Mutual connections</span>
            </div>
            <div className="flex gap-1.5">
              {profile.vibeTags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-[#16181c] border border-[#2f3336] text-[#71767b] rounded-full text-[10px] font-bold uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Background card for depth feel (visual only) */}
      <div className="absolute inset-0 transform translate-y-2 scale-[0.98] bg-zinc-900 border border-[#2f3336] rounded-none sm:rounded-2xl -z-10 opacity-50" />
    </div>
  );
};
