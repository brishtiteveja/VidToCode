import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAY_VALUES = [0, 0, 0, 0, 0, 0, 0];
const TODAY_INDEX = 2; // Tuesday highlighted

const SUBJECT_REPORTS = [
  'কারেন্ট অ্যাফেয়ার্স',
  'বাংলা সাহিত্য',
  'বাংলা ভাষা ও ব্যাকরণ',
  'English Literature',
  'English Language',
  'গাণিতিক যুক্তি',
  'সাধারণ বিজ্ঞান',
  'বাংলাদেশ বিষয়াবলি',
  'আন্তর্জাতিক বিষয়াবলি',
  'ভূগোল ও দুর্যোগ ব্যবস্থাপনা',
  'নৈতিকতা মূল্যবোধ ও সুশাসন',
  'কম্পিউটার ও তথ্যপ্রযুক্তি',
  'মানসিক দক্ষতা',
];

const STATS = [
  { icon: '⭐', value: '0.0', label: 'পয়েন্ট' },
  { icon: '📝', value: '২', label: 'পরীক্ষা' },
  { icon: '👥', value: '---', label: 'র‍্যাংক' },
  { icon: '🔥', value: '১', label: 'স্ট্রীক' },
];

export function ProgressScreen() {
  const [expandedSubject, setExpandedSubject] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileRow}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Andy - Abdullah Khan Zehady</Text>
              <Text style={styles.profileSubtitle} numberOfLines={1}>
                BCS-52 from Bangladesh University of En...
              </Text>
            </View>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>A</Text>
              </View>
              <View style={styles.onlineDot} />
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {STATS.map((stat, idx) => (
            <View key={idx} style={styles.statItem}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Add Friend Button */}
        <View style={styles.sectionPadding}>
          <TouchableOpacity style={styles.addFriendBtn} activeOpacity={0.7}>
            <Text style={styles.addFriendText}>বন্ধু অ্যাড করো</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Points Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>দৈনিক পয়েন্ট</Text>
            <TouchableOpacity>
              <Text style={styles.infoIcon}>ℹ️</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.dateRange}>জুন ৭ - জুন ১৩</Text>

          <View style={styles.chartContainer}>
            {DAYS.map((day, idx) => (
              <View key={idx} style={styles.chartBar}>
                <Text style={styles.chartValue}>
                  {idx === TODAY_INDEX ? '0.00' : ''}
                </Text>
                <View
                  style={[
                    styles.bar,
                    idx === TODAY_INDEX && styles.barActive,
                  ]}
                />
                <Text
                  style={[
                    styles.chartDay,
                    idx === TODAY_INDEX && styles.chartDayActive,
                  ]}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Subject Report Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>সাবজেক্ট ভিত্তিক রিপোর্ট</Text>

          {SUBJECT_REPORTS.map((subject, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.reportCard}
              activeOpacity={0.7}
              onPress={() => setExpandedSubject(expandedSubject === idx ? null : idx)}
            >
              <View style={styles.reportRow}>
                <Text style={styles.reportSubject} numberOfLines={1}>{subject}</Text>
                <View style={styles.reportRight}>
                  <Text style={styles.reportPercent}>0%</Text>
                  <Text style={styles.chevron}>
                    {expandedSubject === idx ? '▲' : '▼'}
                  </Text>
                </View>
              </View>
              {expandedSubject === idx && (
                <View style={styles.expandedContent}>
                  <Text style={styles.expandedText}>এখনো কোন ডেটা নেই</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  profileHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
    backgroundColor: '#7C3AED',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfo: { flex: 1, marginRight: 16 },
  profileName: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 },
  profileSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.6)' },
  avatarContainer: { position: 'relative' },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5B21B6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  avatarText: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#1B7A4A',
    borderWidth: 2,
    borderColor: '#7C3AED',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statIcon: { fontSize: 18, marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '700', color: '#333' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  sectionPadding: { paddingHorizontal: 16, marginTop: 16 },
  addFriendBtn: {
    borderWidth: 1.5,
    borderColor: '#1B7A4A',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addFriendText: { fontSize: 14, fontWeight: '600', color: '#1B7A4A' },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 4 },
  infoIcon: { fontSize: 16 },
  dateRange: { fontSize: 12, color: '#888', marginBottom: 16 },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
    paddingTop: 16,
  },
  chartBar: { alignItems: 'center', flex: 1 },
  chartValue: { fontSize: 10, color: '#1B7A4A', marginBottom: 4, height: 14 },
  bar: {
    width: 20,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E5E7EB',
    marginBottom: 8,
  },
  barActive: { backgroundColor: '#1B7A4A', height: 8 },
  chartDay: { fontSize: 12, color: '#999' },
  chartDayActive: { color: '#1B7A4A', fontWeight: '700' },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    padding: 14,
    marginTop: 8,
  },
  reportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reportSubject: { fontSize: 14, color: '#333', flex: 1, marginRight: 12 },
  reportRight: { flexDirection: 'row', alignItems: 'center' },
  reportPercent: { fontSize: 14, fontWeight: '600', color: '#888', marginRight: 8 },
  chevron: { fontSize: 10, color: '#999' },
  expandedContent: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  expandedText: { fontSize: 13, color: '#999', textAlign: 'center' },
  bottomSpacer: { height: 32 },
});
