"use client";

import Image from "next/image";
import { cn, getTechLogos } from "@/lib/utils";

const DisplayTechIcons = ({ techStack }: { techStack: string[] }) => {
  const techIcons = getTechLogos(techStack);

  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            "relative group bg-dark-300 rounded-full p-2 flex items-center justify-center border border-white/5",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>

          <img
            src={url}
            alt={tech}
            width={20}
            height={20}
            className="size-5"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/tech.svg";
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;