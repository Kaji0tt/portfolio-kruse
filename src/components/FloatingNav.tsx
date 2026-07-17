import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { id: '01', label: 'INTRO', section: 'intro' },
  { id: '02', label: 'FLORALOG', section: 'floralog' },
  { id: '03', label: 'AI WORKFLOW', section: 'ai-workflow' },
  { id: '04', label: 'CLOSING', section: 'closing' },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('intro');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);

      const sections = navItems.map((item) => ({
        id: item.section,
        el: document.getElementById(item.section),
      }));

      const scrollY = window.scrollY + window.innerHeight * 0.4;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    // For closing: jump to end of section so the fully assembled state is shown.
    // For all others: jump to the start of the section.
    const targetY =
      sectionId === 'closing'
        ? el.offsetTop + el.scrollHeight - window.innerHeight
        : el.offsetTop;

    const lenis = (window as unknown as Record<string, unknown>).__lenis as
      | { scrollTo: (target: number, opts: object) => void }
      | undefined;

    if (lenis) {
      lenis.scrollTo(targetY, { duration: 0, immediate: true });
    } else {
      window.scrollTo(0, targetY);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-8 left-1/2 z-50"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div
            className="flex items-center gap-1 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(10, 10, 10, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(240, 237, 232, 0.08)',
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.section)}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  background:
                    activeSection === item.section
                      ? 'rgba(240, 237, 232, 0.08)'
                      : 'transparent',
                }}
              >
                <span
                  className="text-xs font-light tracking-widest transition-colors duration-300"
                  style={{
                    color:
                      activeSection === item.section
                        ? 'rgba(240, 237, 232, 0.4)'
                        : 'rgba(240, 237, 232, 0.2)',
                    fontSize: '9px',
                  }}
                >
                  {item.id}
                </span>
                <span
                  className="text-xs tracking-widest transition-colors duration-300"
                  style={{
                    color:
                      activeSection === item.section
                        ? 'rgba(240, 237, 232, 0.9)'
                        : 'rgba(240, 237, 232, 0.35)',
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                  }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
