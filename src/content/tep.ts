export type Track = {
  slug: "ai-ml" | "multi-cloud";
  name: string;
  summary: string;
  audience: string;
  topics: string[];
  format: string[];
  /** Fees, dates, duration and availability are deliberately NOT published until the team confirms. */
  needsConfirmation: string[];
};

export const TEP_INTRO =
  "The Technology Excellence Program (TEP) is DeboisTech's mentor-led, project-based training program for engineers who want production skills, not tutorials.";

export const TRACKS: Track[] = [
  {
    slug: "ai-ml",
    name: "AI / ML Engineering",
    summary:
      "From how a neural network trains to how an agent reasons: neural networks, transformers and LLMs, evaluation and fine-tuning, inference, retrieval-augmented generation and agentic AI, finishing with a capstone application.",
    audience: "Students and early-career developers with Python basics who want real intuition for AI engineering.",
    topics: ["Neural network foundations", "Transformers and LLM internals", "Evaluation and fine-tuning", "Inference engineering", "RAG and agentic AI", "Capstone project"],
    format: ["Hands-on labs", "Live sessions", "Capstone project"],
    needsConfirmation: ["Current cohort start date", "Fee and payment terms", "Duration and session count", "Application deadline"],
  },
  {
    slug: "multi-cloud",
    name: "Multi-Cloud Engineering",
    summary:
      "Linux, Git and GitHub, CI/CD with GitHub Actions and Jenkins, Docker, Kubernetes and AWS fundamentals, with guided projects and a self-built portfolio project.",
    audience: "Students, freshers, developers and career switchers moving into cloud and DevOps roles.",
    topics: ["Linux foundations", "Git and GitHub collaboration", "CI/CD: GitHub Actions and Jenkins", "Docker and Kubernetes", "AWS cloud essentials", "Portfolio project"],
    format: ["Instructor-led", "Hands-on labs", "Guided and self-built projects"],
    needsConfirmation: ["Current cohort start date", "Fee and payment terms", "Duration and daily schedule", "Cloud-provider coverage beyond AWS", "Application deadline"],
  },
];

export const getTrack = (slug: string) => TRACKS.find((t) => t.slug === slug);

export const TEP_FAQ = [
  { q: "Who is TEP for?", a: "Students, freshers, developers and professionals who want hands-on, project-based depth in AI/ML or cloud and DevOps. Each track page lists its intended audience." },
  { q: "Are fees and start dates listed here?", a: "Not yet. Cohort details change, so we share current dates, fees and availability when you enquire rather than publish figures that may be out of date." },
  { q: "How do I apply?", a: "Send a TEP enquiry with your preferred track. The team replies with the current cohort details and next steps." },
  { q: "Do I get a certificate?", a: "Certificate and career-support details differ by cohort. Ask in your enquiry and the team will confirm what applies to the current cohort." },
];

/** The learning journey per track, drawn from the program guides. Order is the real teaching sequence. */
export const JOURNEY: Record<Track["slug"], { step: string; body: string }[]> = {
  "ai-ml": [
    { step: "Neural network foundations", body: "How a neuron trains and how backpropagation works." },
    { step: "Transformers and LLMs", body: "How modern language models are built, and what happens inside them." },
    { step: "Evaluation and fine-tuning", body: "Measuring a model, then adapting it." },
    { step: "Inference and retrieval", body: "Making models fast enough for production, and grounding them with retrieval-augmented generation." },
    { step: "Agentic AI", body: "How agents reason and call tools." },
    { step: "Capstone", body: "A retrieval-augmented, agentic application built end to end." },
  ],
  "multi-cloud": [
    { step: "Linux foundations", body: "The command line, permissions, processes, networking and shell scripting." },
    { step: "Git and GitHub", body: "Branching, pull requests and team workflows." },
    { step: "CI/CD", body: "Automated pipelines with GitHub Actions and Jenkins." },
    { step: "Containers and Kubernetes", body: "Docker images, then pods, deployments and services." },
    { step: "AWS essentials", body: "Core services such as EC2, S3, IAM and VPC." },
    { step: "Portfolio project", body: "A project you design, build and deploy yourself." },
  ],
};
