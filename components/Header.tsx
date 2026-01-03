
import React, { useState } from 'react';
import { Activity, Wallet, PlusCircle, User, Building2, Flame, Zap, ShieldCheck } from 'lucide-react';
import { connectCasperWallet } from '../services/casperService';

interface HeaderProps {
  onNavigate: (page: 'home' | 'create' | 'profile' | 'corporate') => void;
  activePage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activePage }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const address = await connectCasperWallet();
      setWalletAddress(address);
    } catch (e) {
      console.error("Wallet connection failed");
    } finally {
      setIsConnecting(false);
    }
  };

  const userLevel = 4;
  const userXp = 4200;
  const nextLevelXp = 5000;
  const xpPercent = (userXp / nextLevelXp) * 100;
  const streak = 12;
  const multiplier = 1.25;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="bg-sky-50 p-2 rounded-full group-hover:bg-sky-100 transition-colors">
                <Activity className="h-6 w-6 text-sky-600" />
            </div>
            <span className="ml-3 text-2xl font-bold text-slate-800 tracking-tight font-serif">Healing Humanity</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button onClick={() => onNavigate('home')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activePage === 'home' ? 'bg-sky-50 text-sky-700 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}>Explore Causes</button>
              <button onClick={() => onNavigate('create')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 ${activePage === 'create' ? 'bg-sky-50 text-sky-700 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}><PlusCircle className="w-4 h-4" /> Start Campaign</button>
              <button onClick={() => onNavigate('profile')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 ${activePage === 'profile' ? 'bg-sky-50 text-sky-700 shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}><User className="w-4 h-4" /> My Impact</button>
               <button onClick={() => onNavigate('corporate')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 ${activePage === 'corporate' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}><Building2 className="w-4 h-4" /> Corporate Portal</button>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden lg:flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full pl-3 pr-1 py-1 mr-2">
                <div className="flex items-center gap-1.5">
                   <div className="bg-sky-500 text-white text-[10px] font-bold px-1.5 rounded-md">LVL {userLevel}</div>
                   <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden relative">
                      <div className="h-full bg-gradient-to-r from-sky-400 to-indigo-500" style={{ width: `${xpPercent}%` }} />
                   </div>
                </div>
                <div className="flex items-center gap-1 px-2 border-l border-slate-200 text-amber-500 font-bold text-xs" title="Donation Streak"><Flame className="w-3.5 h-3.5 fill-current" /> {streak}</div>
                <div className="flex items-center gap-1 px-2 border-l border-slate-200 text-sky-600 font-bold text-xs" title="Transparency Multiplier"><ShieldCheck className="w-3.5 h-3.5" /> {multiplier}x</div>
             </div>

            <button 
              onClick={handleConnect}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-sky-200 hover:shadow-sky-300"
            >
              <Wallet className="w-4 h-4" />
              {isConnecting ? "Connecting..." : walletAddress ? `${walletAddress.substring(0, 6)}...` : "Connect CSPR"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
