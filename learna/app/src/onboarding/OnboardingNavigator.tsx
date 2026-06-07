import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "./WelcomeScreen";
import FeaturesScreen from "./FeaturesScreen";
import ChatOnboardingScreen from "./ChatOnboardingScreen";
import PersonalizingScreen from "./PersonalizingScreen";

export type OnboardingParamList = {
  Welcome: undefined;
  Features: undefined;
  Chat: undefined;
  Personalizing: undefined;
};

const Stack = createNativeStackNavigator<OnboardingParamList>();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Features" component={FeaturesScreen} />
      <Stack.Screen name="Chat" component={ChatOnboardingScreen} />
      <Stack.Screen name="Personalizing" component={PersonalizingScreen} options={{ gestureEnabled: false }} />
    </Stack.Navigator>
  );
}
