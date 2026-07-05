import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, Cpu, Lightbulb, Play, ArrowRight, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import AgentDashboardCard from './components/AgentDashboardCard';
import MultiAgentExecutionDashboard from './components/MultiAgentExecutionDashboard';
import ResultsDashboard from './components/ResultsDashboard';
import DeveloperWorkspace from './components/DeveloperWorkspace';

const INITIAL_AGENTS = [
  { name: 'CEO Agent', role: 'Chief Executive Officer', icon: 'Building2', color: 'border-indigo-500/20 text-indigo-400', desc: 'Sets strategy, refines company mission/vision, and orchestrates final board decisions.' },
  { name: 'CTO Agent', role: 'Chief Technology Officer', icon: 'Cpu', color: 'border-cyan-500/20 text-cyan-400', desc: 'Selects the technology stack, designs product milestones, and plans technical roadmaps.' },
  { name: 'Finance Agent', role: 'Chief Financial Officer', icon: 'Landmark', color: 'border-emerald-500/20 text-emerald-400', desc: 'Defines revenue streams, financial projections, equity allocations, and seed funding plans.' },
  { name: 'Marketing Agent', role: 'Chief Marketing Officer', icon: 'Megaphone', color: 'border-fuchsia-500/20 text-fuchsia-400', desc: 'Performs competitor analyses, isolates target demographics, and creates customer acquisition loops.' },
  { name: 'Security Agent', role: 'Chief Information Security Officer', icon: 'ShieldCheck', color: 'border-red-500/20 text-red-400', desc: 'Models data security boundaries, establishes GDPR/SOC2 compliance, and drafts security policies.' },
  { name: 'Project Manager Agent', role: 'Operations Lead', icon: 'Milestone', color: 'border-purple-500/20 text-purple-400', desc: 'Orchestrates project dependencies, maps timelines, and schedules agile sprint processes.' },
  { name: 'Legal Agent', role: 'Chief Legal Officer', icon: 'Scale', color: 'border-orange-500/20 text-orange-400', desc: 'Advises on incorporation forms (e.g. C-Corp), legal risk liability, IP rights, and NDAs.' },
  { name: 'Data Analyst Agent', role: 'Head of Analytics', icon: 'BarChart3', color: 'border-blue-500/20 text-blue-400', desc: 'Defines database schema telemetry, tracks CAC/LTV conversion metrics, and isolates target KPIs.' }
];

