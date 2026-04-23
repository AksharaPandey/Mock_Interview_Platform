import { getCurrentUser } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { dummyInterviews } from "@/constants";
import { Award, BrainCircuit, LibraryBig, Medal, PlaySquare, Target, TrendingUp, Zap } from "lucide-react";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-full">
        <h2 className="text-xl mb-4">You need to sign in to view your profile.</h2>
        <Link href="/sign-in" className="btn py-2 px-6">Sign In</Link>
      </div>
    );
  }

  const totalInterviews = dummyInterviews.length;
  const averageScore = 85; 

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 w-full animate-fadeIn relative">
      
      {/* Background glow effects */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

      {/* Hero Profile Header */}
      <div className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl mb-12 backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-transparent opacity-50" />
        <div className="relative p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-primary to-indigo-600 flex items-center justify-center shadow-[0_0_40px_rgba(42,104,255,0.4)] border-4 border-white/10">
            <span className="text-5xl font-black text-white mix-blend-overlay">{user.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{user.name}</h1>
            <p className="text-gray-400 text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
              {user.email} <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span> Tier 1 Candidate
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm font-bold text-green-400 uppercase tracking-widest">Active Member</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Left Column: KPI Metrics */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-6 h-6 text-brand-primary" />
            <h2 className="text-2xl font-bold">Performance Matrix</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-8 bg-gradient-to-br from-indigo-900/40 to-transparent border border-indigo-500/20 relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-500">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/20 blur-3xl group-hover:bg-indigo-500/40 transition-all duration-700" />
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6">
                 <LibraryBig className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Total Interviews</h3>
              <p className="text-6xl font-black text-white tracking-tighter">{totalInterviews}</p>
            </div>

            <div className="rounded-3xl p-8 bg-gradient-to-br from-green-900/40 to-transparent border border-green-500/20 relative overflow-hidden group hover:border-green-500/40 transition-all duration-500">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/20 blur-3xl group-hover:bg-green-500/40 transition-all duration-700" />
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">
                 <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Average Score</h3>
              <p className="text-6xl font-black text-green-400 tracking-tighter">{averageScore}<span className="text-3xl">%</span></p>
            </div>
            
            <div className="rounded-3xl p-8 bg-gradient-to-br from-orange-900/40 to-transparent border border-orange-500/20 relative overflow-hidden group hover:border-orange-500/40 transition-all duration-500 md:col-span-2">
              <div className="absolute -right-10 -top-10 w-64 h-64 bg-orange-500/10 blur-3xl group-hover:bg-orange-500/20 transition-all duration-700" />
              <div className="flex justify-between items-center w-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6">
                    <Medal className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Top Strength</h3>
                  <p className="text-4xl font-black text-orange-400 tracking-tight mt-1">Problem Solving</p>
                </div>
                <div className="hidden sm:block">
                   <div className="relative w-32 h-32 rounded-full border-8 border-orange-500/20 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-t-8 border-orange-400 rotate-45"></div>
                      <span className="text-2xl font-bold text-white">92%</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skill Progress */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2">
            <BrainCircuit className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">Skill Breakdown</h2>
          </div>
          
          <div className="rounded-3xl p-8 bg-white/5 border border-white/10 h-full flex flex-col gap-8">
             <div className="space-y-2">
               <div className="flex justify-between text-sm font-bold">
                 <span className="text-gray-300 tracking-wide">Communication</span>
                 <span className="text-brand-primary">88%</span>
               </div>
               <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden">
                 <div className="h-full bg-brand-primary rounded-full" style={{ width: "88%" }}></div>
               </div>
             </div>

             <div className="space-y-2">
               <div className="flex justify-between text-sm font-bold">
                 <span className="text-gray-300 tracking-wide">Technical Knowledge</span>
                 <span className="text-indigo-400">76%</span>
               </div>
               <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 rounded-full" style={{ width: "76%" }}></div>
               </div>
             </div>

             <div className="space-y-2">
               <div className="flex justify-between text-sm font-bold">
                 <span className="text-gray-300 tracking-wide">Cultural Fit</span>
                 <span className="text-teal-400">95%</span>
               </div>
               <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden">
                 <div className="h-full bg-teal-500 rounded-full" style={{ width: "95%" }}></div>
               </div>
             </div>
             
             <div className="mt-auto pt-6 border-t border-white/10">
               <p className="text-sm text-gray-400 italic">"Consistently demonstrates strong interpersonal skills, but could brush up on backend architecture nuances."</p>
             </div>
          </div>
        </div>
      </div>

      {/* Recommended & Recent Section */}
      <h2 className="text-2xl font-bold mb-6 mt-16 border-t border-white/10 pt-12 flex items-center gap-3">
        <Award className="w-6 h-6 text-yellow-500" /> 
        Recommended & History
      </h2>
      
      <div className="space-y-4">
        {/* Recommendation Banner */}
        <div className="rounded-2xl p-6 md:p-8 bg-gradient-to-r from-yellow-900/30 to-brand-primary/10 border border-yellow-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 group hover:border-yellow-500/50 transition">
            <div className="flex gap-6 items-center">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex-shrink-0 flex items-center justify-center">
                 <PlaySquare className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Advanced Data Structures Masterclass</h3>
                <p className="text-sm text-gray-400">AI Recommended based on your latest Technical Knowledge score drop.</p>
              </div>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-xl transition w-full sm:w-auto shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              Start Course
            </button>
        </div>

        {/* History Cards */}
        {dummyInterviews.map(interview => (
          <div key={interview.id} className="rounded-2xl p-5 border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white/[0.04] transition">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">{interview.role} <span className="text-gray-500 font-normal">({interview.level})</span></h3>
                <p className="text-xs font-mono text-brand-primary/80 mt-1 uppercase">Stack: {interview.techstack.join(" • ")}</p>
              </div>
            </div>
            <Link href={`/interviews/${interview.id}`} className="bg-white/5 hover:bg-white/10 text-white font-medium py-2 px-6 rounded-xl border border-white/10 transition w-full sm:w-auto text-center">
              Re-take Mock
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ProfilePage;
