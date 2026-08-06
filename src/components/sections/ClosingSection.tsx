import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ClosingSection() {
  const stickyRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stickyRef,
    offset: ['start start', 'end end'],
  });

  // Zipper: name/roles from above, CTA/attribution/lines from below
  const elemOpacity  = useTransform(scrollYProgress, [0, 0.28], [0, 1]);
  const nameBlockY   = useTransform(scrollYProgress, [0, 0.68], [-100, 0]);
  const topLineY     = useTransform(scrollYProgress, [0, 0.62], [-160, 0]);
  const ctaY         = useTransform(scrollYProgress, [0, 0.68], [80,   0]);
  const bottomLineY  = useTransform(scrollYProgress, [0, 0.62], [160,  0]);
  const footerY      = useTransform(scrollYProgress, [0, 0.72], [40,   0]);

  return (
    <section id="closing" className="relative" style={{ background: 'transparent' }}>
      <div ref={stickyRef} style={{ height: '300vh' }}>
        <div className="sticky top-0 overflow-hidden" style={{ height: '100vh' }}>
          <div style={{ position: 'relative', height: '100%' }}>

            {/* Top background band — slides in from above, covers particles up to the top line */}
            <motion.div style={{
              y: topLineY,
              opacity: elemOpacity,
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '13%',
              background: 'var(--bg-primary)',
            }} />

            {/* Bottom background band — slides in from below, covers particles down to the bottom line */}
            <motion.div style={{
              y: bottomLineY,
              opacity: elemOpacity,
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '10%',
              background: 'var(--bg-primary)',
            }} />

            {/* Ambient glow */}
            <div className="absolute pointer-events-none" style={{
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '900px', height: '600px',
              background: 'radial-gradient(ellipse at center, rgba(200,184,154,0.03) 0%, transparent 65%)',
              filter: 'blur(60px)',
            }} />

            {/* Top line — from above */}
            <motion.div style={{
              y: topLineY, opacity: elemOpacity,
              position: 'absolute', top: '13%', left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(240,237,232,0.06), transparent)',
            }} />

            {/* Name + roles — from above (zipper top) */}
            <motion.div style={{
              y: nameBlockY, opacity: elemOpacity,
              position: 'absolute', top: '27%', left: 0, right: 0,
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: 'clamp(15px, 2vw, 24px)', fontWeight: 200,
                letterSpacing: '-0.01em', color: 'rgba(240,237,232,0.62)',
              }}>
                JASCHA KRUSE
              </p>
              <p style={{
                fontSize: '12px', color: 'rgba(240,237,232,0.32)',
                letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '6px',
              }}>
                UX Designer · Creative Engineer
              </p>
              <div style={{
                width: '40px', height: '1px', margin: '16px auto 0',
                background: 'linear-gradient(to right, transparent, rgba(200,184,154,0.22), transparent)',
              }} />
            </motion.div>

            {/* Quote + Subtext — always visible, perfectly centered */}
            <div style={{
              position: 'absolute', top: '50%', left: 0, right: 0,
              transform: 'translateY(-50%)',
              textAlign: 'center',
              padding: '0 clamp(24px, 7vw, 140px)',
            }}>
              <p style={{
                fontSize: 'clamp(22px, 3.2vw, 44px)',
                fontWeight: 200,
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
                color: 'rgba(240,237,232,0.85)',
              }}>
                In a world of instant answers, <span style={{ color: 'rgba(212,168,83,0.9)' }}>the rarest skill</span>
                <br />
                is knowing which question to ask.
              </p>
              <p style={{
                marginTop: '24px',
                fontSize: 'clamp(12px, 1.4vw, 15px)',
                fontWeight: 300,
                color: 'rgba(240,237,232,0.25)',
                lineHeight: 1.7,
                letterSpacing: '0.02em',
              }}>
                Digitalisation — amplified exponentially by AI — has made problem solving faster than ever.<br />
                What remains irreplaceable is the human capacity for <em>problem-finding</em>.
              </p>
              <p style={{
                marginTop: '16px',
                fontSize: '9px',
                fontWeight: 300,
                color: 'rgba(240,237,232,0.13)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}>
                Based on J. P. Guilford&apos;s model of creative cognition
              </p>
            </div>

            {/* CTA — from below (zipper bottom) */}
            <motion.div style={{
              y: ctaY, opacity: elemOpacity,
              position: 'absolute', bottom: '24%', left: 0, right: 0,
              display: 'flex', justifyContent: 'center',
            }}>
              <motion.a
                href="mailto:jascha.kruse@web.de"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  padding: '14px 32px', borderRadius: '999px',
                  background: 'rgba(240,237,232,0.05)',
                  border: '1px solid rgba(240,237,232,0.14)',
                  color: 'rgba(240,237,232,0.62)',
                  fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(240,237,232,0.08)';
                  el.style.borderColor = 'rgba(240,237,232,0.18)';
                  el.style.color = 'rgba(240,237,232,0.9)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = 'rgba(240,237,232,0.04)';
                  el.style.borderColor = 'rgba(240,237,232,0.1)';
                  el.style.color = 'rgba(240,237,232,0.45)';
                }}
              >
                GET IN TOUCH <span style={{ opacity: 0.4 }}>→</span>
              </motion.a>
            </motion.div>

            {/* Bottom line — from below */}
            <motion.div style={{
              y: bottomLineY, opacity: elemOpacity,
              position: 'absolute', bottom: '10%', left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(240,237,232,0.06), transparent)',
            }} />

            {/* Footer — from below */}
            <motion.p style={{
              y: footerY, opacity: elemOpacity,
              position: 'absolute', bottom: '2%', left: 0, right: 0,
              textAlign: 'center',
              fontSize: '9px', color: 'rgba(240,237,232,0.1)', letterSpacing: '0.3em',
            }}>
              <a href="/impressum" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>
                JASCHA KRUSE — PORTFOLIO {new Date().getFullYear()}
              </a>
            </motion.p>

          </div>
        </div>
      </div>
    </section>
  );
}

