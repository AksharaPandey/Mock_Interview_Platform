import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { User, Mail, Calendar, Briefcase, FileText, Database, Shield } from "lucide-react";
import Link from "next/link";

const ProfileOldPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 w-full font-sans">
      <header className="mb-8 border-b border-white/5 pb-6">
        <h1 className="text-4xl font-bold text-white tracking-tight">User Information Console</h1>
        <p className="text-gray-400 mt-2">Legacy view: Comprehensive account metadata and system status.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6 shadow-xl">
             <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-brand-primary/20 flex items-center justify-center mb-4 border-2 border-brand-primary/50">
                   <User size={48} className="text-brand-primary" />
                </div>
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <p className="text-brand-primary text-sm font-black uppercase tracking-widest mt-1">Pro Member</p>
                <p className="text-gray-500 text-xs mt-4 flex items-center gap-1">
                   <Mail size={12} /> {user.email}
                </p>
             </div>
          </div>

          <div className="bg-[#121214] border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Account Metadata</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-bold uppercase">User ID</span>
                <span className="text-gray-300 font-mono">{user.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-bold uppercase">Auth Provider</span>
                <span className="text-emerald-400">Firebase Auth</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 font-bold uppercase">Member Since</span>
                <span className="text-gray-300">April 24, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-2 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1A1C20] border border-white/5 rounded-2xl p-8 hover:border-brand-primary/30 transition-all group">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition">
                       <Calendar className="text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold">Interview Stats</h3>
                 </div>
                 <div className="space-y-2">
                    <p className="text-sm text-gray-400">Total sessions completed: <span className="text-white font-bold">12</span></p>
                    <p className="text-sm text-gray-400">Average response time: <span className="text-white font-bold">1.4s</span></p>
                    <p className="text-sm text-gray-400">Overall confidence score: <span className="text-white font-bold">87%</span></p>
                 </div>
              </div>

              <div className="bg-[#1A1C20] border border-white/5 rounded-2xl p-8 hover:border-brand-primary/30 transition-all group">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition">
                       <Briefcase className="text-orange-400" />
                    </div>
                    <h3 className="text-lg font-bold">Career Alignment</h3>
                 </div>
                 <div className="space-y-2">
                    <p className="text-sm text-gray-400">Target Role: <span className="text-white font-bold">Frontend Engineer</span></p>
                    <p className="text-sm text-gray-400">Experience Level: <span className="text-white font-bold">Mid-Level</span></p>
                    <p className="text-sm text-gray-400">Interview Readiness: <span className="text-emerald-400 font-bold">High</span></p>
                 </div>
              </div>

              <div className="bg-[#1A1C20] border border-white/5 rounded-2xl p-8 hover:border-brand-primary/30 transition-all group">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition">
                       <FileText className="text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold">Resume Health</h3>
                 </div>
                 <div className="space-y-2">
                    <p className="text-sm text-gray-400">ATS Compatibility Score: <span className="text-white font-bold">92/100</span></p>
                    <p className="text-sm text-gray-400">Keyword Optimization: <span className="text-white font-bold">Strong</span></p>
                    <p className="text-sm text-gray-400">Last scanned: <span className="text-gray-500">2 hours ago</span></p>
                 </div>
              </div>

              <div className="bg-[#1A1C20] border border-white/5 rounded-2xl p-8 hover:border-brand-primary/30 transition-all group">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-red-500/10 group-hover:bg-red-500/20 transition">
                       <Shield className="text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold">Security Status</h3>
                 </div>
                 <div className="space-y-2">
                    <p className="text-sm text-gray-400">Session Status: <span className="text-emerald-400 font-bold">Active</span></p>
                    <p className="text-sm text-gray-400">Data Encryption: <span className="text-white font-bold">AES-256</span></p>
                    <p className="text-sm text-gray-400">Two-Factor Auth: <span className="text-gray-500">Disabled</span></p>
                 </div>
              </div>
           </div>

           <div className="bg-[#121214] border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                    <Database className="text-brand-primary" />
                    <h3 className="text-xl font-bold text-white">Advanced System Logs</h3>
                 </div>
                 <Link href="/profile" className="text-xs text-brand-primary hover:underline font-bold uppercase tracking-widest">Switch to modern view</Link>
              </div>
              <div className="bg-black/40 rounded-xl p-4 font-mono text-[11px] text-gray-500 space-y-1">
                 <p>[2026-04-24 12:15:30] AUTH_SUCCESS: user_{user.id.slice(0,8)} session established</p>
                 <p>[2026-04-24 12:15:32] DATA_FETCH: firestore/users/{user.id.slice(0,8)} retrieved 200 OK</p>
                 <p>[2026-04-24 12:16:00] VAPI_BRIDGE: web-socket initialized successfully</p>
                 <p>[2026-04-24 12:16:45] RESUME_PARSE: PDF worker initialized at node_worker_01</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOldPage;
