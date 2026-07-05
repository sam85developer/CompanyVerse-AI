from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import random
import time
import os

from app.config import settings

# Attempt to import Google GenAI SDK for actual dynamic generation
try:
    from google import genai
    from google.genai import types
    HAS_GEMINI_SDK = True
except ImportError:
    HAS_GEMINI_SDK = False

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI-powered Business Operating System where multiple AI executive agents collaborate",
    version="1.0.0"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BusinessRequest(BaseModel):
    idea: str

class AgentLog(BaseModel):
    agent: str
    action: str
    timestamp: float
    message: str

class BusinessResult(BaseModel):
    business_name: str
    mission: str
    vision: str
    revenue_model: str
    target_market: str
    competitor_analysis: str
    marketing_strategy: str
    tech_stack: str
    product_roadmap: str
    funding_plan: str
    security_report: str
    risk_analysis: str
    final_business_score: int
    execution_logs: List[AgentLog]
    vertical: str
    agent_cards: List[Dict[str, Any]]
    tasks: List[Dict[str, Any]]
    workspace_logs: List[Dict[str, Any]]

@app.get("/api/v1/status")
def read_status():
    return {"status": "online", "project": settings.PROJECT_NAME}

def clean_idea_for_mission(idea: str) -> str:
    s = idea.strip()
    lower = s.lower()
    prefixes = [
        "build an ", "build a ", "build ", 
        "create an ", "create a ", "create ", 
        "develop an ", "develop a ", "develop ", 
        "automated ", "automate ", "providing an ", 
        "providing a ", "providing ", "provide an ", 
        "provide a ", "provide "
    ]
    for p in prefixes:
        if lower.startswith(p):
            s = s[len(p):].strip()
            break
    if s and s[0].isupper() and (len(s) == 1 or not s[1].isupper()):
        s = s[0].lower() + s[1:]
    return s

