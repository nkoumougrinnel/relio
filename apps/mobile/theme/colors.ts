/**
 * Design System Relio — Tokens de couleur
 * Directement extrait des spécifications de la charte visuelle (docs/design_system/03_Couleurs.md)
 */
export const colors = {
  // Couleurs principales
  primary: '#0053F3',          // Bleu primaire (Marque, boutons principaux)
  secondary: '#FFB300',        // Jaune accent (Boutons d'action secondaire, surlignages)
  success: '#30B26C',          // Vert succès (Validations, check-lists)
  error: '#D32F2F',            // Rouge erreur (Alertes, messages d'erreur)
  warning: '#FFA000',          // Amber warning (Badges, avertissements)
  info: '#0288D1',             // Bleu info (Aide, informations)

  // Arrière-plans et surfaces
  background: '#FFFFFF',       // Fond principal
  surface: '#FAFAFA',          // Fond de carte / surface légère
  surfaceVariant: '#E0E0E0',   // Surface surélevée ou bordure légère
  backgroundInverse: '#212121',// Fond sombre

  // Textes
  onBackground: '#212121',     // Texte principal sur fond clair
  onSurface: '#212121',        // Texte sur carte / surface
  onSurfaceVariant: '#424242', // Texte secondaire
  onPrimary: '#FFFFFF',        // Texte sur bouton bleu
  onSecondary: '#212121',      // Texte sur bouton jaune
  disabled: '#BDBDBD',         // Texte/élément désactivé
  placeholder: '#9E9E9E',      // Placeholder dans les inputs

  // Bordures
  border: '#E0E0E0',           // Bordures par défaut
  borderVariant: '#BDBDBD',    // Bordures accentuées
  inverseBorder: '#424242',    // Bordures sur fond sombre

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
