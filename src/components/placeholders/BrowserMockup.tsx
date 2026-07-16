import { motion } from 'framer-motion';

interface Props {
  url?: string;
  title?: string;
  className?: string;
  variant?: 'desktop' | 'mobile';
}

export default function BrowserMockup({
  url = 'foerde-code.de',
  title = 'Förde-Code',
  className = '',
  variant = 'desktop',
}: Props) {
  const isDesktop = variant === 'desktop';

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: '#111111',
          border: '1px solid rgba(240,237,232,0.08)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          width: isDesktop ? '100%' : '280px',
        }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{
            background: '#1a1a1a',
            borderBottom: '1px solid rgba(240,237,232,0.05)',
          }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            {['#3a1a1a', '#2a2a1a', '#1a2a1a'].map((color, i) => (
              <div
                key={i}
                className="rounded-full"
                style={{ width: '10px', height: '10px', background: color }}
              />
            ))}
          </div>

          {/* URL bar */}
          <div
            className="flex-1 flex items-center gap-2 rounded-md px-3 py-1"
            style={{ background: 'rgba(240,237,232,0.04)' }}
          >
            <div
              className="rounded-full"
              style={{ width: '8px', height: '8px', background: 'rgba(240,237,232,0.15)' }}
            />
            <span
              style={{ fontSize: '11px', color: 'rgba(240,237,232,0.3)', letterSpacing: '0.02em' }}
            >
              {url}
            </span>
          </div>

          {/* Tab indicator */}
          {isDesktop && (
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{ width: '4px', height: '4px', background: 'rgba(240,237,232,0.1)' }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Website content */}
        <div
          className="relative overflow-hidden"
          style={{
            height: isDesktop ? '320px' : '400px',
            background: 'linear-gradient(160deg, #0d0d0d 0%, #0a0d0f 100%)',
          }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(240,237,232,0.015) 1px, transparent 1px),
                linear-gradient(90deg, rgba(240,237,232,0.015) 1px, transparent 1px)
              `,
              backgroundSize: isDesktop ? '40px 40px' : '24px 24px',
            }}
          />

          {/* Navigation bar placeholder */}
          <div
            className="flex items-center justify-between px-8 py-4"
            style={{ borderBottom: '1px solid rgba(240,237,232,0.04)' }}
          >
            <div
              className="h-4 rounded-full"
              style={{ width: '100px', background: 'rgba(240,237,232,0.08)' }}
            />
            <div className="flex gap-4">
              {[60, 50, 70, 55].map((w, i) => (
                <div
                  key={i}
                  className="h-2 rounded-full"
                  style={{ width: `${w}px`, background: 'rgba(240,237,232,0.05)' }}
                />
              ))}
            </div>
          </div>

          {/* Hero content */}
          <div className={`${isDesktop ? 'px-8 py-8' : 'px-4 py-6'} flex flex-col gap-4`}>
            <div
              className="h-8 rounded-lg"
              style={{ width: '70%', background: 'rgba(240,237,232,0.06)' }}
            />
            <div
              className="h-4 rounded"
              style={{ width: '55%', background: 'rgba(240,237,232,0.04)' }}
            />
            <div
              className="h-4 rounded"
              style={{ width: '48%', background: 'rgba(240,237,232,0.03)' }}
            />

            {/* CTA buttons */}
            <div className="flex gap-3 mt-2">
              <div
                className="h-8 rounded-full px-6"
                style={{ width: '120px', background: 'rgba(212,168,83,0.12)', border: '1px solid rgba(212,168,83,0.2)' }}
              />
              <div
                className="h-8 rounded-full"
                style={{ width: '100px', background: 'rgba(240,237,232,0.04)' }}
              />
            </div>

            {/* Content cards */}
            <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-2'} gap-3 mt-4`}>
              {Array.from({ length: isDesktop ? 3 : 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl"
                  style={{
                    height: isDesktop ? '80px' : '60px',
                    background: `rgba(240,237,232,${0.02 + i * 0.01})`,
                    border: '1px solid rgba(240,237,232,0.04)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Screen label */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: 'rgba(240,237,232,0.06)', letterSpacing: '0.25em', fontSize: '10px' }}
            >
              {title} — {isDesktop ? 'Desktop' : 'Mobile'}
            </span>
          </div>
        </div>
      </div>

      {/* Shadow */}
      <div
        className="absolute -bottom-4 left-1/2 rounded-full"
        style={{
          transform: 'translateX(-50%)',
          width: '80%',
          height: '20px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
          filter: 'blur(12px)',
        }}
      />
    </motion.div>
  );
}
