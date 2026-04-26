"use client";

import React, { useState } from "react";
import { BadgeCheck, Plus, X } from "lucide-react";
import { mappings } from "@/constants";
import { cn } from "@/lib/utils";

const allPossibleSkills = Array.from(new Set(Object.keys(mappings)));

const SkillsManager = ({ initialSkills }: { initialSkills: string[] }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = allPossibleSkills
        .filter(
          (skill) =>
            skill.toLowerCase().includes(value.toLowerCase()) &&
            !skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setInputValue("");
    setSuggestions([]);
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="bg-dark-200 border border-border rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6 font-bold text-foreground">
        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
          <BadgeCheck className="w-5 h-5 text-green-500" />
        </div>
        <h3>Active Skills</h3>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-border text-xs font-semibold text-light-100 group hover:border-brand-primary/30 hover:text-foreground transition-all flex items-center gap-2"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="hover:text-red-400 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {skills.length === 0 && (
            <p className="text-xs text-gray-500 italic">No skills added yet.</p>
        )}
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 bg-white/5 border border-border rounded-xl px-3 py-2 focus-within:border-brand-primary/50 transition-all">
          <Plus className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a new skill..."
            className="bg-transparent border-none outline-none text-xs text-foreground placeholder:text-gray-600 w-full"
          />
        </div>

        {suggestions.length > 0 && (
          <div className="absolute z-50 bottom-full mb-2 left-0 right-0 bg-dark-300 border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addSkill(suggestion)}
                className="w-full text-left px-4 py-2 text-xs text-light-100 hover:bg-white/5 hover:text-foreground transition-colors capitalize"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsManager;