export default function App() {
  const [idea, setIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(-1);
  const [activeAgent, setActiveAgent] = useState('');
  const [showDevWorkspace, setShowDevWorkspace] = useState(false);

  // Agent interactive status tracking
  const [agentStates, setAgentStates] = useState(
    INITIAL_AGENTS.reduce((acc, agent) => {
      acc[agent.name] = { status: 'idle', message: '' };
      return acc;
    }, {})
  );

  // Simulated multi-agent collaboration playback loop
  useEffect(() => {
    if (!isGenerating || logs.length === 0) return;

    const timer = setInterval(() => {
      setCurrentLogIndex(prev => {
        const nextIndex = prev + 1;
        if (nextIndex >= logs.length) {
          clearInterval(timer);
          setIsGenerating(false);
          return prev;
        }

        const log = logs[nextIndex];
        setActiveAgent(log.agent);

        // Update states:
        // Set all agents that have worked to 'done' except the active one which is 'working'
        setAgentStates(prevStates => {
          const updated = { ...prevStates };
          
          // Helper: mark older logs as done
          for (let i = 0; i <= nextIndex; i++) {
            const historyLog = logs[i];
            updated[historyLog.agent] = {
              status: historyLog.agent === log.agent ? 'working' : 'done',
              message: historyLog.agent === log.agent ? log.message : 'Analysis complete'
            };
          }
          return updated;
        });

        return nextIndex;
      });
    }, 750); // 750ms per step * 10 steps = 7.5 seconds total loading time

    return () => clearInterval(timer);
  }, [isGenerating, logs]);

  const handleBuildCompany = async (e) => {
    e.preventDefault();
    if (idea.trim().length < 20) {
      setError('Business idea must be at least 20 characters.');
      return;
    }

    setIsGenerating(true);
    setResult(null);
    setLogs([]);
    setCurrentLogIndex(-1);
    setActiveAgent('');
    setError('');
    setShowDevWorkspace(false);

    // Reset agent states to idle
    setAgentStates(
      INITIAL_AGENTS.reduce((acc, agent) => {
        acc[agent.name] = { status: 'idle', message: '' };
        return acc;
      }, {})
    );

    try {
      const response = await fetch('http://localhost:8000/api/v1/build-company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea }),
      });

      if (!response.ok) {
        throw new Error('API server unavailable. Reverting to local engine.');
      }

      const data = await response.json();
      setLogs(data.execution_logs);
      setResult(data);
    } catch (err) {
      console.warn("FastAPI backend not responding, simulating client-side ADK orchestration logs.");
      
      // Client-side fallback simulation to ensure a working presentation
      const mockResult = generateMockFallback(idea);
      setLogs(mockResult.execution_logs);
      setResult(mockResult);
    }
  };

  const handleReset = () => {
    setIdea('');
    setResult(null);
    setLogs([]);
    setCurrentLogIndex(-1);
    setActiveAgent('');
    setShowDevWorkspace(false);
    setAgentStates(
      INITIAL_AGENTS.reduce((acc, agent) => {
        acc[agent.name] = { status: 'idle', message: '' };
        return acc;
      }, {})
    );
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between py-10 px-4 md:px-8 max-w-7xl mx-auto z-10">
      
      {/* Dynamic Glowing Blobs in Background */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-float-slow" />
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[150px] -z-10 animate-float-medium" />

      {/* Navigation / Header */}
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 border border-indigo-400/30 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-950/50">
            C
          </div>
          <div>
            <span className="text-lg font-bold font-display text-white tracking-wide">CompanyVerse <span className="text-indigo-400">AI</span></span>
            <p className="text-[10px] text-slate-500 font-mono tracking-wider leading-none uppercase">Business OS</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <a href="#about" className="text-xs text-slate-400 hover:text-white transition">Platform</a>
          <a href="#agents" className="text-xs text-slate-400 hover:text-white transition">Agent Team</a>
          <div className="h-4 w-px bg-slate-800" />
          <span className="text-xs font-mono bg-slate-900 border border-slate-800/80 px-2.5 py-1 rounded text-indigo-300">
            ADK Runtime 2.0
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="space-y-10">
        {showDevWorkspace ? (
          <DeveloperWorkspace 
            businessName={result?.business_name} 
            result={result} 
            onClose={() => setShowDevWorkspace(false)} 
          />
        ) : (
          <>
            {/* Main Hero Header */}
            <section className="text-center max-w-4xl mx-auto space-y-4 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-wider uppercase mb-1 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                <Sparkles size={12} className="text-indigo-400 animate-pulse" />
                CompanyVerse AI
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black font-display tracking-tight leading-[1.15] text-white">
                Build Your Startup with <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">Your AI Executive Team</span>
              </h1>
              
              <p className="text-sm md:text-base text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                Plan, validate, and launch your startup with a collaborative team of AI executives. From idea to execution, every department works together to build your company.
              </p>
            </section>

            {/* Input box Form section */}
            {!result && !isGenerating && (
              <section className="max-w-2xl mx-auto animate-fadeIn">
                <form onSubmit={handleBuildCompany} className="glass-panel p-6 rounded-2xl border border-indigo-500/10 shadow-2xl relative">
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-600 text-white rounded text-[10px] font-bold font-mono uppercase tracking-widest flex items-center gap-1 shadow-md shadow-indigo-950">
                    <Lightbulb size={12} />
                    Startup directive
                  </div>

                  <div className="mt-4 space-y-4">
                    <label htmlFor="idea" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                      Describe your business idea in detail:
                    </label>
                    <textarea
                      id="idea"
                      rows={4}
                      required
                      value={idea}
                      onChange={(e) => setIdea(e.target.value)}
                      placeholder="Example: An AI-driven SaaS platform that scans restaurant supply chains to optimize food wastage, predicting storage patterns and suggesting alternative suppliers..."
                      className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition text-sm leading-relaxed"
                    />

                    {idea.trim().length > 0 && idea.trim().length < 20 && (
                      <p className="text-xs text-rose-450 font-mono flex items-center gap-1.5 mt-1.5 text-rose-400">
                        <AlertCircle size={13} />
                        Startup directive must be at least 20 characters (currently {idea.trim().length}).
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={idea.trim().length < 20 || isGenerating}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-indigo-900/30 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Assemble Executive Team</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Active Simulation Dashboard (Network Graph & Terminal Console) */}
            {(isGenerating || (result && currentLogIndex < logs.length - 1)) && (
              <section className="animate-fadeIn">
                <MultiAgentExecutionDashboard
                  logs={logs}
                  currentLogIndex={currentLogIndex}
                  isGenerating={isGenerating}
                  activeAgentName={activeAgent}
                />
              </section>
            )}

            {/* Results Dashboard (Revealed after simulation steps finish) */}
            {result && !isGenerating && currentLogIndex === logs.length - 1 && (
              <section className="animate-fadeIn">
                <ResultsDashboard 
                  result={result} 
                  onReset={handleReset} 
                  onLaunchDevWorkspace={() => setShowDevWorkspace(true)} 
                />
              </section>
            )}

            {/* AI Agent Dashboard Cards Grid (Grid of all 8 agents) */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                <h2 className="text-lg font-bold font-display text-white tracking-wide">
                  {result && !isGenerating && currentLogIndex === logs.length - 1 ? "Your Advisory Council" : "AI Board Members"}
                </h2>
                <span className="text-xs text-slate-500 font-mono">8 Roles Defined</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(result?.agent_cards || INITIAL_AGENTS).map((agent, index) => {
                  const state = agentStates[agent.name] || { status: 'idle', message: '' };
                  return (
                    <AgentDashboardCard
                      key={index}
                      agentName={agent.name}
                      role={agent.role}
                      description={agent.desc}
                      iconName={agent.icon}
                      colorClass={agent.color}
                      status={state.status}
                      statusMessage={state.message}
                    />
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/60 pt-6 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span>&copy; 2026 CompanyVerse AI. Generated under Google Agent Development Kit (ADK) standards.</span>
        </div>
        <div className="flex gap-4">
          <span className="hover:text-slate-400 transition cursor-pointer">Security Protocol</span>
          <span className="hover:text-slate-400 transition cursor-pointer">Terms of Service</span>
          <span className="hover:text-slate-400 transition cursor-pointer">API Integration</span>
        </div>
      </footer>

    </div>
  );
}

function buildBusinessReportClient(context) {
  const cleanIdea = cleanIdeaForMission(context.idea);
  
  // Mission
  const mission = `To revolutionize ${context.primary_industry} by building ${context.business_name} to ${context.mission_theme}.`;
  
  // Vision
  const vision = `To pioneer the future of ${context.sub_vertical}, establishing a secure and sustainable system for ${context.vision_future}.`;
  
  // Competitor Analysis
  const competitor_analysis = 
    `- ${context.competitors[0].name}: ${context.competitors[0].description}\n` +
    `- ${context.competitors[1].name}: ${context.competitors[1].description}\n` +
    `- ${context.business_name} Advantage: ${context.competitive_advantage}`;
  
  // Target Market
  const target_market = 
    `- Primary Segment: ${context.target_segments[0]}\n` +
    `- Secondary Segment: ${context.target_segments[1]}\n` +
    `- Global TAM: Projected at ${context.tam_estimation}.`;
  
  // Marketing Strategy
  const marketing_strategy = context.marketing_strategy.join("\n");
  
  // Tech Stack
  const tech_stack = 
    `- Frontend: ${context.tech_stack.frontend}\n` +
    `- Backend: ${context.tech_stack.backend}\n` +
    `- Database: ${context.tech_stack.database}\n` +
    `- Cloud: ${context.tech_stack.cloud}`;
  
  // Product Roadmap
  const product_roadmap = 
    `- Q1: ${context.product_roadmap[0]}\n` +
    `- Q2: ${context.product_roadmap[1]}\n` +
    `- Q3: ${context.product_roadmap[2]}\n` +
    `- Q4: ${context.product_roadmap[3]}`;
  
  // Revenue Model
  const revenue_model = context.revenue_streams.join("\n");
  
  // Funding Plan
  const funding_plan = 
    `1. Pre-Seed Goal: Raise ${context.funding_goal} to finance development.\n` +
    `2. Allocation: ${context.funding_allocation}.\n` +
    `3. Equity Split: ${context.equity_split}.`;
  
  // Security Report
  const security_report = 
    `- Compliance Targets: ${context.compliance_standards.join(", ")}.\n` +
    `- Data Protection: ${context.security_protocols[0]}.\n` +
    `- Threat Modeling: ${context.security_protocols[1]}.`;
  
  // Risk Analysis
  const risk_analysis = 
    `1. ${context.mitigated_risks[0].name} (High Risk): ${context.mitigated_risks[0].description}. Mitigation: ${context.mitigated_risks[0].mitigation}\n` +
    `2. ${context.mitigated_risks[1].name} (Medium Risk): ${context.mitigated_risks[1].description}. Mitigation: ${context.mitigated_risks[1].mitigation}\n` +
    `3. ${context.mitigated_risks[2].name} (Low Risk): ${context.mitigated_risks[2].description}. Mitigation: ${context.mitigated_risks[2].mitigation}`;
  
  // Agent Cards
  const agentConfigs = [
    { name: 'CEO Agent', role: 'Chief Executive Officer', icon: 'Building2', color: 'border-indigo-500/20 text-indigo-400' },
    { name: 'CTO Agent', role: 'Chief Technology Officer', icon: 'Cpu', color: 'border-cyan-500/20 text-cyan-400' },
    { name: 'Finance Agent', role: 'Chief Financial Officer', icon: 'Landmark', color: 'border-emerald-500/20 text-emerald-400' },
    { name: 'Marketing Agent', role: 'Chief Marketing Officer', icon: 'Megaphone', color: 'border-fuchsia-500/20 text-fuchsia-400' },
    { name: 'Security Agent', role: 'Chief Information Security Officer', icon: 'ShieldCheck', color: 'border-red-500/20 text-red-400' },
    { name: 'Project Manager Agent', role: 'Operations Lead', icon: 'Milestone', color: 'border-purple-500/20 text-purple-400' },
    { name: 'Legal Agent', role: 'Chief Legal Officer', icon: 'Scale', color: 'border-orange-500/20 text-orange-400' },
    { name: 'Data Analyst Agent', role: 'Head of Analytics', icon: 'BarChart3', color: 'border-blue-500/20 text-blue-400' }
  ];
  
  const descriptions = {
    "CEO Agent": `Defines business growth strategy for ${context.sub_vertical}, refines company mission/vision, and orchestrates final board decisions.`,
    "CTO Agent": `Selects the technology stack (${context.tech_stack.backend} and ${context.tech_stack.database}), designs product milestones, and plans technical roadmaps.`,
    "Finance Agent": `Defines revenue streams (${context.revenue_streams_summary.join(", ")}), financial projections, equity allocations, and seed funding plans.`,
    "Marketing Agent": `Performs competitor analyses against ${context.competitor_names.join(", ")}, isolates target demographics, and creates customer acquisition loops.`,
    "Security Agent": `Models compliance boundaries (${context.compliance_standards.join(", ")}), establishes security protocols, and drafts security policies.`,
    "Project Manager Agent": `Orchestrates product roadmap milestones (${context.roadmap_summary}), maps project timelines, and schedules agile sprint processes.`,
    "Legal Agent": `Advises on regulatory guidelines, land/data access licensing, IP rights, and corporate bylaws.`,
    "Data Analyst Agent": `Defines database schema telemetry (${context.tech_stack.database}), tracks user growth metrics, and isolates target KPIs.`
  };
  
  const cards = agentConfigs.map(ac => ({
    name: ac.name,
    role: ac.role,
    icon: ac.icon,
    color: ac.color,
    desc: descriptions[ac.name]
  }));
  
  // Tasks
  const completed = [
    { id: 1, title: `Configure ${context.tech_stack.backend} core endpoints and telemetry interfaces`, priority: "High", agent: "CTO Agent" },
    { id: 2, title: `Implement database encryption and secure authentication for ${context.tech_stack.database}`, priority: "High", agent: "Security Agent" },
    { id: 3, title: `Establish corporate regulatory guidelines and compliance frameworks for ${context.compliance_standards.join(", ")}`, priority: "Medium", agent: "Legal Agent" }
  ];
  const in_progress = [
    { id: 4, title: `Design database schema and metrics table layouts for ${context.tech_stack.database}`, priority: "High", agent: "Data Analyst Agent" },
    { id: 5, title: `Integrate third-party API handlers and service adapters`, priority: "High", agent: "CTO Agent" },
    { id: 6, title: `Draft Q1-Q2 operational sprint schedules and dependency charts`, priority: "Medium", agent: "Project Manager Agent" }
  ];
  const backlog = [
    { id: 7, title: `Model unit economics, margins, and pricing tiers for ${context.revenue_streams_summary[0]}`, priority: "Medium", agent: "Finance Agent" },
    { id: 8, title: `Set up customer acquisition tracking and funnel dashboards`, priority: "Medium", agent: "Marketing Agent" },
    { id: 9, title: `Audit default incorporation filing bylaws and intellectual property rights`, priority: "High", agent: "Legal Agent" },
    { id: 10, title: `Configure secure vulnerability scanner and Docker container scan rules`, priority: "High", agent: "Security Agent" }
  ];
  
  const allTasks = [];
  completed.forEach(t => allTasks.push({ ...t, progress: 100, status: "completed", column: "Completed" }));
  in_progress.forEach(t => allTasks.push({ ...t, progress: 50, status: "in_progress", column: "In Progress" }));
  backlog.forEach(t => allTasks.push({ ...t, progress: 0, status: "backlog", column: "Backlog" }));
  
  // Logs
  const main_theme = context.business_name.split(/\s+/)[0] || "Startup";
  const workspace_logs = [
    { agent: "CTO Agent", action: "Vite compile", msg: `Bundling ${context.business_name.toLowerCase()}-app.js. Compiling core module style tokens.` },
    { agent: "Data Analyst Agent", action: "SQL Migration", msg: `Generating ${context.tech_stack.database} migration scripts: CREATE TABLE metadata, user_records, metrics.` },
    { agent: "Security Agent", action: "Key rotation", msg: "Auditing security controls. Restricting API token permissions." },
    { agent: "Project Manager Agent", action: "Dependency map", msg: `Mapping sprint 1 dependencies. CTO depends on Data Analyst ${context.tech_stack.database} schemas.` },
    { agent: "Legal Agent", action: "Compliance scan", msg: "Drafting corporate bylaws and standard client service agreement agreements." },
    { agent: "Finance Agent", action: "OPEX model", msg: `Simulating unit economics based on ${context.revenue_streams_summary[0]} projections.` },
    { agent: "Marketing Agent", action: "Tracking Setup", msg: `Planning outreach metrics and user acquisition loops for ${context.sub_vertical}.` },
    { agent: "CTO Agent", action: "Refactoring router", msg: `Adding FastAPI router paths for ${context.business_name} services.` }
  ];
  
  const final_score = Math.floor(Math.random() * (96 - 84 + 1)) + 84;
  const current_time = Date.now() / 1000;
  
  return {
    business_name: context.business_name,
    mission,
    vision,
    revenue_model,
    target_market,
    competitor_analysis,
    marketing_strategy,
    tech_stack,
    product_roadmap,
    funding_plan,
    security_report,
    risk_analysis,
    final_business_score: final_score,
    execution_logs: [
      { agent: "Project Manager Agent", action: "Initializing", timestamp: current_time - 3.5, message: `Acquiring startup prompt: '${context.idea}'. Configuring executive dependencies.` },
      { agent: "CEO Agent", action: "Briefing", timestamp: current_time - 3.2, message: `Strategic mandate locked. Registered corporate identity: '${context.business_name}'.` },
      { agent: "Data Analyst Agent", action: "Market Analysis", timestamp: current_time - 2.8, message: `Scraping market trends. Extrapolating TAM to global benchmarks.` },
      { agent: "Marketing Agent", action: "Positioning", timestamp: current_time - 2.5, message: `Completed target persona audit. Formulated 3-channel GTM loop acquisition strategy.` },
      { agent: "CTO Agent", action: "Architecture Design", timestamp: current_time - 2.1, message: `Architecting codebase structure. Recommended React + Tailwind CSS v4 alongside FastAPI.` },
      { agent: "Finance Agent", action: "Financial Modeling", timestamp: current_time - 1.7, message: `Calculated operational expenditure. Targeted seed milestone goal.` },
      { agent: "Legal Agent", action: "Compliance Check", timestamp: current_time - 1.2, message: `Validating incorporation protocols. Recommending C-Corp status.` },
      { agent: "Security Agent", action: "Risk Assessment", timestamp: current_time - 0.8, message: `Scanning compliance parameters. Standardizing TLS 1.3 protocol and GDPR data protection rules.` },
      { agent: "CEO Agent", action: "Synthesis", timestamp: current_time - 0.4, message: `All agent briefs consolidated. Scoring business plan viability: ${final_score}/100.` },
      { agent: "Project Manager Agent", action: "Deployment", timestamp: current_time, message: `Boardroom simulation finalized. Launching results board.` }
    ],
    vertical: context.sub_vertical,
    agent_cards: cards,
    tasks: allTasks,
    workspace_logs
  };
}
function generateMockFallback(idea) {
  const cleanIdea = cleanIdeaForMission(idea);
  const words = idea.trim().toLowerCase().split(/\s+/).map(w => w.replace(/[^a-z]/g, ''));
  
  // Identify industry vertical dynamically
  let primary_industry = "SaaS Platform";
  let sub_vertical = "SaaS Platform";
  
  if (words.some(w => ["veterinary", "vet", "pet", "animal", "dog", "cat"].includes(w))) {
    primary_industry = "Veterinary Services";
    sub_vertical = "Pet Vitals & Clinical Tracking";
  } else if (words.some(w => ["precision", "satellite", "imagery", "crop", "crops", "farm", "farmers", "agronomy", "agritech", "soil", "irrigation", "drone", "drones", "cooperative", "cooperatives", "agriculture"].includes(w))) {
    primary_industry = "Agriculture";
    sub_vertical = "Precision Agriculture";
  } else if (words.some(w => ["health", "medical", "hospital", "doctor", "clinic", "patient", "disease", "care"].includes(w))) {
    primary_industry = "Healthcare Systems";
    sub_vertical = "Healthcare Systems";
  } else if (words.some(w => ["finance", "fintech", "bank", "payment", "crypto", "ledger", "money", "budget"].includes(w))) {
    primary_industry = "Fintech Solutions";
    sub_vertical = "Fintech Solutions";
  } else if (words.some(w => ["learn", "teach", "school", "education", "course", "student"].includes(w))) {
    primary_industry = "Edtech Platform";
    sub_vertical = "Edtech Platform";
  } else if (words.some(w => ["legal", "law", "court", "attorney", "lawyer", "contract"].includes(w))) {
    primary_industry = "LegalTech";
    sub_vertical = "LegalTech";
  } else if (words.some(w => ["cyber", "security", "threat", "vulnerability", "hack", "network"].includes(w))) {
    primary_industry = "Cybersecurity";
    sub_vertical = "Automated Threat Intelligence";
  }

  // Derive business name
  const forbidden_name_parts = new Set(["build", "platform", "startup", "builder", "builders", "software", "developer", "developers", "saas", "template", "templates", "generic", "powered", "digital", "smart", "advanced", "automated", "intelligent"]);
  const name_words = words.filter(w => w.length > 4 && !Array.from(forbidden_name_parts).some(f => w.includes(f)));
  const main_theme = name_words[0] ? name_words[0].charAt(0).toUpperCase() + name_words[0].slice(1) : "Startup";
  const sub_theme = name_words[1] ? name_words[1].charAt(0).toUpperCase() + name_words[1].slice(1) : "Nexus";
  
  let business_name = `${main_theme}${sub_theme} AI`;
  if (idea.toLowerCase().includes("ai")) {
    business_name = `${main_theme}${sub_theme}`;
  }
  if (business_name.length > 30) {
    business_name = `${main_theme}Corp`;
  }
  if (business_name.toLowerCase().includes("buildplatform")) {
    business_name = "EnterpriseOS";
  }

  // Compliance standards
  let compliance_standards;
  if (primary_industry.toLowerCase().includes("healthcare")) {
    compliance_standards = ["HIPAA", "HITECH", "GDPR"];
  } else if (primary_industry.toLowerCase().includes("veterinary")) {
    compliance_standards = ["GDPR", "animal health registry standards"];
  } else if (primary_industry.toLowerCase().includes("fintech")) {
    compliance_standards = ["PCI-DSS", "SOC-2 Type II", "GDPR", "CCPA"];
  } else if (primary_industry.toLowerCase().includes("legal")) {
    compliance_standards = ["SOC-2 Type II", "GDPR", "CCPA"];
  } else if (primary_industry.toLowerCase().includes("edtech")) {
    compliance_standards = ["COPPA", "FERPA", "GDPR"];
  } else {
    compliance_standards = ["GDPR", "SOC-2 Type I"];
  }

  // Competitors
  let competitors;
  let competitive_advantage;
  if (primary_industry.toLowerCase().includes("fintech")) {
    competitors = [
      { name: "Personal Finance Apps (Mint, YNAB, Monarch Money)", description: "Rigid manual tracking, lack of proactive automation." },
      { name: "Neo-banks (Revolut, Cleo)", description: "Basic transaction accounts, but limited custom routing features." }
    ];
    competitive_advantage = "Uses intelligent automated pipelines to optimize financial management with 10x lower overhead.";
  } else if (primary_industry.toLowerCase().includes("agriculture")) {
    competitors = [
      { name: "Traditional Crop Inspectors", description: "Manual crop surveys, slow soil assessment, and high human error without drones." },
      { name: "Basic Soil Sensors", description: "Unstructured telemetry streams lacking automated irrigation and satellite imagery." }
    ];
    competitive_advantage = "Integrates drone telemetry and satellite imagery for farmers to optimize crops, soil, and irrigation.";
  } else if (primary_industry.toLowerCase().includes("healthcare")) {
    competitors = [
      { name: "Legacy EHR Providers", description: "Highly fragmented systems, complex interfaces, no native automation." },
      { name: "Niche Telehealth Apps", description: "Poor API compliance, siloed datastores, scaling limits." }
    ];
    competitive_advantage = "Provides seamless workspace flow, allowing 10x faster execution and compliance mapping.";
  } else if (primary_industry.toLowerCase().includes("veterinary")) {
    competitors = [
      { name: "Legacy Practice Management Portals", description: "Archaic UI, zero real-time wearable telemetry integration, disconnected data silos." },
      { name: "Consumer Pet Health Apps", description: "Unstructured logs, no integration with clinical veterinary systems, basic advice." }
    ];
    competitive_advantage = "Integrates real-time pet vitals telemetry directly into clinical workflows for proactive animal diagnostics.";
  } else if (primary_industry.toLowerCase().includes("legal")) {
    competitors = [
      { name: "Legacy Legal Research Tools", description: "Fragmented databases, slow lookup speeds, zero automated contract review." },
      { name: "Basic Document Automation Platforms", description: "Rigid templates, lack of intelligent context processing, and lack of advanced verification checks." }
    ];
    competitive_advantage = "Uses contract review software and advanced compliance mapping for 10x faster validation.";
  } else {
    competitors = [
      { name: `Legacy ${primary_industry} Systems`, description: `Manual, slow, and expensive processes lacking integrated ${sub_vertical} tools.` },
      { name: "Niche Tools", description: "Siloed platforms requiring complex custom pipelines." }
    ];
    competitive_advantage = `Secure workflows ensuring faster execution and custom ${primary_industry} analysis.`;
  }

  // Revenue streams
  let revenue_streams;
  let revenue_streams_summary;
  if (primary_industry.toLowerCase().includes("fintech")) {
    revenue_streams = [
      "1. Interchange Fees: 0.8% transaction fee on capital processing volumes.",
      "2. Premium Tier: Premium analytical models and payment routers starting at $199/mo.",
      "3. Ledger API: Developer APIs for connecting custom accounting nodes ($0.005/call)."
    ];
    revenue_streams_summary = ["interchange fees", "premium analytics", "ledger API calls"];
  } else if (primary_industry.toLowerCase().includes("healthcare")) {
    revenue_streams = [
      "1. Clinic Licensing: Tiered plans starting at $299/mo per practitioner.",
      "2. Transaction Fees: A 1.8% processing fee on telehealth billing.",
      "3. Telemetry Integration: Metered API pricing for medical devices."
    ];
    revenue_streams_summary = ["clinic licensing", "transaction fees", "telemetry integration"];
  } else if (primary_industry.toLowerCase().includes("veterinary")) {
    revenue_streams = [
      "1. Practice Licensing: Tiered plans starting at $199/mo per vet clinic.",
      "2. Tele-health Fees: A 2.0% processing fee on remote veterinary consults.",
      "3. Telemetry Integration: Metered API pricing for pet vitals wearable sensors."
    ];
    revenue_streams_summary = ["practice licensing", "tele-health processing", "wearable telemetry integrations"];
  } else if (primary_industry.toLowerCase().includes("agriculture")) {
    revenue_streams = [
      "1. SaaS Subscription: Monthly tier starting at $99/mo per farmer for crop and soil analytics.",
      "2. Drone telemetry integration: Connected drones fee at $0.05/connected node.",
      "3. Satellite pass pricing: Automated pass processing fees at $5/map."
    ];
    revenue_streams_summary = ["SaaS subscriptions for farmers", "drone telemetry integrations", "automated satellite imagery maps"];
  } else {
    revenue_streams = [
      `1. Subscription Licensing: Tiered plans starting at $149/mo for standard ${main_theme} usage.`,
      "2. Usage Billing: Metered usage based on transaction processing volumes.",
      "3. API Connections: Custom database connections for enterprise operations."
    ];
    revenue_streams_summary = ["SaaS subscriptions", "usage fees", "API connections"];
  }

  // Marketing strategy
  let marketing_strategy;
  if (primary_industry.toLowerCase().includes("fintech")) {
    marketing_strategy = [
      "1. Referral Programs: Dual-incentive referral rewards to boost viral user growth.",
      "2. Financial Influencers: Partner with trusted personal finance creators for educational content.",
      "3. App Store Marketing: Target high-intent search terms around budgeting and automated savings.",
      "4. Banking Partnerships: Secure integrations with retail banks to offer yield incentives."
    ];
  } else if (primary_industry.toLowerCase().includes("agriculture")) {
    marketing_strategy = [
      "1. Cooperatives Pilot: Run pilot programs with agricultural cooperatives to demonstrate soil and crop optimization.",
      "2. Farm Outreach: B2B sales targeting farmers and agronomists.",
      "3. Smart Irrigation Showcases: Case studies highlighting automated water efficiency."
    ];
  } else if (primary_industry.toLowerCase().includes("healthcare")) {
    marketing_strategy = [
      "1. Clinical Trials: Run pilot programs with local clinics to establish efficacy records.",
      "2. B2B Sales: Partner with hospital purchasing groups and medical networks.",
      "3. Medical Webinars: Present compliance audits at regional health summits."
    ];
  } else if (primary_industry.toLowerCase().includes("veterinary")) {
    marketing_strategy = [
      "1. Vet Practice Outreach: Live showcases at major veterinary summits.",
      "2. Clinic Pilots: Offer free practice kits and pilot runs to regional clinics.",
      "3. Wearable Alliances: Partner with popular pet tracker brands to sync telemetry."
    ];
  } else if (primary_industry.toLowerCase().includes("legal")) {
    marketing_strategy = [
      "1. Legal Conferences: Live showcase presentations at regional Bar association summits.",
      "2. B2B Sales: B2B outreach to general counsels in Fortune 550 corporations.",
      "3. Compliance Partnerships: Strategic partnerships with legal practice management platforms."
    ];
  } else {
    marketing_strategy = [
      "1. Referral Program: Growth incentive structures for early customer advocates.",
      "2. Professional Partnerships: Align with industry networks and trade associations.",
      "3. Technical Guides: Expert publications highlighting cost and time efficiency gains."
    ];
  }

  // Target segments
  let target_segments;
  let tam_estimation;
  if (primary_industry.toLowerCase().includes("fintech")) {
    target_segments = ["High-volume digital marketplaces, fintech startups, and online retailers", "Traditional institutions seeking accounting automation"];
    tam_estimation = "$45.2B by 2030";
  } else if (primary_industry.toLowerCase().includes("agriculture")) {
    target_segments = ["Farmers, agronomists, crop insurers, and agricultural cooperatives", "Smart farming operators needing soil, irrigation, drone, and satellite imagery analysis"];
    tam_estimation = "$14.5B by 2028 (12.4% CAGR)";
  } else if (primary_industry.toLowerCase().includes("healthcare")) {
    target_segments = ["General practitioners, private clinics, and local hospitals", "Virtual care startups and patient portal operations"];
    tam_estimation = "$28.4B by 2029 (16.2% CAGR)";
  } else if (primary_industry.toLowerCase().includes("veterinary")) {
    target_segments = ["Veterinary clinics, pet clinics, and professional animal caregivers", "Smart pet tracker manufacturers and pet owners"];
    tam_estimation = "$11.2B by 2029 (10.5% CAGR)";
  } else if (primary_industry.toLowerCase().includes("legal")) {
    target_segments = ["Law firms, corporate legal departments, compliance teams, and legal professionals", "Regulatory compliance auditors and legal operations experts"];
    tam_estimation = "$18.9B by 2030 (13.5% CAGR)";
  } else {
    target_segments = [`Operators, practitioners, and teams looking to optimize their ${main_theme.toLowerCase()} workflow.`, "Small-to-medium enterprises needing accessible digital automation."];
    tam_estimation = "$12.5B globally by 2029";
  }

  // Tech stack
  let tech_stack;
  if (primary_industry.toLowerCase().includes("agriculture")) {
    tech_stack = {
      frontend: "React, Vite, Tailwind CSS v4, Lucide React",
      backend: "FastAPI (Python), Uvicorn",
      database: "PostgreSQL (Relational database), Pinecone (Vector database for crop condition embeddings)",
      cloud: "AWS IoT Core & SageMaker for crop, soil, and irrigation computer vision pipelines"
    };
  } else if (primary_industry.toLowerCase().includes("healthcare")) {
    tech_stack = {
      frontend: "React, Vite, Tailwind CSS v4, Lucide React",
      backend: "FastAPI (Python), Uvicorn",
      database: "PostgreSQL with SSL, HIPAA Vector store",
      cloud: "AWS GovCloud with strict access controls"
    };
  } else if (primary_industry.toLowerCase().includes("veterinary")) {
    tech_stack = {
      frontend: "React, Vite, Tailwind CSS v4, Lucide React",
      backend: "FastAPI (Python), Uvicorn",
      database: "PostgreSQL (Clinical logs), InfluxDB (Telemetry charts)",
      cloud: "AWS with clinical data security compliance"
    };
  } else if (primary_industry.toLowerCase().includes("legal")) {
    tech_stack = {
      frontend: "React, Vite, Tailwind CSS v4, Lucide React",
      backend: "FastAPI (Python), Uvicorn",
      database: "PostgreSQL, Pinecone for vector contract embeddings",
      cloud: "AWS GovCloud with SOC-2 compliance isolation"
    };
  } else {
    tech_stack = {
      frontend: "React, Vite, Tailwind CSS v4, Lucide React",
      backend: "FastAPI (Python), Uvicorn",
      database: "PostgreSQL (Relational), Vector database for document embeddings",
      cloud: "Secure AWS cloud container deployment"
    };
  }

  // Roadmap
  let product_roadmap;
  let roadmap_summary;
  if (primary_industry.toLowerCase().includes("agriculture")) {
    product_roadmap = [
      "Drone data telemetry and satellite imagery fetching pipeline setup.",
      "Validate crop and soil condition predictive models.",
      "Launch pilot dashboard with partner agricultural cooperatives.",
      "Release automated irrigation alerts and multi-spectral drone analysis."
    ];
    roadmap_summary = "Q1 drone and satellite imagery data pipelines, Q2 crop models, Q3 agricultural cooperatives pilot, Q4 automated irrigation";
  } else if (primary_industry.toLowerCase().includes("healthcare")) {
    product_roadmap = [
      "Telemetry pipelines setup and HIPAA clearance mapping.",
      "Launches in 5 local outpatient clinic trial runs.",
      "Pharmacy APIs and medical device endpoints integrated.",
      "Enterprise scaling and clinic telemetry dashboard launches."
    ];
    roadmap_summary = "Q1 telemetry pipelines, Q2 local clinic trials, Q3 pharmacy APIs, Q4 clinic dashboards";
  } else if (primary_industry.toLowerCase().includes("veterinary")) {
    product_roadmap = [
      "IoT vitals telemetry pipeline and practice dashboard built.",
      "Launches in 10 partner vet clinic pilot runs.",
      "Integrates animal pharmacy APIs, vaccination records, and pet owner sync.",
      "Multi-tenant clinic scale and custom pet owner dashboard portals."
    ];
    roadmap_summary = "Q1 telemetry practice dashboard, Q2 clinic pilots, Q3 pharmacy integrations, Q4 owner portals";
  } else if (primary_industry.toLowerCase().includes("legal")) {
    product_roadmap = [
      "Secure document parsing and core regulatory search engine setup.",
      "Launching beta client portal with contract review dashboards.",
      "Launching API developer portal for major integrations.",
      "Custom private cloud deployments for enterprise legal networks."
    ];
    roadmap_summary = "Q1 secure document parsing, Q2 contract review dashboards, Q3 API portals, Q4 private cloud deployments";
  } else {
    product_roadmap = [
      "Launching basic dashboard controls and workspace setup.",
      "Releasing developer portals and connection plugins.",
      "Releasing automated export templates and workspace configurations.",
      "Custom scaling capabilities and enterprise compliance certificates."
    ];
    roadmap_summary = "Q1 core dashboard, Q2 developer portal, Q3 automation modules, Q4 enterprise scale";
  }

  // Mission and Vision themes
  let mission_theme;
  let vision_future;
  if (primary_industry.toLowerCase().includes("healthcare")) {
    mission_theme = "simplify HIPAA-compliant patient data tracking and telehealth clinical logs management with clinical-grade safety and operational efficacy";
    vision_future = "patient-centric systems, driving automated workflows across primary care networks";
  } else if (primary_industry.toLowerCase().includes("veterinary")) {
    mission_theme = "simplify pet vital tracking and veterinary clinical logs management with animal clinical-grade safety and operational efficacy";
    vision_future = "pet-centric animal health systems, driving automated workflows across veterinary clinics, veterinarians, and pet owners";
  } else if (primary_industry.toLowerCase().includes("fintech")) {
    mission_theme = "democratize and secure transaction pipelines using decentralized telemetry and ledger automation";
    vision_future = "a friction-free financial system where payments, compliance, and accounts sync in real time";
  } else if (primary_industry.toLowerCase().includes("agriculture")) {
    mission_theme = "digitize crop monitoring and soil optimization for farmers using satellite imagery, drones, and smart irrigation";
    vision_future = "satellite imagery and drone-powered analytics to optimize crops, manage soil, automate irrigation, and empower agricultural cooperatives";
  } else if (primary_industry.toLowerCase().includes("legal")) {
    mission_theme = "revolutionize legal operations by automating contract review with high-precision regulatory compliance";
    vision_future = "legal automation, establishing a unified operating system for modern law firms and corporate legal departments globally";
  } else {
    mission_theme = `optimize and simplify ${cleanIdea} by utilizing secure automated workflows and tailored intelligence tools`;
    vision_future = `automated efficiency and secure operations in the ${cleanIdea} sector`;
  }

  // Security protocols
  let security_protocols;
  if (primary_industry.toLowerCase().includes("healthcare")) {
    security_protocols = [
      "End-to-end TLS 1.3 in transit and AES-GCM 256 for clinical records at rest",
      "Continuous audit log generation for patient datastore accesses"
    ];
  } else if (primary_industry.toLowerCase().includes("veterinary")) {
    security_protocols = [
      "End-to-end TLS for animal telemetry packets and database encryption",
      "Firmware signing verification for pet vitals wearables"
    ];
  } else if (primary_industry.toLowerCase().includes("fintech")) {
    security_protocols = [
      "TLS 1.3, HSM key management, and field-level database encryption",
      "Real-time telemetry fraud scans and threat mitigation"
    ];
  } else if (primary_industry.toLowerCase().includes("agriculture")) {
    security_protocols = [
      "End-to-end TLS for drone telemetry packets and database encryption",
      "Physical firmware key validation to prevent coordinate spoofing"
    ];
  } else if (primary_industry.toLowerCase().includes("legal")) {
    security_protocols = [
      "TLS 1.3 for data in transit and AES-256 for document databases at rest",
      "Real-time compliance audit logs checked automatically by Legal Agent"
    ];
  } else {
    security_protocols = [
      "End-to-end TLS 1.3 in transit; AES-256 for persistent databases",
      "Rate limits, input validation, and secure authentication methods"
    ];
  }

  // Mitigated risks
  let mitigated_risks;
  if (primary_industry.toLowerCase().includes("healthcare")) {
    mitigated_risks = [
      { name: "Compliance Violations", description: "Regulatory changes in HIPAA requirements", mitigation: "Legal agent continuous audit rules" },
      { name: "Telemetry Failure", description: "Outages in device integrations", mitigation: "Fallback mock values" },
      { name: "System Trust", description: "Patient onboarding friction", mitigation: "Transparent user flows" }
    ];
  } else if (primary_industry.toLowerCase().includes("veterinary")) {
    mitigated_risks = [
      { name: "Telemetry Inaccuracy", description: "Miscalibrated pet tracking collars", mitigation: "Software data filtering and thresholding" },
      { name: "Clinic Onboarding Churn", description: "Practice resistance to software swaps", mitigation: "Free migration services and training sessions" },
      { name: "Hardware Costs", description: "High deployment cost of sensor kits", mitigation: "Subscription lease model" }
    ];
  } else if (primary_industry.toLowerCase().includes("fintech")) {
    mitigated_risks = [
      { name: "Transaction Outages", description: "Gateway API disconnects", mitigation: "High-redundancy routing" },
      { name: "Fraud Rate", description: "Safe transaction chargebacks", mitigation: "Fraud score filters" },
      { name: "Capital Liquidity", description: "Settlement delays", mitigation: "Bank credit lines" }
    ];
  } else if (primary_industry.toLowerCase().includes("agriculture")) {
    mitigated_risks = [
      { name: "Weather Anomalies", description: "Satellite cloud cover blocking drone and camera sweeps", mitigation: "Soil sensor data interpolation models" },
      { name: "Hardware Damage", description: "Irrigation and drone hardware breakdowns", mitigation: "Modular design swaps" },
      { name: "Connectivity Issues", description: "Rural farm connectivity loss", mitigation: "Offline-first dashboard sync" }
    ];
  } else if (primary_industry.toLowerCase().includes("legal")) {
    mitigated_risks = [
      { name: "Accuracy Risks", description: "False predictions in complex litigation checks", mitigation: "Professional lawyer-in-the-loop validation step" },
      { name: "Integration Risks", description: "Outages in court filing APIs", mitigation: "High-resiliency database buffers" },
      { name: "Privacy Violations", description: "Leak of sensitive client agreements", mitigation: "Single-tenant isolated environments" }
    ];
  } else {
    mitigated_risks = [
      { name: "Onboarding Friction", description: "User resistance to digital workflows", mitigation: "Intuitive training interfaces" },
      { name: "API Outages", description: "Third-party connection bottlenecks", mitigation: "Offline fallback capability" },
      { name: "Scale Limits", description: "Large database response lags", mitigation: "Connection pool optimization" }
    ];
  }

  const context = {
    idea,
    business_name,
    primary_industry,
    sub_vertical,
    mission_theme,
    vision_future,
    revenue_streams,
    revenue_streams_summary,
    target_segments,
    tam_estimation,
    competitors,
    competitor_names: competitors.map(c => c.name),
    competitive_advantage,
    marketing_strategy,
    tech_stack,
    product_roadmap,
    roadmap_summary,
    funding_goal: primary_industry.toLowerCase().includes("veterinary") ? "$650K" : ((primary_industry.toLowerCase().includes("agriculture") || primary_industry.toLowerCase().includes("fintech") || primary_industry.toLowerCase().includes("healthcare")) ? "$800K" : "$600K"),
    funding_allocation: "60% engineering, 25% marketing, 15% operations",
    equity_split: "Founders (70%), Option Pool (12%), Investors (18%)",
    compliance_standards,
    security_protocols,
    mitigated_risks
  };

  return buildBusinessReportClient(context);
}
