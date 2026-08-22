import { useEffect, useState } from 'react';

/**
 * Chronomètre croissant, démarré à une durée déjà écoulée.
 */
export function useElapsedTime(startedAtSeconds: number) {
  const [seconds, setSeconds] = useState(startedAtSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return seconds;
}
