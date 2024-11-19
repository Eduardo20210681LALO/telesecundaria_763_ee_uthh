import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import tw from 'tailwind-react-native-classnames';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {

  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[tw`flex-1 bg-white`, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Text style={tw`text-black font-bold text-center text-2xl mb-6`}>Home</Text>

      {/* Botón para navegar a Login */}
      <TouchableOpacity onPress={() => router.push('/Login')} style={tw`bg-blue-500 p-4 m-4 rounded items-center`}>
        <Text style={tw`text-white text-lg`}>Ir a Login</Text>
      </TouchableOpacity>

      {/* Botón para navegar a Register */}
      <TouchableOpacity onPress={() => router.push('/Register')} style={tw`bg-green-500 p-4 m-4 rounded items-center`}>
        <Text style={tw`text-white text-lg`}>Ir a Register</Text>
      </TouchableOpacity>

     
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({});
