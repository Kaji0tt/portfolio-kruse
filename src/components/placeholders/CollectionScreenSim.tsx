import { motion, useTransform, type MotionValue } from 'framer-motion';
import { Home, Camera, Leaf, Users, Map as MapIcon } from 'lucide-react';
import GoldGradientFrame from './GoldGradientFrame';

interface GenusEntry {
  id: string;
  name: string;
  dex: number;
  icon: string;
  discovered: boolean;
}

// Mock-Daten - reine Illustration des Interaktionsmusters, keine echten App-Daten.
const GENERA: GenusEntry[] = [
  { id: '1', name: 'Ahorn', dex: 1, icon: '◆', discovered: true },
  { id: '2', name: 'Rose', dex: 2, icon: '✦', discovered: true },
  { id: '3', name: 'Flieder', dex: 3, icon: '❋', discovered: true },
  { id: '4', name: 'Orchidee', dex: 4, icon: '✦', discovered: false },
  { id: '5', name: 'Eiche', dex: 5, icon: '◆', discovered: true },
  { id: '6', name: 'Lavendel', dex: 6, icon: '✦', discovered: true },
  { id: '7', name: 'Buche', dex: 7, icon: '◆', discovered: false },
  { id: '8', name: 'Tulpe', dex: 8, icon: '✦', discovered: true },
  { id: '9', name: 'Wacholder', dex: 9, icon: '❋', discovered: false },
  { id: '10', name: 'Edelweiß', dex: 10, icon: '✦', discovered: false },
];

const NAV_ITEMS = [
  { icon: Leaf, label: 'Sammlung', active: true, center: false },
  { icon: MapIcon, label: 'Karte', active: false, center: false },
  { icon: Camera, label: 'Scannen', active: false, center: true },
  { icon: Users, label: 'Log', active: false, center: false },
  { icon: Home, label: 'Home', active: false, center: false },
];

interface Props {
  // 0 -> Grid am Ursprung, 1 -> Grid komplett unter der Hero verschwunden.
  progress: MotionValue<number>;
}

export default function CollectionScreenSim({ progress }: Props) {
  const cardsY = useTransform(progress, [0, 1], [0, -190]);

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '32px', overflow: 'hidden', position: 'relative', background: '#0c0f0a' }}>
      {/* Scroll-Layer: Karten wandern nach oben und verschwinden unter der Hero, wie in GlobalCatalogFeatureRoot */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.div
          style={{
            y: cardsY,
            position: 'absolute',
            top: '106px',
            left: '10px',
            right: '10px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '6px',
          }}
        >
          {GENERA.map((genus) => (
            <div
              key={genus.id}
              style={{
                borderRadius: '10px',
                border: `1px solid ${genus.discovered ? 'rgba(212,168,83,0.3)' : 'rgba(240,237,232,0.08)'}`,
                background: 'rgba(255,255,255,0.02)',
                padding: '6px',
                opacity: genus.discovered ? 1 : 0.4,
              }}
            >
              <span style={{ fontSize: '7px', color: 'rgba(240,237,232,0.35)', letterSpacing: '0.05em' }}>
                #{String(genus.dex).padStart(3, '0')}
              </span>
              <div style={{ height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', color: 'rgba(240,237,232,0.45)' }}>
                {genus.icon}
              </div>
              <p style={{ fontSize: '9px', color: 'rgba(240,237,232,0.7)', fontWeight: 300 }}>
                {genus.discovered ? genus.name : '???'}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero — bleibt oben stehen, gleiche Optik wie GoldGradientCard im echten Projekt */}
      <div style={{ position: 'absolute', top: '34px', left: '10px', right: '10px', zIndex: 2 }}>
        <GoldGradientFrame blur rounded="18px">
          <div style={{ padding: '10px 12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 300, color: 'rgba(240,237,232,0.85)' }}>Globale Sammlung</span>
            <div style={{ height: '3px', width: '100%', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden', margin: '6px 0' }}>
              <div style={{ width: '64%', height: '100%', background: 'linear-gradient(to right, rgba(160,200,140,0.9), rgba(212,168,83,0.8))' }} />
            </div>
            <div style={{ height: '16px', borderRadius: '999px', border: '1px solid rgba(240,237,232,0.12)', background: 'rgba(255,255,255,0.03)' }} />
          </div>
        </GoldGradientFrame>
      </div>

      {/* Footer-Navigation — Nachbau der HomeBottomNavigation-Pille aus dem echten Projekt */}
      <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px', zIndex: 3 }}>
        <GoldGradientFrame blur rounded="999px">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '8px 6px' }}>
            {NAV_ITEMS.map((item, i) => (
              <item.icon
                key={i}
                size={item.center ? 16 : 13}
                color={item.active || item.center ? 'rgba(212,168,83,0.85)' : 'rgba(240,237,232,0.4)'}
                strokeWidth={1.5}
              />
            ))}
          </div>
        </GoldGradientFrame>
      </div>
    </div>
  );
}
