
import React, { useState } from 'react';
import { UserProfile, Quest } from '../types';
import { MOCK_TEAMS, MOCK_GEO_RANKINGS, MOCK_CHALLENGES } from '../services/mockData.ts';
import { Map as MapIcon, Zap, Award, Flame, Lock, CheckCircle2, Trophy, ArrowUpRight, Users, Globe, Box, Target, TrendingUp, Sparkles, Navigation, ShieldCheck, Coins, ShieldAlert } from 'lucide-react';

interface GamificationHubProps {
  user: UserProfile;
}

const GamificationHub: React.FC<GamificationHubProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'map' | 'quests' | 'clans' | 'social'>('map');
  const [showMysteryBox, setShowMysteryBox] = useState(false);
  const xpPercentage = (user.levelInfo.currentXp / user.levelInfo.nextLevelXp) * 100;

  // RPG Map Milestones
  const MAP_POINTS = [
    { id: 1, x: '15%', y: '85%', title: 'Village Meal', desc: '1 child gets a meal', status: 'COMPLETED', icon: '🍲' },
    { id: 2, x: '35%', y: '65%', title: 'Classroom Kit', desc: 'Books for a class', status: 'COMPLETED', icon: '📚' },
    { id: 3, x: '55%', y: '50%', title: 'Clean Well', desc: 'A village gets water', status: 'ACTIVE', icon: '🚰' },
    { id: 4, x: '75%', y: '30%', title: 'Clinic Base', desc: 'Hospital equipment', status: 'LOCKED', icon: '🏥' },
    { id: 5, x: '90%', y: '15%', title: 'Guardian Peak', desc: 'National impact', status: 'LOCKED', icon: '👑' }
  ];

  const getAvatarTypeIcon = (type: string) => {
    switch(type) {
      case 'Scholar': return '🎓';
      case 'Guardian': return '🛡️';
      case 'Provider': return '🍞';
      case 'Protector': return '🐆';
      default: return '👶';
    }
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* 1. Hero Progression Status */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-full blur-3xl -z-0 translate-x-1/3 -translate-y-1/3" />
         
         <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
            {/* Avatar Visualization with Evolution */}
            <div className="relative group">
               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-sky-300 via-indigo-300 to-emerald-300 shadow-lg relative overflow-hidden">
                  <img src={user.avatarUrl} alt="Avatar" className="w-full h-full rounded-full bg-white object-cover border-4 border-white" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm rounded-full">
                     <span className="text-4xl">{getAvatarTypeIcon(user.avatarType)}</span>
                  </div>
               </div>
               <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md border-2 border-white flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" />
                  Level {user.levelInfo.currentLevel}
               </div>
               <div className="absolute -top-4 -left-4 bg-white p-2 rounded-xl shadow-lg border border-slate-100 w-32 text-center text-[10px] text-slate-500 font-bold flex flex-col items-center">
                  <span className="text-xs text-sky-600">Evolution Path:</span>
                  <span className="text-slate-900 font-black">{user.avatarType}</span>
               </div>
            </div>

            {/* Stats & Progress */}
            <div className="flex-grow text-center lg:text-left">
               <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-slate-900 font-serif flex items-center gap-2">
                     {user.levelInfo.title} <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                  </h2>
                  <div className="flex gap-2">
                    <span className="bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-100 flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-current" /> {user.streakDays} Day Streak
                    </span>
                    <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-100 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> {user.trustMultiplier}x Trust Boost
                    </span>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                        <Coins className="w-3 h-3" /> +15% Yield Bonus
                    </span>
                  </div>
               </div>
               <p className="text-slate-500 mb-6">Your **Consensus Keeper** streak has activated a Simulated Casper Yield bonus of 15% on XP gains.</p>
               
               <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden shadow-inner relative">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 relative transition-all duration-1000"
                    style={{ width: `${xpPercentage}%` }}
                  >
                     <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                  </div>
               </div>
               <div className="flex justify-between text-[10px] font-bold mt-2 text-slate-400 uppercase tracking-widest">
                  <span>{user.levelInfo.currentXp} / {user.levelInfo.nextLevelXp} XP</span>
                  <span>National Rank: #124</span>
               </div>
            </div>

            {/* Mystery Box Interaction */}
            <div 
              onClick={() => setShowMysteryBox(true)}
              className="bg-slate-900 text-white p-5 rounded-2xl min-w-[200px] shadow-xl text-center cursor-pointer hover:scale-105 active:scale-95 transition-all group relative border border-slate-700"
            >
               {user.levelInfo.currentLevel >= 5 && <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">1</div>}
               <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl group-hover:rotate-12 transition-transform">
                  <Box className="w-6 h-6 text-sky-400" />
               </div>
               <div className="text-xs font-bold text-slate-400 uppercase mb-1 tracking-tighter">Guardian Mystery Box</div>
               <div className="font-bold text-xs">
                 {user.levelInfo.currentLevel >= 5 ? 'CLAIM HYPERCERT' : `Unlock at LVL 5`}
               </div>
            </div>
         </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex bg-white rounded-2xl p-1 border border-slate-200 shadow-sm max-w-2xl mx-auto">
         {[
           { id: 'map', icon: MapIcon, label: 'Impact Map' },
           { id: 'quests', icon: Target, label: 'Quests' },
           { id: 'clans', icon: Users, label: 'Clan Wars' },
           { id: 'social', icon: Globe, label: 'Leaderboards' }
         ].map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
               activeTab === tab.id ? 'bg-sky-50 text-sky-600 shadow-sm' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
             }`}
           >
             <tab.icon className="w-4 h-4" />
             <span className="hidden sm:inline">{tab.label}</span>
           </button>
         ))}
      </div>

      <div className="animate-fade-in">
        
        {/* 1. RPG WORLD MAP VIEW */}
        {activeTab === 'map' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg min-h-[500px] relative overflow-hidden group">
             {/* Map Background Pattern */}
             <div className="absolute inset-0 bg-slate-50 opacity-50" style={{ 
               backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} />
             
             <div className="relative z-10 flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 font-serif">
                   <Navigation className="w-5 h-5 text-sky-500" /> Impact Journey: World Map
                </h3>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                   Act I: The Village Roots
                </div>
             </div>

             <div className="relative h-[450px] z-10">
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                   <path d="M 15% 85% L 35% 65% L 55% 50% L 75% 30% L 90% 15%" fill="none" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" strokeDasharray="12 12" />
                   <path 
                     d="M 15% 85% L 35% 65% L 55% 50%" 
                     fill="none" 
                     stroke="#0ea5e9" 
                     strokeWidth="6" 
                     strokeLinecap="round"
                     className="animate-[dash_3s_linear_infinite]"
                     style={{ strokeDasharray: '20, 10' }}
                   />
                </svg>

                {MAP_POINTS.map(point => (
                  <div 
                    key={point.id} 
                    className="absolute transition-transform hover:scale-110 cursor-help group/point"
                    style={{ left: point.x, top: point.y, transform: 'translate(-50%, -50%)' }}
                  >
                     <div className={`w-14 h-14 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-xl transition-all duration-500 ${
                       point.status === 'COMPLETED' ? 'bg-emerald-500 text-white ring-4 ring-emerald-50' :
                       point.status === 'ACTIVE' ? 'bg-sky-500 text-white animate-pulse ring-8 ring-sky-100' : 'bg-slate-200 text-slate-400'
                     }`}>
                        {point.status === 'COMPLETED' ? <CheckCircle2 className="w-7 h-7" /> : point.icon}
                     </div>
                     <div className="absolute top-16 left-1/2 -translate-x-1/2 w-40 text-center opacity-80 group-hover/point:opacity-100 transition-opacity">
                        <div className="text-xs font-black text-slate-900 leading-tight uppercase tracking-tighter">{point.title}</div>
                        <div className="text-[10px] text-slate-500 font-medium">{point.desc}</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* 2. QUESTS VIEW */}
        {activeTab === 'quests' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.activeQuests.map(quest => (
              <div key={quest.id} className={`bg-white p-6 rounded-3xl border transition-all hover:shadow-xl group ${
                quest.status === 'COMPLETED' ? 'border-emerald-100 bg-emerald-50/20' : 'border-slate-100 shadow-md'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:rotate-6 transition-transform">
                      {quest.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{quest.title}</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{quest.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sky-600 font-black text-sm">+{quest.xpReward} XP</div>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mt-6 relative shadow-inner">
                  <div 
                    className={`h-full relative ${quest.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-sky-500'}`} 
                    style={{ width: `${(quest.progress / quest.totalRequired) * 100}%` }} 
                  >
                     <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-black uppercase tracking-widest">
                  <span>In Progress</span>
                  <span>{quest.progress} / {quest.totalRequired}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. CLANS VIEW */}
        {activeTab === 'clans' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center px-2">
                   <h3 className="font-bold text-slate-800 flex items-center gap-2"><Users className="w-5 h-5 text-indigo-500" /> Your Active Clan</h3>
                </div>
                {user.team && (
                   <div className="bg-white p-10 rounded-3xl border border-indigo-100 shadow-2xl shadow-indigo-100/30 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform"><Users className="w-48 h-48" /></div>
                      <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-3xl flex items-center justify-center text-5xl shadow-xl shadow-indigo-200 ring-8 ring-indigo-50">
                        {user.team.avatar}
                      </div>
                      <div className="flex-grow text-center md:text-left">
                         <h4 className="text-3xl font-bold text-slate-900 font-serif mb-2">{user.team.name}</h4>
                         <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 text-sm font-bold text-slate-500">
                            <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-sky-500" /> {user.team.memberCount} Guardians</span>
                            <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-amber-500" /> Rank #{user.team.rank}</span>
                            <span className="flex items-center gap-1.5"><Coins className="w-4 h-4 text-emerald-500" /> +20% Yield Bonus</span>
                         </div>
                      </div>
                      <div className="text-center md:text-right bg-slate-50 p-6 rounded-2xl border border-slate-100">
                         <div className="text-4xl font-black text-indigo-600">{(user.team.totalImpactXp / 1000).toFixed(1)}k</div>
                         <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Total Clan XP</div>
                      </div>
                   </div>
                )}
             </div>
             
             <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/20">
                <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2 font-serif"><TrendingUp className="w-5 h-5 text-emerald-500" /> Global Standings</h3>
                <div className="space-y-8">
                   {MOCK_TEAMS.map(team => (
                      <div key={team.id} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
                         <div className="flex items-center gap-5">
                            <span className={`text-sm font-black w-6 text-center ${team.rank === 1 ? 'text-amber-500 scale-125' : 'text-slate-300'}`}>#{team.rank}</span>
                            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl shadow-inner group-hover:bg-sky-50 transition-colors">{team.avatar}</div>
                            <div>
                               <div className="text-sm font-black text-slate-800 group-hover:text-sky-600 transition-colors">{team.name}</div>
                               <div className="text-[10px] text-slate-400 font-bold">{team.memberCount} active</div>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* 4. SOCIAL & GEO VIEW */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
             <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/20">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="font-bold text-slate-800 flex items-center gap-2 font-serif"><Globe className="w-6 h-6 text-indigo-500" /> Geo-Impact Ranking</h3>
                </div>
                <div className="space-y-6">
                   {MOCK_GEO_RANKINGS.map(geo => (
                      <div key={geo.city} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                         <div className="flex items-center gap-5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                               geo.rank === 1 ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'
                            }`}>
                               {geo.rank}
                            </div>
                            <div>
                               <div className="text-base font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{geo.city}</div>
                               <div className="text-[11px] text-slate-500 font-bold">{geo.donors.toLocaleString()} Guardians</div>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/40">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="font-bold text-slate-800 flex items-center gap-2 font-serif"><Target className="w-6 h-6 text-red-500" /> Quadratic Challenges</h3>
                </div>
                <div className="space-y-8">
                   {MOCK_CHALLENGES.map(sc => (
                      <div key={sc.id} className="relative group">
                         <div className="absolute -top-3 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg z-20">
                            <ShieldAlert className="w-3 h-3 fill-current" /> QUADRATIC MATCH ACTIVE
                         </div>
                         <div className="bg-white border-2 border-slate-100 p-8 rounded-3xl group-hover:border-red-200 transition-all shadow-md relative overflow-hidden">
                            <h4 className="text-xl font-bold text-slate-900 mb-2 font-serif">{sc.title}</h4>
                            <p className="text-[10px] text-slate-400 font-black uppercase mb-4 tracking-tighter">Your small gift is amplified by a factor of {sc.multiplier}x from the Casper Treasury.</p>
                            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden mb-3 shadow-inner relative">
                               <div className="h-full bg-gradient-to-r from-red-500 to-orange-500" style={{ width: `${(sc.currentAmount / sc.targetAmount) * 100}%` }} />
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        )}

      </div>

      {/* Mystery Box Modal */}
      {showMysteryBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 max-w-sm w-full text-center shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-indigo-500/20 pointer-events-none" />
              <div className="text-7xl mb-8 animate-[bounce_2s_infinite]">🎁</div>
              <h3 className="text-3xl font-bold text-white mb-3 font-serif tracking-tight">Guardian Hypercert</h3>
              {user.levelInfo.currentLevel >= 5 ? (
                <>
                  <p className="text-slate-400 text-sm mb-10 leading-relaxed">Claim your elite proof-of-impact. This hypercert is minted directly on the Casper Ledger.</p>
                  <button className="w-full bg-emerald-600 py-5 rounded-2xl font-black text-white shadow-xl shadow-emerald-900 uppercase tracking-widest hover:bg-emerald-500 transition-colors">Mint Hypercert</button>
                </>
              ) : (
                <>
                  <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">Reach Level 5 to unlock outcome-based hypercerts.</p>
                  <button onClick={() => setShowMysteryBox(false)} className="w-full border border-slate-700 py-4 rounded-xl font-black text-slate-300 hover:bg-slate-800 transition-colors uppercase tracking-widest text-xs">Return</button>
                </>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default GamificationHub;
