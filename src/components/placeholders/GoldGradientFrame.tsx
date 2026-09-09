import type { ReactNode } from 'react';

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
          background: blur ? 'rgba(10,12,8,0.75)' : 'rgba(10,12,8,0.92)',
          backdropFilter: blur ? 'blur(14px)' : undefined,
          WebkitBackdropFilter: blur ? 'blur(14px)' : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
