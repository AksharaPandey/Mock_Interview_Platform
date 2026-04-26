import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

const availableRoles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Mobile Developer",
  "Data Scientist",
  "UI/UX Designer",
  "reddit",
  "tiktok",
  "hostinger",
  "quora",
  "skype",
  "telegram",
  "pinterest",
];

const availableLevels = ["Junior", "Mid-Level", "Senior", "Lead"];

export const generateRandomInterviews = (count: number = 2): Interview[] => {
  // We use a stable seed if we were in a library, but here we just ensure 
  // this is only called when we explicitly want new data.
  // To avoid hydration issues, any component using this should be a Client Component 
  // and call this inside useEffect.
  return Array.from({ length: count }, (_, i) => {
    const role = availableRoles[Math.floor(Math.random() * availableRoles.length)];
    const level = availableLevels[Math.floor(Math.random() * availableLevels.length)];
    return {
      id: `random-${i + 1}-${Math.floor(Math.random() * 1000000)}`,
      userId: "user1",
      role: role.charAt(0).toUpperCase() + role.slice(1).replace(".png", ""),
      type: Math.random() > 0.5 ? "Technical" : "Mixed",
      techstack: ["React", "Node.js", "TypeScript", "Tailwind CSS"].sort(() => 0.5 - Math.random()).slice(0, 3),
      level: level,
      questions: ["Tell me about your experience."],
      finalized: false,
      createdAt: new Date().toISOString(),
    };
  });
};

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "Next.js", "TypeScript"],
    level: "Senior",
    questions: ["Explain Hydration in Next.js"],
    finalized: true,
    createdAt: "2026-04-26T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Engineer",
    type: "Mixed",
    techstack: ["Node.js", "PostgreSQL", "Docker"],
    level: "Mid-Level",
    questions: ["How do you handle database migrations?"],
    finalized: true,
    createdAt: "2026-04-25T14:30:00Z",
  },
  {
    id: "3",
    userId: "user1",
    role: "UI/UX Designer",
    type: "Behavioral",
    techstack: ["Figma", "Tailwind CSS", "Sass"],
    level: "Junior",
    questions: ["Describe your design process."],
    finalized: false,
    createdAt: "2026-04-24T09:15:00Z",
  },
  {
    id: "4",
    userId: "user1",
    role: "DevOps Engineer",
    type: "Technical",
    techstack: ["Kubernetes", "AWS", "Terraform"],
    level: "Lead",
    questions: ["How do you implement CI/CD?"],
    finalized: true,
    createdAt: "2026-04-23T11:00:00Z",
  },
  {
    id: "5",
    userId: "user1",
    role: "Mobile Developer",
    type: "Technical",
    techstack: ["React Native", "Swift", "Kotlin"],
    level: "Mid-Level",
    questions: ["Explain the mobile app lifecycle."],
    finalized: false,
    createdAt: "2026-04-22T16:45:00Z",
  },
  {
    id: "6",
    userId: "user1",
    role: "Data Scientist",
    type: "Mixed",
    techstack: ["Python", "Pandas", "Scikit-learn"],
    level: "Senior",
    questions: ["How do you handle missing data?"],
    finalized: true,
    createdAt: "2026-04-21T13:20:00Z",
  }
];

export const dummyFeedbackByInterviewId: Record<string, Feedback> = {
  "1": {
    id: "feedback-1",
    interviewId: "1",
    totalScore: 87,
    categoryScores: [
      {
        name: "Communication Skills",
        score: 89,
        comment: "You communicated clearly and kept your answers concise.",
      },
      {
        name: "Technical Knowledge",
        score: 84,
        comment: "Strong React fundamentals with room to deepen architecture answers.",
      },
      {
        name: "Problem Solving",
        score: 86,
        comment: "Good approach framing and tradeoff discussion.",
      },
      {
        name: "Cultural Fit",
        score: 90,
        comment: "Positive and collaborative style throughout the discussion.",
      },
      {
        name: "Confidence and Clarity",
        score: 85,
        comment: "Confident delivery; could improve structure in long answers.",
      },
    ],
    strengths: ["Clarity in explanation", "Frontend fundamentals", "Team-fit mindset"],
    areasForImprovement: [
      "System design depth",
      "Advanced performance optimization examples",
      "More quantifiable impact in project stories",
    ],
    finalAssessment:
      "Strong overall interview. You are very close to production-ready frontend interview performance and should focus on advanced architecture storytelling.",
    createdAt: "2026-03-16T11:30:00Z",
  },
};

export const suggestedLearningVideos = [
  {
    title: "System Design Interview: Scale From 0 to 1M Users",
    channel: "ByteByteGo",
    url: "https://www.youtube.com/watch?v=UzLMhqg3_Wc",
  },
  {
    title: "Behavioral Interview Questions and STAR Method",
    channel: "Google Career Certificates",
    url: "https://www.youtube.com/watch?v=ws9WCecM6g8",
  },
  {
    title: "React Performance Patterns You Should Know",
    channel: "Web Dev Simplified",
    url: "https://www.youtube.com/watch?v=cu_hd4f1RVs",
  },
];

export const dummyNotifications: AppNotification[] = [
  {
    id: "1",
    title: "New Feedback Ready",
    message: "Your interview for Frontend Developer has been evaluated.",
    type: "feedback",
    createdAt: "2026-04-26T10:00:00Z",
    isRead: false,
    link: "/interviews/1/feedback",
  },
  {
    id: "2",
    title: "Resume Analyzed",
    message: "Your resume 'John_Doe_FE.pdf' analysis is complete.",
    type: "resume",
    createdAt: "2026-04-25T14:30:00Z",
    isRead: true,
    link: "/resume",
  },
  {
    id: "3",
    title: "System Update",
    message: "Weekly interview questions have been refreshed.",
    type: "system",
    createdAt: "2026-04-24T09:15:00Z",
    isRead: true,
  },
];