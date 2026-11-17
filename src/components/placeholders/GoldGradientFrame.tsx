import type { ReactNode } from 'react';
import { isFirefox } from '../../utils/browser';

interface Props {
  children: ReactNode;
  className?: string;
  blur?: boolean;
  rounded?: string;
}

// Nachbau der GoldGradientCard aus dem Floralog-Projekt: Verlaufsrand als 1px-Padding-Layer,
// darunter ein separater Blur/Background-Layer (kein CSS mask-composite, iOS-sicher).
export default function GoldGradientFrame({ children, className = '', blur = false, rounded = '20px' }: Props) {
  return (
    <div
      className={className}
      style={{
        borderRadius: rounded,
        padding: '1px',
        background: 'linear-gradient(to bottom right, #f0e5a5, rgba(200,172,98,0.85), #8f6b22)',
      }}
    >
      <div
        style={{
          borderRadius: `calc(${rounded} - 1px)`,
          // Firefox: kein Backdrop-Blur (extrem teuer im rotierenden Phone), dafür etwas deckender.
          background: blur ? (isFirefox ? 'rgba(10,12,8,0.86)' : 'rgba(10,12,8,0.75)') : 'rgba(10,12,8,0.92)',
          backdropFilter: blur && !isFirefox ? 'blur(8px)' : undefined,
          WebkitBackdropFilter: blur && !isFirefox ? 'blur(8px)' : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
