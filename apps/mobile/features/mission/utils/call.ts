import { Alert, Linking } from 'react-native';

/**
 * Ouvre le composeur téléphonique, avec repli sur une alerte lorsque le
 * périphérique ne gère pas les appels.
 */
export function callProvider(phone: string) {
  Linking.openURL(`tel:${phone}`).catch(() => {
    Alert.alert('Appel', `Composer le : ${phone}`);
  });
}
