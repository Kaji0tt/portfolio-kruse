import { motion } from 'framer-motion';

interface Screen {
  label: string;
  hasTopBar?: boolean;
  hasBottomBar?: boolean;
  image?: string;
}

const defaultScreens: Screen[] = [
  { label: 'Home', hasTopBar: true, hasBottomBar: true },
  { label: 'Discovery', hasTopBar: true, hasBottomBar: true },
  { label: 'Detail', hasTopBar: true, hasBottomBar: true },
];

interface Props {
  screens?: Screen[];
  activeScreen?: number;
  className?: string;
  floating?: boolean;
}

export default function DeviceMockup({
  screens = defaultScreens,
  activeScreen = 0,
  className = '',
  floating = true,
}: Props) {
  const screen = screens[activeScreen] || screens[0];

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      animate={floating ? { y: [0, -12, 0], rotateY: [-2, 2, -2], rotateX: [1, -1, 1] } : {}}
      transition={floating ? { duration: 7, repeat: Infinity, ease: 'easeInOut' } : {}}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {/* Phone outer frame */}
      <div
        className="relative rounded-[44px] overflow-hidden"
        style={{
          width: '260px',
          height: '530px',
          background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 40%, #222 100%)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.06),
            0 0 0 2px rgba(0,0,0,0.8),
            0 40px 80px rgba(0,0,0,0.6),
            0 20px 40px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.08)
          `,
        }}
      >
        {/* Screen bezel */}
        <div
          className="absolute inset-[3px] rounded-[42px] overflow-hidden"
          style={{ background: '#000' }}
        >
          {/* Dynamic island */}
          <div
            className="absolute top-3 left-1/2 z-10 rounded-full"
            style={{
              transform: 'translateX(-50%)',
              width: '88px',
              height: '26px',
              background: '#000',
            }}
          />

          {/* Screen content */}
          <div
            className="absolute inset-0"
            style={{
              background: screen.image
                ? '#000'
                : 'linear-gradient(160deg, #0f1410 0%, #0a0d0f 50%, #0d0a0f 100%)',
            }}
          >
            {screens.some(s => s.image) ? (
              /* All images rendered at once so browser preloads them — only active is visible */
              <>
                {screens.map((s, i) => s.image && (
                  <motion.div
                    key={s.image}
                    className="absolute inset-0"
                    style={{ padding: '10px' }}
                    animate={{ opacity: i === activeScreen ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img
                      src={s.image}
                      alt={s.label}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        borderRadius: '32px',
                        display: 'block',
                      }}
                    />
                  </motion.div>
                ))}
              </>
            ) : (
              <>
                {/* Status bar */}
                {screen.hasTopBar && (
                  <div className="flex items-center justify-between px-6 pt-14 pb-2">
                    <span style={{ fontSize: '11px', color: 'rgba(240,237,232,0.7)', fontWeight: 600 }}>
                      9:41
                    </span>
                    <div className="flex items-center gap-1">
                      {[3, 2, 1].map((i) => (
                        <div
                          key={i}
                          className="rounded-sm"
                          style={{
                            width: '3px',
                            height: `${4 + i * 2}px`,
                            background: `rgba(240,237,232,${0.2 + i * 0.2})`,
                          }}
                        />
                      ))}
                      <div
                        className="ml-1 rounded-sm"
                        style={{ width: '18px', height: '9px', border: '1px solid rgba(240,237,232,0.4)', padding: '1px' }}
                      >
                        <div
                          className="h-full rounded-sm"
                          style={{ width: '75%', background: 'rgba(240,237,232,0.7)' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* App content placeholder */}
                <div className="px-4 py-3 flex flex-col gap-3">
                  {/* Header bar */}
                  <div className="flex items-center justify-between">
                    <div
                      className="h-5 rounded-full"
                      style={{ width: '100px', background: 'rgba(240,237,232,0.08)' }}
                    />
                    <div
                      className="h-7 w-7 rounded-full"
                      style={{ background: 'rgba(240,237,232,0.06)' }}
                    />
                  </div>

                  {/* Hero image placeholder */}
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      height: '180px',
                      background: 'linear-gradient(145deg, rgba(200,184,154,0.08) 0%, rgba(212,168,83,0.05) 100%)',
                      border: '1px solid rgba(240,237,232,0.04)',
                    }}
                  >
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        backgroundImage: `radial-gradient(circle at 40% 60%, rgba(212,168,83,0.06) 0%, transparent 60%)`,
                      }}
                    >
                      <span
                        style={{ fontSize: '9px', color: 'rgba(240,237,232,0.12)', letterSpacing: '0.2em' }}
                      >
                        {screen.label.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Content rows */}
                  {[90, 70, 80, 60].map((w, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${w}%`, background: `rgba(240,237,232,${0.04 + i * 0.01})` }}
                      />
                    </div>
                  ))}

                  {/* Card grid */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="rounded-xl"
                        style={{
                          height: '80px',
                          background: `linear-gradient(145deg, rgba(240,237,232,0.04) 0%, rgba(240,237,232,0.02) 100%)`,
                          border: '1px solid rgba(240,237,232,0.04)',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom navigation */}
                {screen.hasBottomBar && (
                  <div
                    className="absolute bottom-0 left-0 right-0 flex justify-around items-center py-4 px-6"
                    style={{
                      background: 'rgba(10,10,10,0.9)',
                      backdropFilter: 'blur(20px)',
                      borderTop: '1px solid rgba(240,237,232,0.04)',
                      paddingBottom: '28px',
                    }}
                  >
                    {['⊙', '◯', '△', '☰'].map((icon, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1"
                      >
                        <span
                          style={{
                            fontSize: '16px',
                            color: i === 0 ? 'rgba(212,168,83,0.8)' : 'rgba(240,237,232,0.2)',
                          }}
                        >
                          {icon}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Side buttons */}
        <div
          className="absolute right-0 top-28 rounded-l-sm"
          style={{ width: '3px', height: '60px', background: 'rgba(255,255,255,0.04)', marginRight: '-1px' }}
        />
        <div
          className="absolute left-0 top-24 rounded-r-sm"
          style={{ width: '3px', height: '34px', background: 'rgba(255,255,255,0.04)', marginLeft: '-1px' }}
        />
        <div
          className="absolute left-0 top-32 rounded-r-sm"
          style={{ width: '3px', height: '34px', background: 'rgba(255,255,255,0.04)', marginLeft: '-1px' }}
        />
      </div>

      {/* Reflection */}
      <div
        className="absolute -bottom-8 left-1/2 rounded-full"
        style={{
          transform: 'translateX(-50%)',
          width: '160px',
          height: '20px',
          background: 'radial-gradient(ellipse, rgba(240,237,232,0.06) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
    </motion.div>
  );
}
