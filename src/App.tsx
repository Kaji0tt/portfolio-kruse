import { useLenis } from './hooks/useLenis';
import FloatingNav from './components/FloatingNav';
import ParticleBackground from './components/ParticleBackground';
import HeroSection from './components/sections/HeroSection';
import PhilosophySection from './components/sections/PhilosophySection';
import FloralogSection from './components/sections/FloralogSection';
import AIWorkflowSection from './components/sections/AIWorkflowSection';
import ClosingSection from './components/sections/ClosingSection';
import ImpressumPage from './components/ImpressumPage';

const isImpressum = window.location.pathname === '/impressum';

export default function App() {
  useLenis();

  if (isImpressum) {
    return <ImpressumPage />;
  }

  return (
    <div className="relative">
      <ParticleBackground />
      <FloatingNav />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <PhilosophySection />
        <FloralogSection />
        <AIWorkflowSection />
        <ClosingSection />
      </main>
    </div>
  );
}
