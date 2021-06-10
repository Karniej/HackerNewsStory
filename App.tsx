import React, { useState, useRef, useEffect } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { HomeScreen } from './screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { configureStore } from './store/store'

const store = configureStore()
type Props = {
  skipLoadingScreen: boolean
}

export default function App({ skipLoadingScreen }: Props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const [initialNavigationState, setInitialNavigationState] = useState()
  const containerRef = useRef()

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load our initial navigation state

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/SpaceMono-Regular.ttf'),
        })
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setLoadingComplete(true)
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  const theme = {
    roundness: 4,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      surface: '#F6F6EF',
      accent: '#FF6600',
    },
    fonts: {
      ...DefaultTheme.fonts,
    },
    animation: {
      scale: 1.0,
    },
  }

  if (!isLoadingComplete && !skipLoadingScreen) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <HomeScreen />
          </PaperProvider>
        </Provider>
      </SafeAreaProvider>
    )
  }
}
