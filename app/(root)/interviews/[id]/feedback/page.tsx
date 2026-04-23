import { dummyFeedbackByInterviewId, dummyInterviews } from "@/constants";
import Link from "next/link";
import { ArrowLeft, CircleCheck } from "lucide-react";

export default async function InterviewFeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const interviewId = resolvedParams.id;
  const feedback = dummyFeedbackByInterviewId[interviewId];
  const interview = dummyInterviews.find((item) => item.id === interviewId);

  if (!feedback || !interview) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Feedback Not Found</h1>
        <p className="text-gray-400 mb-8">
          Complete an interview first to generate personalized feedback.
        </p>
        <Link href="/" className="btn py-2 px-6">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8">
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-8 w-max"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="bg-[#121214] border border-gray-800 rounded-2xl p-6 mb-6">
        <p className="text-sm text-gray-400 mb-2">Feedback Report</p>
        <h1 className="text-2xl font-semibold text-white">
          {interview.role} ({interview.level})
        </h1>
        <p className="text-gray-400 mt-2">
          Total Score:{" "}
          <span className="text-white font-medium">{feedback.totalScore}/100</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {feedback.categoryScores.map((category) => (
          <div
            key={category.name}
            className="bg-[#121214] border border-gray-800 rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-300">{category.name}</p>
              <p className="text-sm font-semibold text-white">{category.score}/100</p>
            </div>
            <p className="text-xs text-gray-500">{category.comment}</p>
            <div className="mt-3 h-1.5 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full bg-brand-primary rounded-full"
                style={{ width: `${Math.max(0, Math.min(100, category.score))}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#121214] border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-medium text-white mb-4">Performance Matrix</h2>
        <div className="space-y-3">
          {feedback.categoryScores.map((category) => (
            <div key={`${category.name}-matrix`} className="grid grid-cols-12 items-center gap-3">
              <p className="text-xs text-gray-400 col-span-5 md:col-span-4">{category.name}</p>
              <div className="col-span-5 md:col-span-6 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${Math.max(0, Math.min(100, category.score))}%` }}
                />
              </div>
              <p className="text-xs text-gray-300 col-span-2 text-right">{category.score}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#121214] border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-medium text-white mb-3">Final Assessment</h2>
        <p className="text-gray-300 leading-relaxed mb-6">{feedback.finalAssessment}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 mb-2">Strengths</h3>
            <ul className="space-y-2">
              {feedback.strengths.map((item) => (
                <li key={item} className="text-sm text-gray-300 flex items-start gap-2">
                  <CircleCheck className="w-4 h-4 text-emerald-400 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-amber-400 mb-2">Areas to Improve</h3>
            <ul className="space-y-2">
              {feedback.areasForImprovement.map((item) => (
                <li key={item} className="text-sm text-gray-300 flex items-start gap-2">
                  <CircleCheck className="w-4 h-4 text-amber-400 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
