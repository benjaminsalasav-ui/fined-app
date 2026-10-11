import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { AppProvider } from './src/context/AppContext';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import LegalScreen from './src/screens/LegalScreen';
import OnboardingQuizScreen from './src/screens/OnboardingQuizScreen';
import HomeScreen from './src/screens/HomeScreen';
import ModuleDetailScreen from './src/screens/ModuleDetailScreen';
import QuizScreen from './src/screens/QuizScreen';
import SimulatorScreen from './src/screens/SimulatorScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import AccountScreen from './src/screens/AccountScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AccountStackNav = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="Simulator" component={SimulatorScreen} />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <AccountStackNav.Navigator screenOptions={{ headerShown: false }}>
      <AccountStackNav.Screen name="AccountHome" component={AccountScreen} />
      <AccountStackNav.Screen name="Privacy" component={LegalScreen} initialParams={{ type: 'privacy' }} />
      <AccountStackNav.Screen name="Terms" component={LegalScreen} initialParams={{ type: 'terms' }} />
    </AccountStackNav.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1a237e',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#E0E0E0',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ focused }) => {
          const icons = { Inicio: '🏠', Simulador: '🎮', Logros: '🏆', Cuenta: '👤' };
          return <Text style={{ fontSize: 22 }}>{icons[route.name]}</Text>;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStack} />
      <Tab.Screen name="Simulador" component={SimulatorScreen} />
      <Tab.Screen name="Logros" component={AchievementsScreen} />
      <Tab.Screen name="Cuenta" component={AccountStack} />
    </Tab.Navigator>
  );
}

function AuthFlow() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="Privacy" component={LegalScreen} initialParams={{ type: 'privacy' }} />
      <AuthStack.Screen name="Terms" component={LegalScreen} initialParams={{ type: 'terms' }} />
    </AuthStack.Navigator>
  );
}

// Decide qué mostrar según el estado de la sesión.
function RootNavigator() {
  const { user, profile, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a237e' }}>
        <Text style={{ fontSize: 56 }}>💰</Text>
        <ActivityIndicator color="#fff" style={{ marginTop: 16 }} />
      </View>
    );
  }

  if (!user) return <AuthFlow />;

  if (!profile?.onboardingDone) return <OnboardingQuizScreen />;

  return (
    <AppProvider>
      <MainTabs />
    </AppProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
