import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Cpu, ArrowLeft, Layers, Play, CheckCircle2, 
  Hourglass, AlertCircle, RefreshCw, Activity, CheckSquare, 
  Clock, GitBranch, ArrowRight 
} from 'lucide-react';

const generateTasks = (result, main_theme) => {
  const idea = result?.mission || "";
  const businessName = result?.business_name || "";
  const vertical = result?.vertical || "";
  const isLegal = vertical === "LegalTech" || idea.toLowerCase().includes("legal") || idea.toLowerCase().includes("law") || businessName.toLowerCase().includes("legal") || businessName.toLowerCase().includes("law");
  const isHealth = vertical === "Healthcare Systems" || idea.toLowerCase().includes("health") || idea.toLowerCase().includes("medical") || businessName.toLowerCase().includes("health") || businessName.toLowerCase().includes("med");
  const isFin = vertical === "Fintech Solutions" || idea.toLowerCase().includes("fintech") || idea.toLowerCase().includes("bank") || idea.toLowerCase().includes("payment") || businessName.toLowerCase().includes("pay") || businessName.toLowerCase().includes("coin");
  const isEdu = vertical === "Edtech Platform" || idea.toLowerCase().includes("learn") || idea.toLowerCase().includes("school") || idea.toLowerCase().includes("edu") || businessName.toLowerCase().includes("learn") || businessName.toLowerCase().includes("edu");
  const isAgri = vertical === "Agritech/Foodtech Network" || idea.toLowerCase().includes("farm") || idea.toLowerCase().includes("food") || idea.toLowerCase().includes("agri") || businessName.toLowerCase().includes("farm");
  const isClean = vertical === "Cleantech & Energy OS" || idea.toLowerCase().includes("energy") || idea.toLowerCase().includes("carbon") || idea.toLowerCase().includes("clean") || businessName.toLowerCase().includes("solar");

  let domainTasks;

  if (isLegal) {
    domainTasks = {
      completed: [
        { id: 1, title: "Configure legal document parser & OCR extraction models", priority: "High", agent: "CTO Agent" },
        { id: 2, title: "Implement client data isolation and key management systems", priority: "High", agent: "Security Agent" },
        { id: 3, title: "Establish attorney-client privilege data access guidelines", priority: "Medium", agent: "Legal Agent" }
      ],
      in_progress: [
        { id: 4, title: "Design regulatory compliance indexing databases", priority: "High", agent: "Data Analyst Agent" },
        { id: 5, title: "Integrate legal research API adapters & ADK connectors", priority: "High", agent: "CTO Agent" },
        { id: 6, title: "Draft contract review automated audit pipeline schedules", priority: "Medium", agent: "Project Manager Agent" }
      ],
      backlog: [
        { id: 7, title: "Map corporate law firm seat licensing subscription models", priority: "Medium", agent: "Finance Agent" },
        { id: 8, title: "Set up targeted outreach metrics for corporate general counsel", priority: "Medium", agent: "Marketing Agent" },
        { id: 9, title: "Audit Delaware incorporation filings and compliance guides", priority: "High", agent: "Legal Agent" },
        { id: 10, title: "Conduct vulnerability assessment on customer legal datastores", priority: "High", agent: "Security Agent" }
      ]
    };
  } else if (isHealth) {
    domainTasks = {
      completed: [
        { id: 1, title: "Configure telemetry pipelines for clinical sensor telemetry", priority: "High", agent: "CTO Agent" },
        { id: 2, title: "Implement patient data access controls and HIPAA log trails", priority: "High", agent: "Security Agent" },
        { id: 3, title: "Draft clinical trial liability and telehealth agreements", priority: "Medium", agent: "Legal Agent" }
      ],
      in_progress: [
        { id: 4, title: "Initialize PostgreSQL database schemas with encryption", priority: "High", agent: "Data Analyst Agent" },
        { id: 5, title: "Connect patient medical device APIs & ADK integrations", priority: "High", agent: "CTO Agent" },
        { id: 6, title: "Draft clinic deployment sprint and timeline schedules", priority: "Medium", agent: "Project Manager Agent" }
      ],
      backlog: [
        { id: 7, title: "Model clinic seat subscriptions and telemetry API metrics", priority: "Medium", agent: "Finance Agent" },
        { id: 8, title: "Launch marketing channels for practitioner network outreach", priority: "Medium", agent: "Marketing Agent" },
        { id: 9, title: "Verify HIPAA and HITECH legal regulatory guidelines", priority: "High", agent: "Legal Agent" },
        { id: 10, title: "Configure Docker security scan audits for patient logs", priority: "High", agent: "Security Agent" }
      ]
    };
  } else if (isFin) {
    domainTasks = {
      completed: [
        { id: 1, title: "Configure PCI-DSS compliant payment gateways & auth channels", priority: "High", agent: "CTO Agent" },
        { id: 2, title: "Implement HSM transaction signoff keys & authorization", priority: "High", agent: "Security Agent" },
        { id: 3, title: "Establish corporate legal framework for transaction routing", priority: "Medium", agent: "Legal Agent" }
      ],
      in_progress: [
        { id: 4, title: "Model transactional double-entry ledger database tables", priority: "High", agent: "Data Analyst Agent" },
        { id: 5, title: "Integrate transaction settlement APIs & ADK runtimes", priority: "High", agent: "CTO Agent" },
        { id: 6, title: "Draft accounting ledger synchronization timeline schedules", priority: "Medium", agent: "Project Manager Agent" }
      ],
      backlog: [
        { id: 7, title: "Formulate card interchange models and API pricing caps", priority: "Medium", agent: "Finance Agent" },
        { id: 8, title: "Draft Shopify and Salesforce customer acquisition funnels", priority: "Medium", agent: "Marketing Agent" },
        { id: 9, title: "Validate legal status on state-level money transmitter laws", priority: "High", agent: "Legal Agent" },
        { id: 10, title: "Execute PCI-DSS threat vulnerability audits on container logs", priority: "High", agent: "Security Agent" }
      ]
    };
  } else if (isEdu) {
    domainTasks = {
      completed: [
        { id: 1, title: "Configure student interactive course visualizer models", priority: "High", agent: "CTO Agent" },
        { id: 2, title: "Implement child identity filters and child data controls", priority: "High", agent: "Security Agent" },
        { id: 3, title: "Establish educational service agreements & tutor licenses", priority: "Medium", agent: "Legal Agent" }
      ],
      in_progress: [
        { id: 4, title: "Setup student learning analytics datastore schemas", priority: "High", agent: "Data Analyst Agent" },
        { id: 5, title: "Integrate student homework analyzer APIs & ADK runtimes", priority: "High", agent: "CTO Agent" },
        { id: 6, title: "Draft tutor-matching marketplace sprint timeline schedules", priority: "Medium", agent: "Project Manager Agent" }
      ],
      backlog: [
        { id: 7, title: "Model school district seat licensing subscription margins", priority: "Medium", agent: "Finance Agent" },
        { id: 8, title: "Formulate referral campaigns for classmate signups", priority: "Medium", agent: "Marketing Agent" },
        { id: 9, title: "Verify COPPA and FERPA child legal compliance policies", priority: "High", agent: "Legal Agent" },
        { id: 10, title: "Execute child account security audit on system servers", priority: "High", agent: "Security Agent" }
      ]
    };
  } else if (isAgri) {
    domainTasks = {
      completed: [
        { id: 1, title: "Configure IoT weather/soil sensor telemetry APIs", priority: "High", agent: "CTO Agent" },
        { id: 2, title: "Implement physical sensor encryption and credentials", priority: "High", agent: "Security Agent" },
        { id: 3, title: "Establish trade distribution agreements & farm legal rules", priority: "Medium", agent: "Legal Agent" }
      ],
      in_progress: [
        { id: 4, title: "Design real-time timeseries database harvest tables", priority: "High", agent: "Data Analyst Agent" },
        { id: 5, title: "Integrate logistic dispatcher APIs & ADK node systems", priority: "High", agent: "CTO Agent" },
        { id: 6, title: "Draft supply chain logistics coordination schedules", priority: "Medium", agent: "Project Manager Agent" }
      ],
      backlog: [
        { id: 7, title: "Model farm subscription licensing and analytics margins", priority: "Medium", agent: "Finance Agent" },
        { id: 8, title: "Draft outreach metrics for farm extension partnerships", priority: "Medium", agent: "Marketing Agent" },
        { id: 9, title: "Verify local agricultural trade compliance policies", priority: "High", agent: "Legal Agent" },
        { id: 10, title: "Perform security scans on physical IoT telemetry gateways", priority: "High", agent: "Security Agent" }
      ]
    };
  } else if (isClean) {
    domainTasks = {
      completed: [
        { id: 1, title: "Configure clean grid utility integration API endpoints", priority: "High", agent: "CTO Agent" },
        { id: 2, title: "Implement HSM carbon trade certificate authorization", priority: "High", agent: "Security Agent" },
        { id: 3, title: "Establish compliance agreements on carbon offset trading", priority: "Medium", agent: "Legal Agent" }
      ],
      in_progress: [
        { id: 4, title: "Initialize TimescaleDB database schemas for energy meters", priority: "High", agent: "Data Analyst Agent" },
        { id: 5, title: "Integrate green utility telemetry hooks & ADK runtimes", priority: "High", agent: "CTO Agent" },
        { id: 6, title: "Draft warehouse deployment sprints and pipeline schedules", priority: "Medium", agent: "Project Manager Agent" }
      ],
      backlog: [
        { id: 7, title: "Model carbon credit commissions and analytics software margins", priority: "Medium", agent: "Finance Agent" },
        { id: 8, title: "Formulate outreach plans for corporate energy managers", priority: "Medium", agent: "Marketing Agent" },
        { id: 9, title: "Validate compliance policies on regional carbon emissions laws", priority: "High", agent: "Legal Agent" },
        { id: 10, title: "Conduct security vulnerabilities check on factory grid feeds", priority: "High", agent: "Security Agent" }
      ]
    };
  } else {
    domainTasks = {
      completed: [
        { id: 1, title: `Configure ${main_theme} core application custom design styles`, priority: "Medium", agent: "CTO Agent" },
        { id: 2, title: "Implement secure user authentication and database access control", priority: "High", agent: "Security Agent" },
        { id: 3, title: "Establish corporate legal regulations and client data safety rules", priority: "Low", agent: "Legal Agent" }
      ],
      in_progress: [
        { id: 4, title: `Initialize database schemas for ${main_theme} metadata logs`, priority: "High", agent: "Data Analyst Agent" },
        { id: 5, title: `Integrate core ${main_theme} dashboard APIs & ADK runtimes`, priority: "High", agent: "CTO Agent" },
        { id: 6, title: "Draft collaborative agent sync schedules", priority: "Medium", agent: "Project Manager Agent" }
      ],
      backlog: [
        { id: 7, title: `Model ${main_theme} subscription pricing and resource allocation`, priority: "High", agent: "Finance Agent" },
        { id: 8, title: `Configure user funnel tracking scripts for ${main_theme}`, priority: "Medium", agent: "Marketing Agent" },
        { id: 9, title: "Validate platform regulatory compliance policies", priority: "High", agent: "Legal Agent" },
        { id: 10, title: "Configure secure automated package scanner on Docker files", priority: "Medium", agent: "Security Agent" }
      ]
    };
  }

  const allTasks = [];
  domainTasks.completed.forEach(t => allTasks.push({ ...t, progress: 100, status: "completed", column: "Completed" }));
  domainTasks.in_progress.forEach(t => allTasks.push({ ...t, status: "in_progress", column: "In Progress" }));
  domainTasks.backlog.forEach(t => allTasks.push({ ...t, progress: 0, status: "backlog", column: "Backlog" }));
  
  return allTasks;
};

