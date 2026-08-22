import { useCallback, useEffect, useState } from 'react';

/**
 * Compte à rebours en secondes, borné à zéro.
 */
export function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((previous) => (previous > 0 ? previous - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const reset = useCallback(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return { seconds, reset };
}
