import { getCurrentUser } from "@/lib/actions/auth.action";
import Link from "next/link";
import { dummyInterviews } from "@/constants";
import { Activity, BookOpen, BrainCircuit, CheckCircle2, ChevronRight, MonitorPlay, Star, Target, User as UserIcon } from "lucide-react";

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-10 h-full">
        <h2 className="text-xl mb-4 text-gray-300">You need to sign in to view your profile.</h2>
        <Link href="/sign-in" className="btn py-2 px-6">Sign In</Link>
      </div>
    );
  }

  const totalInterviews = dummyInterviews.length;
  const averageScore = 85; 

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 w-full animate-fadeIn font-sans">
      
      {/* Header Section */}
      <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-gray-800 pb-8">
        <div className="flex items-center gap-5">
           <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
             <UserIcon className="w-8 h-8 text-gray-400" />
           </div>
           <div>
             <h1 className="text-2xl font-semibold text-white tracking-tight">{user.name}</h1>
             <p className="text-gray-400 text-sm mt-1">{user.email}</p>
           </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-md text-green-400 text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Active Account
        </div>
      </header>

      {/* Main KPI Grid */}
      <h2 className="text-lg font-medium text-gray-200 mb-4 flex items-center gap-2">
         <Activity className="w-5 h-5 text-gray-400" /> Executive Summary
      </h2>
      
      <div className="grid grid-cols-1 gap-4 mb-10">
        <div className="bg-gradient-to-br from-[#15171d] to-[#111215] border border-gray-800 rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.24)]">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-gray-400">Total Interviews</p>
            <MonitorPlay className="w-4 h-4 text-gray-500" />
          </div>
          <p className="text-3xl font-semibold text-white">{totalInterviews}</p>
        </div>

        <div className="bg-gradient-to-br from-[#15171d] to-[#111215] border border-gray-800 rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.24)]">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-gray-400">Average Score</p>
            <Target className="w-4 h-4 text-gray-500" />
          </div>
          <p className="text-3xl font-semibold text-white">{averageScore}<span className="text-lg text-gray-500 ml-1">%</span></p>
        </div>

        <div className="bg-gradient-to-br from-[#15171d] to-[#111215] border border-gray-800 rounded-xl p-6 shadow-[0_8px_30px_rgba(0,0,0,0.24)]">
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-gray-400">Core Strength</p>
            <Star className="w-4 h-4 text-brand-primary" />
          </div>
          <p className="text-xl font-semibold text-white mt-1">Problem Solving</p>
          <p className="text-sm text-gray-500 mt-1">Top 12% of candidates</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-gray-800 pt-10">
        
        {/* Left Column: Skill Bars */}
        <div>
          <h2 className="text-lg font-medium text-gray-200 mb-6 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-gray-400" /> Skill Breakdown
          </h2>
          
          <div className="space-y-6">
             <div>
               <div className="flex justify-between text-sm mb-2">
                 <span className="text-gray-300 font-medium">Communication</span>
                 <span className="text-gray-400">88%</span>
               </div>
               <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                 <div className="h-full bg-brand-primary rounded-full transition-all duration-1000" style={{ width: "88%" }}></div>
               </div>
             </div>

             <div>
               <div className="flex justify-between text-sm mb-2">
                 <span className="text-gray-300 font-medium">Technical Knowledge</span>
                 <span className="text-gray-400">76%</span>
               </div>
               <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: "76%" }}></div>
               </div>
             </div>

             <div>
               <div className="flex justify-between text-sm mb-2">
                 <span className="text-gray-300 font-medium">Cultural Fit</span>
                 <span className="text-gray-400">95%</span>
               </div>
               <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: "95%" }}></div>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: History & Courses */}
        <div>
          <h2 className="text-lg font-medium text-gray-200 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gray-400" /> Recent Activity
          </h2>
          
          <div className="space-y-4">
            
            {/* History Items */}
            {dummyInterviews.map((interview) => (
              <Link href={`/interviews/${interview.id}`} key={interview.id} className="block group">
                <div className="bg-[#121214] border border-gray-800 rounded-lg p-4 hover:border-gray-600 hover:bg-[#16181f] transition-colors flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{interview.role} ({interview.level})</h3>
                    <p className="text-xs text-gray-500 mt-1">{interview.techstack.join(", ")}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-300 transition-colors" />
                </div>
              </Link>
            ))}

            {/* Recommendation Card */}
            <div className="bg-[#121214] border border-gray-800 rounded-lg p-5 mt-6 border-l-2 border-l-brand-primary">
               <div className="flex justify-between items-start">
                 <div>
                   <h3 className="text-sm font-semibold text-white mb-1">Recommended Course</h3>
                   <p className="text-xs text-gray-500 leading-relaxed mb-3">
                     Based on your 76% technical score, we recommend brushing up on advanced System Design.
                   </p>
                 </div>
               </div>
               <button className="text-xs font-medium text-brand-primary hover:text-brand-primary/80 transition-colors uppercase tracking-wide">
                 Start Course &rarr;
               </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
