export interface Subject {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  questionCount: number;
}

export const subjects: Subject[] = [
  { id: 'current-affairs', name: 'কারেন্ট অ্যাফেয়ার্স', nameEn: 'Current Affairs', icon: '📰', color: '#3B82F6', questionCount: 1200 },
  { id: 'bangla-literature', name: 'বাংলা সাহিত্য', nameEn: 'Bangla Literature', icon: 'অ', color: '#EF4444', questionCount: 980 },
  { id: 'bangla-grammar', name: 'বাংলা ভাষা ও ব্যাকরণ', nameEn: 'Bangla Language & Grammar', icon: 'ভ', color: '#EC4899', questionCount: 850 },
  { id: 'english-literature', name: 'English Literature', nameEn: 'English Literature', icon: 'a', color: '#7C3AED', questionCount: 760 },
  { id: 'english-language', name: 'English Language', nameEn: 'English Language', icon: 'Aa', color: '#EF4444', questionCount: 900 },
  { id: 'math-reasoning', name: 'গাণিতিক যুক্তি', nameEn: 'Mathematical Reasoning', icon: '√x', color: '#3B82F6', questionCount: 1100 },
  { id: 'general-science', name: 'সাধারণ বিজ্ঞান', nameEn: 'General Science', icon: '⚗️', color: '#14B8A6', questionCount: 870 },
  { id: 'bangladesh-affairs', name: 'বাংলাদেশ বিষয়াবলি', nameEn: 'Bangladesh Affairs', icon: '🇧🇩', color: '#22A05B', questionCount: 1050 },
  { id: 'international-affairs', name: 'আন্তর্জাতিক বিষয়াবলি', nameEn: 'International Affairs', icon: '🌍', color: '#3B82F6', questionCount: 680 },
  { id: 'geography-disaster', name: 'ভূগোল ও দুর্যোগ ব্যবস্থাপনা', nameEn: 'Geography & Disaster', icon: '🗺️', color: '#A0522D', questionCount: 540 },
  { id: 'ethics-governance', name: 'নৈতিকতা, মূল্যবোধ ও সুশাসন', nameEn: 'Ethics & Good Governance', icon: '⚖️', color: '#4F46E5', questionCount: 620 },
  { id: 'computer-it', name: 'কম্পিউটার ও তথ্যপ্রযুক্তি', nameEn: 'Computer & IT', icon: '💻', color: '#7C3AED', questionCount: 730 },
  { id: 'mental-ability', name: 'মানসিক দক্ষতা', nameEn: 'Mental Ability', icon: '🧠', color: '#F59E0B', questionCount: 480 },
  { id: 'registration-college', name: 'নিবন্ধন কলেজ', nameEn: 'Registration College', icon: '📝', color: '#6B7280', questionCount: 550 },
  { id: 'registration-school', name: 'নিবন্ধন স্কুল', nameEn: 'Registration School', icon: '📝', color: '#6B7280', questionCount: 520 },
];
