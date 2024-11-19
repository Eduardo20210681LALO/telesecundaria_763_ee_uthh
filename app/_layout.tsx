import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { UserProvider } from './DrawerScreens/UsertContext';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const noThemeRoutes = [
    '/Login',
    '/Register',
    '/ActualizarDatosUsuario',
    '/VerificarDatosUsuario',
  ];
  const isNoThemeRoute = noThemeRoutes.includes(pathname);

  const Content = (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Login" />
        <Stack.Screen name="Register" />
        <Stack.Screen name="ActualizarDatosUsuario" />
        <Stack.Screen name="VerificarDatosUsuario" />
        <Stack.Screen name="DrawerScreens/DrawerNavigator" />
      </Stack>
    </View>
  );

  return (
    <UserProvider>
      {isNoThemeRoute ? ( 
        Content
      ) : (
        <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? DarkTheme.colors.background : DefaultTheme.colors.background }}>
          {Content}
        </View>
      )}
    </UserProvider>
  );
}