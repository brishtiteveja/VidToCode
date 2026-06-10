import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ChorchaAIScreen() {
  return (
    <View style={styles.container}>
      <Text>Chorcha AI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5' },
});
