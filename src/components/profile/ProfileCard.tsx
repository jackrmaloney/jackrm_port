import React, { useState, useRef } from 'react';
import { Share } from 'lucide-react';
import { HomePage } from '../main/HomePage';

export const ProfileCard = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHomeOpen, setIsHomeOpen] = useState(false);

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

  // Add touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollContainerRef.current) {
      setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    if (scrollContainerRef.current) {
      const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg max-w-4xl mx-auto p-8 sm:p-8 p-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
        <img
          src="/images/profPic.jpeg"
          alt="Jack Maloney"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover mx-auto sm:mx-0"
        />
        <div className="flex-1 flex flex-col justify-between h-auto sm:h-40">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-black leading-tight">
              JACK MALONEY
            </h1>
            <h2 className="text-lg sm:text-xl text-gray-500 mt-1">
              SOFTWARE DEVELOPER
            </h2>
          </div>
          <div className="flex justify-center sm:justify-between items-center mt-4 sm:mt-0">
            <button 
              onClick={() => setIsHomeOpen(true)}
              className="bg-blue-500 text-white px-6 sm:px-8 py-1.5 rounded-full text-base font-semibold hover:bg-blue-600 transition-colors"
            >
              OPEN
            </button>
            <button className="text-blue-500 hover:text-blue-600 transition-colors ml-4">
              <Share size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 mt-8 sm:mt-12 py-6 sm:py-8 border-t border-b border-gray-200 gap-y-6 sm:gap-y-0">
        <div className="text-center">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
            EXPERIENCE
          </p>
          <p className="text-3xl sm:text-4xl font-medium text-gray-400 mt-2 mb-1">
            2+
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            Years
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
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
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
            PROJECTS
          </p>
          <p className="text-3xl sm:text-4xl font-medium text-gray-400 mt-2 mb-1">
            2
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            Live Apps
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
            LOCATION
          </p>
          <p className="text-3xl sm:text-4xl font-medium text-gray-400 mt-2 mb-1">
            AL
          </p>
          <p className="text-gray-400 text-sm sm:text-base">
            United States
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
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