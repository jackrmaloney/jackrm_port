import React, { useState, useEffect } from 'react';
import { NavBar } from '../ui/NavBar';
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

type ExperienceDetail = {
  image: string;
  title: string;
  position: string;
  startDate: string;
  endDate: string;
  skills: string[];
  description: string[];
};

const experienceDetails: ExperienceDetail[] = [
  {
    image: '/images/welcomeConnectU.png',
    title: 'connectU',
    position: 'Co founder, Director of Technology',
    startDate: 'Jan 2024',
    endDate: 'Present',
    skills: ['Swift', 'React', 'Firebase', 'Node.js', 'UIKit'],
    description: [
      'Led the development team',
      'Built the front end using UIKit and developed a scalable Node.js backend',
      'Integrated Facebook and Stripe APIs for authentication and payment processing',
      'Launched the app on iOS, handling architecture, deployment, and growth strategy'
    ]
  },
  {
    image: '/images/nexer.png',
    title: 'Nexer',
    position: 'Associate Technical Consultant',
    startDate: 'Aug 2024',
    endDate: 'Present',
    skills: ['X++', 'D365 F&O', 'SQL'],
    description: [
      'Developed and optimized custom business logic in X++ for Dynamics 365',
      'Worked with enterprise application development, API integrations, and system design',
      'Configured and deployed SFTP servers for secure data transfer'
    ]
  },
  {
    image: '/images/belt.png',
    title: 'Beltservice Corporation',
    position: 'Jr. Software Developer',
    startDate: 'Aug 2023',
    endDate: 'July 2024',
    skills: ['X++', 'D365 F&O', 'SQL'],
    description: [
      'Performed post go-live Dynamics 365 Finance & Operations support',
      'Leveraged out-of-the-box features in F&O',
      'Completely redesigned various high traffic modules within F&O',
      'Followed the Agile development life cycle'
    ]
  },
  {
    image: '/images/msuAI.png',
    title: 'Mississippi State University',
    position: 'AI Researcher',
    startDate: 'April 2023',
    endDate: 'Oct 2023',
    skills: ['Python', 'Rust', 'TensorFlow', 'PyTorch'],
    description: [
      'Researched deep neural networks from an entropy perspective',
      'Discovered that when training MLP models using entropy values as weights, there is a result in quicker and more accurate training times',
      'Used RStudio and Python to create data visualizations'
    ]
  },
  {
    image: '/images/enVista.png',
    title: 'enVista',
    position: 'Software Development Intern',
    startDate: 'May 2022',
    endDate: 'March 2023',
    skills: ['X++', 'D365 F&O', 'SQL'],
    description: [
      'Assisted in developing client-facing applications',
      'Participated in agile development processes',
      'Learned and implemented D365 industry best practices'
    ]
  }
];

