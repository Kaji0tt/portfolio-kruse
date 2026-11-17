import { Leaf, MapPin } from 'lucide-react';
import { isFirefox } from '../../utils/browser';

// Statischer Nachbau des Map-/Zonen-Screens: abstrahierte Karte mit Zonen-Kreisen und Fund-Markern,
// fokussiert auf das Gamification-Element (Zonen-Boni, Tages-Challenge) statt einen echten Leaflet-Ausschnitt.
const ZONES = [
  { id: 'forest', label: 'Wald', color: '#16a34a', x: 28, y: 30, size: 92, finds: 4 },
  { id: 'urban', label: 'Stadt', color: '#ea580c', x: 74, y: 22, size: 70, finds: 2 },
  { id: 'water', label: 'Wasser', color: '#0284c7', x: 66, y: 68, size: 78, finds: 3 },
  { id: 'meadow', label: 'Wiese', color: '#eab308', x: 24, y: 74, size: 66, finds: 1 },
];

const FINDS = [
  { x: 24, y: 24 }, { x: 34, y: 38 }, { x: 20, y: 40 },
  { x: 72, y: 18 }, { x: 78, y: 28 },
  { x: 62, y: 62 }, { x: 70, y: 74 }, { x: 60, y: 76 },
  { x: 22, y: 78 },
];

export default function MapScreenSim() {
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '32px', overflow: 'hidden', position: 'relative', background: 'linear-gradient(160deg, #17251a 0%, #0c130d 60%, #0a100c 100%)' }}>
      {/* Kartengitter — deutet Tile-Raster an, ohne echte Kartendaten zu laden */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(240,237,232,0.05) 0px, rgba(240,237,232,0.05) 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, rgba(240,237,232,0.05) 0px, rgba(240,237,232,0.05) 1px, transparent 1px, transparent 32px)',
        }}
      />

      <span
        style={{
          position: 'absolute',
          top: '34px',
          left: '16px',
          right: '16px',
          fontSize: '9px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(240,237,232,0.4)',
        }}
      >
        In deiner Nähe
      </span>

      {/* Zonen — Kreise mit Bonus-Multiplikator-Farbe je Theme (Forest/Urban/Water/Meadow) */}
      {ZONES.map((zone) => (
        <div
          key={zone.id}
          style={{
            position: 'absolute',
            top: `${zone.y}%`,
            left: `${zone.x}%`,
            width: `${zone.size}px`,
            height: `${zone.size}px`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: `1.5px solid ${zone.color}`,
            background: `${zone.color}26`,
          }}
        >
          <span
            style={{
              position: 'absolute',
              bottom: '-16px',
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontSize: '8px',
              color: zone.color,
              letterSpacing: '0.08em',
            }}
          >
            {zone.label} · {zone.finds}
          </span>
        </div>
      ))}

      {/* Funde — abgeschlossene Scans als kleine Marker */}
      {FINDS.map((find, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${find.y}%`,
            left: `${find.x}%`,
            transform: 'translate(-50%, -50%)',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'rgba(12,12,12,0.9)',
            border: '1px solid rgba(240,237,232,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Leaf size={8} color="rgba(160,200,140,0.9)" strokeWidth={2} />
        </div>
      ))}

      {/* Standort des Spielers */}
      <div style={{ position: 'absolute', top: '48%', left: '46%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', background: 'rgba(212,168,83,0.25)' }} />
        <MapPin size={16} color="rgba(212,168,83,0.95)" fill="rgba(212,168,83,0.3)" strokeWidth={1.5} />
      </div>

      {/* Tages-Challenge — Gamification-Fokus statt Detailwissen */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          right: '10px',
          borderRadius: '14px',
          border: '1px solid rgba(212,168,83,0.3)',
          background: isFirefox ? 'rgba(10,12,8,0.92)' : 'rgba(10,12,8,0.85)',
          backdropFilter: isFirefox ? undefined : 'blur(8px)',
          WebkitBackdropFilter: isFirefox ? undefined : 'blur(8px)',
          padding: '10px 12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '10px', fontWeight: 500, color: 'rgba(240,237,232,0.85)' }}>Tages-Challenge</span>
          <span style={{ fontSize: '9px', color: 'rgba(212,168,83,0.8)' }}>2 / 3</span>
        </div>
        <p style={{ fontSize: '9px', color: 'rgba(240,237,232,0.45)', marginBottom: '6px' }}>3 Funde in der Wald-Zone · Bonus ×1.5</p>
        <div style={{ height: '4px', width: '100%', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <div style={{ width: '66%', height: '100%', background: 'linear-gradient(to right, rgba(160,200,140,0.9), rgba(212,168,83,0.8))' }} />
        </div>
      </div>
    </div>
  );
}
