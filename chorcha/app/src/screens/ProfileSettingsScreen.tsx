import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ProfileSettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Profile Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5' },
});