const generateLogs = (result, main_theme) => {
  const idea = result?.mission || "";
  const businessName = result?.business_name || "";
  const vertical = result?.vertical || "";
  const isLegal = vertical === "LegalTech" || idea.toLowerCase().includes("legal") || idea.toLowerCase().includes("law") || businessName.toLowerCase().includes("legal") || businessName.toLowerCase().includes("law");
  const isHealth = vertical === "Healthcare Systems" || idea.toLowerCase().includes("health") || idea.toLowerCase().includes("medical") || businessName.toLowerCase().includes("health") || businessName.toLowerCase().includes("med");
  const isFin = vertical === "Fintech Solutions" || idea.toLowerCase().includes("fintech") || idea.toLowerCase().includes("bank") || idea.toLowerCase().includes("payment") || businessName.toLowerCase().includes("pay") || businessName.toLowerCase().includes("coin");
  const isEdu = vertical === "Edtech Platform" || idea.toLowerCase().includes("learn") || idea.toLowerCase().includes("school") || idea.toLowerCase().includes("edu") || businessName.toLowerCase().includes("learn") || businessName.toLowerCase().includes("edu");
  const isAgri = vertical === "Agritech/Foodtech Network" || idea.toLowerCase().includes("farm") || idea.toLowerCase().includes("food") || idea.toLowerCase().includes("agri") || businessName.toLowerCase().includes("farm");
  const isClean = vertical === "Cleantech & Energy OS" || idea.toLowerCase().includes("energy") || idea.toLowerCase().includes("carbon") || idea.toLowerCase().includes("clean") || businessName.toLowerCase().includes("solar");

  if (isLegal) {
    return [
      { agent: "CTO Agent", action: "Vite compile", msg: "Bundling documents-OCR.js. Compiling high-precision parser tokens." },
      { agent: "Data Analyst Agent", action: "SQL Migration", msg: "Generating legal case table migration scripts: CREATE TABLE clients, files, regulatory_rules." },
      { agent: "Security Agent", action: "Key rotation", msg: "Auditing attorney-client communication channels. Restricting encryption permissions." },
      { agent: "Project Manager Agent", action: "Dependency map", msg: "Mapping sprint 1 dependencies. CTO depends on Data Analyst regulatory database." },
      { agent: "Legal Agent", action: "Compliance scan", msg: "Drafting default Delaware C-Corp filing bylaws and client contract templates." },
      { agent: "Finance Agent", action: "Unit economics", msg: "Simulating margins based on corporate law firm seat subscriptions." },
      { agent: "Marketing Agent", action: "Tracking Setup", msg: "Mapping legal conference invitations and general counsel funnel metrics." },
      { agent: "CTO Agent", action: "Refactoring router", msg: "Adding FastAPI endpoint for document upload parsing: /documents/ocr." }
    ];
  } else if (isHealth) {
    return [
      { agent: "CTO Agent", action: "Vite compile", msg: "Bundling telemetry-charts.js. Compiling medical sensor feeds." },
      { agent: "Data Analyst Agent", action: "SQL Migration", msg: "Generating encrypted database schemas: CREATE TABLE patients, health_logs, telemetry." },
      { agent: "Security Agent", action: "HIPAA check", msg: "Auditing patient datastore access permissions. Verifying SSL connections." },
      { agent: "Project Manager Agent", action: "Dependency map", msg: "Mapping sprint 1 dependencies. CTO depends on Data Analyst database encryption." },
      { agent: "Legal Agent", action: "HIPAA review", msg: "Drafting telehealth agreements and clinical data isolation rules." },
      { agent: "Finance Agent", action: "Unit economics", msg: "Simulating telemetry API subscription margins." },
      { agent: "Marketing Agent", action: "Outreach map", msg: "Mapping practitioner network invitations and clinic signups." },
      { agent: "CTO Agent", action: "Refactoring router", msg: "Adding FastAPI endpoints for clinical telemetry integration: /telemetry/sync." }
    ];
  } else if (isFin) {
    return [
      { agent: "CTO Agent", action: "Vite compile", msg: "Bundling checkout-gateway.js. Compiling payment modules." },
      { agent: "Data Analyst Agent", action: "SQL Migration", msg: "Generating ledger schema migrations: CREATE TABLE double_entry_ledger, transactions, accounts." },
      { agent: "Security Agent", action: "PCI-DSS audit", msg: "Auditing checkout authorizations. Verifying HSM key signings." },
      { agent: "Project Manager Agent", action: "Dependency map", msg: "Mapping sprint 1 dependencies. Security depends on Data Analyst ledger validation." },
      { agent: "Legal Agent", action: "Licensing review", msg: "Auditing state-level money transmitter regulations." },
      { agent: "Finance Agent", action: "Interchange model", msg: "Simulating card transaction pricing and operational margins." },
      { agent: "Marketing Agent", action: "Tracking Setup", msg: "Mapping Shopify and Salesforce customer acquisition metrics." },
      { agent: "CTO Agent", action: "Refactoring router", msg: "Adding FastAPI endpoint for transaction settlements: /ledger/settle." }
    ];
  } else if (isEdu) {
    return [
      { agent: "CTO Agent", action: "Vite compile", msg: "Bundling learning-timeline.js. Compiling student course charts." },
      { agent: "Data Analyst Agent", action: "SQL Migration", msg: "Generating analytics schema migrations: CREATE TABLE students, classes, homework_logs." },
      { agent: "Security Agent", action: "COPPA audit", msg: "Auditing child identity filters and account access permissions." },
      { agent: "Project Manager Agent", action: "Dependency map", msg: "Mapping sprint 1 dependencies. CTO depends on Data Analyst course files." },
      { agent: "Legal Agent", action: "Privacy review", msg: "Drafting default school agreements and child privacy compliance templates." },
      { agent: "Finance Agent", action: "Pricing model", msg: "Simulating school district seat licensing budgets." },
      { agent: "Marketing Agent", action: "Tracking Setup", msg: "Planning organic referral invite campaigns for student users." },
      { agent: "CTO Agent", action: "Refactoring router", msg: "Adding FastAPI endpoints for student homework help requests: /homework/parse." }
    ];
  } else if (isAgri) {
    return [
      { agent: "CTO Agent", action: "Vite compile", msg: "Bundling weather-iot.js. Compiling sensor dashboard metrics." },
      { agent: "Data Analyst Agent", action: "SQL Migration", msg: "Generating timeseries database migrations: CREATE TABLE sensors, harvests, logistics." },
      { agent: "Security Agent", action: "IoT validation", msg: "Verifying certificate key signatures on telemetry gateways." },
      { agent: "Project Manager Agent", action: "Dependency map", msg: "Mapping sprint 1 dependencies. CTO depends on Data Analyst timeseries schemas." },
      { agent: "Legal Agent", action: "Trade review", msg: "Drafting local agricultural distribution agreements." },
      { agent: "Finance Agent", action: "OPEX model", msg: "Simulating margins based on connected sensor licensing." },
      { agent: "Marketing Agent", action: "Tracking Setup", msg: "Planning outreach metrics for farm extension services." },
      { agent: "CTO Agent", action: "Refactoring router", msg: "Adding FastAPI endpoints for dispatcher location tracking: /logistics/route." }
    ];
  } else if (isClean) {
    return [
      { agent: "CTO Agent", action: "Vite compile", msg: "Bundling grid-power.js. Compiling energy dashboard metrics." },
      { agent: "Data Analyst Agent", action: "SQL Migration", msg: "Generating energy timeseries database migrations: CREATE TABLE meters, offsets, credits." },
      { agent: "Security Agent", action: "Grid protection", msg: "Auditing certificate authorities on connected factory utility meters." },
      { agent: "Project Manager Agent", action: "Dependency map", msg: "Mapping sprint 1 dependencies. CTO depends on Data Analyst database." },
      { agent: "Legal Agent", action: "Trade review", msg: "Drafting compliance guidelines on regional carbon credit markets." },
      { agent: "Finance Agent", action: "OPEX model", msg: "Simulating commissions from carbon offset trades." },
      { agent: "Marketing Agent", action: "Tracking Setup", msg: "Planning B2B outreach funnels for energy utility managers." },
      { agent: "CTO Agent", action: "Refactoring router", msg: "Adding FastAPI endpoints for carbon credits trading: /offsets/trade." }
    ];
  }

  return [
    { agent: "CTO Agent", action: "Vite compile", msg: `Bundling index-CyAGWymy.js. Compiling ${main_theme} style tokens.` },
    { agent: "Data Analyst Agent", action: "SQL Migration", msg: `Generating table migration scripts: CREATE TABLE ${main_theme.toLowerCase()}_users, records, agent_logs.` },
    { agent: "Security Agent", action: "Vulnerability check", msg: "Auditing auth middleware. Standardizing JWT signature checks to HS256." },
    { agent: "Project Manager Agent", action: "Dependency map", msg: "Mapping sprint 1 dependencies. CTO depends on Data Analyst database setup." },
    { agent: "Legal Agent", action: "Contract review", msg: "Drafting default governance bylaws. Incorporating board resolution stubs." },
    { agent: "Finance Agent", action: "Economics check", msg: "Simulating margins and payback periods." },
    { agent: "Marketing Agent", action: "Tracking Setup", msg: "Resolving GTM tag scripts. Planning organic invite parameters." },
    { agent: "CTO Agent", action: "Refactoring router", msg: `Adding FastAPI router paths for ${main_theme} channels: /sync.` }
  ];
};

