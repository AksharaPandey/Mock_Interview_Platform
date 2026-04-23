import { suggestedLearningVideos } from "@/constants";
import { PlayCircle } from "lucide-react";

const CoursesPage = () => {
  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8">
      <h1 className="text-3xl font-semibold text-white mb-2">Suggested Courses</h1>
      <p className="text-gray-400 mb-6">
        Personalized learning resources to improve weak interview areas.
      </p>

      <div className="space-y-3">
        {suggestedLearningVideos.map((video) => (
          <a
            key={video.url}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-lg border border-gray-800 bg-[#121214] px-4 py-4 hover:border-gray-600 hover:bg-[#16181f] transition-colors"
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
  );
};

export default CoursesPage;
