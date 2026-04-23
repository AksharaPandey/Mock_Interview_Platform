import React from "react";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { dummyInterviews } from "@/constants";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function InterviewPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  const resolveParams = await params;
  const interviewId = resolveParams.id;
  
  const interview = dummyInterviews.find(i => i.id === interviewId);
  
  if (!interview) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Interview Not Found</h1>
        <p className="text-gray-400 mb-8">The interview you are trying to access does not exist.</p>
        <Link href="/" className="btn py-2 px-6">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8">
      <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 w-max">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left column: Interview context & Agent */}
        <div className="col-span-1 md:col-span-2">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{interview.role} ({interview.level})</h1>
            <p className="text-gray-400 text-lg">Type: {interview.type} Interview</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
             {/* We pass the unique interview data to Agent if we want, or just render it */}
             <Agent 
               userName={user?.name || "Candidate"} 
               userId={user?.id || "anonymous"} 
               type={interview.type} 
             />
          </div>
        </div>

        {/* Right column: Stats details */}
        <div className="col-span-1 border-l border-white/10 pl-0 md:pl-8 mt-8 md:mt-0">
          <h2 className="text-xl font-bold mb-6 pd-4">Interview Profile</h2>
          
          <div className="space-y-6">
            <div className="card-border p-4 bg-white/5">
              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {interview.techstack.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-white/10 rounded-md text-xs font-medium text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-border p-4 bg-white/5">
              <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">Total Questions</h3>
              <p className="text-3xl font-bold text-white">{interview.questions.length > 0 ? interview.questions.length : 5}</p>
            </div>

             <div className="card-border p-4 bg-brand-primary/10 border-brand-primary/30">
              <h3 className="text-sm font-bold text-brand-primary mb-2">Instructions</h3>
              <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4">
                <li>Make sure you are in a quiet environment.</li>
                <li>Ensure your microphone and camera permissions are granted.</li>
                <li>Speak clearly and take your time answering.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
