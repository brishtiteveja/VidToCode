import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const SUBJECTS = [
  { name: 'কারেন্ট অ্যাফেয়ার্স', icon: '📰', color: '#E8F5E9' },
  { name: 'বাংলা সাহিত্য', icon: '📚', color: '#FFF3E0' },
  { name: 'বাংলা ভাষা ও ব্যাকরণ', icon: '✏️', color: '#E3F2FD' },
  { name: 'English Literature', icon: '📖', color: '#FCE4EC' },
  { name: 'English Language', icon: '🔤', color: '#F3E5F5' },
  { name: 'গাণিতিক যুক্তি', icon: '🔢', color: '#E8EAF6' },
  { name: 'সাধারণ বিজ্ঞান', icon: '⚗️', color: '#E0F7FA' },
  { name: 'বাংলাদেশ বিষয়াবলি', icon: '🇧🇩', color: '#E8F5E9' },
  { name: 'আন্তর্জাতিক বিষয়াবলি', icon: '🌍', color: '#FFF8E1' },
  { name: 'ভূগোল ও দুর্যোগ ব্যবস্থাপনা', icon: '🗺️', color: '#EFEBE9' },
  { name: 'নৈতিকতা মূল্যবোধ ও সুশাসন', icon: '⚖️', color: '#ECEFF1' },
  { name: 'কম্পিউটার ও তথ্যপ্রযুক্তি', icon: '💻', color: '#E8EAF6' },
  { name: 'মানসিক দক্ষতা', icon: '🧠', color: '#FCE4EC' },
  { name: 'নিবন্ধন কলেজ', icon: '📝', color: '#F1F8E9' },
  { name: 'নিবন্ধন স্কুল', icon: '📝', color: '#FFF3E0' },
];

type TabKey = 'mock' | 'quick';

export function ExamScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('mock');

  const headerText = activeTab === 'mock'
    ? 'বিষয় ভিত্তিক মক পরীক্ষা দিন'
    : 'বিষয় ভিত্তিক দ্রুত প্র্যাকটিস করুন';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'mock' && styles.tabActive]}
          onPress={() => setActiveTab('mock')}
        >
          <Text style={[styles.tabText, activeTab === 'mock' && styles.tabTextActive]}>
            মক পরীক্ষা
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'quick' && styles.tabActive]}
          onPress={() => setActiveTab('quick')}
        >
          <Text style={[styles.tabText, activeTab === 'quick' && styles.tabTextActive]}>
            দ্রুত প্র্যাকটিস
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>{headerText}</Text>
        <Text style={styles.subLabel}>বিষয় ভিত্তিক</Text>

        <View style={styles.grid}>
          {SUBJECTS.map((subject, idx) => (
            <TouchableOpacity key={idx} style={styles.card} activeOpacity={0.7}>
              <View style={[styles.iconCircle, { backgroundColor: subject.color }]}>
                <Text style={styles.iconText}>{subject.icon}</Text>
              </View>
              <Text style={styles.subjectName} numberOfLines={2}>{subject.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  tabText: { fontSize: 15, color: '#999', fontWeight: '500' },
  tabTextActive: { color: '#1B7A4A', fontWeight: '700' },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
  sectionLabel: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  subLabel: { fontSize: 13, color: '#888', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  iconText: { fontSize: 22 },
  subjectName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
});