def build_business_report(context_dict: Dict[str, Any]) -> Dict[str, Any]:
    # Mission
    mission = f"To revolutionize {context_dict['primary_industry']} by building {context_dict['business_name']} to {context_dict['mission_theme']}."
    
    # Vision
    vision = f"To pioneer the future of {context_dict['sub_vertical']}, establishing a secure and sustainable system for {context_dict['vision_future']}."
    
    # Competitor Analysis
    competitor_analysis = (
        f"- {context_dict['competitors'][0]['name']}: {context_dict['competitors'][0]['description']}\n"
        f"- {context_dict['competitors'][1]['name']}: {context_dict['competitors'][1]['description']}\n"
        f"- {context_dict['business_name']} Advantage: {context_dict['competitive_advantage']}"
    )
    
    # Target Market
    target_market = (
        f"- Primary Segment: {context_dict['target_segments'][0]}\n"
        f"- Secondary Segment: {context_dict['target_segments'][1]}\n"
        f"- Global TAM: Projected at {context_dict['tam_estimation']}."
    )
    
    # Marketing Strategy
    marketing_strategy = "\n".join(context_dict['marketing_strategy'])
    
    # Tech Stack
    tech_stack = (
        f"- Frontend: {context_dict['tech_stack']['frontend']}\n"
        f"- Backend: {context_dict['tech_stack']['backend']}\n"
        f"- Database: {context_dict['tech_stack']['database']}\n"
        f"- Cloud: {context_dict['tech_stack']['cloud']}"
    )
    
    # Product Roadmap
    product_roadmap = (
        f"- Q1: {context_dict['product_roadmap'][0]}\n"
        f"- Q2: {context_dict['product_roadmap'][1]}\n"
        f"- Q3: {context_dict['product_roadmap'][2]}\n"
        f"- Q4: {context_dict['product_roadmap'][3]}"
    )
    
    # Revenue Model
    revenue_model = "\n".join(context_dict['revenue_streams'])
    
    # Funding Plan
    funding_plan = (
        f"1. Pre-Seed Goal: Raise {context_dict['funding_goal']} to finance development.\n"
        f"2. Allocation: {context_dict['funding_allocation']}.\n"
        f"3. Equity Split: {context_dict['equity_split']}."
    )
    
    # Security Report
    security_report = (
        f"- Compliance Targets: {', '.join(context_dict['compliance_standards'])}.\n"
        f"- Data Protection: {context_dict['security_protocols'][0]}.\n"
        f"- Threat Modeling: {context_dict['security_protocols'][1]}."
    )
    
    # Risk Analysis
    risk_analysis = (
        f"1. {context_dict['mitigated_risks'][0]['name']} (High Risk): {context_dict['mitigated_risks'][0]['description']}. Mitigation: {context_dict['mitigated_risks'][0]['mitigation']}\n"
        f"2. {context_dict['mitigated_risks'][1]['name']} (Medium Risk): {context_dict['mitigated_risks'][1]['description']}. Mitigation: {context_dict['mitigated_risks'][1]['mitigation']}\n"
        f"3. {context_dict['mitigated_risks'][2]['name']} (Low Risk): {context_dict['mitigated_risks'][2]['description']}. Mitigation: {context_dict['mitigated_risks'][2]['mitigation']}"
    )
    
    # Agent Cards
    agent_configs = [
        {"name": "CEO Agent", "role": "Chief Executive Officer", "icon": "Building2", "color": "border-indigo-500/20 text-indigo-400"},
        {"name": "CTO Agent", "role": "Chief Technology Officer", "icon": "Cpu", "color": "border-cyan-500/20 text-cyan-400"},
        {"name": "Finance Agent", "role": "Chief Financial Officer", "icon": "Landmark", "color": "border-emerald-500/20 text-emerald-400"},
        {"name": "Marketing Agent", "role": "Chief Marketing Officer", "icon": "Megaphone", "color": "border-fuchsia-500/20 text-fuchsia-400"},
        {"name": "Security Agent", "role": "Chief Information Security Officer", "icon": "ShieldCheck", "color": "border-red-500/20 text-red-400"},
        {"name": "Project Manager Agent", "role": "Operations Lead", "icon": "Milestone", "color": "border-purple-500/20 text-purple-400"},
        {"name": "Legal Agent", "role": "Chief Legal Officer", "icon": "Scale", "color": "border-orange-500/20 text-orange-400"},
        {"name": "Data Analyst Agent", "role": "Head of Analytics", "icon": "BarChart3", "color": "border-blue-500/20 text-blue-400"}
    ]
    
    descriptions = {
        "CEO Agent": f"Defines business growth strategy for {context_dict['sub_vertical']}, refines company mission/vision, and orchestrates final board decisions.",
        "CTO Agent": f"Selects the technology stack ({context_dict['tech_stack']['backend']} and {context_dict['tech_stack']['database']}), designs product milestones, and plans technical roadmaps.",
        "Finance Agent": f"Defines revenue streams ({', '.join(context_dict['revenue_streams_summary'])}), financial projections, equity allocations, and seed funding plans.",
        "Marketing Agent": f"Performs competitor analyses against {', '.join(context_dict['competitor_names'])}, isolates target demographics, and creates customer acquisition loops.",
        "Security Agent": f"Models compliance boundaries ({', '.join(context_dict['compliance_standards'])}), establishes security protocols, and drafts security policies.",
        "Project Manager Agent": f"Orchestrates product roadmap milestones ({context_dict['roadmap_summary']}), maps project timelines, and schedules agile sprint processes.",
        "Legal Agent": f"Advises on regulatory guidelines, land/data access licensing, IP rights, and corporate bylaws.",
        "Data Analyst Agent": f"Defines database schema telemetry ({context_dict['tech_stack']['database']}), tracks user growth metrics, and isolates target KPIs."
    }
    
    cards = []
    for ac in agent_configs:
        cards.append({
            "name": ac["name"],
            "role": ac["role"],
            "icon": ac["icon"],
            "color": ac["color"],
            "desc": descriptions[ac["name"]]
        })
        
    # Tasks
    completed = [
        { "id": 1, "title": f"Configure {context_dict['tech_stack']['backend']} core endpoints and telemetry interfaces", "priority": "High", "agent": "CTO Agent" },
        { "id": 2, "title": f"Implement database encryption and secure authentication for {context_dict['tech_stack']['database']}", "priority": "High", "agent": "Security Agent" },
        { "id": 3, "title": f"Establish corporate regulatory guidelines and compliance frameworks for {', '.join(context_dict['compliance_standards'])}", "priority": "Medium", "agent": "Legal Agent" }
    ]
    in_progress = [
        { "id": 4, "title": f"Design database schema and metrics table layouts for {context_dict['tech_stack']['database']}", "priority": "High", "agent": "Data Analyst Agent" },
        { "id": 5, "title": f"Integrate third-party API handlers and service adapters", "priority": "High", "agent": "CTO Agent" },
        { "id": 6, "title": f"Draft Q1-Q2 operational sprint schedules and dependency charts", "priority": "Medium", "agent": "Project Manager Agent" }
    ]
    backlog = [
        { "id": 7, "title": f"Model unit economics, margins, and pricing tiers for {context_dict['revenue_streams_summary'][0]}", "priority": "Medium", "agent": "Finance Agent" },
        { "id": 8, "title": f"Set up customer acquisition tracking and funnel dashboards", "priority": "Medium", "agent": "Marketing Agent" },
        { "id": 9, "title": f"Audit default incorporation filing bylaws and intellectual property rights", "priority": "High", "agent": "Legal Agent" },
        { "id": 10, "title": f"Configure secure vulnerability scanner and Docker container scan rules", "priority": "High", "agent": "Security Agent" }
    ]
    
    all_tasks = []
    for t in completed:
        all_tasks.append({**t, "progress": 100, "status": "completed", "column": "Completed"})
    for t in in_progress:
        all_tasks.append({**t, "progress": 50, "status": "in_progress", "column": "In Progress"})
    for t in backlog:
        all_tasks.append({**t, "progress": 0, "status": "backlog", "column": "Backlog"})
        
    # Logs
    main_theme = context_dict['business_name'].split()[0] if context_dict['business_name'] else "Startup"
    workspace_logs = [
        { "agent": "CTO Agent", "action": "Vite compile", "msg": f"Bundling {context_dict['business_name'].lower()}-app.js. Compiling core module style tokens." },
        { "agent": "Data Analyst Agent", "action": "SQL Migration", "msg": f"Generating {context_dict['tech_stack']['database']} migration scripts: CREATE TABLE metadata, user_records, metrics." },
        { "agent": "Security Agent", "action": "Key rotation", "msg": "Auditing security controls. Restricting API token permissions." },
        { "agent": "Project Manager Agent", "action": "Dependency map", "msg": f"Mapping sprint 1 dependencies. CTO depends on Data Analyst {context_dict['tech_stack']['database']} schemas." },
        { "agent": "Legal Agent", "action": "Compliance scan", "msg": "Drafting corporate bylaws and standard client service agreement agreements." },
        { "agent": "Finance Agent", "action": "OPEX model", "msg": f"Simulating unit economics based on {context_dict['revenue_streams_summary'][0]} projections." },
        { "agent": "Marketing Agent", "action": "Tracking Setup", "msg": f"Planning outreach metrics and user acquisition loops for {context_dict['sub_vertical']}." },
        { "agent": "CTO Agent", "action": "Refactoring router", "msg": f"Adding FastAPI router paths for {context_dict['business_name']} services." }
    ]
    
    return {
        "business_name": context_dict['business_name'],
        "mission": mission,
        "vision": vision,
        "revenue_model": revenue_model,
        "target_market": target_market,
        "competitor_analysis": competitor_analysis,
        "marketing_strategy": marketing_strategy,
        "tech_stack": tech_stack,
        "product_roadmap": product_roadmap,
        "funding_plan": funding_plan,
        "security_report": security_report,
        "risk_analysis": risk_analysis,
        "final_business_score": random.randint(84, 96),
        "vertical": context_dict['sub_vertical'],
        "agent_cards": cards,
        "tasks": all_tasks,
        "workspace_logs": workspace_logs
    }

