import React, { useState, useEffect } from 'react';
import { NavBar } from '../ui/Navbar';
import { AboutPage } from './AboutPage';
import { ContactPage } from './ContactPage';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

type Page = 'home' | 'about' | 'contact';

type Skill = {
  name: string;
  src: string;
};

type Project = {
  name: string;
  year: string;
  description: string;
  skills: string[];
};

export const HomePage = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [, setDisplayContent] = useState<React.ReactNode>(null);

  const experiences = [
    {
      image: '/images/welcomeConnectU.png',
      title: 'connectU',
      position: 'Co founder, Director of Technology',
      startDate: 'Jan 2024',
      endDate: 'Present'
    },
    {
      image: '/images/nexer.png',
      title: 'Nexer',
      position: 'Associate Technical Consultant',
      startDate: 'Aug 2024',
      endDate: 'Present'
    },
    {
      image: '/images/belt.png',
      title: 'Beltservice Corporation',
      position: 'Jr. Software Developer',
      startDate: 'Aug 2023',
      endDate: 'July 2024'
    },
    {
      image: '/images/msuAI.png',
      title: 'Mississippi State University',
      position: 'AI Researcher',
      startDate: 'April 2023',
      endDate: 'Oct 2023'
    },
    {
      image: '/images/enVista.png',
      title: 'enVista',
      position: 'Software Development Intern',
      startDate: 'May 2022',
      endDate: 'March 2023'
    }
  ];

  const skills: Skill[] = [
    { name: 'Swift', src: '/images/skill1.png' },
    { name: 'React', src: '/images/skill2.webp' },
    { name: 'Firebase', src: '/images/skill3.png' },
    { name: 'Node.js', src: '/images/skill4.png' },
    { name: 'UIKit', src: '/images/skill5.png' },
    { name: 'TypeScript', src: '/images/skill6.png' }
  ];

  const projects: Project[] = [
    {
      name: 'PayAway',
      year: '2025',
      description: 'Minimalistic debt planner and tracker.',
      skills: ['Swift', 'UIKit', 'Firebase']
    },
    {
      name: 'connectU',
      year: '2024',
      description: 'Marketplace for college students to find brand deals.',
      skills: ['Swift', 'UIKit', 'Node.js', 'Firebase', 'React', 'TypeScript']
    },
    {
      name: 'miniFolio',
      year: 'In Development',
      description: 'Minimalistic stock portfolio tracker.',
      skills: ['Swift', 'Node.js', 'Firebase', 'UIKit']
    }
  ];

  const isSkillUsed = (skillName: string) => {
    if (!hoveredProject) return false;
    const project = projects.find(p => p.name === hoveredProject);
    return project?.skills.includes(skillName);
  };

  useEffect(() => {
    setDisplayContent(renderContent());
  }, []);

  const handlePageChange = (newPage: Page) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setDisplayContent(renderContent());
      setIsChanging(false);
    }, 500);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isPlaying) {
      intervalId = setInterval(() => {
        setProgress(prev => prev + (100 / 70));
      }, 100);
    }
  
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying]);
  
  useEffect(() => {
    if (progress >= 100) {
      setCurrentExperience(current => 
        current === experiences.length - 1 ? 0 : current + 1
      );
      setProgress(0);
    }
  }, [progress, experiences.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setProgress(0);
    setIsPlaying(true);
    setCurrentExperience(current => 
      current === 0 ? experiences.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setProgress(0);
    setIsPlaying(true);
    setCurrentExperience(current => 
      current === experiences.length - 1 ? 0 : current + 1
    );
  };

  const renderHomeContent = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto max-w-2xl">
        <div className="flex flex-col justify-between h-full">
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6">
            <h3 className="text-white text-xl mb-6">SKILLS</h3>
            <div className="grid grid-cols-3 gap-4">
              {skills.map((skill, index) => {
                const isUsed = isSkillUsed(skill.name);
                const isHovered = hoveredSkill === skill.name;
                
                return (
                  <div 
                    key={index} 
                    className={`flex flex-col items-center ${
                      hoveredProject && !isUsed ? 'opacity-30' : 'opacity-100'
                    }`}
                    onMouseEnter={() => !hoveredProject && setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div 
                      className={`
                        backdrop-blur-md rounded-full aspect-square w-16 
                        flex items-center justify-center mb-2 transform duration-300
                        ${hoveredProject && isUsed ? 'bg-white/90 scale-110' : 'bg-gray-300/50'}
                        ${!hoveredProject && isHovered ? 'bg-white/90 -translate-y-1' : ''}
                      `}
                    >
                      <img 
                        src={skill.src}
                        alt={skill.name}
                        className="w-8 h-8"
                      />
                    </div>
                    <span className={`text-base text-center transition-colors duration-300 ${
                      (hoveredProject && isUsed) || (!hoveredProject && isHovered)
                        ? 'text-white'
                        : 'text-gray-200'
                    }`}>{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <a 
              href="https://www.linkedin.com/in/jack-r-maloney/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                const link = e.currentTarget;
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                  link.style.transform = 'scale(1)';
                  window.open(link.href, '_blank');
                }, 150);
              }}
              className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 transform-gpu"
            >
              <Linkedin className="w-8 h-8 text-white" />
            </a>
            <a 
              href="https://github.com/jackrmaloney" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                const link = e.currentTarget;
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                  link.style.transform = 'scale(1)';
                  window.open(link.href, '_blank');
                }, 150);
              }}
              className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 transform-gpu"
            >
              <Github className="w-8 h-8 text-white" />
            </a>
            <a 
              href="https://x.com/jackrmaloneyy" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                const link = e.currentTarget;
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                  link.style.transform = 'scale(1)';
                  window.open(link.href, '_blank');
                }, 150);
              }}
              className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 transform-gpu"
            >
              <Twitter className="w-8 h-8 text-white" />
            </a>
            <a 
              href="https://www.instagram.com/jackrmaloneyy/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                const link = e.currentTarget;
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                  link.style.transform = 'scale(1)';
                  window.open(link.href, '_blank');
                }, 150);
              }}
              className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 transform-gpu"
            >
              <Instagram className="w-8 h-8 text-white" />
            </a>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6">
          <h3 className="text-white text-xl mb-6">iOS PROJECTS</h3>
          <div className="space-y-0">
            {projects.map((project, index) => (
              <React.Fragment key={project.name}>
                <div 
                  className="py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                  onMouseEnter={() => setHoveredProject(project.name)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="text-white text-lg">{project.name}</h4>
                    <span className="text-white">{project.year}</span>
                  </div>
                  <p className="text-gray-200">
                    {project.description}
                  </p>
                </div>
                {index < projects.length - 1 && (
                  <div className="h-px bg-white/20 w-full"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6">
          <h3 className="text-white text-xl mb-4">EXPERIENCE</h3>
          
          <div className="px-16">
            <div className="rounded-xl overflow-hidden mb-3 max-w-[600px] mx-auto transform transition-all duration-300 hover:scale-105">
              <img 
                src={experiences[currentExperience].image}
                alt={experiences[currentExperience].title}
                className="w-full h-auto"
              />
            </div>
            
            <h4 className="text-white text-lg font-medium">{experiences[currentExperience].title}</h4>
            <p className="text-gray-200">{experiences[currentExperience].position}</p>
            
            <div className="mt-3 flex items-center gap-2">
              <span className="text-gray-200 text-sm">{experiences[currentExperience].startDate}</span>
              <div className="flex-grow h-2 bg-white/20 rounded">
                <div 
                  className="h-full bg-white/40 rounded transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-gray-200 text-sm">{experiences[currentExperience].endDate}</span>
            </div>
            
            <div className="flex justify-center gap-8 mt-4">
              <button 
                className="text-white text-3xl transform transition-all duration-300 hover:scale-110 active:scale-90"
                onClick={handlePrevious}
              >
                ⏮
              </button>
              <button 
                className="text-white text-5xl transform transition-all duration-300 hover:scale-110 active:scale-90"
                onClick={handlePlayPause}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button 
                className="text-white text-3xl transform transition-all duration-300 hover:scale-110 active:scale-90"
                onClick={handleNext}
              >
                ⏭
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return renderHomeContent();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-white/30 backdrop-blur-xl transform transition-transform duration-500 ease-in-out ${
        isOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="h-full relative flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-8 pb-16">
            <NavBar currentPage={currentPage} onPageChange={handlePageChange} />
            
            <div className="text-center mt-2 mb-6">
              <h1 className="text-6xl font-black mb-4 text-gray-900">
                JACK MALONEY
              </h1>
              <h2 className="text-2xl font-medium text-gray-900">
                SOFTWARE DEVELOPER
              </h2>
            </div>
      
            <div className="relative">
              <div
                className={`transition-all duration-500 ${
                  isChanging 
                    ? 'opacity-0 scale-95' 
                    : 'opacity-100 scale-100'
                }`}
              >
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
  
        <div 
          className="w-full bg-gradient-to-t from-black/10 to-transparent py-3 flex justify-center cursor-pointer"
          onClick={onClose}
        >
          <div className="w-32 h-1.5 bg-black rounded-full transform transition-transform hover:scale-110" />
        </div>
      </div>
    </div>
  );
};