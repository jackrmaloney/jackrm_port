import React from 'react';

type Page = 'home' | 'about' | 'contact';

interface NavBarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export const NavBar = ({ currentPage, onPageChange }: NavBarProps) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="bg-black/40 backdrop-blur-xl rounded-full p-1 inline-flex">
        {['home', 'about', 'contact'].map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page as Page)}
            className={`px-8 py-2 rounded-full transition-colors ${
              currentPage === page
                ? 'bg-gray-200 text-gray-900 font-bold uppercase'
                : 'text-gray-200 hover:text-white'
            }`}
          >
            {currentPage === page ? page.toUpperCase() : page}
          </button>
        ))}
      </div>
    </div>
  );
};