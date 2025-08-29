import React, { useEffect, useRef, useState} from "react";
import { FileText, Tag, Lightbulb } from "lucide-react";
import { ContentData } from "../types";
import axios from "axios";


interface AnalysisResultsProps {
  data: ContentData;
  loading: boolean;
  
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, loading }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);

  const audioHandler = async () => {
    try {
      if (!audioUrl) {
        // First fetch audio from backend
        setAudioLoading(true);
        const response = await axios.post(
          "https://content-backend-r494.onrender.com/api/generate-audio",
          {
            text: data.summary,
          }
        );
        if (response.data.audioFile) {
          setAudioUrl(response.data.audioFile);
          const audio = new Audio(response.data.audioFile);
          audioRef.current = audio;

          audio.onended = () => setIsPlaying(false); // reset when finished
          audio.play();
          setIsPlaying(true);
        }
      } else {
        // If audio already fetched, toggle play/pause
        if (audioRef.current) {
          if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
          } else {
            audioRef.current.play();
            setIsPlaying(true);
          }
        }
      }
    } catch (err) {
      console.error("Error generating speech:", err);
    } finally {
      setAudioLoading(false);
    }
  };

  useEffect(() => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // rewind to start
  }
  setAudioUrl(null);
  setIsPlaying(false);
   // optional: clear queued audio for old summary
}, [data.summary]);
 

  if (loading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg p-8 animate-pulse border border-indigo-50"
          >
            <div className="h-6 bg-gray-200 rounded-lg w-1/4 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-indigo-50 transform hover:scale-[1.02] transition-transform">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-100 rounded-lg p-2">
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Summary</h2>
        </div>
        <p className="text-gray-700 leading-relaxed pb-2">{data.summary}</p>
        <div className="mt-6">
          <button
            onClick={audioHandler}
            disabled={audioLoading}
            
            className={`px-6 py-2 rounded-xl text-white font-medium shadow-lg transition-all flex items-center gap-2 ${
              isPlaying
                ? "bg-red-500 hover:bg-red-600 shadow-red-200"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
            }`}
          >
            {audioLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : isPlaying ? (
              "Pause"
            ) : (
              "Play"
            )}
          </button>
        </div>
      </div>

      {/* --- Key Topics --- */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-purple-50 transform hover:scale-[1.02] transition-transform">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 rounded-lg p-2">
            <Tag className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Key Topics</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium hover:bg-purple-100 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* --- Suggestions --- */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-yellow-50 transform hover:scale-[1.02] transition-transform">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-yellow-100 rounded-lg p-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">AI Suggestions</h2>
        </div>
        <ul className="space-y-4">
          {data.suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="flex items-start gap-3 bg-yellow-50 rounded-xl p-4 hover:bg-yellow-100 transition-colors"
            >
              <span className="text-yellow-600 font-bold">•</span>
              <span className="text-gray-700">{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalysisResults;
