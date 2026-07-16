import { motion } from 'framer-motion';

interface Step {
  label: string;
  description?: string;
}

interface Props {
  steps: Step[];
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export default function ProcessDiagram({ steps, className = '', orientation = 'vertical' }: Props) {
  const isVertical = orientation === 'vertical';

  return (
    <div
      className={`${isVertical ? 'flex flex-col' : 'flex flex-row items-start'} gap-0 ${className}`}
    >
      {steps.map((step, i) => (
        <div
          key={i}
          className={`flex ${isVertical ? 'flex-row items-start' : 'flex-col items-center'} gap-4`}
        >
          {/* Node */}
          <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center`}>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width: '44px',
                height: '44px',
                background: 'rgba(240,237,232,0.04)',
                border: '1px solid rgba(240,237,232,0.1)',
              }}
            >
              <span
                style={{ fontSize: '11px', color: 'rgba(240,237,232,0.4)', fontWeight: 300, letterSpacing: '0.05em' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%)',
                }}
              />
            </motion.div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                whileInView={{ scaleY: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
                style={{
                  [isVertical ? 'width' : 'height']: '1px',
                  [isVertical ? 'height' : 'width']: isVertical ? '40px' : '60px',
                  background: 'linear-gradient(to bottom, rgba(240,237,232,0.08), rgba(240,237,232,0.02))',
                  transformOrigin: isVertical ? 'top' : 'left',
                  flexShrink: 0,
                  [isVertical ? 'marginLeft' : 'marginTop']: isVertical ? '21px' : '21px',
                }}
              />
            )}
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isVertical ? -10 : 0, y: isVertical ? 0 : 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
            className={`${isVertical ? 'pb-6 pt-2' : 'px-2 pt-3'} ${isVertical ? '' : 'text-center'} flex-1`}
          >
            <p
              className="tracking-widest uppercase"
              style={{ fontSize: '11px', color: 'rgba(240,237,232,0.7)', letterSpacing: '0.12em', fontWeight: 400 }}
            >
              {step.label}
            </p>
            {step.description && (
              <p
                className="mt-1"
                style={{ fontSize: '12px', color: 'rgba(240,237,232,0.3)', lineHeight: '1.5', fontWeight: 300 }}
              >
                {step.description}
              </p>
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
