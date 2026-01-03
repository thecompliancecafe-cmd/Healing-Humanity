
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ShieldCheck, Zap, Link as LinkIcon, ExternalLink, Settings, Wallet, ArrowRight, Gamepad2, Award } from 'lucide-react';
import { generateMockTransactions } from '../services/mockData.ts';
import GamificationHub from './GamificationHub';

interface UserProfileProps {
  user: UserProfile;
}

const UserProfileView: React.FC<UserProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'journey' | 'overview' | 'badges' | 'integrations'>('journey');
  const mockHistory = generateMockTransactions('user_history_1');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 animate-fade-in bg-slate-50 min-h-screen">
      
      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-8 mb-8 border-b border-slate-200 px-2 sticky top-20 bg-slate-50/95 backdrop-blur z-30 pt-4">
         <button 
           onClick={() => setActiveTab('journey')}
           className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'journey' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
         >
           <Gamepad2 className="w-4 h-4" />
           Guardian Journey
         </button>
         <button 
           onClick={() => setActiveTab('badges')}
           className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'badges' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
         >
           <Award className="w-4 h-4" />
           NFT Badges
         </button>
         <button 
           onClick={() => setActiveTab('overview')}
           className={`pb-4 text-sm font-bold transition-all ${activeTab === 'overview' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
         >
           Donation History
         </button>
         <button 
           onClick={() => setActiveTab('integrations')}
           className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'integrations' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
         >
           <Zap className="w-4 h-4" />
           Apps
         </button>
      </div>

      {activeTab === 'journey' && (
        <GamificationHub user={user} />
      )}

      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {user.unlockedBadges.map((badge) => (
             <div key={badge.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/30 flex flex-col items-center text-center hover:scale-105 transition-transform cursor-pointer group">
                <div className={`w-24 h-24 rounded-full p-1 mb-4 border-4 ${
                   badge.rarity === 'Legendary' ? 'border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.5)] bg-gradient-to-br from-amber-100 to-amber-50' :
                   badge.rarity === 'Epic' ? 'border-purple-400 shadow-[0_0_15px_rgba(192,132,252,0.5)] bg-gradient-to-br from-purple-100 to-purple-50' :
                   badge.rarity === 'Rare' ? 'border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.5)] bg-gradient-to-br from-sky-100 to-sky-50' :
                   'border-slate-300 bg-slate-50'
                }`}>
                   <img src={badge.imageUrl} alt={badge.name} className="w-full h-full rounded-full" />
                </div>
                <h3 className="font-bold text-slate-800 font-serif text-lg">{badge.name}</h3>
                <span className={`text-[10px] uppercase tracking-wider font-bold mb-2 px-2 py-0.5 rounded-full ${
                    badge.rarity === 'Legendary' ? 'bg-amber-100 text-amber-700' :
                    badge.rarity === 'Epic' ? 'bg-purple-100 text-purple-700' :
                    badge.rarity === 'Rare' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-500'
                }`}>{badge.rarity}</span>
                <p className="text-sm text-slate-500 mb-3">{badge.description}</p>
                <div className="mt-auto text-xs text-slate-400">Unlocked: {new Date(badge.unlockedAt || '').toLocaleDateString()}</div>
             </div>
           ))}
           {/* Locked Badge Placeholder */}
           <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-60 grayscale">
               <div className="w-24 h-24 rounded-full bg-slate-200 mb-4 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-slate-400" />
               </div>
               <h3 className="font-bold text-slate-600 font-serif">???</h3>
               <p className="text-sm text-slate-400 mt-2">Keep donating to reveal more collectibles.</p>
           </div>
        </div>
      )}

      {activeTab === 'overview' && (
         <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-lg shadow-slate-200/30">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-100">
                    <tr>
                        <th className="px-8 py-5 font-bold tracking-wider">Event</th>
                        <th className="px-8 py-5 font-bold tracking-wider">Amount</th>
                        <th className="px-8 py-5 font-bold tracking-wider">Date</th>
                        <th className="px-8 py-5 font-bold tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {mockHistory.map((tx, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-8 py-5 text-slate-700 font-medium">Donation to Campaign #{100 + i}</td>
                            <td className="px-8 py-5 font-mono text-sky-600 font-bold">{tx.amount} ETH</td>
                            <td className="px-8 py-5 text-slate-500">{new Date(tx.timestamp).toLocaleDateString()}</td>
                            <td className="px-8 py-5">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    Verified
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
         </div>
      )}

      {activeTab === 'integrations' && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {user.connectedExchanges.map((exchange) => (
                <div key={exchange.id} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-sky-200 transition-all group shadow-md shadow-slate-200/30 hover:shadow-xl hover:shadow-sky-100">
                   <div className="flex justify-between items-start mb-5">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold shadow-sm ${
                          exchange.id === 'kucoin' ? 'bg-emerald-500 text-white' : 
                          exchange.id === 'coinbase' ? 'bg-blue-600 text-white' : 
                          exchange.id === 'binance' ? 'bg-yellow-500 text-black' : 'bg-orange-500 text-white'
                      }`}>
                          {exchange.icon}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          exchange.status === 'Connected' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500'
                      }`}>
                          {exchange.status}
                      </div>
                   </div>
                   <h3 className="text-lg font-bold text-slate-900 mb-1 font-serif">{exchange.name}</h3>
                   <p className="text-sm text-slate-500 mb-6 h-10">
                       {exchange.status === 'Connected' 
                         ? `Last synced: ${exchange.lastSynced}` 
                         : 'Connect to sync donations and pay directly.'}
                   </p>
                   
                   <button className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                       exchange.status === 'Connected' 
                       ? 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200' 
                       : 'bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-200'
                   }`}>
                       {exchange.status === 'Connected' ? (
                           <>
                             <Settings className="w-4 h-4" /> Manage
                           </>
                       ) : (
                           <>
                             <LinkIcon className="w-4 h-4" /> Connect App
                           </>
                       )}
                   </button>
                </div>
            ))}
            
            {/* Add New Integration Placeholder */}
            <div className="bg-slate-50 rounded-2xl p-6 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:text-sky-600 hover:border-sky-300 hover:bg-sky-50/50 transition-all cursor-pointer min-h-[220px]">
                <div className="bg-white p-4 rounded-full mb-3 shadow-sm">
                   <ExternalLink className="w-6 h-6" />
                </div>
                <span className="font-bold">Browse App Directory</span>
            </div>
         </div>
      )}
    </div>
  );
};

export default UserProfileView;
