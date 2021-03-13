import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './state/store';
import LanguageDirectionProvider from './state/languageDirectionProvider';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    Notifications.requestPermissionsAsync().then(() => {})
  })

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <LanguageDirectionProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </LanguageDirectionProvider>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
