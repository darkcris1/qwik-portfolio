/** @jsxImportSource react */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { qwikify$ } from '@qwik.dev/react';

interface ReactArchiveProjectsProps {
    projects: any[]
}

const ReactArchiveProjects: React.FC<ReactArchiveProjectsProps> = ({
  projects,
}): React.JSX.Element => {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!isArchiveOpen) {
      // Send focus back to the button that opened the dialog.
      if (wasOpen.current) openButtonRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsArchiveOpen(false);
      if (e.key !== 'Tab' || !dialogRef.current) return;
      // Keep Tab cycling inside the dialog.
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isArchiveOpen]);

  return (
    <>
      <div className="mt-24 flex flex-col items-center gap-4 text-center">
        <p className="text-muted">Plus {projects.length} more projects in the archive.</p>
        <button
          ref={openButtonRef}
          type="button"
          className="cursor-pointer rounded-xl border border-line bg-white px-5 py-3 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand hover:text-brand-ink"
          onClick={() => setIsArchiveOpen(true)}
        >
          View archive
        </button>
      </div>
      <AnimatePresence initial={false}>
        {isArchiveOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
            onClick={() => setIsArchiveOpen(false)}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="archive-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-h-[85vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Archive</p>
                  <h3 id="archive-title" className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
                    More projects
                  </h3>
                </div>
                <button
                  type="button"
                  autoFocus
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl text-2xl text-muted transition-colors hover:bg-ice hover:text-ink"
                  onClick={() => setIsArchiveOpen(false)}
                  aria-label="Close archive"
                >
                  &times;
                </button>
              </div>
              <ul className="mt-6 divide-y divide-line">
                {projects.map((project) => (
                  <li key={project.id} className="grid gap-2 py-5 md:grid-cols-[1fr_auto] md:gap-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-ink">{project.role}</p>
                      <h4 className="mt-1.5 text-lg font-semibold text-ink">{project.title}</h4>
                      <p className="mt-1.5 leading-relaxed text-muted">{project.description}</p>
                    </div>
                    {project.liveLink && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start font-semibold text-brand-ink underline-offset-4 hover:underline"
                        href={project.liveLink}
                      >
                        Visit site <span aria-hidden="true">↗</span>
                        <span className="sr-only">(opens in new tab)</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const ArchiveProjects = qwikify$<ReactArchiveProjectsProps>(
  ReactArchiveProjects,
  { eagerness: 'visible' }
);