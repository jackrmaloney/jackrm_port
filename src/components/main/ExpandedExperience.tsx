import React from 'react';

interface Skill {
  name: string;
  icon: string;
}

interface Experience {
  image: string;
  title: string;
  position: string;
  startDate: string;
  endDate: string;
  description?: string;
  skills?: Skill[];
}

interface ExpandedExperienceProps {
  experience: Experience;
  isExpanded: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isPlaying: boolean;
  onPlayPause: () => void;
  progress: number;
}

export const ExpandedExperience: React.FC<ExpandedExperienceProps> = ({
  experience,
  isExpanded,
  onClose,
  onPrevious,
  onNext,
  isPlaying,
  onPlayPause,
  progress
}) => {
  if (!isExpanded) return null;

  return (
    <div 
      className={`fixed inset-x-0 bottom-0 bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl 
        transition-all duration-500 ease-in-out transform
        ${isExpanded ? 'translate-y-0 h-[calc(100vh-80px)]' : 'translate-y-full'}
        mx-3 sm:mx-8 z-50
      `}
    >
      <div className="max-w-4xl mx-auto p-3 sm:p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-3 sm:mb-6">
          <h2 className="text-white text-xl sm:text-2xl font-bold">{experience.title}</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors text-xl sm:text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <div>
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-black/20">
                <img 
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-auto"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <span className="text-white text-xs sm:text-sm">{experience.startDate}</span>
                    <div className="flex-grow h-1 sm:h-2 bg-white/20 rounded">
                      <div 
                        className="h-full bg-white/40 rounded transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-white text-xs sm:text-sm">{experience.endDate}</span>
                  </div>
                  
                  <div className="flex justify-center gap-4 sm:gap-6">
                    <button 
                      onClick={onPrevious}
                      className="text-white text-xl sm:text-3xl transform transition-all duration-300 hover:scale-110 active:scale-90"
                    >
                      ⏮
                    </button>
                    <button 
                      onClick={onPlayPause}
                      className="text-white text-2xl sm:text-4xl transform transition-all duration-300 hover:scale-110 active:scale-90"
                    >
                      {isPlaying ? '⏸' : '▶'}
                    </button>
                    <button 
                      onClick={onNext}
                      className="text-white text-xl sm:text-3xl transform transition-all duration-300 hover:scale-110 active:scale-90"
                    >
                      ⏭
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-white">
              <h3 className="text-lg sm:text-xl font-medium mb-2">{experience.position}</h3>
              <p className="text-gray-200 text-sm sm:text-base mb-4 sm:mb-6">{experience.description}</p>
              
              {experience.skills && experience.skills.length > 0 && (
                <>
                  <h4 className="text-white text-base sm:text-lg font-medium mb-3">Technologies Used</h4>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {experience.skills.map((skill, index) => (
                      <div 
                        key={index}
                        className="flex flex-col items-center"
                      >
                        <div className="bg-black/20 backdrop-blur-md rounded-full p-3 sm:p-4 mb-1 sm:mb-2">
                          <img 
                            src={skill.icon}
                            alt={skill.name}
                            className="w-6 h-6 sm:w-8 sm:h-8"
                          />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-200">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedExperience;