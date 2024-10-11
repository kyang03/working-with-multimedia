import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);
  const [sound, setSound] = useState();

  // Function to pick image from photo library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  // Function to play audio
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/audio.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  // Clean up the sound when the component unmounts
  React.useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Media App</Text>

      <Button title="Pick an Image from Library" onPress={pickImage} />

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Button title="Play Audio" onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
});
