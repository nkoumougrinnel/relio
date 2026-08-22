/**
 * Design System Relio — Typographie
 *
 * Les valeurs sont volontairement centralisées et simples pour servir de
 * fondation au design system. Le nom des familles peut être ajusté lorsque
 * les polices finales du produit seront confirmées.
 */

export const typography = {
  display: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: 0,
  },
  h1: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: 0,
  },
  h2: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: 0,
  },
  h3: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: 0,
  },
  body: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodyMedium: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodySmall: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0,
  },
  label: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0,
  },
  caption: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
  },
  button: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0,
  },
} as const;

export type Typography = typeof typography;
