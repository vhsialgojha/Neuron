
import React from 'react';
import { Profile, Tweet } from '../types';
import { Heart, Repeat2, MessageCircle, MoreHorizontal, ShieldCheck, Share, BarChart2, CheckCircle2 } from 'lucide-react';

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

export const TweetCard: React.FC<TweetCardProps> = ({ profile }) => {
  return (
    <div className="w-full max-w-lg mx-auto bg-black border border-[#2f3336] rounded-none sm:rounded-2xl overflow-hidden h-[680px] flex flex-col relative animate-slide-up shadow-2xl">
      {/* Semantic Bridge Badge */}
      {profile.matchReason && (
        <div className="px-4 py-2 bg-[#1d9bf01a] border-b border-[#2f3336] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1d9bf0] animate-pulse shadow-[0_0_8px_#1d9bf0]" />
            <span className="text-[10px] font-black text-[#1d9bf0] uppercase tracking-[0.2em]">Neural Match</span>
          </div>
          <span className="text-[11px] font-bold text-white tracking-tight">{profile.matchReason}</span>
        </div>
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
        <button className="bg-white text-black px-4 py-1.5 rounded-full font-bold text-sm hover:bg-[#e6e6e6] transition-colors">
          View Profile
        </button>
      </div>

      {/* Tweets Feed */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-black">
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
           <span className="text-[#71767b] text-[11px] font-medium ml-1">Mutual connections detected</span>
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
  );
};
