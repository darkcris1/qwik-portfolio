/** @jsxImportSource react */ // Add this pragma at the top

import React, { useState, useEffect, useCallback } from 'react'; // Use 'type ElementType'
import { motion, AnimatePresence } from "motion/react";
import { qwikify$ } from '@builder.io/qwik-react';

interface ReactArchiveProjectsProps {
    projects: any[]
}

const ReactArchiveProjects: React.FC<ReactArchiveProjectsProps> = ({
  projects,
}): JSX.Element => {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  // Handle Escape key to close modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsArchiveOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isArchiveOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isArchiveOpen, handleKeyDown]);

  return (
    <>
    <div className="mt-20 flex items-center justify-center">
          <button
            className="cursor-pointer z-50 mt-5 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
            onClick={() => (setIsArchiveOpen(true))}
          >
            View Archive
          </button>
        </div>
        <AnimatePresence initial={false}>
          {/* Archive Modal with motion/react animation */}
          {isArchiveOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            >
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-2xl max-w-3xl w-full p-6 relative"
              >
                <button
                  className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  onClick={() => (setIsArchiveOpen(false))}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold mb-4 text-blue-700">Archive Projects</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border-separate border-spacing-y-2">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                        <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider rounded-tl-lg">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider rounded-tl-lg">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-blue-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg">
                          <td className="px-6 py-4 font-semibold text-gray-800 rounded-l-lg border-y border-gray-100">{project.title}</td>
                          <td className="px-6 py-4 text-gray-600 border-y border-gray-100">{project.description}</td>
                          <td className="px-6 py-4 text-gray-600 border-y border-gray-100">{project.role}</td>
                          <td className="px-6 py-4 text-gray-600 border-y border-gray-100">
                            {project.liveLink && <a
                              target='_blank'
                              rel='noopener noreferrer' 
                              className='text-blue-600 hover:text-blue-800 mr-2 underline'
                              href={project.liveLink}>
                              Live
                            </a>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </>
  );
};

export const ArchiveProjects = qwikify$<ReactArchiveProjectsProps>(
  ReactArchiveProjects,
  {
    // `eagerness: 'visible'` ensures the React component hydrates when it becomes visible,
    // which is suitable for `whileInView` animations.
    eagerness: 'visible', // Corrected option
  }
);