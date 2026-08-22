import { useEffect, useState } from 'react';

/**
 * Avance un index d'étape à intervalle régulier, sans dépasser la dernière.
 */
export function useSteppedProgress(stepCount: number, intervalMs: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((previous) =>
        previous < stepCount - 1 ? previous + 1 : previous
      );
    }, intervalMs);

    return () => clearInterval(interval);
  }, [stepCount, intervalMs]);

  return currentIndex;
}
