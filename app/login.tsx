import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // In a real app, you would validate credentials here.
    // For now, we simulate a successful login and close the modal.
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VibeSync 🎧</Text>
      <Text style={styles.subtitle}>Log in to join the vibe.</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});