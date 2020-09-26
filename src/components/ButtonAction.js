import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ButtonAction({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress(item);
      }}
    >
      <Text style={styles.textButton}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#640D14',
    padding: 10,
    width: 150,
    marginBottom: 10,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
