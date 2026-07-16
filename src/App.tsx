import { useLenis } from './hooks/useLenis';
import FloatingNav from './components/FloatingNav';
import HeroSection from './components/sections/HeroSection';
import PhilosophySection from './components/sections/PhilosophySection';
import FloralogSection from './components/sections/FloralogSection';
import FordecodeSection from './components/sections/FordecodeSection';
import AIWorkflowSection from './components/sections/AIWorkflowSection';
import ClosingSection from './components/sections/ClosingSection';

export default function App() {
  useLenis();

  return (
    <div className="relative" style={{ background: 'var(--bg-primary)' }}>
      <FloatingNav />
      <main>
        <HeroSection />
        <PhilosophySection />
        <FloralogSection />
        <FordecodeSection />
        <AIWorkflowSection />
        <ClosingSection />
      </main>
    </div>
  );
}
