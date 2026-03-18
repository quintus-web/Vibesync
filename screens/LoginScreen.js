import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VibeSync 🎧</Text>

      <TextInput 
        placeholder="Email"
        style={styles.input}
      />

      <TextInput 
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});