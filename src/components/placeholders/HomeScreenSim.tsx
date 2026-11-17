import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GoldGradientFrame from './GoldGradientFrame';

const BORDERS = ['border_default', 'border_hacked', 'border_orbit', 'border_triad'];
const FACES = ['face_default', 'face_smile', 'face_mask', 'face_bug'];
// Plant-Layer ist bewusst nicht wählbar - immer der Legacy-Stand.
const PLANT_IMAGE = '/logo/plant_legacy.png';

function randomNextIndex(currentIndex: number, total: number) {
  if (total <= 1) return currentIndex;
  let nextIndex = currentIndex;
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * total);
  }
  return nextIndex;
}

// Statischer Nachbau des Home-Screens: individualisierbares Logo (Plant/Border/Face-Layer) vor dem
// Guestfunnel-Ebenensystem (bg/mg/fg) aus dem echten Projekt. Bewusst ohne Scroll-Parallax:
// bewegte Ebenen im Phone zwingen v.a. Firefox, das Phone jeden Frame neu zu rendern.
export default function HomeScreenSim() {
  const [borderIndex, setBorderIndex] = useState(0);
  const [faceIndex, setFaceIndex] = useState(0);
  const randomizeVariant = () => {
    setBorderIndex((prev) => randomNextIndex(prev, BORDERS.length));
    setFaceIndex((prev) => randomNextIndex(prev, FACES.length));
  };
  const borderImage = `/logo/${BORDERS[borderIndex]}.png`;
  const faceImage = `/logo/${FACES[faceIndex]}.png`;

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '32px', overflow: 'hidden', position: 'relative', background: '#0c0f0a' }}>
      {/* Guestfunnel-Layersystem: bg/mg/fg statisch gestapelt */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/guestfunnel/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: '-18%', backgroundImage: 'url(/guestfunnel/mg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,10,6,0.5)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,15,8,0.88) 0%, rgba(5,15,8,0.5) 45%, transparent 80%)' }} />

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '52px 20px 20px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '32px', gap: '14px', width: '100%' }}>
        <GoldGradientFrame blur rounded="999px">
          <span
            style={{
              display: 'block',
              fontSize: '17px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textAlign: 'center',
              color: 'rgba(240,237,232,0.95)',
              padding: '12px 30px',
            }}
          >
            Floralog
          </span>
        </GoldGradientFrame>

        {/* Custom Logo — Plant/Border/Face-Layer wie in CustomLogoAvatar gestapelt, Border/Face per Pfeil zufällig neu gewählt */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={randomizeVariant}
            aria-label="Zufälliges Artwork"
            style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid rgba(240,237,232,0.2)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <ChevronLeft size={14} color="rgba(240,237,232,0.6)" strokeWidth={1.5} />
          </button>

          <div
            style={{
              position: 'relative',
              width: '128px',
              height: '128px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,168,83,0.14) 0%, transparent 70%)',
            }}
          >
            <img src={PLANT_IMAGE} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
            <img key={borderImage} src={borderImage} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
            <img key={faceImage} src={faceImage} alt="Custom Logo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          <button
            type="button"
            onClick={randomizeVariant}
            aria-label="Zufälliges Artwork"
            style={{ width: '26px', height: '26px', borderRadius: '50%', border: '1px solid rgba(240,237,232,0.2)', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <ChevronRight size={14} color="rgba(240,237,232,0.6)" strokeWidth={1.5} />
          </button>
        </div>

        <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(240,237,232,0.9)', textAlign: 'center', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
          Erstelle deinen Florabot Naturbegleiter!
        </p>
        </div>
      </div>

      <div
        style={{ position: 'absolute', inset: '-18%', backgroundImage: 'url(/guestfunnel/fg.png)', backgroundSize: 'cover', backgroundPosition: 'center', pointerEvents: 'none', zIndex: 5 }}
      />
    </div>
  );
}
