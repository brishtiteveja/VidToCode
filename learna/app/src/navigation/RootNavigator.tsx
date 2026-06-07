import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, font } from "../theme";
import type { RootStackParamList, TabParamList } from "./types";

import HomeScreen from "../screens/HomeScreen";
import RolePlayScreen from "../screens/RolePlayScreen";
import ProgressScreen from "../screens/ProgressScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LessonScreen from "../screens/LessonScreen";
import PaywallScreen from "../screens/PaywallScreen";
import ScenarioDetailScreen from "../screens/ScenarioDetailScreen";
import OnboardingNavigator from "../onboarding/OnboardingNavigator";
import { useAppState } from "../state/AppState";

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedSoft,
        tabBarLabelStyle: { fontSize: 11, fontWeight: font.semibold },
        tabBarStyle: {
          height: 84,
          paddingTop: 8,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="RolePlay"
        component={RolePlayScreen}
        options={{
          tabBarLabel: "Role-Play",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="drama-masks" size={size + 2} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const { onboarded } = useAppState();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!onboarded ? (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      ) : (
        <>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Lesson" component={LessonScreen} options={{ animation: "slide_from_bottom" }} />
          <Stack.Screen
            name="Paywall"
            component={PaywallScreen}
            options={{ presentation: "modal", animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="ScenarioDetail" component={ScenarioDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
