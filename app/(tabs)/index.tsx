import { Image, StyleSheet, Platform, TouchableOpacity, Text, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
        />
    }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to the Health Device App!</ThemedText>
        <HelloWave />
      </ThemedView>
      <View style={{
        width: "100%",
        height: "100%",
        borderColor: "black",
        borderWidth: 2,
      }}>
        <TouchableOpacity onPress={() => console.log("Hallo!")} style={styles.normalButton}>
          <Text>Hallo</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  normalButton: {
    width: "20%",
    height: "10%",
    backgroundColor: "blue"
    }
});