def generate_fallback_context(idea: str) -> Dict[str, Any]:
    words = [w.strip(".,!?()\"'").lower() for w in idea.split()]
    clean_idea = clean_idea_for_mission(idea)
    
    # Classify vertical dynamically (check Veterinary & Agriculture first to prevent clinic/clinical/disease matching Healthcare)
    primary_industry = "SaaS Platform"
    sub_vertical = "SaaS Platform"
    
    if any(w in words for w in ["veterinary", "vet", "pet", "animal", "dog", "cat"]):
        primary_industry = "Veterinary Services"
        sub_vertical = "Pet Vitals & Clinical Tracking"
    elif any(w in words for w in ["precision", "satellite", "imagery", "crop", "crops", "farm", "farmers", "agronomy", "agritech", "soil", "irrigation", "drone", "drones", "cooperative", "cooperatives", "agriculture"]):
        primary_industry = "Agriculture"
        sub_vertical = "Precision Agriculture"
    elif any(w in words for w in ["health", "medical", "hospital", "doctor", "clinic", "patient", "disease", "care"]):
        primary_industry = "Healthcare Systems"
        sub_vertical = "Healthcare Systems"
    elif any(w in words for w in ["finance", "fintech", "bank", "payment", "crypto", "ledger", "money", "budget"]):
        primary_industry = "Fintech Solutions"
        sub_vertical = "Fintech Solutions"
    elif any(w in words for w in ["learn", "teach", "school", "education", "course", "student"]):
        primary_industry = "Edtech Platform"
        sub_vertical = "Edtech Platform"
    elif any(w in words for w in ["legal", "law", "court", "attorney", "lawyer", "contract"]):
        primary_industry = "LegalTech"
        sub_vertical = "LegalTech"
    elif any(w in words for w in ["cyber", "security", "threat", "vulnerability", "hack", "network"]):
        primary_industry = "Cybersecurity"
        sub_vertical = "Automated Threat Intelligence"

    # Derive business name
    forbidden_name_parts = {"build", "platform", "startup", "builder", "builders", "software", "developer", "developers", "saas", "template", "templates", "generic", "powered", "digital", "smart", "advanced", "automated", "intelligent"}
    name_words = [w for w in words if len(w) > 4 and not any(f in w for f in forbidden_name_parts)]
    main_theme = name_words[0].capitalize() if name_words else (words[0].capitalize() if words else "Startup")
    sub_theme = name_words[1].capitalize() if len(name_words) > 1 else (words[1].capitalize() if len(words) > 1 else "Nexus")
    
    business_name = f"{main_theme}{sub_theme} AI" if "ai" not in idea.lower() else f"{main_theme}{sub_theme}"
    if len(business_name) > 30:
        business_name = f"{main_theme}Corp"
    if "buildplatform" in business_name.lower():
        business_name = "EnterpriseOS"

    # Compliance standards
    if "healthcare" in primary_industry.lower():
        compliance_standards = ["HIPAA", "HITECH", "GDPR"]
    elif "veterinary" in primary_industry.lower():
        compliance_standards = ["GDPR", "animal health registry standards"]
    elif "fintech" in primary_industry.lower():
        compliance_standards = ["PCI-DSS", "SOC-2 Type II", "GDPR", "CCPA"]
    elif "legal" in primary_industry.lower():
        compliance_standards = ["SOC-2 Type II", "GDPR", "CCPA"]
    elif "edtech" in primary_industry.lower():
        compliance_standards = ["COPPA", "FERPA", "GDPR"]
    else:
        compliance_standards = ["GDPR", "SOC-2 Type I"]

    # Competitors
    if "fintech" in primary_industry.lower():
        competitors = [
            {"name": "Personal Finance Apps (Mint, YNAB, Monarch Money)", "description": "Rigid manual tracking, lack of proactive automation."},
            {"name": "Neo-banks (Revolut, Cleo)", "description": "Basic transaction accounts, but limited custom routing features."}
        ]
        competitive_advantage = "Uses intelligent automated pipelines to optimize financial management with 10x lower overhead."
    elif "agriculture" in primary_industry.lower():
        competitors = [
            {"name": "Traditional Crop Inspectors", "description": "Manual crop surveys, slow soil assessment, and high human error without drones."},
            {"name": "Basic Soil Sensors", "description": "Unstructured telemetry streams lacking automated irrigation and satellite imagery."}
        ]
        competitive_advantage = "Integrates drone telemetry and satellite imagery for farmers to optimize crops, soil, and irrigation."
    elif "healthcare" in primary_industry.lower():
        competitors = [
            {"name": "Legacy EHR Providers", "description": "Highly fragmented systems, complex interfaces, no native automation."},
            {"name": "Niche Telehealth Apps", "description": "Poor API compliance, siloed datastores, scaling limits."}
        ]
        competitive_advantage = "Provides seamless workspace flow, allowing 10x faster execution and compliance mapping."
    elif "veterinary" in primary_industry.lower():
        competitors = [
            {"name": "Legacy Practice Management Portals", "description": "Archaic UI, zero real-time wearable telemetry integration, disconnected data silos."},
            {"name": "Consumer Pet Health Apps", "description": "Unstructured logs, no integration with clinical veterinary systems, basic advice."}
        ]
        competitive_advantage = "Integrates real-time pet vitals telemetry directly into clinical workflows for proactive animal diagnostics."
    elif "legal" in primary_industry.lower():
        competitors = [
            {"name": "Legacy Legal Research Tools", "description": "Fragmented databases, slow lookup speeds, zero automated contract review."},
            {"name": "Basic Document Automation Platforms", "description": "Rigid templates, lack of intelligent context processing, and lack of advanced verification checks."}
        ]
        competitive_advantage = "Uses contract review software and advanced compliance mapping for 10x faster validation."
    else:
        competitors = [
            {"name": f"Legacy {primary_industry} Systems", "description": f"Manual, slow, and expensive processes lacking integrated {sub_vertical} tools."},
            {"name": "Niche Tools", "description": "Siloed platforms requiring complex custom pipelines."}
        ]
        competitive_advantage = f"Secure workflows ensuring faster execution and custom {primary_industry} analysis."

    # Revenue streams
    if "fintech" in primary_industry.lower():
        revenue_streams = [
            "1. Interchange Fees: 0.8% transaction fee on capital processing volumes.",
            "2. Premium Tier: Premium analytical models and payment routers starting at $199/mo.",
            "3. Ledger API: Developer APIs for connecting custom accounting nodes ($0.005/call)."
        ]
        revenue_streams_summary = ["interchange fees", "premium analytics", "ledger API calls"]
    elif "healthcare" in primary_industry.lower():
        revenue_streams = [
            "1. Clinic Licensing: Tiered plans starting at $299/mo per practitioner.",
            "2. Transaction Fees: A 1.8% processing fee on telehealth billing.",
            "3. Telemetry Integration: Metered API pricing for medical devices."
        ]
        revenue_streams_summary = ["clinic licensing", "transaction fees", "telemetry integration"]
    elif "veterinary" in primary_industry.lower():
        revenue_streams = [
            "1. Practice Licensing: Tiered plans starting at $199/mo per vet clinic.",
            "2. Tele-health Fees: A 2.0% processing fee on remote veterinary consults.",
            "3. Telemetry Integration: Metered API pricing for pet vitals wearable sensors."
        ]
        revenue_streams_summary = ["practice licensing", "tele-health processing", "wearable telemetry integrations"]
    elif "agriculture" in primary_industry.lower():
        revenue_streams = [
            "1. SaaS Subscription: Monthly tier starting at $99/mo per farmer for crop and soil analytics.",
            "2. Drone telemetry integration: Connected drones fee at $0.05/connected node.",
            "3. Satellite pass pricing: Automated pass processing fees at $5/map."
        ]
        revenue_streams_summary = ["SaaS subscriptions for farmers", "drone telemetry integrations", "automated satellite imagery maps"]
    else:
        revenue_streams = [
            f"1. Subscription Licensing: Tiered plans starting at $149/mo for standard {main_theme} usage.",
            "2. Usage Billing: Metered usage based on transaction processing volumes.",
            "3. API Connections: Custom database connections for enterprise operations."
        ]
        revenue_streams_summary = ["SaaS subscriptions", "usage fees", "API connections"]

    # Marketing strategy
    if "fintech" in primary_industry.lower():
        marketing_strategy = [
            "1. Referral Programs: Dual-incentive referral rewards to boost viral user growth.",
            "2. Financial Influencers: Partner with trusted personal finance creators for educational content.",
            "3. App Store Marketing: Target high-intent search terms around budgeting and automated savings.",
            "4. Banking Partnerships: Secure integrations with retail banks to offer yield incentives."
        ]
    elif "agriculture" in primary_industry.lower():
        marketing_strategy = [
            "1. Cooperatives Pilot: Run pilot programs with agricultural cooperatives to demonstrate soil and crop optimization.",
            "2. Farm Outreach: B2B sales targeting farmers and agronomists.",
            "3. Smart Irrigation Showcases: Case studies highlighting automated water efficiency."
        ]
    elif "healthcare" in primary_industry.lower():
        marketing_strategy = [
            "1. Clinical Trials: Run pilot programs with local clinics to establish efficacy records.",
            "2. B2B Sales: Partner with hospital purchasing groups and medical networks.",
            "3. Medical Webinars: Present compliance audits at regional health summits."
        ]
    elif "veterinary" in primary_industry.lower():
        marketing_strategy = [
            "1. Vet Practice Outreach: Live showcases at major veterinary summits.",
            "2. Clinic Pilots: Offer free practice kits and pilot runs to regional clinics.",
            "3. Wearable Alliances: Partner with popular pet tracker brands to sync telemetry."
        ]
    elif "legal" in primary_industry.lower():
        marketing_strategy = [
            "1. Legal Conferences: Live showcase presentations at regional Bar association summits.",
            "2. B2B Sales: B2B outreach to general counsels in Fortune 550 corporations.",
            "3. Compliance Partnerships: Strategic partnerships with legal practice management platforms."
        ]
    else:
        marketing_strategy = [
            "1. Referral Program: Growth incentive structures for early customer advocates.",
            "2. Professional Partnerships: Align with industry networks and trade associations.",
            "3. Technical Guides: Expert publications highlighting cost and time efficiency gains."
        ]

    # Target segments
    if "fintech" in primary_industry.lower():
        target_segments = ["High-volume digital marketplaces, fintech startups, and online retailers", "Traditional institutions seeking accounting automation"]
        tam_estimation = "$45.2B by 2030"
    elif "agriculture" in primary_industry.lower():
        target_segments = ["Farmers, agronomists, crop insurers, and agricultural cooperatives", "Smart farming operators needing soil, irrigation, drone, and satellite imagery analysis"]
        tam_estimation = "$14.5B by 2028 (12.4% CAGR)"
    elif "healthcare" in primary_industry.lower():
        target_segments = ["General practitioners, private clinics, and local hospitals", "Virtual care startups and patient portal operations"]
        tam_estimation = "$28.4B by 2029 (16.2% CAGR)"
    elif "veterinary" in primary_industry.lower():
        target_segments = ["Veterinary clinics, pet clinics, and professional animal caregivers", "Smart pet tracker manufacturers and pet owners"]
        tam_estimation = "$11.2B by 2029 (10.5% CAGR)"
    elif "legal" in primary_industry.lower():
        target_segments = ["Law firms, corporate legal departments, compliance teams, and legal professionals", "Regulatory compliance auditors and legal operations experts"]
        tam_estimation = "$18.9B by 2030 (13.5% CAGR)"
    else:
        target_segments = [f"Operators, practitioners, and teams looking to optimize their {main_theme.lower()} workflow.", "Small-to-medium enterprises needing accessible digital automation."]
        tam_estimation = "$12.5B globally by 2029"

    # Tech stack
    if "agriculture" in primary_industry.lower():
        tech_stack = {
            "frontend": "React, Vite, Tailwind CSS v4, Lucide React",
            "backend": "FastAPI (Python), Uvicorn",
            "database": "PostgreSQL (Relational database), Pinecone (Vector database for crop condition embeddings)",
            "cloud": "AWS IoT Core & SageMaker for crop, soil, and irrigation computer vision pipelines"
        }
    elif "healthcare" in primary_industry.lower():
        tech_stack = {
            "frontend": "React, Vite, Tailwind CSS v4, Lucide React",
            "backend": "FastAPI (Python), Uvicorn",
            "database": "PostgreSQL with SSL, HIPAA Vector store",
            "cloud": "AWS GovCloud with strict access controls"
        }
    elif "veterinary" in primary_industry.lower():
        tech_stack = {
            "frontend": "React, Vite, Tailwind CSS v4, Lucide React",
            "backend": "FastAPI (Python), Uvicorn",
            "database": "PostgreSQL (Clinical logs), InfluxDB (Telemetry charts)",
            "cloud": "AWS with clinical data security compliance"
        }
    elif "legal" in primary_industry.lower():
        tech_stack = {
            "frontend": "React, Vite, Tailwind CSS v4, Lucide React",
            "backend": "FastAPI (Python), Uvicorn",
            "database": "PostgreSQL, Pinecone for vector contract embeddings",
            "cloud": "AWS GovCloud with SOC-2 compliance isolation"
        }
    else:
        tech_stack = {
            "frontend": "React, Vite, Tailwind CSS v4, Lucide React",
            "backend": "FastAPI (Python), Uvicorn",
            "database": "PostgreSQL (Relational), Vector database for document embeddings",
            "cloud": "Secure AWS cloud container deployment"
        }

    # Roadmap
    if "agriculture" in primary_industry.lower():
        product_roadmap = [
            "Drone data telemetry and satellite imagery fetching pipeline setup.",
            "Validate crop and soil condition predictive models.",
            "Launch pilot dashboard with partner agricultural cooperatives.",
            "Release automated irrigation alerts and multi-spectral drone analysis."
        ]
        roadmap_summary = "Q1 drone and satellite imagery data pipelines, Q2 crop models, Q3 agricultural cooperatives pilot, Q4 automated irrigation"
    elif "healthcare" in primary_industry.lower():
        product_roadmap = [
            "Telemetry pipelines setup and HIPAA clearance mapping.",
            "Launches in 5 local outpatient clinic trial runs.",
            "Pharmacy APIs and medical device endpoints integrated.",
            "Enterprise scaling and clinic telemetry dashboard launches."
        ]
        roadmap_summary = "Q1 telemetry pipelines, Q2 local clinic trials, Q3 pharmacy APIs, Q4 clinic dashboards"
    elif "veterinary" in primary_industry.lower():
        product_roadmap = [
            "IoT vitals telemetry pipeline and practice dashboard built.",
            "Launches in 10 partner vet clinic pilot runs.",
            "Integrates animal pharmacy APIs, vaccination records, and pet owner sync.",
            "Multi-tenant clinic scale and custom pet owner dashboard portals."
        ]
        roadmap_summary = "Q1 telemetry practice dashboard, Q2 clinic pilots, Q3 pharmacy integrations, Q4 owner portals"
    elif "legal" in primary_industry.lower():
        product_roadmap = [
            "Secure document parsing and core regulatory search engine setup.",
            "Launching beta client portal with contract review dashboards.",
            "Launching API developer portal for major integrations.",
            "Custom private cloud deployments for enterprise legal networks."
        ]
        roadmap_summary = "Q1 secure document parsing, Q2 contract review dashboards, Q3 API portals, Q4 private cloud deployments"
    else:
        product_roadmap = [
            "Launching basic dashboard controls and workspace setup.",
            "Releasing developer portals and connection plugins.",
            "Releasing automated export templates and workspace configurations.",
            "Custom scaling capabilities and enterprise compliance certificates."
        ]
        roadmap_summary = "Q1 core dashboard, Q2 developer portal, Q3 automation modules, Q4 enterprise scale"

    # Mission and Vision themes
    if "healthcare" in primary_industry.lower():
        mission_theme = "simplify HIPAA-compliant patient data tracking and telehealth clinical logs management with clinical-grade safety and operational efficacy"
        vision_future = "patient-centric systems, driving automated workflows across primary care networks"
    elif "veterinary" in primary_industry.lower():
        mission_theme = "simplify pet vital tracking and veterinary clinical logs management with animal clinical-grade safety and operational efficacy"
        vision_future = "pet-centric animal health systems, driving automated workflows across veterinary clinics, veterinarians, and pet owners"
    elif "fintech" in primary_industry.lower():
        mission_theme = "democratize and secure transaction pipelines using decentralized telemetry and ledger automation"
        vision_future = "a friction-free financial system where payments, compliance, and accounts sync in real time"
    elif "agriculture" in primary_industry.lower():
        mission_theme = "digitize crop monitoring and soil optimization for farmers using satellite imagery, drones, and smart irrigation"
        vision_future = "satellite imagery and drone-powered analytics to optimize crops, manage soil, automate irrigation, and empower agricultural cooperatives"
    elif "legal" in primary_industry.lower():
        mission_theme = "revolutionize legal operations by automating contract review with high-precision regulatory compliance"
        vision_future = "legal automation, establishing a unified operating system for modern law firms and corporate legal departments globally"
    else:
        mission_theme = f"optimize and simplify {clean_idea} by utilizing secure automated workflows and tailored intelligence tools"
        vision_future = f"automated efficiency and secure operations in the {clean_idea} sector"

    # Security protocols
    if "healthcare" in primary_industry.lower():
        security_protocols = [
            "End-to-end TLS 1.3 in transit and AES-GCM 256 for clinical records at rest",
            "Continuous audit log generation for patient datastore accesses"
        ]
    elif "veterinary" in primary_industry.lower():
        security_protocols = [
            "End-to-end TLS for animal telemetry packets and database encryption",
            "Firmware signing verification for pet vitals wearables"
        ]
    elif "fintech" in primary_industry.lower():
        security_protocols = [
            "TLS 1.3, HSM key management, and field-level database encryption",
            "Real-time telemetry fraud scans and threat mitigation"
        ]
    elif "agriculture" in primary_industry.lower():
        security_protocols = [
            "End-to-end TLS for drone telemetry packets and database encryption",
            "Physical firmware key validation to prevent coordinate spoofing"
        ]
    elif "legal" in primary_industry.lower():
        security_protocols = [
            "TLS 1.3 for data in transit and AES-256 for document databases at rest",
            "Real-time compliance audit logs checked automatically by Legal Agent"
        ]
    else:
        security_protocols = [
            "End-to-end TLS 1.3 in transit; AES-256 for persistent databases",
            "Rate limits, input validation, and secure authentication methods"
        ]

    # Mitigated risks
    if "healthcare" in primary_industry.lower():
        mitigated_risks = [
            {"name": "Compliance Violations", "description": "Regulatory changes in HIPAA requirements", "mitigation": "Legal agent continuous audit rules"},
            {"name": "Telemetry Failure", "description": "Outages in device integrations", "mitigation": "Fallback mock values"},
            {"name": "System Trust", "description": "Patient onboarding friction", "mitigation": "Transparent user flows"}
        ]
    elif "veterinary" in primary_industry.lower():
        mitigated_risks = [
            {"name": "Telemetry Inaccuracy", "description": "Miscalibrated pet tracking collars", "mitigation": "Software data filtering and thresholding"},
            {"name": "Clinic Onboarding Churn", "description": "Practice resistance to software swaps", "mitigation": "Free migration services and training sessions"},
            {"name": "Hardware Costs", "description": "High deployment cost of sensor kits", "mitigation": "Subscription lease model"}
        ]
    elif "fintech" in primary_industry.lower():
        mitigated_risks = [
            {"name": "Transaction Outages", "description": "Gateway API disconnects", "mitigation": "High-redundancy routing"},
            {"name": "Fraud Rate", "description": "Safe transaction chargebacks", "mitigation": "Fraud score filters"},
            {"name": "Capital Liquidity", "description": "Settlement delays", "mitigation": "Bank credit lines"}
        ]
    elif "agriculture" in primary_industry.lower():
        mitigated_risks = [
            {"name": "Weather Anomalies", "description": "Satellite cloud cover blocking drone and camera sweeps", "mitigation": "Soil sensor data interpolation models"},
            {"name": "Hardware Damage", "description": "Irrigation and drone hardware breakdowns", "mitigation": "Modular design swaps"},
            {"name": "Connectivity Issues", "description": "Rural farm connectivity loss", "mitigation": "Offline-first dashboard sync"}
        ]
    elif "legal" in primary_industry.lower():
        mitigated_risks = [
            {"name": "Accuracy Risks", "description": "False predictions in complex litigation checks", "mitigation": "Professional lawyer-in-the-loop validation step"},
            {"name": "Integration Risks", "description": "Outages in court filing APIs", "mitigation": "High-resiliency database buffers"},
            {"name": "Privacy Violations", "description": "Leak of sensitive client agreements", "mitigation": "Single-tenant isolated environments"}
        ]
    else:
        mitigated_risks = [
            {"name": "Onboarding Friction", "description": "User resistance to digital workflows", "mitigation": "Intuitive training interfaces"},
            {"name": "API Outages", "description": "Third-party connection bottlenecks", "mitigation": "Offline fallback capability"},
            {"name": "Scale Limits", "description": "Large database response lags", "mitigation": "Connection pool optimization"}
        ]

    context = {
        "idea": idea,
        "business_name": business_name,
        "primary_industry": primary_industry,
        "sub_vertical": sub_vertical,
        "mission_theme": mission_theme,
        "vision_future": vision_future,
        "revenue_streams": revenue_streams,
        "revenue_streams_summary": revenue_streams_summary,
        "target_segments": target_segments,
        "tam_estimation": tam_estimation,
        "competitors": competitors,
        "competitor_names": [c["name"] for c in competitors],
        "competitive_advantage": competitive_advantage,
        "marketing_strategy": marketing_strategy,
        "tech_stack": tech_stack,
        "product_roadmap": product_roadmap,
        "roadmap_summary": roadmap_summary,
        "funding_goal": "$650K" if "veterinary" in primary_industry.lower() else ("$800K" if ("agriculture" in primary_industry.lower() or "fintech" in primary_industry.lower() or "healthcare" in primary_industry.lower()) else "$600K"),
        "funding_allocation": "60% engineering, 25% marketing, 15% operations",
        "equity_split": "Founders (70%), Option Pool (12%), Investors (18%)",
        "compliance_standards": compliance_standards,
        "security_protocols": security_protocols,
        "mitigated_risks": mitigated_risks
    }
    return context

