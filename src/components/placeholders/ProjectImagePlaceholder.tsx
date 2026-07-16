interface Props {
  label?: string;
  aspectRatio?: string;
  className?: string;
}

export default function ProjectImagePlaceholder({
  label = 'Project Image',
  aspectRatio = '16/9',
  className = '',
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{
        aspectRatio,
        background: 'linear-gradient(135deg, #141414 0%, #1a1916 50%, #111111 100%)',
        border: '1px solid rgba(240, 237, 232, 0.06)',
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(240,237,232,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,237,232,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Blurred content blocks */}
      <div className="absolute inset-0 p-6 flex flex-col gap-3">
        <div
          className="h-2 rounded-full"
          style={{ background: 'rgba(240,237,232,0.06)', width: '45%' }}
        />
        <div
          className="flex-1 rounded-lg"
          style={{ background: 'rgba(240,237,232,0.03)' }}
        />
        <div className="flex gap-2">
          <div
            className="h-1.5 rounded-full flex-1"
            style={{ background: 'rgba(240,237,232,0.05)' }}
          />
          <div
            className="h-1.5 rounded-full"
            style={{ background: 'rgba(240,237,232,0.03)', width: '30%' }}
          />
        </div>
      </div>

      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: 'rgba(240,237,232,0.15)', letterSpacing: '0.2em', fontSize: '9px' }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
