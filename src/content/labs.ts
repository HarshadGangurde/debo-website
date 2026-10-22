/** Source of truth: https://labs.deboistech.in (reviewed 15 Oct 2026). Owner sign-off pending. */
export const LABS = {
  name: "Debo Labs",
  url: "https://labs.deboistech.in",
  startUrl: "https://labs.deboistech.in/lab/linux-fundamentals/cli-foundations",
  source: "https://github.com/debois-tech/debo-Labs",
  headline: "Learn DevOps by doing.",
  sub: "Real terminals. Real feedback. Every lab is graded on what actually happened.",
  localPort: "localhost:8082",
  lastReviewed: "2026-10-15",
} as const;

export type LabTrack = { slug: string; name: string; blurb: string; labs: number; minutes: number };

export const LAB_TRACKS: LabTrack[] = [
  { slug: "linux-fundamentals", name: "Linux Fundamentals", labs: 30, minutes: 362, blurb: "Find your way around a Linux shell, manage files, understand permissions, and chain commands together." },
  { slug: "git-basics", name: "Git Basics", labs: 9, minutes: 111, blurb: "Record history, work on branches, merge, and undo mistakes, using the real git CLI." },
  { slug: "aws-cloud-practitioner", name: "AWS Cloud Practitioner", labs: 8, minutes: 102, blurb: "Hands-on practice for the Cloud Practitioner exam topics, in a real terminal against an offline copy of the AWS CLI." },
  { slug: "aws", name: "AWS", labs: 10, minutes: 188, blurb: "Hands-on AWS from the command line: Elastic Beanstalk Cluster Mode and a three-day course covering CLI, compute, storage, networking, databases, security and cost." },
  { slug: "aws-serverless", name: "AWS Serverless", labs: 3, minutes: 50, blurb: "Build with DynamoDB and Lambda in a real terminal against an offline copy of the AWS CLI, ending with a small serverless API." },
  { slug: "docker", name: "Docker", labs: 11, minutes: 147, blurb: "See what a container really is, write a clean Dockerfile, and understand image layers and Compose." },
  { slug: "networking", name: "Networking", labs: 3, minutes: 50, blurb: "Addresses, ports, names and TLS: the four things between a browser and your app, on a real Linux machine." },
  { slug: "nodejs", name: "Node.js", labs: 1, minutes: 12, blurb: "Start a project, write scripts and manage a package.json with npm, all offline, in a real terminal." },
  { slug: "python", name: "Python", labs: 4, minutes: 58, blurb: "Learn Python by writing it, in a real notebook and a real terminal, graded on what your code actually does." },
  { slug: "github-actions", name: "CI/CD with GitHub Actions", labs: 3, minutes: 45, blurb: "Write real workflow files, check them like a runner would, and learn the safe way to deploy to AWS from CI." },
  { slug: "jenkins", name: "Jenkins", labs: 5, minutes: 75, blurb: "Read a Jenkins home, diagnose an install, drive the CLI, back up and restore, and build a delivery pipeline on a practice controller." },
];

export const LAB_TOTALS = {
  tracks: LAB_TRACKS.length,
  labs: LAB_TRACKS.reduce((n, t) => n + t.labs, 0),
  minutes: LAB_TRACKS.reduce((n, t) => n + t.minutes, 0),
};

export const LAB_HOW = [
  { title: "A real terminal", body: "A genuine Linux shell, as its own user. Break things safely." },
  { title: "Graded on real state", body: "The check inspects your sandbox. However you got there, the state is what counts." },
  { title: "Your machine or ours", body: "The same labs run offline in Docker, or hosted." },
] as const;

export const LAB_LOCAL = {
  commands: ["git clone https://github.com/debois-tech/debo-Labs", "cd debo-Labs", "./start_local_labs.sh"],
  requirements: [
    { os: "Windows", needs: "Docker Desktop (WSL2) and Git for Windows. Run in Git Bash or a WSL terminal." },
    { os: "macOS", needs: "Docker Desktop. Run in Terminal." },
    { os: "Linux", needs: "Docker Engine with the Compose plugin. Run in any terminal." },
  ],
} as const;

/** The example shown on labs.deboistech.in, replayed step by step. Illustrative, not a live sandbox. */
export const LAB_DEMO = [
  { cmd: "ls -l deploy.sh", out: "-rw-r--r-- 1 learner learner 64 deploy.sh" },
  { cmd: "chmod +x deploy.sh", out: "" },
  { cmd: "./deploy.sh", out: "deploying to staging… done" },
] as const;
