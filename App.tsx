import React, { useCallback, useEffect, useState } from "react";
import "react-native-gesture-handler";
import { View } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { Nunito_400Regular, Nunito_700Bold, Nunito_500Medium } from "@expo-google-fonts/nunito";
import theme from "./src/global/styles/theme";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import Main from "./src/screens/Main";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Nunito_400Regular,
          Nunito_700Bold,
          Nunito_500Medium
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </View>
  );
}

