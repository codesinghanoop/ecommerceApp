import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './state/store';
import LanguageDirectionProvider from './state/languageDirectionProvider';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

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
