"use client";

import { useState } from "react";
import { FileUp, Loader2, PlayCircle } from "lucide-react";

interface SuggestedVideo {
  title: string;
  channel: string;
  url: string;
}

interface ResumeAnalysisResult {
  atsScore: number;
  strengths: string[];
  improvements: string[];
  matchedKeywords: string[];
  suggestedVideos: SuggestedVideo[];
  personalizedSummary: string;
  targetRole: string;
  interviewFocus: string[];
  analysisMode: "ai-enhanced" | "rule-based";
}

const ResumeAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetRole, setTargetRole] = useState("Frontend Developer");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const onFilePicked = (file: File | null) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleAnalyzeResume = async () => {
    if (!selectedFile) {
      setError("Please choose a resume first.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      formData.append("targetRole", targetRole);

      const response = await fetch("/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Failed to analyze resume.");
      }

      setResult(payload.data);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to analyze resume.";
      setError(message);
      setResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mt-10 border-t border-gray-800 pt-10">
      <h2 className="text-lg font-medium text-gray-200 mb-6 flex items-center gap-2">
        <FileUp className="w-5 h-5 text-gray-400" /> Resume Intelligence
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-[#121214] border border-gray-800 rounded-xl p-6">
          <p className="text-sm text-gray-300 mb-3">
            Upload your resume to get ATS score, strengths, improvement points, and targeted learning videos.
          </p>
          <div className="mb-3">
            <label className="text-xs text-gray-400 block mb-1">Target role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              placeholder="e.g. Frontend Engineer"
              className="w-full rounded-md border border-gray-700 bg-[#0f1013] px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragActive(false);
              const file = event.dataTransfer.files?.[0] || null;
              onFilePicked(file);
            }}
            className={`mb-3 rounded-lg border border-dashed p-4 text-center transition ${
              dragActive ? "border-brand-primary bg-brand-primary/10" : "border-gray-700 bg-[#0f1013]"
            }`}
          >
            <p className="text-sm text-gray-300">Drag and drop your resume here</p>
            <p className="text-xs text-gray-500 mt-1">or select file manually below</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(event) => onFilePicked(event.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-white file:cursor-pointer"
            />
            <button
              type="button"
              onClick={handleAnalyzeResume}
              disabled={isAnalyzing}
              className="btn-primary sm:w-auto w-full disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </span>
              ) : (
                "Upload Resume"
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            Supported formats: PDF, DOCX, TXT
          </p>
          {selectedFile && (
            <p className="text-xs text-emerald-400 mt-2">
              Selected: {selectedFile.name}
            </p>
          )}
          {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
        </div>

        <div className="bg-[#121214] border border-gray-800 rounded-xl p-6">
          <p className="text-sm text-gray-400 mb-2">ATS Compatibility</p>
          <p className="text-3xl font-semibold text-white">
            {result ? `${result.atsScore}/100` : "--/100"}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {result
              ? "This score is generated from structure, keyword coverage, and impact signals."
              : "Upload your resume to generate your ATS score."}
          </p>
        </div>
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="lg:col-span-2 bg-[#121214] border border-gray-800 rounded-xl p-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded-md bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
                {result.analysisMode === "ai-enhanced" ? "AI Enhanced" : "Rule Based"}
              </span>
              <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-gray-700">
                Role: {result.targetRole}
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{result.personalizedSummary}</p>
          </div>

          <div className="bg-[#121214] border border-gray-800 rounded-xl p-6">
            <h3 className="text-base font-medium text-emerald-400 mb-3">Strengths</h3>
            <ul className="space-y-2">
              {result.strengths.map((item) => (
                <li key={item} className="text-sm text-gray-300">
                  - {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#121214] border border-gray-800 rounded-xl p-6">
            <h3 className="text-base font-medium text-amber-400 mb-3">Areas to Improve</h3>
            <ul className="space-y-2">
              {result.improvements.map((item) => (
                <li key={item} className="text-sm text-gray-300">
                  - {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {result && result.interviewFocus.length > 0 && (
        <div className="mt-6 bg-[#121214] border border-gray-800 rounded-xl p-6">
          <h3 className="text-base font-medium text-white mb-3">Personalized Interview Focus</h3>
          <ul className="space-y-2">
            {result.interviewFocus.map((item) => (
              <li key={item} className="text-sm text-gray-300">
                - {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result && result.suggestedVideos.length > 0 && (
        <div className="mt-6 bg-[#121214] border border-gray-800 rounded-xl p-6">
          <h3 className="text-base font-medium text-white mb-4">Suggested Learning Videos</h3>
          <div className="space-y-3">
            {result.suggestedVideos.map((video) => (
              <a
                key={video.url}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-gray-800 px-4 py-3 hover:border-gray-600 hover:bg-[#16181f] transition-colors"
              >
                <div>
                  <p className="text-sm text-gray-200">{video.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{video.channel}</p>
                </div>
                <PlayCircle className="w-5 h-5 text-brand-primary" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
