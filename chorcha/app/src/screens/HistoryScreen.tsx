import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

type HistoryTab = 'marked' | 'mistakes' | 'exams';

const TABS: { key: HistoryTab; label: string }[] = [
  { key: 'marked', label: 'দাগানো প্রশ্ন' },
  { key: 'mistakes', label: 'পূর্বের ভুল' },
  { key: 'exams', label: 'পরীক্ষা' },
];

const FILTER_CHIPS = [
  'কারেন্ট অ্যাফেয়ার্স',
  'বাংলাদেশ বিষয়ক',
  'আন্তর্জা...',
  'বাংলা সাহিত্য',
  'গাণিতিক যুক্তি',
  'বিজ্ঞান',
];

export function HistoryScreen() {
  const [activeTab, setActiveTab] = useState<HistoryTab>('marked');
  const [activeChip, setActiveChip] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipRow}
        contentContainerStyle={styles.chipContent}
      >
        {FILTER_CHIPS.map((chip, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.chip, activeChip === idx && styles.chipActive]}
            onPress={() => setActiveChip(idx)}
          >
            <Text style={[styles.chipText, activeChip === idx && styles.chipTextActive]}>
              {chip}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.emptyContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.mascotContainer}>
          <View style={styles.mascotBody}>
            <View style={styles.mascotHead}>
              <View style={styles.eyeLeft} />
              <View style={styles.eyeRight} />
            </View>
            <View style={styles.mascotBox}>
              <Text style={styles.mascotBoxText}>?</Text>
            </View>
          </View>
        </View>
        <Text style={styles.emptyTitle}>কোন প্রশ্ন পাওয়া যায় নি!</Text>
        <Text style={styles.emptySubtitle}>
          এই ক্যাটাগরিতে এখনো কোন প্রশ্ন {activeTab === 'marked' ? 'দাগানো' : activeTab === 'mistakes' ? 'ভুল' : 'পরীক্ষা'} হয়নি
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: '#1B7A4A' },
  tabText: { fontSize: 14, color: '#999', fontWeight: '500' },
  tabTextActive: { color: '#1B7A4A', fontWeight: '700' },
  chipRow: { maxHeight: 52, paddingVertical: 8 },
  chipContent: { paddingHorizontal: 12 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chipActive: { backgroundColor: '#1B7A4A', borderColor: '#1B7A4A' },
  chipText: { fontSize: 12, color: '#666' },
  chipTextActive: { color: '#FFFFFF', fontWeight: '600' },
  emptyContainer: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  mascotContainer: { marginBottom: 24, alignItems: 'center' },
  mascotBody: { alignItems: 'center' },
  mascotHead: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: -8,
    zIndex: 1,
  },
  eyeLeft: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFF', marginRight: 8 },
  eyeRight: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFF' },
  mascotBox: {
    width: 56,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#FBBF24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotBoxText: { fontSize: 24, fontWeight: '700', color: '#92400E' },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 8 },
  emptySubtitle: { fontSize: 13, color: '#888', textAlign: 'center', paddingHorizontal: 40 },
});
