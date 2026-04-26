"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Video, FileText, ChevronRight } from "lucide-react";
import { dummyInterviews } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<{ type: 'interview' | 'resume', label: string, href: string, detail: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const filteredInterviews = dummyInterviews.filter(i => 
      i.role.toLowerCase().includes(query.toLowerCase()) || 
      i.techstack.some(t => t.toLowerCase().includes(query.toLowerCase()))
    ).map(i => ({
      type: 'interview' as const,
      label: `${i.role} Interview`,
      href: `/interviews/${i.id}`,
      detail: i.techstack.join(", ")
    }));

    // Add static links if they match
    const staticLinks = [
        { label: "Resume Intelligence", type: 'resume' as const, href: "/resume", detail: "Analyze your CV with AI" },
        { label: "Career Advice", type: 'system' as const, href: "/career", detail: "Industry insights and tips" },
    ].filter(l => l.label.toLowerCase().includes(query.toLowerCase()));

    setResults([...filteredInterviews, ...staticLinks as any]);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (href: string) => {
    router.push(href);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className={cn(
        "hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-gray-400 focus-within:border-brand-primary/50 focus-within:bg-white/10 transition-all w-64 lg:w-96",
        isOpen && "border-brand-primary/50 bg-white/10"
      )}>
        <Search className="w-4 h-4" />
        <input
          type="text"
          placeholder="Search anything..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="bg-transparent border-none outline-none text-sm font-medium text-white placeholder:text-gray-500 w-full"
        />
        {query ? (
          <button onClick={() => setQuery("")}>
            <X className="w-3 h-3 hover:text-white" />
          </button>
        ) : (
          <kbd className="hidden lg:block text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-gray-500 uppercase tracking-tighter">⌘K</kbd>
        )}
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-dark-200 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-2">
            {results.length > 0 ? (
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-3 py-2">Search Results</p>
                {results.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(result.href)}
                    className="w-full text-left p-3 hover:bg-white/5 rounded-xl transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                        {result.type === 'interview' ? (
                          <Video className="w-4 h-4 group-hover:text-brand-primary" />
                        ) : (
                          <FileText className="w-4 h-4 group-hover:text-brand-primary" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white leading-tight">{result.label}</span>
                        <span className="text-[11px] text-gray-500 line-clamp-1">{result.detail}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm text-gray-500">No results found for "{query}"</p>
              </div>
            )}
          </div>
          <div className="p-3 bg-dark-100/50 border-t border-white/5 text-center px-4 py-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            Search interviews, resume tools and more
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
