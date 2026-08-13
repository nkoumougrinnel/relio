import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../theme';

export default function DemandesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vos Demandes (Bientôt disponible)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 16,
    color: colors.grayDark,
  },
});
