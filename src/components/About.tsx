// AboutSection.tsx
import React from "react";
import { BookOpen, Lightbulb, Target } from "lucide-react";

const About = () => {
  return (
    <section className="mt-20 max-w-4xl mx-auto pb-4 px-4 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
        About Smart Content Analysis
      </h2>

      <p className="text-gray-700 text-lg mb-12">
        Smart Content Analysis is an AI-powered tool that transforms text into actionable insights. 
        It summarizes content, highlights key topics, and provides intelligent suggestions to make 
        information easy to understand and act upon.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <div className="group hover:scale-105 transition-transform duration-300 bg-white rounded-2xl shadow-lg p-8 border border-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
          <div className="bg-indigo-100 rounded-full p-3 mb-4 group-hover:bg-indigo-200 transition-colors">
            <BookOpen className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Smart Summaries</h3>
          <p className="text-gray-600 text-sm">
            Automatically condense long articles or reports into clear, easy-to-read summaries.
          </p>
        </div>

        <div className="group hover:scale-105 transition-transform duration-300 bg-white rounded-2xl shadow-lg p-8 border border-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
          <div className="bg-purple-100 rounded-full p-3 mb-4 group-hover:bg-purple-200 transition-colors">
            <Lightbulb className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Key Insights</h3>
          <p className="text-gray-600 text-sm">
            Extract important topics and concepts to quickly identify what matters most in your content.
          </p>
        </div>

        <div className="group hover:scale-105 transition-transform duration-300 bg-white rounded-2xl shadow-lg p-8 border border-gradient-to-r from-yellow-400 via-orange-400 to-red-400">
          <div className="bg-yellow-100 rounded-full p-3 mb-4 group-hover:bg-yellow-200 transition-colors">
            <Target className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Actionable Suggestions</h3>
          <p className="text-gray-600 text-sm">
            Receive smart suggestions to improve content strategy, comprehension, or follow-up actions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