export const HomePage = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const [displayContent, setDisplayContent] = useState<React.ReactNode>(null);

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

  const handleExperienceClick = (index: number) => {
    setExpandedExperience(expandedExperience === index ? null : index);
    setIsPlaying(false); // Pause the slideshow when expanding
  };

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
        current === experienceDetails.length - 1 ? 0 : current + 1
      );
      setProgress(0);
    }
  }, [progress]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setProgress(0);
    setCurrentExperience(current => {
      const newExperience = current === 0 ? experienceDetails.length - 1 : current - 1;
      if (expandedExperience !== null) {
        setExpandedExperience(newExperience);
      }
      return newExperience;
    });
  };

  const handleNext = () => {
    setProgress(0);
    setCurrentExperience(current => {
      const newExperience = current === experienceDetails.length - 1 ? 0 : current + 1;
      if (expandedExperience !== null) {
        setExpandedExperience(newExperience);
      }
      return newExperience;
    });
  };

  const renderExperienceContent = () => (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-6">
      <h3 className="text-white text-base sm:text-xl mb-2 sm:mb-4">EXPERIENCE</h3>
      
      <div className="px-2 sm:px-16">
        <div className="relative">
          <div 
            className={`rounded-xl overflow-hidden mb-2 sm:mb-3 max-w-[600px] mx-auto transform transition-all duration-300 hover:scale-105 cursor-pointer ${
              expandedExperience === currentExperience ? 'scale-105' : ''
            }`}
            onClick={() => handleExperienceClick(currentExperience)}
          >
            <img 
              src={experienceDetails[currentExperience].image}
              alt={experienceDetails[currentExperience].title}
              className="w-full h-auto"
            />
          </div>

          <div className={`transition-all duration-300 ${
            expandedExperience === currentExperience 
              ? 'max-h-[500px] opacity-100 mt-4' 
              : 'max-h-0 opacity-0 mt-0'
          } overflow-hidden`}>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {experienceDetails[currentExperience].skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-md rounded-lg p-2 text-center transform transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-white text-sm">{skill}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {experienceDetails[currentExperience].description.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <p className="text-gray-200 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
            
        <h4 className="text-white text-sm sm:text-lg font-medium mt-4">
          {experienceDetails[currentExperience].title}
        </h4>
        <p className="text-gray-200 text-xs sm:text-base">
          {experienceDetails[currentExperience].position}
        </p>
        
        <div className="mt-2 sm:mt-3 flex items-center gap-2">
          <span className="text-gray-200 text-xs sm:text-sm">
            {experienceDetails[currentExperience].startDate}
          </span>
          <div className="flex-grow h-1 sm:h-2 bg-white/20 rounded">
            <div 
              className="h-full bg-white/40 rounded transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-gray-200 text-xs sm:text-sm">
            {experienceDetails[currentExperience].endDate}
          </span>
        </div>
        
        <div className="flex justify-center gap-4 sm:gap-8 mt-2 sm:mt-4">
          <button 
            className="text-white text-xl sm:text-3xl transform transition-all duration-300 hover:scale-110 active:scale-90"
            onClick={handlePrevious}
          >
            ⏮
          </button>
          <button 
            className="text-white text-2xl sm:text-5xl transform transition-all duration-300 hover:scale-110 active:scale-90"
            onClick={handlePlayPause}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button 
            className="text-white text-xl sm:text-3xl transform transition-all duration-300 hover:scale-110 active:scale-90"
            onClick={handleNext}
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  );

  const renderHomeContent = () => (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mx-auto max-w-2xl">
        <div className="flex flex-col justify-between h-full">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-6">
            <h3 className="text-white text-base sm:text-xl mb-2 sm:mb-6">SKILLS</h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
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
                      backdrop-blur-md rounded-full aspect-square w-10 sm:w-16 
                      flex items-center justify-center mb-1 sm:mb-2 transform duration-300
                      ${hoveredProject && isUsed ? 'bg-white/90 scale-110' : 
                        !hoveredProject && isHovered ? 'bg-white/90 -translate-y-1' : 
                        'bg-black/1'}
                    `}
                    >
                      <img 
                        src={skill.src}
                        alt={skill.name}
                        className="w-5 sm:w-8 h-5 sm:h-8"
                      />
                    </div>
                    <span className={`text-xs sm:text-base text-center transition-colors duration-300 ${
                      (hoveredProject && isUsed) || (!hoveredProject && isHovered)
                        ? 'text-white'
                        : 'text-gray-200'
                    }`}>{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between mt-3 sm:mt-6">
            {['linkedin', 'github', 'twitter', 'instagram'].map((platform) => (
              <a 
                key={platform}
                href={`https://${platform === 'linkedin' ? 'www.linkedin.com/in/jack-r-maloney' : 
                  platform === 'github' ? 'github.com/jackrmaloney' :
                  platform === 'twitter' ? 'x.com/jackrmaloneyy' :
                  'www.instagram.com/jackrmaloneyy'}`}
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
                className="bg-black/40 backdrop-blur-xl rounded-xl sm:rounded-2xl p-2 sm:p-4 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 transform-gpu"
              >
                {platform === 'linkedin' ? <Linkedin className="w-4 sm:w-8 h-4 sm:h-8 text-white" /> :
                 platform === 'github' ? <Github className="w-4 sm:w-8 h-4 sm:h-8 text-white" /> :
                 platform === 'twitter' ? <Twitter className="w-4 sm:w-8 h-4 sm:h-8 text-white" /> :
                 <Instagram className="w-4 sm:w-8 h-4 sm:h-8 text-white" />}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-6">
          <h3 className="text-white text-base sm:text-xl mb-2 sm:mb-6">iOS PROJECTS</h3>
          <div className="space-y-0">
            {projects.map((project, index) => (
              <React.Fragment key={project.name}>
                <div 
                  className="py-1.5 sm:py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                  onMouseEnter={() => setHoveredProject(project.name)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="flex justify-between mb-1 sm:mb-2">
                    <h4 className="text-white text-sm sm:text-lg">{project.name}</h4>
                    <span className="text-white text-xs sm:text-base">{project.year}</span>
                  </div>
                  <p className="text-gray-200 text-xs sm:text-base">
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

      <div className="mt-3 sm:mt-6">
        {renderExperienceContent()}
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
          <div className="max-w-3xl mx-auto p-3 sm:p-8 pb-8 sm:pb-16">
            <NavBar currentPage={currentPage} onPageChange={handlePageChange} />
            
            <div className="text-center mt-2 mb-3 sm:mb-6">
              <h1 className="text-3xl sm:text-6xl font-black mb-1 sm:mb-4 text-gray-900">
                JACK MALONEY
              </h1>
              <h2 className="text-lg sm:text-2xl font-medium text-gray-900">
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
          className="w-full bg-gradient-to-t from-black/10 to-transparent py-1.5 sm:py-3 flex justify-center cursor-pointer"
          onClick={onClose}
        >
          <div className="w-16 sm:w-32 h-1 sm:h-1.5 bg-black rounded-full transform transition-transform hover:scale-110" />
        </div>
      </div>
    </div>
  );
}