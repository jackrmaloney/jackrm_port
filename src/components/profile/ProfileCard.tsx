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

  return (
    <div className="bg-white rounded-3xl shadow-lg max-w-4xl mx-auto p-8">
      {/* Header Section */}
      <div className="flex gap-8">
        <img
          src="/images/profPic.jpeg"
          alt="Jack Maloney"
          className="w-40 h-40 rounded-3xl object-cover"
        />
        <div className="flex-1 flex flex-col justify-between h-40">
          <div>
            <h1 className="text-4xl font-bold text-black leading-tight">
              JACK MALONEY
            </h1>
            <h2 className="text-xl text-gray-500 mt-1">
              SOFTWARE DEVELOPER
            </h2>
          </div>
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setIsHomeOpen(true)}
              className="bg-blue-500 text-white px-8 py-1.5 rounded-full text-base font-semibold hover:bg-blue-600 transition-colors"
            >
              OPEN
            </button>
            <button className="text-blue-500 hover:text-blue-600 transition-colors">
              <Share size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 mt-12 py-8 border-t border-b border-gray-200">
        <div className="text-center">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
            EXPERIENCE
          </p>
          <p className="text-4xl font-medium text-gray-400 mt-2 mb-1">
            2+
          </p>
          <p className="text-gray-400 text-base">
            Years
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
            STACK
          </p>
          <p className="text-xl font-medium text-gray-400 mt-2 mb-1">
            UIKit
          </p>
          <p className="text-xl font-medium text-gray-400">
            Node.js
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
            PROJECTS
          </p>
          <p className="text-4xl font-medium text-gray-400 mt-2 mb-1">
            2
          </p>
          <p className="text-gray-400 text-base">
            Live Apps
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
            LOCATION
          </p>
          <p className="text-4xl font-medium text-gray-400 mt-2 mb-1">
            AL
          </p>
          <p className="text-gray-400 text-base">
            United States
          </p>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">PREVIEW</h2>
        <div 
          ref={scrollContainerRef}
          className={`flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex-none w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[580px] aspect-[2320/1440] bg-gray-200 rounded-lg overflow-hidden snap-center border border-gray-200">
            <img 
              src="/images/welcomePayaway.png" 
              alt="PayAway: Plan and Track Debt"
              className="w-full h-full object-cover pointer-events-none"
              onDragStart={handleDragStart}
              draggable="false"
            />
          </div>
          <div className="flex-none w-[85vw] sm:w-[75vw] md:w-[65vw] lg:w-[580px] aspect-[2320/1440] bg-gray-200 rounded-lg overflow-hidden snap-center border border-gray-200">
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