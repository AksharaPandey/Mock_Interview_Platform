import Link from "next/link";
import { BarChart3, FileText, History, MessageSquare } from "lucide-react";

const cardClass =
  "bg-[#121214] border border-gray-800 rounded-xl p-6 hover:border-gray-600 hover:bg-[#16181f] transition-colors";

const CareerHubPage = () => {
  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8">
      <h1 className="text-3xl font-semibold text-white mb-2">Career Dashboard</h1>
      <p className="text-gray-400 mb-8">
        Access feedback, track interview performance, and improve your profile with resume intelligence.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <Link href="/interviews/history" className={cardClass}>
          <History className="w-5 h-5 text-brand-primary mb-3" />
          <h2 className="text-lg text-white font-medium mb-1">Past Interviews</h2>
          <p className="text-sm text-gray-400">Browse completed interviews and revisit outcomes.</p>
        </Link>

        <Link href="/interviews/1/feedback" className={cardClass}>
          <MessageSquare className="w-5 h-5 text-brand-primary mb-3" />
          <h2 className="text-lg text-white font-medium mb-1">Feedback Reports</h2>
          <p className="text-sm text-gray-400">See strengths, weak areas, and practical next steps.</p>
        </Link>

        <Link href="/resume" className={cardClass}>
          <FileText className="w-5 h-5 text-brand-primary mb-3" />
          <h2 className="text-lg text-white font-medium mb-1">Resume Intelligence</h2>
          <p className="text-sm text-gray-400">Upload resume for ATS score and role-specific guidance.</p>
        </Link>

        <Link href="/profile" className={cardClass}>
          <BarChart3 className="w-5 h-5 text-brand-primary mb-3" />
          <h2 className="text-lg text-white font-medium mb-1">Performance Matrix</h2>
          <p className="text-sm text-gray-400">Track your communication and technical trends.</p>
        </Link>
      </div>
    </div>
  );
};

export default CareerHubPage;
