import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_MQ = '(max-width: 1024px)';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let tickerCallback: ((time: number) => void) | null = null;

    function start() {
      if (lenisRef.current) return;

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      lenisRef.current = lenis;
      (window as unknown as Record<string, unknown>).__lenis = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      tickerCallback = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    }

    function stop() {
      if (!lenisRef.current) return;
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      lenisRef.current.destroy();
      lenisRef.current = null;
      delete (window as unknown as Record<string, unknown>).__lenis;
    }

    const mq = window.matchMedia(MOBILE_MQ);

    if (!mq.matches) start();

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) stop();
      else start();
    };
    mq.addEventListener('change', handler);

    return () => {
      mq.removeEventListener('change', handler);
      stop();
    };
  }, []);

  return lenisRef;
}
