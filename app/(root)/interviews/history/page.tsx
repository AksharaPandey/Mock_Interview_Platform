import InterviewCard from "@/components/InterviewCard";
import { dummyInterviews } from "@/constants";

const InterviewHistoryPage = () => {
  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8">
      <h1 className="text-3xl font-semibold text-white mb-2">Past Interviews</h1>
      <p className="text-gray-400 mb-6">
        Review your previous interviews, scores, and feedback reports.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
        {dummyInterviews.map((interview) => (
          <InterviewCard
            {...interview}
            key={interview.id}
            showFeedbackDetails
          />
        ))}
      </div>
    </div>
  );
};

export default InterviewHistoryPage;
