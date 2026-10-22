export type Service = {
  slug: string;
  name: string;
  short: string;
  audience: string;
  problem: string;
  deliverables: string[];
};

/** Capability areas per PRD §6.5. Deliverables are typical engagement outputs — owner to confirm. */
export const SERVICES: Service[] = [
  {
    slug: "software-engineering",
    name: "Software Engineering",
    short: "Web, mobile and backend products built to be maintained.",
    audience: "Teams that need a product built, extended or stabilised.",
    problem: "Turning a requirement into reliable, maintainable software.",
    deliverables: ["Product and system design", "Web, mobile and API development", "Automated testing and CI", "Handover documentation"],
  },
  {
    slug: "ai-ml",
    name: "AI / ML",
    short: "LLM integration, custom models and workflow automation.",
    audience: "Teams adding AI to a product or automating an internal workflow.",
    problem: "Moving from an AI idea to a working, evaluated system.",
    deliverables: ["LLM and RAG application development", "Model training and evaluation", "Workflow automation", "Deployment support"],
  },
  {
    slug: "cloud-devops",
    name: "Cloud & DevOps",
    short: "Cloud-native architecture, CI/CD and infrastructure as code.",
    audience: "Teams running or moving workloads on AWS, Azure or Google Cloud.",
    problem: "Shipping and operating software reliably and cost-consciously.",
    deliverables: ["Cloud architecture", "CI/CD pipelines", "Infrastructure as code", "Kubernetes and container platforms"],
  },
  {
    slug: "ui-ux",
    name: "UI / UX",
    short: "Interface design grounded in how people use the product.",
    audience: "Teams designing or redesigning a product experience.",
    problem: "Making a product understandable and usable.",
    deliverables: ["User flows and wireframes", "Interface design", "Design systems", "Accessibility review"],
  },
  {
    slug: "data-engineering",
    name: "Data Engineering",
    short: "Pipelines and data platforms teams can trust.",
    audience: "Teams whose data is scattered, slow or unreliable.",
    problem: "Getting accurate data to the people and systems that need it.",
    deliverables: ["Data pipelines", "Warehouse and lake design", "Data quality checks", "Reporting foundations"],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    short: "Security reviews and secure-by-default engineering.",
    audience: "Teams that need to find and reduce security risk.",
    problem: "Understanding and reducing exposure in applications and infrastructure.",
    deliverables: ["Application and cloud security review", "Secure configuration guidance", "Access-control design", "Remediation support"],
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    short: "Replacing manual, paper-based processes with working systems.",
    audience: "Organisations modernising operations.",
    problem: "Moving manual processes onto systems that scale.",
    deliverables: ["Process discovery", "Roadmap and prioritisation", "Incremental delivery", "Team enablement"],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const ENGAGEMENT_STEPS = ["Discover", "Design", "Develop", "Deploy", "Support"] as const;
