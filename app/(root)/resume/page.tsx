import ResumeAnalyzer from "@/components/ResumeAnalyzer";

const ResumePage = () => {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8">
      <h1 className="text-3xl font-semibold text-white mb-2">Resume Intelligence</h1>
      <p className="text-gray-400 mb-2">
        Upload your resume and get ATS scoring, role-specific feedback, and personalized preparation guidance.
      </p>
      <ResumeAnalyzer />
    </div>
  );
};

export default ResumePage;
