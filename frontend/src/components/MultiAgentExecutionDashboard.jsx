import React, { useEffect, useRef } from 'react';
import { Terminal, Cpu, Play, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MultiAgentExecutionDashboard({ 
  logs, 
  currentLogIndex, 
  isGenerating, 
  onComplete,
  activeAgentName
}) {
  const terminalEndRef = useRef(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentLogIndex]);

  // Hub position mappings for agents to draw a visual network graph
  const agentsGraph = [
    { name: 'CEO Agent', x: 50, y: 15, color: 'from-indigo-500 to-blue-500' },
    { name: 'CTO Agent', x: 80, y: 30, color: 'from-cyan-500 to-blue-500' },
    { name: 'Finance Agent', x: 85, y: 65, color: 'from-emerald-500 to-teal-500' },
    { name: 'Marketing Agent', x: 65, y: 85, color: 'from-fuchsia-500 to-pink-500' },
    { name: 'Data Analyst Agent', x: 35, y: 85, color: 'from-purple-500 to-indigo-500' },
    { name: 'Legal Agent', x: 15, y: 65, color: 'from-orange-500 to-amber-500' },
    { name: 'Security Agent', x: 20, y: 30, color: 'from-red-500 to-rose-500' },
    { name: 'Project Manager Agent', x: 50, y: 50, color: 'from-indigo-500 via-purple-500 to-pink-500' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 border border-indigo-500/10 shadow-2xl relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-10 animate-pulse-glow" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Cpu size={22} className={isGenerating ? "animate-spin" : ""} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white tracking-wide">Multi-Agent Boardroom</h2>
            <p className="text-xs text-slate-400 mt-0.5">Real-time simulation of strategic agency collaboration</p>
          </div>
        </div>

        {/* Phase Indicator */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono bg-slate-900 border border-slate-800 rounded px-3 py-1.5 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
            <span className="text-slate-300">Phase: </span>
            <span className={isGenerating ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
              {isGenerating ? "COLLABORATION_ACTIVE" : "COMPLETED_IDLE"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Graph + Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SVG Agent Communication Network Graph */}
        <div className="lg:col-span-6 glass-panel-accent rounded-xl p-4 border border-slate-800/80 bg-slate-950/40 flex flex-col justify-between h-[360px] relative">
          <div className="absolute top-3 left-3 text-[10px] font-mono text-indigo-300/60 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles size={10} />
            ADK Orchestration Graph
          </div>

          <div className="w-full h-full relative mt-4">
            {/* SVG Link lines */}
            <svg className="absolute inset-0 w-full h-full">
              {/* Connect outer agents to PM Agent in the center */}
              {agentsGraph.map((agent, i) => {
                if (agent.name === 'Project Manager Agent') return null;
                const pm = agentsGraph.find(a => a.name === 'Project Manager Agent');
                const isActiveLink = activeAgentName === agent.name || activeAgentName === 'Project Manager Agent';
                return (
                  <g key={`line-${i}`}>
                    <line
                      x1={`${agent.x}%`}
                      y1={`${agent.y}%`}
                      x2={`${pm.x}%`}
                      y2={`${pm.y}%`}
                      stroke={isActiveLink ? '#a855f7' : '#1e293b'}
                      strokeWidth={isActiveLink ? '2' : '1'}
                      strokeDasharray={isActiveLink ? '4,4' : 'none'}
                      className={isActiveLink ? 'animate-[dash_10s_linear_infinite]' : ''}
                    />
                    {/* Pulsing transmission packet */}
                    {isActiveLink && isGenerating && (
                      <circle r="3" fill="#06b6d4">
                        <animateMotion
                          dur="2s"
                          repeatCount="indefinite"
                          path={`M ${agent.x * 3} ${agent.y * 3} L ${pm.x * 3} ${pm.y * 3}`}
                          keyPoints="0;1"
                          keyTimes="0;1"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Agent Nodes */}
            {agentsGraph.map((agent, i) => {
              const isActive = activeAgentName === agent.name;
              return (
                <div
                  key={`node-${i}`}
                  style={{ left: `${agent.x}%`, top: `${agent.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group z-10"
                >
                  <div className={`w-8 h-8 rounded-full bg-slate-900 border flex items-center justify-center transition-all duration-500 ${
                    isActive 
                      ? 'border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.6)] scale-110 bg-indigo-950/80' 
                      : 'border-slate-800 hover:border-slate-600'
                  }`}>
                    <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-tr ${agent.color} ${
                      isActive ? 'animate-pulse scale-125' : ''
                    }`} />
                  </div>
                  <span className={`text-[9px] font-mono mt-1 px-1.5 py-0.5 rounded bg-slate-950/80 border whitespace-nowrap transition-all duration-300 ${
                    isActive ? 'border-indigo-500/40 text-indigo-300 font-bold' : 'border-transparent text-slate-400'
                  }`}>
                    {agent.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Terminal Output Console */}
        <div className="lg:col-span-6 flex flex-col h-[360px] glass-panel-accent rounded-xl border border-slate-800/80 bg-slate-950/80 overflow-hidden font-mono">
          {/* Top Panel bar */}
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-900 flex justify-between items-center text-xs">
            <span className="text-slate-400 flex items-center gap-2">
              <Terminal size={14} className="text-indigo-400" />
              agent_execution_console.log
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"></span>
            </div>
          </div>

          {/* Console logs */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {logs.slice(0, currentLogIndex + 1).map((log, index) => (
              <div key={index} className="border-l-2 border-indigo-500/30 pl-3 py-0.5 animate-fadeIn">
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-indigo-400 font-bold">[{log.agent}]</span>
                  <span className="text-amber-500/80 font-semibold">{log.action}</span>
                  <span className="text-slate-500 font-light">
                    {new Date(log.timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-300 font-light mt-1 text-xs leading-relaxed">{log.message}</p>
              </div>
            ))}

            {isGenerating && currentLogIndex < logs.length - 1 && (
              <div className="flex items-center gap-2 text-indigo-400/80 text-xs italic pl-3 animate-pulse">
                <Loader2 size={12} className="animate-spin" />
                Inter-agent secure tunnel compiling data...
              </div>
            )}

            {!isGenerating && logs.length > 0 && (
              <div className="bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 rounded-lg p-3 flex items-start gap-3 mt-4 animate-fadeIn">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold">Synthesis Complete!</h4>
                  <p className="text-[11px] text-emerald-400/80 mt-0.5">The Boardroom has finalized your C-Corp start plan. All dashboards are ready for evaluation.</p>
                </div>
              </div>
            )}

            <div ref={terminalEndRef} />
          </div>
        </div>

      </div>
    </div>
  );
}
