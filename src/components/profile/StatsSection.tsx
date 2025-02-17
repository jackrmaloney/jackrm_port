// src/components/profile/StatsSection.tsx
import React from 'react';
import { Stats } from '../../types';

interface StatBlockProps {
  label: string;
  value: string | number;
  subtext?: string;
}

const StatBlock: React.FC<StatBlockProps> = ({ label, value, subtext }) => (
  <div className="flex flex-col items-center">
    <h3 className="text-gray-500 uppercase text-sm tracking-wider">{label}</h3>
    <div className="text-4xl font-bold text-gray-800 mt-1">{value}</div>
    {subtext && <p className="text-gray-500 text-sm mt-1">{subtext}</p>}
  </div>
);

export const StatsSection: React.FC<Stats> = ({ experience, projects }) => {
  return (
    <div className="grid grid-cols-3 gap-8 py-8 border-t border-b border-gray-200 my-8">
      <StatBlock 
        label="Experience" 
        value={`${experience}+`}
        subtext="Years"
      />
      <StatBlock 
        label="Stack" 
        value="UIKit"
        subtext="Node.js"
      />
      <StatBlock 
        label="Projects" 
        value={projects}
        subtext="Live Apps"
      />
    </div>
  );
};