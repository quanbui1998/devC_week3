import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function OptionChoosed({ namePlayer, option }) {
  return (
    <View style={styles.container}>
      <Text style={styles.playerLabel}>{namePlayer}</Text>
      <Image
        source={{ uri: option.uri }}
        style={styles.optionImage}
        resizeMode={'cover'}
      ></Image>
      <Text style={styles.optionLabel}>{option.label || ' '}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
  },
  playerLabel: {
    fontSize: 20,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  optionImage: {
    width: '100%',
    height: 150,
    paddingVertical: 10,
  },
  optionLabel: {
    fontSize: 24,
    color: '#250902',
  },
});
