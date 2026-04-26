import { generateRandomInterviews, dummyFeedbackByInterviewId } from "@/constants";
import InterviewCard from "@/components/InterviewCard";
import { MessageSquare, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const InterviewsFeedbackPage = () => {
    // Generate fresh interviews and simulate feedback existence
    const feedbackInterviews = generateRandomInterviews(5).map((i, index) => ({
        ...i,
        id: `feedback-item-${index}`,
        originalId: "1" // Use this for feedback lookup
    }));

    return (
        <div className="max-w-6xl mx-auto w-full px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-semibold text-white flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-brand-primary" />
                        Performance Feedback
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Detailed insights into your interview performance and areas for growth.
                    </p>
                </div>
                <Link href="/" className="btn-secondary flex items-center gap-2 px-6 py-2 rounded-xl border border-white/5 hover:bg-white/5 transition-all">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                </Link>
            </div>

            {feedbackInterviews.length > 0 ? (
                <div className="flex flex-col gap-8 w-full">
                    {feedbackInterviews.map((interview, idx) => {
                        const feedback = dummyFeedbackByInterviewId[interview.originalId];
                        return (
                            <div key={idx} className="flex flex-col gap-4">
                                <InterviewCard
                                    {...interview}
                                    interviewId={interview.originalId}
                                    showFeedbackDetails
                                />
                                {/* Expanded feedback details for this specific view */}
                                <div className="ml-0 md:ml-28 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-[#1A1C20] border border-white/5 rounded-2xl p-5 hover:border-emerald-500/30 transition-all">
                                        <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            Key Strengths
                                        </h4>
                                        <ul className="space-y-2">
                                            {feedback.strengths.slice(0, 3).map((s, idx) => (
                                                <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                                                    <span className="text-emerald-500 mt-1">•</span>
                                                    {s}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-[#1A1C20] border border-white/5 rounded-2xl p-5 hover:border-amber-500/30 transition-all">
                                        <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                            Room for Improvement
                                        </h4>
                                        <ul className="space-y-2">
                                            {feedback.areasForImprovement.slice(0, 3).map((a, idx) => (
                                                <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                                                    <span className="text-amber-500 mt-1">•</span>
                                                    {a}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-20 text-center bg-dark-200 border border-white/5 rounded-3xl">
                    <div className="bg-brand-primary/10 p-6 rounded-full mb-6">
                        <MessageSquare className="w-12 h-12 text-brand-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">No Feedback Yet</h2>
                    <p className="text-gray-400 max-w-md mb-8">
                        Complete your first interview to see a detailed breakdown of your performance and skills.
                    </p>
                    <Link href="/interview" className="btn-primary px-8 py-3">
                        Start Your First Interview
                    </Link>
                </div>
            )}
        </div>
    );
};

export default InterviewsFeedbackPage;
