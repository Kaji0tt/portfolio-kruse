interface Props {
  columns?: number;
  rows?: number;
  className?: string;
  label?: string;
}

export default function GalleryPlaceholder({
  columns = 3,
  rows = 2,
  className = '',
  label = 'Gallery',
}: Props) {
  const items = Array.from({ length: columns * rows });

  return (
    <div className={`${className}`}>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {items.map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden relative"
            style={{
              aspectRatio: i % 3 === 0 ? '4/3' : '16/9',
              background: `linear-gradient(145deg, rgba(240,237,232,${0.03 + (i % 4) * 0.01}) 0%, rgba(240,237,232,0.015) 100%)`,
              border: '1px solid rgba(240,237,232,0.05)',
            }}
          >
            {/* Subtle texture */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at ${20 + i * 15}% ${30 + i * 10}%, rgba(212,168,83,0.04) 0%, transparent 60%)`,
              }}
            />
            <div className="absolute inset-0 flex items-end p-3">
              <div
                className="h-1.5 rounded-full"
                style={{ width: `${40 + (i % 3) * 20}%`, background: 'rgba(240,237,232,0.06)' }}
              />
            </div>
          </div>
        ))}
      </div>
      <p
        className="text-center mt-4 tracking-widest uppercase"
        style={{ fontSize: '9px', color: 'rgba(240,237,232,0.1)', letterSpacing: '0.25em' }}
      >
        {label}
      </p>
    </div>
  );
}
