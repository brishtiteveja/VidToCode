import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ExamDetailScreen() {
  return (
    <View style={styles.container}>
      <Text>Exam Detail</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5' },
});
