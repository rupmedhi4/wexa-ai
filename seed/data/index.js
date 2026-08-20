/**
 * Seed Data
 * All sample data for the Developer Skills Network, separated from seed logic.
 */

export const companies = [
  { name: "NexaFlow",     industry: "Cloud Infrastructure",    founded: 2018, size: "150-500" },
  { name: "DataPulse",    industry: "Data Analytics",          founded: 2020, size: "50-150" },
  { name: "CodeVault",    industry: "Developer Tools",         founded: 2016, size: "500-1000" },
  { name: "AI Dynamics",  industry: "Artificial Intelligence", founded: 2021, size: "20-50" },
  { name: "ShieldByte",   industry: "Cybersecurity",           founded: 2017, size: "100-300" },
  { name: "PixelForge",   industry: "Digital Media",           founded: 2019, size: "30-100" },
];

export const skills = [
  /* Languages */
  { name: "JavaScript",   category: "Language" },
  { name: "TypeScript",   category: "Language" },
  { name: "Python",       category: "Language" },
  { name: "Go",           category: "Language" },
  { name: "Rust",         category: "Language" },
  { name: "Java",         category: "Language" },
  /* Frontend */
  { name: "React",        category: "Frontend" },
  { name: "Vue.js",       category: "Frontend" },
  { name: "Next.js",      category: "Frontend" },
  { name: "Svelte",       category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  /* Backend */
  { name: "Node.js",      category: "Backend" },
  { name: "Express",      category: "Backend" },
  { name: "FastAPI",      category: "Backend" },
  { name: "Django",       category: "Backend" },
  { name: "GraphQL",      category: "Backend" },
  /* Database */
  { name: "Neo4j",        category: "Database" },
  { name: "PostgreSQL",   category: "Database" },
  { name: "MongoDB",      category: "Database" },
  { name: "Redis",        category: "Database" },
  /* DevOps */
  { name: "Docker",       category: "DevOps" },
  { name: "Kubernetes",   category: "DevOps" },
  { name: "AWS",          category: "DevOps" },
  { name: "Terraform",    category: "DevOps" },
  /* AI/ML */
  { name: "TensorFlow",   category: "AI/ML" },
  { name: "PyTorch",      category: "AI/ML" },
  { name: "LangChain",    category: "AI/ML" },
  { name: "OpenAI API",   category: "AI/ML" },
];

export const developers = [
  { name: "Aarav Sharma",     title: "Full Stack Engineer",  experience: 5,  github: "aarav-dev" },
  { name: "Priya Patel",      title: "Frontend Lead",        experience: 7,  github: "priya-ui" },
  { name: "Rohan Mehta",      title: "Backend Architect",    experience: 9,  github: "rohan-arch" },
  { name: "Sanya Gupta",      title: "ML Engineer",          experience: 4,  github: "sanya-ml" },
  { name: "Vikram Singh",     title: "DevOps Engineer",      experience: 6,  github: "vikram-ops" },
  { name: "Neha Reddy",       title: "Data Engineer",        experience: 5,  github: "neha-data" },
  { name: "Arjun Nair",       title: "Cloud Architect",      experience: 8,  github: "arjun-cloud" },
  { name: "Kavya Iyer",       title: "Security Engineer",    experience: 6,  github: "kavya-sec" },
  { name: "Amit Desai",       title: "AI Researcher",        experience: 3,  github: "amit-ai" },
  { name: "Riya Joshi",       title: "Product Engineer",     experience: 4,  github: "riya-prod" },
  { name: "Karan Malhotra",   title: "Platform Engineer",    experience: 7,  github: "karan-plat" },
  { name: "Divya Krishnan",   title: "Staff Engineer",       experience: 10, github: "divya-staff" },
];

export const projects = [
  { name: "CloudSync Dashboard", description: "Real-time cloud resource monitoring and cost optimization dashboard",      status: "Active" },
  { name: "DataFlow Pipeline",   description: "Scalable ETL pipeline for processing streaming data",                      status: "Active" },
  { name: "AuthGuard",           description: "Zero-trust authentication and authorization microservice",                 status: "Active" },
  { name: "InsightEngine",       description: "AI-powered analytics and recommendation engine",                           status: "Active" },
  { name: "GraphExplorer",       description: "Interactive graph database visualization and query tool",                   status: "Beta" },
  { name: "DevPortal",           description: "Internal developer portal with API documentation and tooling",             status: "Active" },
  { name: "SmartDeploy",         description: "Automated CI/CD pipeline with intelligent rollback",                        status: "Beta" },
  { name: "ChatAssist",          description: "LLM-based customer support chatbot with context awareness",                status: "Active" },
];

/* ─── Relationships ─── */

export const worksAt = [
  { dev: "Aarav Sharma",   company: "NexaFlow",    since: 2021 },
  { dev: "Priya Patel",    company: "NexaFlow",    since: 2020 },
  { dev: "Rohan Mehta",    company: "CodeVault",   since: 2019 },
  { dev: "Sanya Gupta",    company: "AI Dynamics",  since: 2022 },
  { dev: "Vikram Singh",   company: "NexaFlow",    since: 2021 },
  { dev: "Neha Reddy",     company: "DataPulse",   since: 2020 },
  { dev: "Arjun Nair",     company: "CodeVault",   since: 2018 },
  { dev: "Kavya Iyer",     company: "ShieldByte",  since: 2021 },
  { dev: "Amit Desai",     company: "AI Dynamics",  since: 2023 },
  { dev: "Riya Joshi",     company: "PixelForge",  since: 2022 },
  { dev: "Karan Malhotra", company: "DataPulse",   since: 2019 },
  { dev: "Divya Krishnan", company: "CodeVault",   since: 2017 },
];

export const knows = [
  { dev: "Aarav Sharma",   skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express", "MongoDB", "Docker"] },
  { dev: "Priya Patel",    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS", "GraphQL"] },
  { dev: "Rohan Mehta",    skills: ["Go", "Python", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"] },
  { dev: "Sanya Gupta",    skills: ["Python", "TensorFlow", "PyTorch", "FastAPI", "PostgreSQL", "Docker", "LangChain"] },
  { dev: "Vikram Singh",   skills: ["Go", "Python", "Docker", "Kubernetes", "AWS", "Terraform", "Redis"] },
  { dev: "Neha Reddy",     skills: ["Python", "PostgreSQL", "MongoDB", "Redis", "Docker", "AWS", "Neo4j"] },
  { dev: "Arjun Nair",     skills: ["Go", "Java", "AWS", "Kubernetes", "Terraform", "Docker", "PostgreSQL"] },
  { dev: "Kavya Iyer",     skills: ["Python", "Rust", "Docker", "Kubernetes", "AWS", "PostgreSQL", "Redis"] },
  { dev: "Amit Desai",     skills: ["Python", "PyTorch", "TensorFlow", "LangChain", "OpenAI API", "FastAPI"] },
  { dev: "Riya Joshi",     skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB"] },
  { dev: "Karan Malhotra", skills: ["Java", "Go", "Kubernetes", "Docker", "AWS", "Terraform", "PostgreSQL", "Redis"] },
  { dev: "Divya Krishnan", skills: ["JavaScript", "TypeScript", "Python", "Go", "React", "Node.js", "PostgreSQL", "Docker", "AWS", "Neo4j"] },
];

export const workedOn = [
  { dev: "Aarav Sharma",   projects: ["CloudSync Dashboard", "DevPortal"] },
  { dev: "Priya Patel",    projects: ["CloudSync Dashboard", "DevPortal", "GraphExplorer"] },
  { dev: "Rohan Mehta",    projects: ["DataFlow Pipeline", "AuthGuard", "SmartDeploy"] },
  { dev: "Sanya Gupta",    projects: ["InsightEngine", "ChatAssist"] },
  { dev: "Vikram Singh",   projects: ["SmartDeploy", "DataFlow Pipeline", "CloudSync Dashboard"] },
  { dev: "Neha Reddy",     projects: ["DataFlow Pipeline", "GraphExplorer", "InsightEngine"] },
  { dev: "Arjun Nair",     projects: ["SmartDeploy", "AuthGuard"] },
  { dev: "Kavya Iyer",     projects: ["AuthGuard", "SmartDeploy"] },
  { dev: "Amit Desai",     projects: ["InsightEngine", "ChatAssist"] },
  { dev: "Riya Joshi",     projects: ["DevPortal", "GraphExplorer", "CloudSync Dashboard"] },
  { dev: "Karan Malhotra", projects: ["DataFlow Pipeline", "SmartDeploy"] },
  { dev: "Divya Krishnan", projects: ["GraphExplorer", "DevPortal", "CloudSync Dashboard", "DataFlow Pipeline"] },
];

export const usesTech = [
  { project: "CloudSync Dashboard", techs: ["React", "TypeScript", "Node.js", "Docker", "AWS"] },
  { project: "DataFlow Pipeline",   techs: ["Python", "Go", "PostgreSQL", "Redis", "Docker", "Kubernetes"] },
  { project: "AuthGuard",           techs: ["Go", "Rust", "PostgreSQL", "Docker", "Kubernetes"] },
  { project: "InsightEngine",       techs: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Docker"] },
  { project: "GraphExplorer",       techs: ["JavaScript", "React", "Node.js", "Neo4j", "Docker"] },
  { project: "DevPortal",           techs: ["TypeScript", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"] },
  { project: "SmartDeploy",         techs: ["Go", "Docker", "Kubernetes", "Terraform", "AWS"] },
  { project: "ChatAssist",          techs: ["Python", "LangChain", "OpenAI API", "FastAPI", "Redis"] },
];
