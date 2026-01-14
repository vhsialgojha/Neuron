
import React, { useState, useEffect, useCallback } from 'react';
import { MatchMode, Profile, UserVibe } from './types';
import { fetchMatches } from './services/ai';
import { TweetCard } from './components/TweetCard';
import { 
  Heart,
  Loader2,
  X as XIcon,
  Search,
  Check,
  ChevronRight,
  User,
  Zap,
  MoreHorizontal,
  Mail,
  Bell,
  Home,
  MessageCircle,
  Fingerprint,
  Cpu,
  CheckCircle2
} from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<'landing' | 'onboarding' | 'main'>('landing');
  const [mode, setMode] = useState<MatchMode>(MatchMode.DATE);
  const [vibe, setVibe] = useState<UserVibe>({
    keywords: "System architecture, hyper-growth startups, deep-learning research, p99 latency optimization",
    noPolitics: true,
    noNSFW: true
  });
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<Profile[]>([]);
  const [showMatches, setShowMatches] = useState(false);

  const loadProfiles = useCallback(async () => {
    setIsLoading(true);
    const newProfiles = await fetchMatches(vibe, mode);
    setProfiles(newProfiles);
    setCurrentIndex(0);
    setIsLoading(false);
  }, [vibe, mode]);

  useEffect(() => {
    if (step === 'main') {
      loadProfiles();
    }
  }, [step, mode]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      const currentProfile = profiles[currentIndex];
      if (currentProfile && !matches.find(m => m.id === currentProfile.id)) {
        setMatches(prev => [currentProfile, ...prev]);
      }
    }
    
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      loadProfiles();
    }
  };

  if (step === 'landing') {
    return (
      <div className="min-h-screen flex flex-col bg-black items-center justify-center p-8 selection:bg-white selection:text-black">
        <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mb-16 rotate-6 hover:rotate-0 transition-transform duration-500 shadow-[0_0_80px_rgba(255,255,255,0.15)]">
          <Cpu className="w-12 h-12 text-black fill-current" />
        </div>
        <h1 className="text-8xl sm:text-9xl font-black tracking-tighter mb-4 text-white">NEURON</h1>
        <p className="text-[#71767b] text-lg sm:text-xl font-medium mb-16 text-center max-w-sm leading-tight uppercase tracking-[0.25em]">
          Cognitive Chemistry <br/> at Scale.
        </p>
        <button 
          onClick={() => setStep('onboarding')}
          className="bg-white text-black px-20 py-6 rounded-full font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-xl group"
        >
          INITIATE <span className="inline-block group-hover:translate-x-2 transition-transform">→</span>
        </button>
      </div>
    );
  }

  if (step === 'onboarding') {
    return (
      <div className="min-h-screen bg-black flex flex-col p-8 max-w-xl mx-auto justify-center selection:bg-white selection:text-black">
        <div className="space-y-16 animate-slide-up">
          <div>
             <h2 className="text-6xl font-black text-white mb-4 tracking-tighter">SIGNAL INPUT.</h2>
             <p className="text-[#71767b] font-mono text-[10px] uppercase tracking-[0.4em]">Calibrating semantic resonance frequency...</p>
          </div>

          <div className="space-y-4">
            <textarea 
              value={vibe.keywords}
              onChange={(e) => setVibe(v => ({ ...v, keywords: e.target.value }))}
              className="w-full bg-black border-2 border-[#2f3336] rounded-3xl p-8 text-white font-mono text-sm focus:outline-none focus:border-white transition-all h-64 resize-none leading-relaxed"
              placeholder="e.g. Distributed systems, crypto-economics, minimalist UI, heavy lifting..."
            />
          </div>

          <div className="flex gap-4">
             <button 
               onClick={() => setVibe(v => ({...v, noPolitics: !v.noPolitics}))}
               className={`flex-1 py-5 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.15em] ${vibe.noPolitics ? 'bg-white text-black border-white' : 'bg-black text-[#71767b] border-[#2f3336]'}`}
             >
               {vibe.noPolitics && <Check className="w-4 h-4" />} Signal Lock
             </button>
             <button 
               onClick={() => setVibe(v => ({...v, noNSFW: !v.noNSFW}))}
               className={`flex-1 py-5 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.15em] ${vibe.noNSFW ? 'bg-white text-black border-white' : 'bg-black text-[#71767b] border-[#2f3336]'}`}
             >
               {vibe.noNSFW && <Check className="w-4 h-4" />} Zero Noise
             </button>
          </div>

          <button 
            onClick={() => setStep('main')}
            className="w-full bg-white text-black font-black py-6 rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all text-2xl flex items-center justify-center gap-3 group"
          >
            DECRYPT <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col overflow-hidden selection:bg-white selection:text-black">
      {/* Brutalist X Header */}
      <header className="px-6 py-4 border-b border-[#2f3336] flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-6">
           <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center hover:rotate-12 transition-transform cursor-pointer" onClick={() => setStep('landing')}>
             <Zap className="w-5 h-5 text-black fill-current" />
           </div>
           <div className="hidden md:flex bg-[#080808] rounded-full p-1 border border-[#2f3336]">
            {Object.values(MatchMode).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setCurrentIndex(0);
                }}
                className={`px-7 py-2 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all ${
                  mode === m 
                    ? 'bg-white text-black' 
                    : 'text-[#71767b] hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowMatches(!showMatches)}
            className="p-2 relative group"
          >
            <Mail className={`w-7 h-7 ${showMatches ? 'text-white' : 'text-[#71767b] group-hover:text-white'}`} />
            {matches.length > 0 && !showMatches && (
              <span className="absolute top-1.5 right-1.5 bg-white w-2 h-2 rounded-full ring-4 ring-black" />
            )}
          </button>
          <Bell className="w-7 h-7 text-[#71767b] hover:text-white cursor-pointer transition-colors" />
          <div className="w-10 h-10 rounded-full border-2 border-[#2f3336] p-0.5 cursor-pointer hover:border-white transition-colors">
             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </header>

      {/* Primary Stack */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-12 relative">
        {showMatches ? (
          <div className="w-full max-w-lg h-full flex flex-col animate-slide-up">
            <div className="flex items-center justify-between mb-10">
               <h2 className="text-5xl font-black text-white tracking-tighter">SYNAPSE.</h2>
               <div className="bg-white text-black px-4 py-1 font-black text-sm rounded-full">{matches.length}</div>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-24">
              {matches.length === 0 ? (
                <div className="text-center py-40 border-2 border-dashed border-[#2f3336] rounded-[2.5rem] bg-[#080808]/50">
                  <Fingerprint className="w-16 h-16 text-[#2f3336] mx-auto mb-6" />
                  <p className="text-[#71767b] font-black uppercase tracking-[0.3em] text-xs">Awaiting signal intersection...</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {matches.map((m, i) => (
                    <div key={i} className="group bg-[#0a0a0a] border border-[#2f3336] p-6 rounded-[2rem] flex items-center gap-6 hover:border-white transition-all cursor-pointer">
                      <div className="relative shrink-0">
                        <img 
                          src={m.avatar} 
                          className="w-20 h-20 rounded-2xl object-cover border border-[#2f3336] grayscale group-hover:grayscale-0 transition-all duration-700" 
                          alt={`${m.name} match avatar`} 
                        />
                        <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-white rounded-full flex items-center justify-center border-4 border-black">
                           <Zap className="w-3 h-3 text-black fill-current" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                           <h3 className="text-xl font-bold text-white truncate">{m.name}</h3>
                           <CheckCircle2 className="w-4 h-4 text-white fill-white shrink-0" />
                        </div>
                        <p className="text-[#71767b] text-sm font-mono tracking-tight">@{m.handle}</p>
                        <p className="mt-2 text-zinc-500 text-[11px] font-bold uppercase tracking-wider line-clamp-1 italic">{m.matchReason}</p>
                      </div>
                      <div className="w-12 h-12 bg-[#16181c] border border-[#2f3336] rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                         <ChevronRight className="w-6 h-6" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="fixed bottom-32 left-0 right-0 px-6 flex justify-center z-20 pointer-events-none">
              <button 
                onClick={() => setShowMatches(false)}
                className="pointer-events-auto px-12 py-5 bg-white text-black rounded-full font-black text-sm uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-2xl"
              >
                RETURN TO GRAPH
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            {isLoading ? (
              <div className="flex flex-col items-center gap-10 py-40">
                <div className="w-20 h-20 border-[6px] border-[#2f3336] border-t-white rounded-full animate-spin" />
                <div className="space-y-3 text-center">
                   <p className="text-white font-black uppercase text-xs tracking-[0.8em] animate-pulse">Syncing</p>
                   <p className="text-[#2f3336] font-mono text-[9px] uppercase tracking-widest">Global Graph Node #0x82A1</p>
                </div>
              </div>
            ) : profiles.length > 0 ? (
              <div className="w-full flex flex-col items-center">
                <div className="w-full max-w-lg relative group/card">
                  <TweetCard profile={profiles[currentIndex]} onSwipe={handleSwipe} />
                </div>
                
                {/* Brutalist X Controls */}
                <div className="flex gap-12 mt-12 pb-12">
                  <button 
                    onClick={() => handleSwipe('left')}
                    className="w-20 h-20 rounded-full bg-black border-2 border-[#2f3336] flex items-center justify-center hover:bg-[#ff00000a] hover:border-red-500 text-[#71767b] hover:text-red-500 transition-all active:scale-90 shadow-xl"
                  >
                    <XIcon className="w-8 h-8" />
                  </button>
                  <button 
                    onClick={() => handleSwipe('right')}
                    className="w-20 h-20 rounded-full bg-white flex items-center justify-center hover:scale-110 text-black transition-all active:scale-90 shadow-[0_0_60px_rgba(255,255,255,0.15)]"
                  >
                    <Heart className="w-8 h-8 fill-current" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-40">
                <Cpu className="w-20 h-20 text-[#1a1a1a] mx-auto mb-8 animate-pulse" />
                <p className="text-[#1a1a1a] font-black uppercase tracking-[0.6em] text-sm">Offline Session</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <footer className="px-12 py-8 flex items-center justify-center gap-16 sm:gap-24 border-t border-[#2f3336] bg-black z-50">
        <Home className="w-7 h-7 text-white cursor-pointer" />
        <Search className="w-7 h-7 text-[#71767b] hover:text-white cursor-pointer transition-colors" />
        <Zap className="w-7 h-7 text-[#71767b] hover:text-white cursor-pointer transition-colors" />
        <User className="w-7 h-7 text-[#71767b] hover:text-white cursor-pointer transition-colors" />
      </footer>
    </div>
  );
};

export default App;