export default function DeveloperWorkspace({ businessName, result, onClose }) {
  const main_theme = result?.business_name ? result.business_name.split(' ')[0] : "Startup";
  const initialTasksList = result?.tasks || generateTasks(result, main_theme);
  const mockLogsList = result?.workspace_logs || generateLogs(result, main_theme);
  
  const [tasks, setTasks] = useState(initialTasksList);
  const [logs, setLogs] = useState([]);
  const [buildProgress, setBuildProgress] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(18);
  const [isSimulationComplete, setIsSimulationComplete] = useState(false);
  const logContainerRef = useRef(null);

  // Set up live activity simulator
  useEffect(() => {
    // Generate initial set of logs
    const initialLogs = Array.from({ length: 3 }).map((_, idx) => {
      const logSource = mockLogsList[idx % mockLogsList.length];
      return {
        agent: logSource.agent,
        action: logSource.action,
        msg: logSource.msg,
        timestamp: new Date(Date.now() - (3 - idx) * 30000)
      };
    });
    setLogs(initialLogs);

    let step = 0;

    const logTimer = setInterval(() => {
      step += 1;
      
      if (step > 9) {
        clearInterval(logTimer);
        setIsSimulationComplete(true);
        return;
      }

      // 1. Append a new log message
      const logSource = mockLogsList[step % mockLogsList.length];
      setLogs(prevLogs => [
        ...prevLogs,
        {
          agent: logSource.agent,
          action: logSource.action,
          msg: logSource.msg,
          timestamp: new Date()
        }
      ]);

      // 2. Transition tasks step-by-step
      setTasks(getTasksForStep(step));

      // 3. Update build status metrics
      setBuildProgress(() => {
        if (step >= 9) return 100;
        return 60 + step * 4.5;
      });

      // 4. Decrease time remaining
      setTimeRemaining(() => {
        if (step >= 9) return 0;
        return Math.max(18 - step * 2, 2);
      });

    }, 900); // 900ms per step * 10 steps = 9.0 seconds total simulation

    return () => clearInterval(logTimer);
  }, []);

  // Helper function for deterministic task transitions
  const getTasksForStep = (step) => {
    const updated = initialTasksList.map(t => ({ ...t }));
    
    if (step === 0) return updated;
    
    // Step 1: Task 4, 5, 6 progress. Task 7 moves to In Progress (15%)
    if (step >= 1) {
      updated[3] = { ...updated[3], progress: 60 }; // Task 4
      updated[4] = { ...updated[4], progress: 50 }; // Task 5
      updated[5] = { ...updated[5], progress: 30 }; // Task 6
      updated[6] = { ...updated[6], status: 'in_progress', column: 'In Progress', progress: 15 }; // Task 7
    }
    
    // Step 2: Task 8 moves to In Progress (15%)
    if (step >= 2) {
      updated[3] = { ...updated[3], progress: 80 };
      updated[4] = { ...updated[4], progress: 75 };
      updated[5] = { ...updated[5], progress: 55 };
      updated[6] = { ...updated[6], progress: 35 };
      updated[7] = { ...updated[7], status: 'in_progress', column: 'In Progress', progress: 15 }; // Task 8
    }
    
    // Step 3: Task 4 hits 100 (Completed!). Task 9 moves to In Progress (20%)
    if (step >= 3) {
      updated[3] = { ...updated[3], status: 'completed', column: 'Completed', progress: 100 };
      updated[4] = { ...updated[4], progress: 90 };
      updated[5] = { ...updated[5], progress: 75 };
      updated[6] = { ...updated[6], progress: 55 };
      updated[7] = { ...updated[7], progress: 35 };
      updated[8] = { ...updated[8], status: 'in_progress', column: 'In Progress', progress: 20 }; // Task 9
    }
    
    // Step 4: Task 5 hits 100 (Completed!). Task 10 moves to In Progress (15%)
    if (step >= 4) {
      updated[4] = { ...updated[4], status: 'completed', column: 'Completed', progress: 100 };
      updated[5] = { ...updated[5], progress: 95 };
      updated[6] = { ...updated[6], progress: 75 };
      updated[7] = { ...updated[7], progress: 60 };
      updated[8] = { ...updated[8], progress: 45 };
      updated[9] = { ...updated[9], status: 'in_progress', column: 'In Progress', progress: 15 }; // Task 10
    }
    
    // Step 5: Task 6 hits 100 (Completed!)
    if (step >= 5) {
      updated[5] = { ...updated[5], status: 'completed', column: 'Completed', progress: 100 };
      updated[6] = { ...updated[6], progress: 95 };
      updated[7] = { ...updated[7], progress: 80 };
      updated[8] = { ...updated[8], progress: 65 };
      updated[9] = { ...updated[9], progress: 40 };
    }
    
    // Step 6: Task 7 hits 100 (Completed!)
    if (step >= 6) {
      updated[6] = { ...updated[6], status: 'completed', column: 'Completed', progress: 100 };
      updated[7] = { ...updated[7], progress: 95 };
      updated[8] = { ...updated[8], progress: 80 };
      updated[9] = { ...updated[9], progress: 60 };
    }
    
    // Step 7: Task 8 hits 100 (Completed!)
    if (step >= 7) {
      updated[7] = { ...updated[7], status: 'completed', column: 'Completed', progress: 100 };
      updated[8] = { ...updated[8], progress: 95 };
      updated[9] = { ...updated[9], progress: 80 };
    }
    
    // Step 8: Task 9 hits 100 (Completed!)
    if (step >= 8) {
      updated[8] = { ...updated[8], status: 'completed', column: 'Completed', progress: 100 };
      updated[9] = { ...updated[9], progress: 95 };
    }
    
    // Step 9: Task 10 hits 100 (Completed!)
    if (step >= 9) {
      updated[9] = { ...updated[9], status: 'completed', column: 'Completed', progress: 100 };
    }
    
    return updated;
  };

  // Auto-scroll terminal log container without moving browser page window
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const totalTasks = tasks.length;
  const completedTasksCount = tasks.filter(t => t.status === "completed").length;
  const inProgressTasksCount = tasks.filter(t => t.status === "in_progress").length;

  const getPriorityColor = (p) => {
    switch (p) {
      case 'High': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      
      {/* Header bar with Back trigger */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition flex items-center justify-center"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 uppercase">
                Active Workspace
              </span>
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                <GitBranch size={12} /> main
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold font-display text-white tracking-wide mt-1">
              Developer Workspace: <span className="text-indigo-400">{businessName || "Startup"}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isSimulationComplete ? (
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 rounded-xl px-4 py-2 text-xs font-mono text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)] animate-fadeIn">
              ✅ Developer Workspace Ready
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Agent Compiling Running
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="glass-panel rounded-xl p-4 border border-slate-800/80">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <CheckSquare size={12} className="text-indigo-400" />
            Total Tasks
          </div>
          <div className="text-2xl font-extrabold font-display text-white mt-1">{totalTasks}</div>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Software features</p>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-slate-800/80">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-emerald-400" />
            Completed Tasks
          </div>
          <div className="text-2xl font-extrabold font-display text-emerald-400 mt-1">{completedTasksCount}</div>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{Math.round((completedTasksCount/totalTasks)*100)}% progress rate</p>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-slate-800/80">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Cpu size={12} className="text-cyan-400" />
            Active Agents
          </div>
          <div className="text-2xl font-extrabold font-display text-white mt-1">8</div>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Parallel developers</p>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-slate-800/80">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Activity size={12} className="text-purple-400" />
            Build Status
          </div>
          <div className="text-xl font-bold font-display text-indigo-400 mt-1.5 flex items-center gap-2">
            <Hourglass size={14} className="animate-spin text-indigo-400" />
            {Math.round(buildProgress)}% Ready
          </div>
          <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-2 border border-slate-900">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${buildProgress}%` }}></div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-4 border border-slate-800/80 col-span-2 lg:col-span-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Clock size={12} className="text-amber-400" />
            Est. Completion
          </div>
          <div className="text-2xl font-extrabold font-display text-amber-400 mt-1">~{timeRemaining}m</div>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Awaiting agent iterations</p>
        </div>
      </div>

      {/* Grid: Overview + Active Agents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Project Overview Panel */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-5 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold font-mono uppercase tracking-widest text-indigo-300 mb-3 flex items-center gap-1.5">
              <Layers size={14} />
              Project Overview
            </h2>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase">Core Startup Mandate</span>
                <p className="text-sm text-slate-300 font-light leading-relaxed mt-1">{result?.mission || "Building business foundation..."}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Target Market Segment</span>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1 font-light">{result?.target_market?.split('\n')[0] || "Founding developers"}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Current Development Phase</span>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1 font-light">Sprint 1: MVP Core Database and Auth Integration</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stack indicators */}
          <div className="border-t border-slate-800/60 pt-4 mt-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">Technology Stack Selected</span>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'Vite 5', 'Tailwind v4', 'FastAPI', 'Python', 'Google ADK', 'Gemini'].map((tech, idx) => (
                <span key={idx} className="text-[10px] font-mono bg-slate-900 border border-slate-850 px-2 py-1 rounded text-slate-400 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Active AI Developers Panel */}
        <div className="glass-panel rounded-xl p-5 border border-slate-800/80 flex flex-col">
          <h2 className="text-sm font-bold font-mono uppercase tracking-widest text-indigo-300 mb-3 flex items-center gap-1.5">
            <Cpu size={14} />
            Board Developers
          </h2>
          <div className="flex-1 overflow-y-auto space-y-3.5 max-h-[220px] pr-1">
            {[
              { role: "CTO Agent", state: isSimulationComplete ? "Standing by / Idle" : "Compiling code router", color: "bg-cyan-500" },
              { role: "Data Analyst Agent", state: isSimulationComplete ? "Standing by / Idle" : "Drafting schema migrations", color: "bg-blue-500" },
              { role: "Security Agent", state: isSimulationComplete ? "Standing by / Idle" : "Checking JWT route safety", color: "bg-red-500" },
              { role: "Project Manager Agent", state: isSimulationComplete ? "Standing by / Idle" : "Drafting agile sprints", color: "bg-purple-500" },
              { role: "Legal Agent", state: isSimulationComplete ? "Standing by / Idle" : "Evaluating incorporation details", color: "bg-orange-500" }
            ].map((dev, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs bg-slate-900/40 border border-slate-850 p-2.5 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isSimulationComplete ? "bg-slate-650" : dev.color} ${isSimulationComplete ? "" : "animate-pulse"}`}></span>
                  <span className="font-semibold text-slate-200">{dev.role}</span>
                </div>
                <span className="text-slate-400 font-mono text-[10px] truncate max-w-[150px]">{dev.state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kanban Layout Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-display text-indigo-300 border-l-4 border-indigo-500 pl-3 tracking-wide">
          Development Board
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Backlog Column */}
          <div className="glass-panel rounded-xl p-4 border border-slate-800/60 bg-slate-950/20 flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                <h3 className="font-bold text-slate-300 text-sm font-display tracking-wide">Backlog</h3>
              </div>
              <span className="text-xs font-mono bg-slate-900 text-slate-500 px-2 py-0.5 rounded border border-slate-800">
                {isSimulationComplete ? 1 : tasks.filter(t => t.status === "backlog").length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {isSimulationComplete ? (
                <div className="glass-panel p-4 rounded-xl border border-slate-850 bg-slate-900/10 shadow-md opacity-80 animate-fadeIn">
                  <div className="flex justify-between items-start gap-2 mb-2.5">
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border text-slate-400 bg-slate-500/10 border-slate-500/20">
                      Next Sprint
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Standby</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-400 leading-normal">Prepare Sprint 2: Direct GitHub repository export & API pipeline keys</h4>
                  <div className="border-t border-slate-850 mt-3 pt-2.5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span className="text-indigo-400 font-semibold">Project Manager Agent</span>
                    <span>Sprint 1 met</span>
                  </div>
                </div>
              ) : (
                tasks.filter(t => t.status === "backlog").map(task => (
                  <div key={task.id} className="glass-panel p-4 rounded-xl border border-slate-850 bg-slate-900/20 shadow-md">
                    <div className="flex justify-between items-start gap-2 mb-2.5">
                      <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                        {task.priority} Priority
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Todo</span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-200 leading-normal">{task.title}</h4>
                    <div className="border-t border-slate-850 mt-3 pt-2.5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                      <span className="text-indigo-400 font-semibold">{task.agent}</span>
                      <span>0% progress</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="glass-panel rounded-xl p-4 border border-slate-800/60 bg-slate-950/20 flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <h3 className="font-bold text-slate-300 text-sm font-display tracking-wide">In Progress</h3>
              </div>
              <span className="text-xs font-mono bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                {isSimulationComplete ? 1 : tasks.filter(t => t.status === "in_progress").length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {isSimulationComplete ? (
                <div className="glass-panel p-4 rounded-xl border border-indigo-500/20 bg-slate-900/30 shadow-md relative overflow-hidden animate-fadeIn">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500/50" />
                  
                  <div className="flex justify-between items-start gap-2 mb-2.5">
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                      Summary
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 size={10} /> Verified
                    </span>
                  </div>
                  
                  <h4 className="text-xs font-bold text-white mb-2 leading-relaxed">Sprint 1 Execution Finalized</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-light mb-3">
                    FastAPI router paths created, CORS settings loaded, and Tailwind CSS v4 assets bundled. Delaware C-Corp bylaws and GDPR data security compliance maps drafted successfully.
                  </p>
                  
                  <div className="border-t border-slate-850 pt-2.5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span className="text-indigo-400 font-semibold">CEO & CTO Agents</span>
                    <span className="text-emerald-400 font-bold">100% Compile</span>
                  </div>
                </div>
              ) : (
                tasks.filter(t => t.status === "in_progress").map(task => (
                  <div key={task.id} className="glass-panel p-4 rounded-xl border border-indigo-500/15 bg-slate-900/30 shadow-md shadow-indigo-950/5 relative overflow-hidden">
                    {/* Top pulsating border light */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400/30 animate-pulse" />
                    
                    <div className="flex justify-between items-start gap-2 mb-2.5">
                      <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                        {task.priority} Priority
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                        <RefreshCw size={10} className="animate-spin" /> In Progress
                      </span>
                    </div>
                    
                    <h4 className="text-xs font-semibold text-slate-200 leading-normal">{task.title}</h4>
                    
                    {/* Progress slide */}
                    <div className="space-y-1.5 mt-3.5">
                      <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden border border-slate-900">
                        <div className="h-full bg-gradient-to-r from-amber-400 to-indigo-500 rounded-full" style={{ width: `${task.progress}%` }}></div>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span className="text-indigo-400 font-semibold">{task.agent}</span>
                        <span className="text-amber-400 font-bold">{Math.round(task.progress)}%</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div className="glass-panel rounded-xl p-4 border border-slate-800/60 bg-slate-950/20 flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <h3 className="font-bold text-slate-300 text-sm font-display tracking-wide">Completed</h3>
              </div>
              <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                {tasks.filter(t => t.status === "completed").length}
              </span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {tasks.filter(t => t.status === "completed").map(task => (
                <div key={task.id} className="glass-panel p-4 rounded-xl border border-emerald-500/15 bg-slate-900/10 shadow-md">
                  <div className="flex justify-between items-start gap-2 mb-2.5">
                    <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority} Priority
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 size={11} /> Merged
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-300 leading-normal">{task.title}</h4>
                  <div className="border-t border-slate-850 mt-3 pt-2.5 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span className="text-indigo-400 font-semibold">{task.agent}</span>
                    <span className="text-emerald-400">100% complete</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Live Activity Terminal Log */}
      <div className="glass-panel rounded-xl border border-slate-800/80 bg-slate-950/80 overflow-hidden font-mono text-xs flex flex-col h-[280px]">
        <div className="bg-slate-950 px-4 py-2 border-b border-slate-900 flex justify-between items-center">
          <span className="text-slate-400 flex items-center gap-2">
            <Terminal size={14} className="text-indigo-400" />
            active_board_codebase_streams.log
          </span>
          {isSimulationComplete ? (
            <span className="text-[10px] text-emerald-400 font-semibold font-mono">Process Frozen</span>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] text-indigo-400/80 animate-pulse">
              <Activity size={10} />
              <span>Streaming logs...</span>
            </div>
          )}
        </div>
        <div ref={logContainerRef} className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-2 text-slate-300 leading-normal animate-fadeIn">
              <span className="text-slate-600 font-light">[{log.timestamp.toLocaleTimeString()}]</span>
              <span className="text-indigo-400 font-bold shrink-0">[{log.agent}]</span>
              <span className="text-emerald-500 font-medium font-mono shrink-0">[{log.action}]</span>
              <span className="text-slate-300 font-light">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
