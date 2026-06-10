import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const SUBJECTS = [
  { name: 'কারেন্ট অ্যাফেয়ার্স', icon: '📰', color: '#E8F5E9', count: '২০০ টি প্রশ্ন' },
  { name: 'বাংলা সাহিত্য', icon: '📚', color: '#FFF3E0', count: '৩৫০ টি প্রশ্ন' },
  { name: 'বাংলা ভাষা ও ব্যাকরণ', icon: '✏️', color: '#E3F2FD', count: '২৮০ টি প্রশ্ন' },
  { name: 'English Literature', icon: '📖', color: '#FCE4EC', count: '১৮০ টি প্রশ্ন' },
  { name: 'English Language', icon: '🔤', color: '#F3E5F5', count: '২২০ টি প্রশ্ন' },
  { name: 'গাণিতিক যুক্তি', icon: '🔢', color: '#E8EAF6', count: '৩০০ টি প্রশ্ন' },
  { name: 'সাধারণ বিজ্ঞান', icon: '⚗️', color: '#E0F7FA', count: '২৫০ টি প্রশ্ন' },
  { name: 'বাংলাদেশ বিষয়াবলি', icon: '🇧🇩', color: '#E8F5E9', count: '৪০০ টি প্রশ্ন' },
  { name: 'আন্তর্জাতিক বিষয়াবলি', icon: '🌍', color: '#FFF8E1', count: '১৫০ টি প্রশ্ন' },
  { name: 'ভূগোল ও দুর্যোগ ব্যবস্থাপনা', icon: '🗺️', color: '#EFEBE9', count: '১৭০ টি প্রশ্ন' },
  { name: 'নৈতিকতা মূল্যবোধ ও সুশাসন', icon: '⚖️', color: '#ECEFF1', count: '১২০ টি প্রশ্ন' },
  { name: 'কম্পিউটার ও তথ্যপ্রযুক্তি', icon: '💻', color: '#E8EAF6', count: '১৯০ টি প্রশ্ন' },
  { name: 'মানসিক দক্ষতা', icon: '🧠', color: '#FCE4EC', count: '১৬০ টি প্রশ্ন' },
  { name: 'নিবন্ধন কলেজ', icon: '📝', color: '#F1F8E9', count: '২১০ টি প্রশ্ন' },
  { name: 'নিবন্ধন স্কুল', icon: '📝', color: '#FFF3E0', count: '২১০ টি প্রশ্ন' },
];

const FILTERS = ['সাম্প্রতিক সংযোজন', 'জনপ্রিয়', 'সকল বিষয়', 'BCS প্রিলি'];

export const QuestionBankScreen = () => {
  const [activeFilter, setActiveFilter] = useState(0);
  const [searchText, setSearchText] = useState('');

  const renderSubjectCard = ({ item, index }: { item: typeof SUBJECTS[0]; index: number }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
        <Text style={styles.iconText}>{item.icon}</Text>
      </View>
      <Text style={styles.subjectName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.questionCount}>{item.count}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="প্রশ্ন খুঁজে করো..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
        {FILTERS.map((filter, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.filterChip, activeFilter === idx && styles.filterChipActive]}
            onPress={() => setActiveFilter(idx)}
          >
            <Text style={[styles.filterText, activeFilter === idx && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={SUBJECTS}
        renderItem={renderSubjectCard}
        keyExtractor={(_, idx) => String(idx)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  searchContainer: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  filterRow: { paddingHorizontal: 12, marginBottom: 8, maxHeight: 44 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterChipActive: { backgroundColor: '#1B7A4A', borderColor: '#1B7A4A' },
  filterText: { fontSize: 13, color: '#666' },
  filterTextActive: { color: '#FFFFFF', fontWeight: '600' },
  grid: { paddingHorizontal: 12, paddingBottom: 24 },
  row: { justifyContent: 'space-between', marginBottom: 12 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    alignItems: 'center',
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
  subjectName: { fontSize: 14, fontWeight: '700', color: '#333', textAlign: 'center', marginBottom: 4 },
  questionCount: { fontSize: 12, color: '#888' },
});
