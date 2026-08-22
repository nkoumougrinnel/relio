function pad(value: number): string {
  return value.toString().padStart(2, '0');
}

/**
 * Compte à rebours court (validité d'un QR Code) : `MM:SS`.
 */
export function formatCountdown(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Durée d'intervention : `HH:MM:SS`.
 */
export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
