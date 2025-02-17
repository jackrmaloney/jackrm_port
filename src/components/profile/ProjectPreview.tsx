// src/components/profile/ProjectPreview.tsx
import React from 'react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <img 
      src={project.imageUrl} 
      alt={project.title} 
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
      <p className="text-gray-600 mt-1">{project.description}</p>
    </div>
  </div>
);

export const ProjectPreview: React.FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">PREVIEW</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};