export type Member = { name: string; title: string; photo: string; /** Omitted until the person's profile URL is supplied. */ linkedin?: string };

export const TEAM: readonly Member[] = [
  { name: "Omkar Kokane", title: "CEO", photo: "/team/omkar.jpeg", linkedin: "https://www.linkedin.com/in/omkar-kokane/" },
  { name: "Aditya Bankar", title: "CTO", photo: "/team/aditya.PNG", linkedin: "https://www.linkedin.com/in/adityabankar21/" },
  { name: "Yash Pawar", title: "DevOps Engineer", photo: "/team/yash.jpeg", linkedin: "https://www.linkedin.com/in/yash-pawar-862702287/" },
  { name: "Vedant Wagh", title: "Software Development Engineer", photo: "/team/vedant.jpeg", linkedin: "https://www.linkedin.com/in/vedantwagh1405/" },
  { name: "Sakshi Dhatrak", title: "ML Engineer", photo: "/team/sakshi.jpeg", linkedin: "https://www.linkedin.com/in/sakshidhatrak/" },
  { name: "Harshad Gangurde", title: "Business Development Executive", photo: "/team/harshad.webp" },
  { name: "Atharv Borse", title: "Cloud Engineer", photo: "/team/atharv.webp" },
];

export const PRINCIPLES = [
  { title: "Collaboration", body: "We work as one team with our clients, not alongside them." },
  { title: "Continuous learning", body: "We teach what we practise, and learn from what we ship." },
  { title: "Ownership", body: "We take responsibility for the systems we build." },
] as const;