def generate_fallback_plan(idea: str) -> Dict[str, Any]:
    context = generate_fallback_context(idea)
    return build_business_report(context)

def generate_business_plan_with_gemini(idea: str) -> Dict[str, Any]:
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key or not HAS_GEMINI_SDK:
        return generate_fallback_plan(idea)
        
    try:
        client = genai.Client(api_key=api_key)
        
        prompt = f"""
        You are a collaborative board of AI Executive Agents (CEO, CTO, CFO, CMO, CISO, PM, Legal, Data Analyst).
        Given the startup idea: '{idea}', extract and generate a single normalized StartupContext JSON object.
        
        You must return a JSON object with the following schema:
        {{
            "business_name": "A creative, premium name for this business",
            "primary_industry": "e.g. Healthcare, Agritech, FinTech, LegalTech, Cybersecurity, Manufacturing, Travel, Veterinary, etc.",
            "sub_vertical": "e.g. Precision Agriculture, Feline Vitals Monitoring, Legal Document Automation, B2C Personal Finance, etc.",
            "mission_theme": "e.g. digitize farming operations using satellite computer vision (should complete the phrase: 'To revolutionize [primary_industry] by building [business_name] to [mission_theme]')",
            "vision_future": "e.g. fully autonomous crop health forecasting and high-yield farming (should complete the phrase: 'To pioneer the future of [sub_vertical], establishing a secure and sustainable system for [vision_future]')",
            "revenue_streams": [
                "1. [Stream 1 Name]: [Stream 1 Details]",
                "2. [Stream 2 Name]: [Stream 2 Details]",
                "3. [Stream 3 Name]: [Stream 3 Details]"
            ],
            "revenue_streams_summary": [
                "Short 2-3 word name of stream 1",
                "Short 2-3 word name of stream 2",
                "Short 2-3 word name of stream 3"
            ],
            "target_segments": [
                "Primary target segment (e.g. Commercial farming operations, agronomists, and crop insurers)",
                "Secondary target segment (e.g. Agricultural cooperatives and smart farming sensor suppliers)"
            ],
            "tam_estimation": "Projected TAM with growth rate (e.g. $14.5B by 2028 (12.4% CAGR))",
            "competitors": [
                {{
                    "name": "Competitor 1 Name",
                    "description": "Short description of what they lack or do"
                }},
                {{
                    "name": "Competitor 2 Name",
                    "description": "Short description of what they lack or do"
                }}
            ],
            "competitor_names": [
                "Competitor 1 Name",
                "Competitor 2 Name"
            ],
            "competitive_advantage": "Detailed unique advantage of our startup (e.g. Integrates satellite computer vision and IoT analytics for 10x faster disease alerts)",
            "marketing_strategy": [
                "1. [Strategy 1 Title]: [Strategy 1 Details]",
                "2. [Strategy 2 Title]: [Strategy 2 Details]",
                "3. [Strategy 3 Title]: [Strategy 3 Details]"
            ],
            "tech_stack": {{
                "frontend": "Frontend stack recommendation (e.g. React, Vite, Lucide)",
                "backend": "Backend stack recommendation (e.g. FastAPI, Python)",
                "database": "Database recommendation (e.g. PostgreSQL, Pinecone)",
                "cloud": "Cloud provider and tools recommendation (e.g. AWS IoT Core & SageMaker)"
            }},
            "product_roadmap": [
                "Q1 milestone (e.g. IoT data telemetry setup)",
                "Q2 milestone (e.g. train computer vision disease models)",
                "Q3 milestone (e.g. launch partner farm pilot dashboard)",
                "Q4 milestone (e.g. scale automated overlays and alerts)"
            ],
            "roadmap_summary": "Short Q1-Q4 roadmap summary (e.g. Q1 telemetry, Q2 CV models, Q3 pilot, Q4 scaling)",
            "funding_goal": "Goal amount (e.g. $800K)",
            "funding_allocation": "Allocation detail (e.g. 60% engineering, 20% hardware, 20% marketing)",
            "equity_split": "Equity breakdown (e.g. Founders (70%), Option Pool (12%), Investors (18%))",
            "compliance_standards": [
                "Standard 1 (e.g. GDPR)",
                "Standard 2 (e.g. HIPAA)",
                "Standard 3"
            ],
            "security_protocols": [
                "Protocol for data protection (e.g. End-to-end TLS for IoT sensor packets and database encryption)",
                "Protocol for threat mitigation (e.g. Physical firmware key validation to prevent coordinate spoofing)"
            ],
            "mitigated_risks": [
                {{
                    "name": "Risk 1 Title",
                    "description": "Description of Risk 1",
                    "mitigation": "Mitigation Strategy for Risk 1"
                }},
                {{
                    "name": "Risk 2 Title",
                    "description": "Description of Risk 2",
                    "mitigation": "Mitigation Strategy for Risk 2"
                }},
                {{
                    "name": "Risk 3 Title",
                    "description": "Description of Risk 3",
                    "mitigation": "Mitigation Strategy for Risk 3"
                }}
            ]
        }}
        
        Ensure that all generated data matches the startup idea: '{idea}' in detail and stays consistent.
        Never reference BuildPlatform, startup builders, software developers, business architecture, executive agents, or generic SaaS templates unless the user's idea is actually about those topics.
        Return ONLY the raw JSON block without markdown wrappers or other commentary.
        """
        
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        
        import json
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()
        
        data = json.loads(text)
        required_keys = [
            "business_name", "primary_industry", "sub_vertical", "mission_theme", "vision_future",
            "revenue_streams", "revenue_streams_summary", "target_segments", "tam_estimation",
            "competitors", "competitor_names", "competitive_advantage", "marketing_strategy",
            "tech_stack", "product_roadmap", "roadmap_summary", "funding_goal", "funding_allocation",
            "equity_split", "compliance_standards", "security_protocols", "mitigated_risks"
        ]
        if all(key in data for key in required_keys):
            return build_business_report(data)
            
    except Exception as e:
        print(f"Gemini API execution failed: {e}")
        
    return generate_fallback_plan(idea)

