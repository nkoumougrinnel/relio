import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../../theme';
import { TimelineStep } from '../types';

interface MissionTimelineProps {
  steps: TimelineStep[];
}

/**
 * Suivi vertical d'une intervention, du dépôt de la demande à l'évaluation.
 */
export function MissionTimeline({ steps }: MissionTimelineProps) {
  return (
    <View style={styles.list}>
      {steps.map((step, index) => {
        const isDone = step.state === 'done';
        const isActive = step.state === 'active';
        const isLast = index === steps.length - 1;

        return (
          <View key={step.id}>
            <View style={styles.row}>
              <View
                style={[
                  styles.circle,
                  isDone && styles.circleDone,
                  isActive && styles.circleActive,
                ]}
              >
                {isDone && (
                  <Ionicons name="checkmark" size={14} color={colors.white} />
                )}
                {isActive && <View style={styles.innerDotActive} />}
                {!isDone && !isActive && <View style={styles.innerDotPending} />}
              </View>

              <View style={styles.titleRow}>
                <Text style={[styles.title, isActive && styles.titleActive]}>
                  {step.title}
                </Text>
                <Text style={styles.time}>{step.time}</Text>
              </View>
            </View>

            {!isLast && (
              <View
                style={[
                  styles.connector,
                  isDone && styles.connectorDone,
                  isActive && styles.connectorActive,
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F2F5',
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  circleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  innerDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  innerDotPending: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.grayMedium,
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    color: colors.grayDark,
  },
  titleActive: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  time: {
    fontSize: 11,
    color: colors.grayMedium,
  },
  connector: {
    width: 2,
    height: 18,
    backgroundColor: colors.border,
    marginLeft: 11,
    marginVertical: 2,
  },
  connectorDone: {
    backgroundColor: colors.success,
  },
  connectorActive: {
    backgroundColor: colors.primary,
  },
});
