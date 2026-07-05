import React from 'react';
import { 
  Building2, Compass, Eye, DollarSign, Target, BarChart3, 
  Megaphone, Cpu, Milestone, Landmark, ShieldCheck, AlertTriangle, 
  TrendingUp, Award, FileText, Download, Rocket, RefreshCw 
} from 'lucide-react';

export default function ResultsDashboard({ result, onReset, onLaunchDevWorkspace }) {
  if (!result) return null;

  // Group metrics logically for cleaner layout
  const sections = [
    {
      title: "Strategic Foundation",
      items: [
        { title: "Mission", content: result.mission, icon: Compass, color: "text-blue-400 bg-blue-500/10" },
        { title: "Vision", content: result.vision, icon: Eye, color: "text-purple-400 bg-purple-500/10" },
      ]
    },
    {
      title: "Market & Strategy",
      items: [
        { title: "Target Market", content: result.target_market, icon: Target, color: "text-rose-400 bg-rose-500/10" },
        { title: "Competitor Analysis", content: result.competitor_analysis, icon: BarChart3, color: "text-amber-400 bg-amber-500/10" },
        { title: "Marketing Strategy", content: result.marketing_strategy, icon: Megaphone, color: "text-fuchsia-400 bg-fuchsia-500/10" },
      ]
    },
    {
      title: "Product & Engineering",
      items: [
        { title: "Tech Stack", content: result.tech_stack, icon: Cpu, color: "text-cyan-400 bg-cyan-500/10" },
        { title: "Product Roadmap", content: result.product_roadmap, icon: Milestone, color: "text-indigo-400 bg-indigo-500/10" },
      ]
    },
    {
      title: "Finance & Monetization",
      items: [
        { title: "Revenue Model", content: result.revenue_model, icon: DollarSign, color: "text-emerald-400 bg-emerald-500/10" },
        { title: "Funding Plan", content: result.funding_plan, icon: Landmark, color: "text-teal-400 bg-teal-500/10" },
      ]
    },
    {
      title: "Risk & Governance",
      items: [
        { title: "Security Report", content: result.security_report, icon: ShieldCheck, color: "text-green-400 bg-green-500/10" },
        { title: "Risk Analysis", content: result.risk_analysis, icon: AlertTriangle, color: "text-orange-400 bg-orange-500/10" },
      ]
    }
  ];

  // Formats text block containing bullets into styled spans
  const formatContent = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return (
          <li key={idx} className="list-none flex items-start gap-2 text-slate-300 font-light text-sm my-1">
            <span className="text-indigo-400 mt-1 shrink-0">•</span>
            <span>{trimmed.substring(1).trim()}</span>
          </li>
        );
      }
      if (/^\d+\./.test(trimmed)) {
        const matches = trimmed.match(/^(\d+\.)(.*)/);
        return (
          <li key={idx} className="list-none flex items-start gap-2 text-slate-300 font-light text-sm my-1">
            <span className="text-indigo-400 font-semibold font-mono mt-0.5">{matches[1]}</span>
            <span>{matches[2].trim()}</span>
          </li>
        );
      }
      return <p key={idx} className="text-slate-300 font-light text-sm leading-relaxed my-1.5">{trimmed}</p>;
    });
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 80) return 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10';
    return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Board */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 border border-indigo-500/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse-glow" />
        
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 border border-indigo-400/30 text-white shadow-lg shadow-indigo-950/40">
            <Building2 size={36} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-extrabold font-display text-white tracking-wide">{result.business_name}</h1>
              <span className="text-[10px] font-mono font-bold tracking-widest bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 uppercase">
                Active Board
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1 max-w-xl font-light">
              Executive plan generated successfully by the AI Board. Review the synthesized plan details below.
            </p>
          </div>
        </div>

        {/* Big viability gauge */}
        <div className="flex items-center gap-4 shrink-0">
          <div className={`flex flex-col items-center justify-center border rounded-2xl p-3.5 min-w-[120px] text-center ${getScoreColor(result.final_business_score)}`}>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">Viability Score</span>
            <span className="text-4xl font-extrabold font-display leading-none">{result.final_business_score}</span>
            <span className="text-[10px] font-mono text-slate-400 mt-1">out of 100</span>
          </div>

          <button 
            onClick={onReset}
            className="p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition-all flex flex-col items-center justify-center gap-1 group"
          >
            <RefreshCw size={20} className="group-hover:rotate-180 transition-all duration-500" />
            <span className="text-[9px] font-mono uppercase tracking-wider font-semibold">New Idea</span>
          </button>
        </div>
      </div>

      {/* Grid segments */}
      <div className="space-y-8">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-4">
            <h2 className="text-lg font-bold font-display text-indigo-300 border-l-4 border-indigo-500 pl-3 tracking-wide">
              {section.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item, iIdx) => {
                const ItemIcon = item.icon;
                return (
                  <div 
                    key={iIdx} 
                    className="glass-panel glass-card-hover rounded-xl p-5 border border-slate-800/60 relative overflow-hidden flex flex-col h-full"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-lg border border-slate-800/80 ${item.color}`}>
                        <ItemIcon size={20} />
                      </div>
                      <h3 className="font-bold text-white tracking-wide font-display">{item.title}</h3>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-1 overflow-y-auto max-h-[220px]">
                      {formatContent(item.content)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Action triggers */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-slate-800/60">
        <button 
          onClick={onLaunchDevWorkspace}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
        >
          <Rocket size={16} />
          Launch Dev Workspace
        </button>
        
        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm transition-all">
          <Download size={16} />
          Export Pitch Deck
        </button>

        <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm transition-all">
          <FileText size={16} />
          Review Incorporation Filings
        </button>
      </div>
    </div>
  );
}
