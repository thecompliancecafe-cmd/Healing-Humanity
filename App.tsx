
import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import CampaignCard from './components/CampaignCard';
import TransparencyDashboard from './components/TransparencyDashboard';
import CreateCampaignForm from './components/CreateCampaignForm';
import UserProfileView from './components/UserProfile';
import CorporateDashboard from './components/CorporateDashboard';
import { MOCK_CAMPAIGNS, EXTERNAL_CAMPAIGNS, MOCK_USER } from './services/mockData.ts';
import { Campaign } from './types';
import { Server, Shield, Code, Cpu, RefreshCw, Plus, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'details' | 'create' | 'profile' | 'corporate'>('home');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [externalLoaded, setExternalLoaded] = useState(false);

  const handleCampaignSelect = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setView('details');
    window.scrollTo(0, 0);
  };

  const handleNavigateHome = () => {
    setView('home');
    setSelectedCampaign(null);
  };

  const handleNavigateCreate = () => {
    setView('create');
    setSelectedCampaign(null);
  };

  const handleNavigateProfile = () => {
    setView('profile');
    setSelectedCampaign(null);
  };
  
  const handleNavigateCorporate = () => {
    setView('corporate');
    setSelectedCampaign(null);
  };

  const handleLoadExternal = () => {
    setExternalLoaded(true);
    // Simulate API delay
    setTimeout(() => {
      setCampaigns(prev => [...prev, ...EXTERNAL_CAMPAIGNS]);
    }, 800);
  };

  const handleCreateCampaign = (data: any) => {
    const newCampaign: Campaign = {
        id: `c_user_${Date.now()}`,
        title: data.title,
        description: data.description,
        category: data.category,
        targetAmount: data.targetAmount,
        raisedAmount: 0,
        walletAddress: data.walletAddress,
        imageUrl: data.imageUrl || 'https://picsum.photos/800/408',
        platformFeePercentage: data.platformFeePercentage,
        source: 'Native',
        tScore: 85, // New campaigns start with a base score
        impactEvidence: [],
        spendingHistory: []
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    setView('home');
    alert("Campaign Created Successfully! It is now live on the platform.");
  };

  // If in Corporate View, hide standard Header/Layout
  if (view === 'corporate') {
      return (
          <Router>
              <CorporateDashboard onBack={handleNavigateHome} />
          </Router>
      )
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-sky-200 selection:text-sky-900">
        <Header 
            onNavigate={(page) => {
                if (page === 'create') handleNavigateCreate();
                else if (page === 'profile') handleNavigateProfile();
                else if (page === 'corporate') handleNavigateCorporate();
                else handleNavigateHome();
            }} 
            activePage={view} 
        />
        
        <main className="relative overflow-hidden">
          {/* Background Effects - Clean Sky Blue Gradient */}
          <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-sky-100/50 to-transparent -z-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-200/30 rounded-full blur-[100px] -z-10" />
          <div className="absolute top-48 -left-24 w-72 h-72 bg-indigo-200/30 rounded-full blur-[80px] -z-10" />
          
          {view === 'home' && (
            <div className="pb-20 animate-fade-in">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
                <div className="text-center mb-20">
                  <span className="inline-block py-1 px-3 rounded-full bg-sky-50 text-sky-600 text-xs font-bold tracking-widest uppercase mb-4 border border-sky-100 shadow-sm">
                    Verified Blockchain Philanthropy
                  </span>
                  <h1 className="text-5xl sm:text-7xl font-bold text-slate-900 mb-8 tracking-tight font-serif leading-tight">
                    Healing Humanity <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 italic">With Clarity</span>
                  </h1>
                  <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
                    The first donation platform where every cent is tracked by automated nodes and verified by AI auditors for absolute peace of mind.
                  </p>
                  
                  <div className="mt-10 flex justify-center gap-5">
                     <button 
                       onClick={handleNavigateCreate}
                       className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2 shadow-xl shadow-sky-200 hover:shadow-sky-300 hover:-translate-y-1"
                     >
                       <Plus className="w-5 h-5" />
                       Start a Campaign
                     </button>
                     <button 
                       onClick={() => document.getElementById('campaigns-list')?.scrollIntoView({ behavior: 'smooth' })}
                       className="bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-full font-bold transition-all border border-slate-200 shadow-lg shadow-slate-200/50 hover:shadow-xl"
                     >
                       View Causes
                     </button>
                  </div>
                </div>

                {/* Stats Ticker */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                  <div className="text-center border-r border-slate-100 last:border-0">
                    <div className="text-4xl font-bold text-slate-800 font-serif">100%</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mt-2 font-semibold">Traceability</div>
                  </div>
                  <div className="text-center border-r border-slate-100 last:border-0">
                    <div className="text-4xl font-bold text-sky-600 font-serif">${(2.4 + (campaigns.length * 0.1)).toFixed(1)}M</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mt-2 font-semibold">Verified Volume</div>
                  </div>
                  <div className="text-center border-r border-slate-100 last:border-0">
                    <div className="text-4xl font-bold text-slate-800 font-serif">{5200 + campaigns.length * 15}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mt-2 font-semibold">Donors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-500 font-serif">0</div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mt-2 font-semibold">Hidden Fees</div>
                  </div>
                </div>
              </div>

              {/* Fee Structure Section */}
              <div className="bg-white border-y border-slate-100 py-20 mb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 font-serif">Transparent Platform Fees</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                      We charge a minimal fee (1.5% - 2.5%) to sustain the decentralized infrastructure. 
                      Here is exactly how your contribution protects the ecosystem.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-10">
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-sky-200 transition-colors group">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-sky-500 shadow-md group-hover:scale-110 transition-transform">
                        <Server className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-3 font-serif">Node Operations (40%)</h3>
                      <p className="text-slate-500 leading-relaxed">
                        Powers the automated validation nodes that trigger fund release only when verified urgency signals are detected on-chain.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-indigo-200 transition-colors group">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-indigo-500 shadow-md group-hover:scale-110 transition-transform">
                        <Cpu className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-3 font-serif">AI Auditing (30%)</h3>
                      <p className="text-slate-500 leading-relaxed">
                        Funds the computational costs for Gemini AI agents that scan receipts and generate risk analysis reports in real-time.
                      </p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-amber-200 transition-colors group">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 text-amber-500 shadow-md group-hover:scale-110 transition-transform">
                        <Shield className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-3 font-serif">Security & Dev (30%)</h3>
                      <p className="text-slate-500 leading-relaxed">
                        Supports ongoing smart contract audits and platform development to ensure maximum security for your donations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="campaigns-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                  <div className="flex items-center gap-4">
                      <h2 className="text-3xl font-bold text-slate-900 font-serif">Active Campaigns</h2>
                      <span className="bg-sky-100 text-sky-700 text-sm font-bold px-3 py-1 rounded-full">{campaigns.length}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    {!externalLoaded && (
                        <button 
                            onClick={handleLoadExternal}
                            className="text-sm px-5 py-2.5 rounded-full border border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-2 font-medium bg-white"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Sync External (Giving Block)
                        </button>
                    )}

                    <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-full shadow-sm">
                      {['All', 'Medical', 'Environment', 'Tech'].map((filter) => (
                        <button key={filter} className="text-sm px-4 py-1.5 rounded-full text-slate-500 hover:bg-sky-50 hover:text-sky-600 transition-colors font-medium">
                          {filter}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {campaigns.map((campaign) => (
                    <CampaignCard 
                      key={campaign.id} 
                      campaign={campaign} 
                      onSelect={handleCampaignSelect} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === 'details' && selectedCampaign && (
            <TransparencyDashboard 
              campaign={selectedCampaign} 
              onBack={handleNavigateHome} 
            />
          )}

          {view === 'create' && (
            <CreateCampaignForm 
                onSubmit={handleCreateCampaign}
                onCancel={handleNavigateHome}
            />
          )}

          {view === 'profile' && (
            <UserProfileView user={MOCK_USER} />
          )}
        </main>

        <footer className="bg-white border-t border-slate-200 py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-sky-500 fill-current" />
                <span className="font-serif text-xl font-bold text-slate-800">Healing Humanity</span>
             </div>
             <p className="text-slate-400 text-sm">© 2024 Healing Humanity Decentralized Platform. Powered by Gemini AI & Simulated Ethereum Nodes.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