@app.post("/api/v1/build-company", response_model=BusinessResult)
def build_company(request: BusinessRequest):
    idea = request.idea.strip()
    if not idea:
        raise HTTPException(status_code=400, detail="Business idea cannot be empty")
    
    # 1. Generate fully dynamic business plan parameters
    plan = generate_business_plan_with_gemini(idea)
    
    business_name = plan["business_name"]
    final_business_score = int(plan["final_business_score"])

    # Extract dynamic terms for logs
    main_theme = plan["business_name"].split()[0] if plan["business_name"] else "Startup"

    # 2. Build simulated execution logs showing real-time agent collaboration
    current_time = time.time()
    execution_logs = [
        AgentLog(
            agent="Project Manager Agent",
            action="Initializing",
            timestamp=current_time - 3.5,
            message=f"Received business proposal: '{idea}'. Launching executive alignment..."
        ),
        AgentLog(
            agent="CEO Agent",
            action="Briefing",
            timestamp=current_time - 3.2,
            message=f"Setting strategic direction for startup. Registered corporate identity: '{business_name}'."
        ),
        AgentLog(
            agent="Data Analyst Agent",
            action="Market Analysis",
            timestamp=current_time - 2.8,
            message=f"Analyzing data points for '{main_theme}'. Validating TAM projections."
        ),
        AgentLog(
            agent="Marketing Agent",
            action="Positioning",
            timestamp=current_time - 2.5,
            message="Conducting competitor mapping. Formulating custom acquisition loops."
        ),
        AgentLog(
            agent="CTO Agent",
            action="Architecture Design",
            timestamp=current_time - 2.1,
            message=f"Selecting stack. Recommended React + Tailwind CSS v4 on frontend and FastAPI + Google ADK on backend."
        ),
        AgentLog(
            agent="Finance Agent",
            action="Financial Modeling",
            timestamp=current_time - 1.7,
            message="Calculating pre-seed goals and allocation budgets."
        ),
        AgentLog(
            agent="Legal Agent",
            action="Compliance Check",
            timestamp=current_time - 1.2,
            message="Drafting incorporation structure. Flagging regulatory requirements."
        ),
        AgentLog(
            agent="Security Agent",
            action="Risk Assessment",
            timestamp=current_time - 0.8,
            message="Running vulnerability simulator. Specifying ISO/SOC-2 targets and TLS 1.3 parameters."
        ),
        AgentLog(
            agent="CEO Agent",
            action="Synthesis",
            timestamp=current_time - 0.4,
            message=f"All agents completed tasks. Consolidating business model viability. Scoring: {final_business_score}/100."
        ),
        AgentLog(
            agent="Project Manager Agent",
            action="Deployment",
            timestamp=current_time,
            message="Business operating system plan fully built. Exporting results dashboard."
        )
    ]

    return BusinessResult(
        business_name=business_name,
        mission=plan["mission"],
        vision=plan["vision"],
        revenue_model=plan["revenue_model"],
        target_market=plan["target_market"],
        competitor_analysis=plan["competitor_analysis"],
        marketing_strategy=plan["marketing_strategy"],
        tech_stack=plan["tech_stack"],
        product_roadmap=plan["product_roadmap"],
        funding_plan=plan["funding_plan"],
        security_report=plan["security_report"],
        risk_analysis=plan["risk_analysis"],
        final_business_score=final_business_score,
        execution_logs=execution_logs,
        vertical=plan["vertical"],
        agent_cards=plan["agent_cards"],
        tasks=plan["tasks"],
        workspace_logs=plan["workspace_logs"]
    )
