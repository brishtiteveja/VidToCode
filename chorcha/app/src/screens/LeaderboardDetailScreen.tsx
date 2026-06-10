import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function LeaderboardDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>Leaderboard Detail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5' },
});
