import React from 'react';
import * as Icons from 'lucide-react';

export default function AgentDashboardCard({ 
  agentName, 
  role, 
  status, 
  statusMessage, 
  description, 
  iconName, 
  colorClass = 'border-indigo-500/20 text-indigo-400' 
}) {
  // Resolve icon dynamically
  const IconComponent = Icons[iconName] || Icons.UserCheck;

  // Status mapping
  const getStatusDisplay = () => {
    switch (status) {
      case 'working':
        return (
          <div className="flex items-center gap-1.5 text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            Analyzing
          </div>
        );
      case 'done':
        return (
          <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Done
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            Awaiting
          </div>
        );
    }
  };

  return (
    <div className={`glass-panel glass-card-hover rounded-xl p-5 border relative overflow-hidden flex flex-col justify-between h-full`}>
      {/* Top subtle glow light */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
        status === 'working' 
          ? 'from-amber-400 to-orange-500 animate-pulse' 
          : status === 'done' 
          ? 'from-emerald-400 to-teal-500' 
          : 'from-slate-700 to-slate-800'
      }`} />
      
      <div>
        {/* Header: Icon + Status */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 ${colorClass}`}>
            <IconComponent size={24} />
          </div>
          {getStatusDisplay()}
        </div>

        {/* Title & Role */}
        <div className="mb-3">
          <h3 className="text-lg font-bold font-display text-white tracking-wide">{agentName}</h3>
          <p className="text-xs text-indigo-300/80 font-medium tracking-wide mt-0.5">{role}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed font-light mb-4">
          {description}
        </p>
      </div>

      {/* Progress & Live status bar */}
      <div className="mt-4 pt-4 border-t border-slate-800/60">
        {status === 'working' ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-indigo-300 font-mono flex items-center gap-1">
                <Icons.Loader2 size={12} className="animate-spin" />
                {statusMessage || 'Processing data...'}
              </span>
              <span className="text-amber-400 font-mono animate-pulse">Running</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
              <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-[loading_2s_infinite]" style={{ width: '65%' }}></div>
            </div>
          </div>
        ) : status === 'done' ? (
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                <Icons.CheckCircle2 size={12} />
                Task Finalized
              </span>
              <span className="text-emerald-400 font-mono">100%</span>
            </div>
            <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden border border-slate-900">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Icons.MinusSquare size={12} />
            <span>Standing by for business directive...</span>
          </div>
        )}
      </div>
    </div>
  );
}
