/**
 * Design System Relio — Tokens de couleur
 * Directement extrait des spécifications actuelles de la charte visuelle.
 */
export const colors = {
  // Couleurs principales
  primary: '#0053F3',
  secondary: '#FFB300',
  success: '#30B26C',
  error: '#D32F2F',
  warning: '#FFA000',
  info: '#0288D1',

  // Arrière-plans et surfaces
  background: '#FFFFFF',
  surface: '#FAFAFA',
  surfaceVariant: '#E0E0E0',
  backgroundInverse: '#212121',

  // Textes
  onBackground: '#212121',
  onSurface: '#212121',
  onSurfaceVariant: '#424242',
  onPrimary: '#FFFFFF',
  onSecondary: '#212121',
  disabled: '#BDBDBD',
  placeholder: '#9E9E9E',

  // Bordures
  border: '#E0E0E0',
  borderVariant: '#BDBDBD',
  inverseBorder: '#424242',

  // Neutres supplémentaires
  white: '#FFFFFF',
  black: '#000000',
  grayVeryLight: '#FAFAFA',
  grayLight: '#E0E0E0',
  grayMedium: '#BDBDBD',
  grayDark: '#757575',
  grayVeryDark: '#212121',
} as const;

export type Colors = typeof colors;
