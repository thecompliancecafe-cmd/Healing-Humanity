
import React, { useState } from 'react';
import { MOCK_CAMPAIGNS, MOCK_ANOMALIES } from '../services/mockData.ts';
import { AlertTriangle, BarChart3, Building2, CheckCircle, FileText, Search, ShieldAlert, ArrowLeft } from 'lucide-react';

interface CorporateDashboardProps {
    onBack: () => void;
}

const CorporateDashboard: React.FC<CorporateDashboardProps> = ({ onBack }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
            {/* Dark Mode Header for Corporate View */}
            <div className="bg-slate-800 border-b border-slate-700 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-indigo-400" />
                            Corporate Oversight Portal
                        </h1>
                        <p className="text-xs text-slate-400">Regulator View • Real-time Compliance</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                     <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-2 text-sm">
                         <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                         System Status: Nominal
                     </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-10">
                
                {/* Executive Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <div className="text-slate-400 text-xs font-bold uppercase mb-2">Total Managed Volume</div>
                        <div className="text-3xl font-bold text-white">$4.2M</div>
                        <div className="text-emerald-400 text-xs mt-2 flex items-center gap-1">
                            <BarChart3 className="w-3 h-3" /> +12% this month
                        </div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <div className="text-slate-400 text-xs font-bold uppercase mb-2">Avg T-Score</div>
                        <div className="text-3xl font-bold text-sky-400">92/100</div>
                        <div className="text-slate-500 text-xs mt-2">Across 156 NGOs</div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <div className="text-slate-400 text-xs font-bold uppercase mb-2">Open Anomalies</div>
                        <div className="text-3xl font-bold text-amber-500">3</div>
                        <div className="text-amber-400/50 text-xs mt-2">Requires Review</div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <div className="text-slate-400 text-xs font-bold uppercase mb-2">Reports Generated</div>
                        <div className="text-3xl font-bold text-white">850</div>
                        <div className="text-indigo-400 text-xs mt-2">CSR-2 Compliant</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Anomaly Feed */}
                    <div className="lg:col-span-2 bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                            <h3 className="font-bold flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-amber-500" />
                                AI Misuse Detection Log
                            </h3>
                            <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-white transition-colors">Export Log</button>
                        </div>
                        <div className="p-0">
                            {MOCK_ANOMALIES.map((anomaly) => (
                                <div key={anomaly.id} className="p-5 border-b border-slate-700 hover:bg-slate-750 transition-colors flex gap-4">
                                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                                        anomaly.severity === 'HIGH' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' :
                                        anomaly.severity === 'MEDIUM' ? 'bg-amber-500' : 'bg-blue-500'
                                    }`} />
                                    <div className="flex-grow">
                                        <div className="flex justify-between mb-1">
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                                                anomaly.severity === 'HIGH' ? 'bg-red-500/10 text-red-400' :
                                                anomaly.severity === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
                                            }`}>
                                                {anomaly.severity} SEVERITY
                                            </span>
                                            <span className="text-xs text-slate-500">{new Date(anomaly.detectedAt).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm text-slate-300 mb-2">{anomaly.description}</p>
                                        <div className="flex items-center gap-4 text-xs text-slate-500">
                                            <span>Campaign ID: {anomaly.campaignId}</span>
                                            <span className={`flex items-center gap-1 ${anomaly.status === 'OPEN' ? 'text-white' : 'text-emerald-500'}`}>
                                                Status: {anomaly.status}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="self-center px-3 py-1.5 border border-slate-600 rounded text-xs hover:bg-slate-700">Investigate</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* NGO Compliance List */}
                    <div className="bg-slate-800 rounded-2xl border border-slate-700 flex flex-col">
                        <div className="p-6 border-b border-slate-700">
                            <h3 className="font-bold mb-4">NGO Transparency Scores</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <input 
                                    type="text" 
                                    placeholder="Search Entity..." 
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex-grow overflow-y-auto max-h-[400px]">
                            {MOCK_CAMPAIGNS.map(camp => (
                                <div key={camp.id} className="p-4 border-b border-slate-700 hover:bg-slate-750 flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-bold text-white mb-0.5">{camp.title}</div>
                                        <div className="text-xs text-slate-500">{camp.id}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-lg font-bold ${
                                            camp.tScore >= 90 ? 'text-emerald-400' : 
                                            camp.tScore >= 80 ? 'text-sky-400' : 'text-amber-400'
                                        }`}>
                                            {camp.tScore}
                                        </div>
                                        <div className="text-[10px] text-slate-500 uppercase">T-Score</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-slate-850 rounded-b-2xl border-t border-slate-700">
                             <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                                <FileText className="w-4 h-4" /> Download CSR Report
                             </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CorporateDashboard;
