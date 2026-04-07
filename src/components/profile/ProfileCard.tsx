import React, { useState, useRef } from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import { HomePage } from '../main/HomePage';

export const ProfileCard = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (scrollContainerRef.current) {
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg max-w-4xl mx-auto p-4 sm:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:gap-8">
        <img
          src="/images/profPic.jpeg"
          alt="Jack Maloney"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover mx-auto sm:mx-0"
        />
        <div className="flex-1 flex flex-col justify-between mt-4 sm:mt-0 sm:h-40">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
              JACK MALONEY
            </h1>
            <h2 className="text-lg sm:text-xl text-gray-500 mt-1">
              Full-Stack Developer & AI Builder
            </h2>
          </div>
          <div className="flex justify-center sm:justify-between items-center mt-4 sm:mt-0 gap-3">
            <button
              onClick={() => setIsHomeOpen(true)}
              className="bg-blue-500 text-white px-6 sm:px-8 py-1.5 rounded-full text-sm sm:text-base font-semibold hover:bg-blue-600 transition-colors"
            >
              OPEN
            </button>
            <div className="relative">
              <button
                onClick={() => setResumeOpen(!resumeOpen)}
                className="text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                <FileText size={24} />
                <ChevronDown size={14} className={`transition-transform ${resumeOpen ? 'rotate-180' : ''}`} />
              </button>
              {resumeOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 w-44 z-50">
                  <a
                    href="/resume.pdf"
                    download
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setResumeOpen(false)}
                  >
                    Download Resume
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setResumeOpen(false)}
                  >
                    View Resume
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 mt-8 sm:mt-12 py-6 sm:py-8 border-t border-b border-gray-200">
        <div className="text-center">
          <p className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            EXPERIENCE
          </p>
          <p className="text-3xl sm:text-4xl font-medium text-gray-400 mt-2 mb-1">
            4+
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            Years
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            STACK
          </p>
          <p className="text-lg sm:text-xl font-medium text-gray-400 mt-2 mb-1">
            UIKit
          </p>
          <p className="text-lg sm:text-xl font-medium text-gray-400">
            Node.js
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            PROJECTS
          </p>
          <p className="text-3xl sm:text-4xl font-medium text-gray-400 mt-2 mb-1">
            5+
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            Projects
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            LOCATION
          </p>
          <p className="text-3xl sm:text-4xl font-medium text-gray-400 mt-2 mb-1">
            FL
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            Orlando
          </p>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-6 sm:mt-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">PREVIEW</h2>
        <div 
          ref={scrollContainerRef}
          className={`flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex-none w-[90vw] sm:w-[75vw] md:w-[65vw] lg:w-[580px] aspect-[2320/1440] bg-gray-200 rounded-lg overflow-hidden snap-center border border-gray-200">
            <img 
              src="/images/welcomePayaway.png" 
              alt="PayAway: Plan and Track Debt"
              className="w-full h-full object-cover pointer-events-none"
              onDragStart={handleDragStart}
              draggable="false"
            />
          </div>
          <div className="flex-none w-[90vw] sm:w-[75vw] md:w-[65vw] lg:w-[580px] aspect-[2320/1440] bg-gray-200 rounded-lg overflow-hidden snap-center border border-gray-200">
            <img 
              src="/images/welcomeConnectU.png" 
              alt="connectU: Build Your Brand"
              className="w-full h-full object-cover pointer-events-none"
              onDragStart={handleDragStart}
              draggable="false"
            />
          </div>
        </div>
      </div>

      <HomePage 
        isOpen={isHomeOpen} 
        onClose={() => setIsHomeOpen(false)} 
      />
    </div>
  );
}

export default ProfileCard;