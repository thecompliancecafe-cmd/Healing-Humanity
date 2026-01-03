
import React from 'react';
import { Campaign } from '../types';
import { ArrowRight, ShieldCheck, Globe, Lock } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  onSelect: (campaign: Campaign) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onSelect }) => {
  const percentage = Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100));
  const isExternal = campaign.source && campaign.source !== 'Native';

  // T-Score Color Logic
  const getTScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500 bg-emerald-50 border-emerald-100';
    if (score >= 75) return 'text-sky-500 bg-sky-50 border-sky-100';
    return 'text-amber-500 bg-amber-50 border-amber-100';
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-sky-200 transition-all duration-300 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-sky-100 group flex flex-col h-full relative">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={campaign.imageUrl} 
          alt={campaign.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        
        {/* Verified Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold text-sky-600 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-sky-500" />
          Verified
        </div>

        {/* Source Badge (if external) */}
        {isExternal && (
          <div className="absolute top-4 left-4 bg-indigo-50/90 backdrop-blur text-xs font-bold text-indigo-600 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
            <Globe size={14} />
            via {campaign.source}
          </div>
        )}

        {/* Use of Funds Lock Indicator */}
        {campaign.isLocked && (
             <div className="absolute bottom-4 left-4 bg-amber-500/90 backdrop-blur text-xs font-bold text-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                <Lock size={12} />
                Funds Locked
            </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-24" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
           <div className="text-sky-600 text-xs font-bold tracking-wider uppercase bg-sky-50 px-2 py-1 rounded">{campaign.category}</div>
           
           {/* T-Score Badge */}
           <div className={`text-xs font-bold px-2.5 py-1 rounded border flex items-center gap-1 ${getTScoreColor(campaign.tScore)}`} title="Transparency Score">
              T-Score: {campaign.tScore}
           </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1 font-serif group-hover:text-sky-700 transition-colors">{campaign.title}</h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">{campaign.description}</p>
        
        <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex justify-between text-sm font-medium">
            <span className="text-slate-800 font-bold">${campaign.raisedAmount.toLocaleString()}</span>
            <span className="text-slate-400">of ${campaign.targetAmount.toLocaleString()}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-sky-500 h-2 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(14,165,233,0.3)]"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="text-right text-xs text-sky-600 font-semibold">{percentage}% Funded</div>
        </div>

        <button 
          onClick={() => onSelect(campaign)}
          className="w-full mt-auto bg-white border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-200 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
        >
          {isExternal ? 'View Synced Details' : 'View Transparency Reports'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
