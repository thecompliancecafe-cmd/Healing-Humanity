
import React, { useState, useEffect } from 'react';
import { Campaign, Transaction, AuditReport, ImpactEvidence } from '../types';
import { generateMockTransactions, MOCK_CHAIN_REACTIONS } from '../services/mockData.ts';
import { generateAuditReport, generateImpactInsight } from '../services/geminiService.ts';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowLeft, RefreshCcw, ExternalLink, Lock, AlertCircle, Cpu, CheckCircle2, Info, Server, Shield, Code, CreditCard, Sliders, Camera, MapPin, Receipt, ShieldCheck, History, Clock, Wallet, TrendingUp, Zap, Sparkles, Navigation, Award, EyeOff, ShieldAlert } from 'lucide-react';

interface TransparencyDashboardProps {
  campaign: Campaign;
  onBack: () => void;
}

const COLORS = ['#0ea5e9', '#6366f1', '#f59e0b', '#ef4444'];

const TransparencyDashboard: React.FC<TransparencyDashboardProps> = ({ campaign, onBack }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [loadingAudit, setLoadingAudit] = useState(false);
  const [aiImpact, setAiImpact] = useState<string>('');
  const [donateAmount, setDonateAmount] = useState<string>('');
  const [isDonating, setIsDonating] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'kucoin' | 'coinbase'>('wallet');
  
  const [smartSplit, setSmartSplit] = useState(10);
  const [activeTab, setActiveTab] = useState<'ledger' | 'impact'>('ledger');
  const [showHypercert, setShowHypercert] = useState(false);
  const [privacyEnabled, setPrivacyEnabled] = useState(true);
  const [triggerChain, setTriggerChain] = useState(false);

  // Transparency Multiplier logic
  const trustMultiplier = campaign.tScore >= 95 ? 2.0 : campaign.tScore >= 90 ? 1.5 : 1.0;

  // Impact Time Machine state
  const [timeStep, setTimeStep] = useState(0); 
  const TIME_STEPS = [
    { label: 'Donation', desc: 'Immutable Record', icon: CreditCard },
    { label: 'Escrow', desc: 'Smart Contract Lock', icon: Lock },
    { label: 'Validation', desc: 'AI Proof Check', icon: ShieldCheck },
    { label: 'Impact', desc: 'Direct Field Delivery', icon: CheckCircle2 }
  ];

  const spendingData = campaign.spendingHistory.map(item => ({
    name: item.description,
    value: item.amount,
    category: item.category
  }));

  const categoryDataMap = spendingData.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.value;
    return acc;
  }, {} as Record<string, number>);
  
  const pieData = Object.keys(categoryDataMap).map(key => ({
    name: key,
    value: categoryDataMap[key]
  }));

  useEffect(() => {
    setTransactions(generateMockTransactions(campaign.id));
    generateImpactInsight(campaign.title).then(setAiImpact);
  }, [campaign]);

  const handleRunAudit = async () => {
    setLoadingAudit(true);
    const report = await generateAuditReport(campaign);
    // Simulate Casper Attestation Hash
    if (report) {
      report.attestationId = `csp_att_${Math.random().toString(16).substr(2, 32)}`;
    }
    setAuditReport(report);
    setLoadingAudit(false);
  };

  const handleDonation = () => {
    if(!donateAmount) return;
    setIsDonating(true);
    setTimeout(() => {
        setIsDonating(false);
        setDonateAmount('');
        setShowHypercert(true);
    }, 2000);
  };

  const amountNum = parseFloat(donateAmount) || 0;

  return (
    <div className="animate-fade-in pb-20 bg-slate-50 min-h-screen relative">
      
      {/* Impact Hypercert Modal */}
      {showHypercert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-sky-500" />
               <button onClick={() => setShowHypercert(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                  <ArrowLeft className="w-5 h-5 rotate-180" />
               </button>

               <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 animate-bounce">
                     <Award className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-serif">Impact Hypercert Minted!</h3>
                  <div className="flex justify-center gap-2 mt-2">
                    <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded border border-sky-100 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> +{Math.round(amountNum * 100 * trustMultiplier)} XP
                    </span>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Hypercert Confirmed
                    </span>
                  </div>
               </div>

               <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-6 relative group cursor-pointer overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-50" />
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Casper Proof</div>
                  <div className="text-[10px] text-slate-500 font-mono mb-2">HYPERCERT ID: #HP-{Math.random().toString(10).substr(2, 6)}</div>
                  <div className="text-center py-6 relative z-10">
                      <div className="text-4xl font-black text-white">{amountNum} CSPR</div>
                      <div className="text-emerald-400 font-bold text-sm line-clamp-1 mt-1 uppercase tracking-tight">{campaign.title}</div>
                  </div>
                  <div className="border-t border-slate-800 pt-3 mt-2 flex justify-between text-[10px] text-slate-500 uppercase font-black tracking-widest">
                      <span>Outcome:</span>
                      <span className="text-emerald-400">Verified by Casper Nodes</span>
                  </div>
               </div>

               <button 
                 onClick={() => setShowHypercert(false)}
                 className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest text-sm"
               >
                 Add to Guardian Ledger
               </button>
           </div>
        </div>
      )}

      {/* Sticky Back Header */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur border-b border-slate-200 py-4 px-4 sm:px-8 flex items-center justify-between shadow-sm">
        <button onClick={onBack} className="flex items-center text-slate-500 hover:text-sky-600 transition-colors font-bold uppercase text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Explore Causes
        </button>
        <div className="flex items-center gap-4">
             <div className="text-[10px] text-slate-500 hidden sm:flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 font-black uppercase tracking-widest">
                <Navigation className="w-3 h-3" /> Casper Consensus: <span className="font-mono text-emerald-600 ml-1">12/12 Nodes</span>
            </div>
            {campaign.isLocked && (
                <div className="flex items-center gap-1.5 bg-amber-500 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-200">
                    <Lock className="w-3 h-3" />
                    Escrow Locked
                </div>
            )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* RPG-Style Time Machine */}
        <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/20 mb-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] -z-0" />
           <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="bg-sky-600 p-3 rounded-2xl text-white shadow-xl shadow-sky-200 animate-pulse"><History className="w-6 h-6" /></div>
              <div>
                 <h3 className="text-xl font-bold text-slate-900 font-serif">Impact Time Machine</h3>
                 <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Trace the immutable path of your healing spark</p>
              </div>
           </div>

           <div className="relative mb-12">
              <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-100 -translate-y-1/2 rounded-full" />
              <div className="absolute top-1/2 left-0 h-1.5 bg-sky-500 -translate-y-1/2 transition-all duration-700 rounded-full" style={{ width: `${(timeStep / 3) * 100}%` }} />
              
              <div className="relative flex justify-between">
                 {TIME_STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = idx <= timeStep;
                    return (
                      <div key={idx} className="flex flex-col items-center group/step cursor-pointer" onClick={() => setTimeStep(idx)}>
                        <div className={`w-12 h-12 rounded-full border-4 border-white shadow-xl flex items-center justify-center transition-all duration-500 z-10 relative ${
                          isActive ? 'bg-sky-500 text-white scale-110' : 'bg-white text-slate-300'
                        }`}>
                           <Icon className="w-6 h-6" />
                           {isActive && <div className="absolute inset-0 bg-sky-500 rounded-full animate-ping opacity-20" />}
                        </div>
                        <div className={`mt-6 text-center transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'}`}>
                           <div className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">{step.label}</div>
                           <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">{step.desc}</div>
                        </div>
                      </div>
                    );
                 })}
              </div>
           </div>

           <div className="relative z-10 bg-slate-900 text-white p-6 rounded-2xl text-center font-serif italic text-base border border-slate-800 shadow-inner">
              {timeStep === 0 && `"A public witness has been called. Your intent is now inscribed."`}
              {timeStep === 1 && `"The vault is sealed. Your funds are protected by the community's consensus."`}
              {timeStep === 2 && `"Artificial eyes are scouring the field. Proof of arrival is near."`}
              {timeStep === 3 && `"Healing complete. The world is different because you chose to act."`}
           </div>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          <div className="lg:col-span-2 bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/40 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform pointer-events-none"><Sparkles className="w-48 h-48" /></div>
            
            <div className="flex flex-col md:flex-row items-start justify-between mb-10 gap-8 relative z-10">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 mb-4">
                    <span className="bg-sky-50 text-sky-600 text-[10px] font-black px-3 py-1 rounded-full border border-sky-100 uppercase tracking-widest">{campaign.category}</span>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> T-Score: {campaign.tScore}
                    </span>
                </div>
                <h1 className="text-5xl font-bold text-slate-900 mb-6 font-serif leading-tight">{campaign.title}</h1>
                <p className="text-slate-500 leading-relaxed text-lg line-clamp-3 font-medium">{campaign.description}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-sky-600 to-indigo-700 p-8 rounded-3xl flex gap-6 items-center shadow-2xl relative overflow-hidden group/insight">
               <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/insight:opacity-100 transition-opacity animate-shimmer" />
               <div className="bg-white/20 p-4 rounded-2xl shadow-inner backdrop-blur-sm text-white">
                 <Cpu className="w-8 h-8" />
               </div>
               <div>
                 <h4 className="text-sky-100 font-black text-[10px] mb-1 uppercase tracking-widest flex items-center gap-2">
                    <Zap className="w-3 h-3 fill-current" /> AI Audit Vision
                 </h4>
                 <p className="text-white text-xl font-serif italic leading-relaxed">"{aiImpact}"</p>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-10">
               <div className="text-center group/stat">
                 <div className="text-slate-400 text-[10px] uppercase font-black mb-2 tracking-widest group-hover/stat:text-sky-500 transition-colors">Secured</div>
                 <div className="text-3xl font-black text-slate-900">${campaign.raisedAmount.toLocaleString()}</div>
               </div>
               <div className="text-center group/stat">
                 <div className="text-slate-400 text-[10px] uppercase font-black mb-2 tracking-widest group-hover/stat:text-sky-500 transition-colors">Target</div>
                 <div className="text-3xl font-black text-slate-900">${campaign.targetAmount.toLocaleString()}</div>
               </div>
               <div className="text-center group/stat">
                 <div className="text-slate-400 text-[10px] uppercase font-black mb-2 tracking-widest group-hover/stat:text-sky-500 transition-colors">Audit Rank</div>
                 <div className="text-3xl font-black text-emerald-500">A+</div>
               </div>
            </div>
          </div>

          {/* Donation Panel with Gamification */}
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-2xl shadow-slate-200/40 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
                <div className={`bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest ${trustMultiplier > 1 ? 'animate-bounce' : ''}`}>
                   {trustMultiplier}x Impact Boost
                </div>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-8 font-serif">Initiate Impact</h3>
            <div className="space-y-6 flex-grow">
                <div className="relative group">
                    <input 
                        type="number" 
                        value={donateAmount}
                        onChange={(e) => setDonateAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-6 text-slate-900 focus:ring-4 focus:ring-sky-100 focus:border-sky-500 outline-none text-3xl font-black placeholder:text-slate-200 transition-all text-center"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-black text-xl">CSPR</span>
                </div>

                <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 group/cr cursor-pointer hover:bg-indigo-100 transition-colors" onClick={() => setTriggerChain(!triggerChain)}>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-indigo-800 flex items-center gap-2 uppercase tracking-widest">
                            <Zap className="w-3.5 h-3.5 fill-current" /> Chain Reaction
                        </span>
                        <div className={`w-10 h-5 rounded-full relative transition-colors ${triggerChain ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${triggerChain ? 'right-1' : 'left-1'}`} />
                        </div>
                    </div>
                    <p className="text-[10px] text-indigo-700/70 font-bold uppercase tracking-tight">Challenge others to match your gift using Quadratic Funding.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <button onClick={() => setPaymentMethod('wallet')} className={`py-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all font-black uppercase text-[10px] tracking-widest ${paymentMethod === 'wallet' ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-lg shadow-sky-100' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'}`}>
                     <Wallet className="w-5 h-5" /> Wallet
                   </button>
                   <button onClick={() => setPaymentMethod('kucoin')} className={`py-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all font-black uppercase text-[10px] tracking-widest ${paymentMethod === 'kucoin' ? 'bg-sky-50 border-sky-500 text-sky-700 shadow-lg shadow-sky-100' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'}`}>
                     <TrendingUp className="w-5 h-5" /> Exchange
                   </button>
                </div>

                <button 
                    onClick={handleDonation}
                    disabled={isDonating || !donateAmount}
                    className="w-full bg-slate-900 hover:bg-black text-white font-black py-6 rounded-2xl transition-all shadow-2xl shadow-slate-300 mt-auto disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                >
                    {isDonating ? (
                        <>
                            <RefreshCcw className="w-5 h-5 animate-spin" />
                            Locking Smart Contract...
                        </>
                    ) : (
                        <>
                            <Zap className="w-5 h-5 fill-current" />
                            Forge Impact & Hypercert
                        </>
                    )}
                </button>
            </div>
          </div>
        </div>

        {/* Audit & Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
            <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/30">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 font-serif">
                       <TrendingUp className="w-6 h-6 text-indigo-500" /> Fund Flow Distribution
                   </h3>
                </div>
                <div className="h-64 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={10} dataKey="value" stroke="none">
                                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Efficiency</div>
                            <div className="text-3xl font-black text-slate-900">92%</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/30 group">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3 font-serif">
                        <ShieldCheck className="w-6 h-6 text-sky-500" /> On-Chain AI Auditor
                    </h3>
                    <button onClick={handleRunAudit} disabled={loadingAudit} className="group-hover:rotate-180 transition-transform duration-700">
                        <RefreshCcw className={`w-5 h-5 text-slate-300 ${loadingAudit ? 'animate-spin' : ''}`} />
                    </button>
                </div>
                {auditReport ? (
                    <div className="animate-fade-in space-y-6">
                        <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                           <div>
                              <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Audit Score</div>
                              <div className="text-5xl font-black text-emerald-700">{auditReport.score}<span className="text-xl">/100</span></div>
                           </div>
                           <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                        </div>
                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-emerald-400 font-mono text-[9px] break-all">
                           <div className="text-white font-bold mb-1">CASPER ATTESTATION:</div>
                           {auditReport.attestationId}
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                           <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Risk Assessment</div>
                           <p className="text-base text-slate-700 font-serif leading-relaxed italic">"{auditReport.riskAnalysis}"</p>
                        </div>
                    </div>
                ) : (
                    <div className="h-56 flex flex-col items-center justify-center text-slate-400 border-4 border-dashed border-slate-100 rounded-3xl group-hover:border-sky-100 transition-colors">
                        <div className="bg-slate-50 p-5 rounded-full mb-4 group-hover:bg-sky-50 transition-colors">
                           <Cpu className="w-10 h-10 opacity-20 group-hover:opacity-100 group-hover:text-sky-500 transition-all" />
                        </div>
                        <p className="text-xs font-black uppercase tracking-[0.2em]">Ready for Verification</p>
                    </div>
                )}
            </div>
        </div>

        {/* Activity Tabs */}
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-2xl shadow-slate-200/40">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-wrap gap-10 items-center justify-between">
                <div className="flex gap-10">
                    <button onClick={() => setActiveTab('ledger')} className={`text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'ledger' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-400 hover:text-slate-600'}`}>Public Transaction Ledger</button>
                    <button onClick={() => setActiveTab('impact')} className={`text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'impact' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-400 hover:text-slate-600'}`}>Impact Proofs (ZK-Gallery)</button>
                </div>
                
                {activeTab === 'impact' && (
                    <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-bold">
                        <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="uppercase">Privacy Shield Active</span>
                        <div onClick={() => setPrivacyEnabled(!privacyEnabled)} className={`w-8 h-4 rounded-full relative ml-2 cursor-pointer transition-colors ${privacyEnabled ? 'bg-emerald-500' : 'bg-slate-600'}`}>
                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${privacyEnabled ? 'right-0.5' : 'left-0.5'}`} />
                        </div>
                    </div>
                )}
            </div>
            
            <div className="p-0">
                {activeTab === 'ledger' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-400 text-[10px] border-b border-slate-100 font-black uppercase tracking-[0.2em]">
                        <tr><th className="px-10 py-6">Tx Hash</th><th className="px-10 py-6">Operation</th><th className="px-10 py-6">Value</th><th className="px-10 py-6">Verification</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {transactions.map((tx, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition-colors">
                            <td className="px-10 py-6 font-mono text-sky-600 text-xs">{tx.hash.substring(0, 16)}...</td>
                            <td className="px-10 py-6 font-black text-xs text-slate-900 uppercase tracking-tighter">{tx.type}</td>
                            <td className="px-10 py-6 font-black text-base text-slate-900">{tx.amount.toFixed(2)} CSPR</td>
                            <td className="px-10 py-6"><div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100"><ShieldCheck className="w-3.5 h-3.5" /> Confirmed</div></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                      {campaign.impactEvidence.map(ev => (
                        <div key={ev.id} className="relative rounded-3xl overflow-hidden group/ev shadow-xl h-80 hover:-translate-y-2 transition-transform">
                           <img 
                             src={ev.url} 
                             className={`w-full h-full object-cover transition-all duration-700 ${privacyEnabled && ev.isPrivate ? 'blur-2xl scale-110' : ''}`} 
                           />
                           {privacyEnabled && ev.isPrivate && (
                               <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                   <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-[200px]">
                                       <EyeOff className="w-8 h-8 text-white mx-auto mb-2" />
                                       <div className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Privacy Shield</div>
                                       <div className="text-[8px] text-emerald-300 font-bold uppercase">ZK-Proof Verified Outcome</div>
                                   </div>
                               </div>
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent p-10 flex flex-col justify-end">
                              <p className="text-white font-bold text-2xl mb-2 font-serif">{ev.caption}</p>
                              <div className="flex items-center gap-6 text-[10px] text-slate-400 font-black uppercase tracking-[0.1em]">
                                 <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-sky-500" /> {ev.location}</span>
                                 <span>{ev.timestamp}</span>
                              </div>
                           </div>
                           <div className="absolute top-6 right-6 bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest flex items-center gap-2">
                               <ShieldCheck className="w-3 h-3" /> {ev.verificationStatus}
                           </div>
                        </div>
                      ))}
                  </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TransparencyDashboard;
