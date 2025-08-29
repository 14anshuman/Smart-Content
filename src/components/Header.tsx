import React from 'react';
import { Brain, Github } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border rounded-full mx-2 top-3  border-indigo-200 relative
     backdrop-blur-md bg-white/30">
      <div className="container mx-auto px-3 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              SmartContent
            </h1>
          </div>
          <nav className="flex items-center gap-6">
            <a 
              href="#features" 
              className="text-gray-600 scroll-smooth hover:text-indigo-600 transition-colors hidden md:block"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-gray-600 hover:text-indigo-600 transition-colors hidden md:block"
            >
              Contact
            </a>
            <a 
              href="https://github.com/14anshuman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-full gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2  hover:opacity-90 transition-all font-medium"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;