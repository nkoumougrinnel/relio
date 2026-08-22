/**
 * Design System Relio — Rayons de bordure
 */
export const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  full: 9999,
} as const;

export const borderRadius = radius;

export type Radius = typeof radius;
export type BorderRadius = typeof borderRadius;

