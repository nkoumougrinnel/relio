import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { Header } from '../../../components/ui';
import { authService } from '../services/auth.service';

const { width } = Dimensions.get('window');
const OTP_LENGTH = 6;

export function VerifyScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = async (key: string) => {
    if (key === 'delete') {
      setCode((prev) => prev.slice(0, -1));
    } else {
      if (code.length < OTP_LENGTH) {
        const newCode = code + key;
        setCode(newCode);

        if (newCode.length === OTP_LENGTH) {
          await authService.verifyOtp(newCode);
          setTimeout(() => {
            router.replace('/(client)/(tabs)' as any);
          }, 400);
        }
      }
    }
  };

  const codeArray = new Array(OTP_LENGTH).fill('');

  const renderKey = (key: string, label: string = '') => {
    if (key === 'empty') {
      return <View style={styles.keyButton} key="empty" />;
    }

    if (key === 'delete') {
      return (
        <TouchableOpacity
          key="delete"
          style={styles.keyButton}
          activeOpacity={0.7}
          onPress={() => handleKeyPress('delete')}
        >
          <Feather name="delete" size={24} color={colors.grayVeryDark} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        key={key}
        style={styles.keyButton}
        activeOpacity={0.7}
        onPress={() => handleKeyPress(key)}
      >
        <Text style={styles.keyNumber}>{key}</Text>
        {label ? <Text style={styles.keyLabel}>{label}</Text> : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Header showBack />

      <View style={styles.content}>
        <View style={styles.textSection}>
          <Text style={styles.title}>Vérification</Text>
          <Text style={styles.subtitle}>
            Nous avons envoyé un code de{'\n'}
            vérification au +237 6 95 12 34 56
          </Text>
        </View>

        {/* Code OTP (6 cases) */}
        <View style={styles.otpContainer}>
          {codeArray.map((_, index) => {
            const digit = code[index] || '';
            const isActive = index === code.length;
            return (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  isActive && styles.otpBoxActive,
                  digit ? styles.otpBoxFilled : null,
                ]}
              >
                <Text style={styles.otpDigit}>{digit}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>
            Renvoyer le code dans <Text style={styles.timerText}>{formatTime(timer)}</Text>
          </Text>
        </View>
      </View>

      {/* Clavier Numérique Personnalisé */}
      <View style={styles.keyboardContainer}>
        <View style={styles.keyboardRow}>
          {renderKey('1')}
          {renderKey('2', 'ABC')}
          {renderKey('3', 'DEF')}
        </View>
        <View style={styles.keyboardRow}>
          {renderKey('4', 'GHI')}
          {renderKey('5', 'JKL')}
          {renderKey('6', 'MNO')}
        </View>
        <View style={styles.keyboardRow}>
          {renderKey('7', 'PQRS')}
          {renderKey('8', 'TUV')}
          {renderKey('9', 'WXYZ')}
        </View>
        <View style={styles.keyboardRow}>
          {renderKey('empty')}
          {renderKey('0')}
          {renderKey('delete')}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 15,
    color: colors.grayDark,
    textAlign: 'center',
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: spacing.xl,
  },
  otpBox: {
    width: 48,
    height: 56,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  otpBoxActive: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  otpBoxFilled: {
    borderColor: colors.grayMedium,
  },
  otpDigit: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  resendContainer: {
    marginTop: spacing.md,
  },
  resendText: {
    fontSize: 14,
    color: colors.grayDark,
    fontWeight: '500',
  },
  timerText: {
    color: colors.primary,
    fontWeight: '700',
  },
  keyboardContainer: {
    backgroundColor: '#F8F9FA',
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg,
    elevation: 5,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  keyButton: {
    width: (width - spacing.lg * 2 - spacing.md * 2) / 3,
    height: 56,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  keyNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.grayVeryDark,
  },
  keyLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.grayMedium,
    marginTop: -2,
  },
});
