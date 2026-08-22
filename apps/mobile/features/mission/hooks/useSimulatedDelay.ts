import { useEffect, useRef } from 'react';

/**
 * Déclenche une action après un délai fixe. Sert à simuler les événements que
 * le backend poussera plus tard (arrivée du prestataire, scan d'un QR Code).
 */
export function useSimulatedDelay(delayMs: number, onElapsed: () => void) {
  const callbackRef = useRef(onElapsed);
  callbackRef.current = onElapsed;

  useEffect(() => {
    const timeout = setTimeout(() => callbackRef.current(), delayMs);
    return () => clearTimeout(timeout);
  }, [delayMs]);
}
