import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { FavoritesProvider } from './context/FavoritesContext';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';


export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Slot />
    </FavoritesProvider>
  );
}