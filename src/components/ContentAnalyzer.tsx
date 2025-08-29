import React, { useState, useRef } from "react";
import { Upload, X, Wand2 } from "lucide-react";
import { analyzeContent } from "../utils/ai";
import { ContentData } from "../types";
import axios from "axios";

interface ContentAnalyzerProps {
  setAnalysisData: (data: ContentData) => void;
  setLoading: (loading: boolean) => void;
  setAudioUrl: (audioUrl: string | null) => void;
  setIsPlaying: (playing: boolean) => void;
}

const ContentAnalyzer: React.FC<ContentAnalyzerProps> = ({
  setAnalysisData,
  setLoading,
  setAudioUrl,
  setIsPlaying
}) => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (selectedFile?: File) => {
    const uploadFile = selectedFile || file;
    if (!uploadFile) {
      alert("Please select a PDF first!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("pdfFile", uploadFile);

      const response = await axios.post(
        "https://content-backend-r494.onrender.com/api/extract-text",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setContent(response.data.text);
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Failed to extract text from PDF.");
    }
  };

  const handleAnalyze = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
      const analysis = await analyzeContent(content);
      setAnalysisData(analysis);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-indigo-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 rounded-lg p-1">
          <Wand2 className="w-5 h-5 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Content Analysis</h2>
      </div>

      <div className="mb-6">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter or paste your content
        </label>
        <textarea
          id="content"
          rows={8}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          placeholder="Paste your content here for AI-powered analysis..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center gap-4">
        {/* Left side: Upload button */}
        <div>
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            hidden
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 font-medium shadow-lg shadow-indigo-200"
          >
            <Upload className="w-4 h-4" />
            Upload PDF
          </button>
        </div>

        {/* Right side: Clear + Analyze */}
        <div className="flex gap-4">
          <button
            onClick={() => {
              setContent("");
              setAnalysisData(null);
              setAudioUrl(null);
              setIsPlaying(false);
            }}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 hover:bg-gray-50 rounded-xl"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
          <button
            onClick={handleAnalyze}
            disabled={!content.trim()}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg shadow-indigo-200"
          >
            <Upload className="w-4 h-4" />
            Analyze Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentAnalyzer;
