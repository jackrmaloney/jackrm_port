import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const wave = keyframes`
  0% { transform: rotate(0deg) scale(1.2); }
  20% { transform: rotate(20deg) scale(1.2); }
  40% { transform: rotate(-10deg) scale(1.2); }
  60% { transform: rotate(10deg) scale(1.2); }
  80% { transform: rotate(-5deg) scale(1.2); }
  100% { transform: rotate(0deg) scale(1.2); }
`;

const WaveEmoji = styled.span`
  display: inline-block;
  transform-origin: 70% 70%;
  .group:hover & {
    animation: ${wave} 1s ease-in-out infinite;
  }
`;

export const AboutPage = () => {
  return (
    <div className="space-y-6">
      {/* Education Section - Full Width */}
      <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 w-full">
        <h3 className="text-white text-xl mb-4">EDUCATION</h3>
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-white text-lg">Mississippi State University</h4>
            <p className="text-gray-200">2020 - 2024</p>
            <div className="text-white mt-4">
              <p>B.S. Computer Science</p>
              <p>Concentration in AI</p>
              <p>GPA: 3.6</p>
            </div>
          </div>
          <img 
            src="/images/msu.png"
            alt="MSU Logo"
            className="w-40 h-30"
          />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* About Me Section */}
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 group">
            <h3 className="text-white text-xl mb-4">ABOUT ME</h3>
            <div className="text-white">
            <p className="text-xl mb-4">
                Hi again, I'm Jack!<span className="mx-2"></span><WaveEmoji>👋</WaveEmoji>
            </p>
              <p className="mb-4">Here is a quick overview of me!</p>
              <ul className="space-y-2">
                <li>• I am 23 years old</li>
                <li>• I have over 3 years of development experience</li>
                <li>• I am currently based out of AL</li>
                <li>• I love rewatching TV shows</li>
                <li>• I am always building new things</li>
              </ul>
            </div>
          </div>

          {/* Favorite Movie Section */}
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6">
            <h3 className="text-white text-xl mb-4">FAVORITE MOVIE</h3>
            <p className="text-white text-lg">There Will Be Blood</p>
          </div>

          {/* Favorite Language Section */}
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6">
            <h3 className="text-white text-xl mb-4">FAVORITE LANGUAGE</h3>
            <p className="text-white text-lg">Swift: UIKit</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between">
          {/* Playing Section */}
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-10 group transition-colors duration-300">
            <h3 className="text-white text-xl mb-4">PLAYING</h3>
            <div className="flex items-center gap-4">
              <img 
                src="/images/ow.png"
                alt="Overwatch Logo"
                className="w-20 h-20 aspect-square object-contain rounded-full bg-white/80 p-1 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="text-white transition-transform duration-300 group-hover:scale-105 origin-left">
                <p className="text-lg">Overwatch</p>
                <p>Diamond 2</p>
              </div>
            </div>
          </div>

          {/* Watching Section */}
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-10 group transition-colors duration-300">
            <h3 className="text-white text-xl mb-4">WATCHING</h3>
            <div className="flex items-center gap-4">
              <img 
                src="/images/sev.png"
                alt="Severance Logo"
                className="w-20 h-20 aspect-square object-contain rounded-full bg-white/80 p-1 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="text-white transition-transform duration-300 group-hover:scale-105 origin-left">
                <p className="text-lg">Severance</p>
                <p>Season 2</p>
              </div>
            </div>
          </div>

          {/* Listening Section */}
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-10 group transition-colors duration-300">
            <h3 className="text-white text-xl mb-4">LISTENING</h3>
            <div className="flex items-center gap-4">
              <img 
                src="/images/dmb.png"
                alt="DMB Logo" 
                className="w-20 h-20 aspect-square object-contain rounded-full bg-white/80 p-1 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="text-white transition-transform duration-300 group-hover:scale-105 origin-left">
                <p className="text-lg">Two Step</p>
                <p>Dave Matthews Band</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;