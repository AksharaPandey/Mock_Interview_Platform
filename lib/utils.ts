import { interviewCovers, mappings } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings];
};

export const getTechLogos = (techArray: string[]) => {
  return techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: normalized 
        ? `${techIconBaseURL}/${normalized}/${normalized}-original.svg` 
        : "/tech.svg",
    };
  });
};

export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};

export const getInterviewCoverById = (interviewId: string, role?: string) => {
  if (!interviewId && !role) return getRandomInterviewCover();

  // Try to match by role name (e.g. "Reddit Interview" -> "/covers/reddit.png")
  if (role) {
    const roleLower = role.toLowerCase();
    const matchingCover = interviewCovers.find(cover => 
      roleLower.includes(cover.replace("/", "").replace(".png", ""))
    );
    if (matchingCover) return `/covers${matchingCover}`;
  }

  // Fallback to hashing the ID
  const hash = (interviewId || "default")
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % interviewCovers.length;

  return `/covers${interviewCovers[index]}`;
};
