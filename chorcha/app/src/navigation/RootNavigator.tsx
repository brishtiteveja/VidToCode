import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HomeScreen } from '../screens/HomeScreen';
import { QuestionBankScreen } from '../screens/QuestionBankScreen';
import { ExamScreen } from '../screens/ExamScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { ProgressScreen } from '../screens/ProgressScreen';
import { LeaderboardDetailScreen } from '../screens/LeaderboardDetailScreen';
import { ExamDetailScreen } from '../screens/ExamDetailScreen';
import { ProfileSettingsScreen } from '../screens/ProfileSettingsScreen';
import { ChorchaAIScreen } from '../screens/ChorchaAIScreen';

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function getTabIcon(
  routeName: string,
  focused: boolean
): TabIconName {
  switch (routeName) {
    case 'Home':
      return focused ? 'home' : 'home-outline';
    case 'QuestionBank':
      return focused ? 'file-tray' : 'file-tray-outline';
    case 'Exam':
      return focused ? 'create' : 'create-outline';
    case 'History':
      return focused ? 'bookmark' : 'bookmark-outline';
    case 'Progress':
      return focused ? 'refresh' : 'refresh-outline';
    default:
      return 'ellipse-outline';
  }
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getTabIcon(route.name, focused);
          if (route.name === 'Exam' && focused) {
            return (
              <View style={styles.centerTabActive}>
                <Ionicons name={iconName} size={size} color={color} />
              </View>
            );
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1B7A4A',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'হোম' }}
      />
      <Tab.Screen
        name="QuestionBank"
        component={QuestionBankScreen}
        options={{ tabBarLabel: 'প্রশ্নব্যাংক' }}
      />
      <Tab.Screen
        name="Exam"
        component={ExamScreen}
        options={{ tabBarLabel: 'পরীক্ষা' }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ tabBarLabel: 'হিস্ট্রি' }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ tabBarLabel: 'প্রোগ্রেস' }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen
        name="LeaderboardDetail"
        component={LeaderboardDetailScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="ExamDetail"
        component={ExamDetailScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="ChorchaAI"
        component={ChorchaAIScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    height: 64,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  centerTabActive: {
    backgroundColor: '#E8F5EE',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
