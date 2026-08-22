import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../../theme';
import { TimelineStep } from '../types';

interface MissionProgressTimelineProps {
  title: string;
  steps: TimelineStep[];
}

/**
 * Avancement d'une mission côté prestataire : étapes empilées avec leur
 * horodatage en sous-titre.
 */
export function MissionProgressTimeline({
  title,
  steps,
}: MissionProgressTimelineProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      {steps.map((step, index) => {
        const isDone = step.state === 'done';
        const isActive = step.state === 'active';
        const isLast = index === steps.length - 1;

        return (
          <View key={step.id} style={styles.item}>
            <View style={styles.left}>
              <View
                style={[
                  styles.node,
                  isDone && styles.nodeDone,
                  isActive && styles.nodeActive,
                ]}
              >
                {isDone && <Feather name="check" size={14} color={colors.white} />}
                {isActive && <View style={styles.activeDot} />}
                {!isDone && !isActive && <View style={styles.futureDot} />}
              </View>

              {!isLast && (
                <View style={[styles.line, isDone && styles.lineDone]} />
              )}
            </View>

            <View style={styles.right}>
              <Text
                style={[
                  styles.stepTitle,
                  isActive && styles.stepTitleActive,
                  !isDone && !isActive && styles.stepTitleFuture,
                ]}
              >
                {step.title}
              </Text>
              <Text style={[styles.stepTime, isActive && styles.stepTimeActive]}>
                {step.time}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.grayVeryDark,
    marginBottom: spacing.md,
  },
  item: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  left: {
    alignItems: 'center',
    width: 24,
  },
  node: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  nodeDone: {
    backgroundColor: colors.success,
  },
  nodeActive: {
    backgroundColor: '#EEF4FF',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  futureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.grayMedium,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 30,
    backgroundColor: '#E5E7EB',
    marginVertical: 2,
  },
  lineDone: {
    backgroundColor: colors.success,
  },
  right: {
    flex: 1,
    paddingBottom: spacing.lg,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.grayVeryDark,
  },
  stepTitleActive: {
    fontWeight: '800',
    color: colors.primary,
  },
  stepTitleFuture: {
    fontWeight: '600',
    color: colors.grayMedium,
  },
  stepTime: {
    fontSize: 12,
    color: colors.grayDark,
    marginTop: 2,
  },
  stepTimeActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
