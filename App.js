import * as React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { BottomNav } from './src/BottomNav';
import { NavigationContainer } from '@react-navigation/native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const Navigation = () => {
  return (
    <NavigationContainer >
      <BottomNav />
    </NavigationContainer>
  )
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
}