import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PostScreen() {
  const router = useRouter();
  const [mood, setMood] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Text style={styles.cancel}>Cancel</Text></TouchableOpacity>
        <Text style={styles.title}>New Vibe</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.postBtn}>
            <Text style={styles.postBtnText}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.songSelector}>
            <View style={styles.placeholderArt}>
                <Text style={styles.musicIcon}>🎵</Text>
            </View>
            <View style={styles.songTextContainer}>
                <Text style={styles.selectSongText}>Pick a song...</Text>
                <Text style={styles.selectSongSub}>Spotify / Apple Music</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
        </View>

        <Text style={styles.label}>How are you feeling?</Text>
        <View style={styles.moodGrid}>
            {['🔥 Hype', '😌 Chill', '💔 Emotional', '🎉 Party', '😴 Sleepy', '🏋️ Gym'].map(m => (
                <TouchableOpacity key={m} style={[styles.moodChip, mood === m && styles.activeMood]} onPress={() => setMood(m)}>
                    <Text style={[styles.moodText, mood === m && styles.activeMoodText]}>{m}</Text>
                </TouchableOpacity>
            ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  cancel: { color: '#fff', fontSize: 16 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  postBtn: { backgroundColor: '#1DB954', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20 },
  postBtnText: { color: '#fff', fontWeight: 'bold' },
  content: { padding: 20 },
  songSelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E1E', padding: 15, borderRadius: 16, marginBottom: 30 },
  placeholderArt: { width: 50, height: 50, backgroundColor: '#333', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  musicIcon: { fontSize: 24 },
  songTextContainer: { flex: 1 },
  selectSongText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  selectSongSub: { color: '#666', fontSize: 12 },
  chevron: { color: '#666', fontSize: 24 },
  label: { color: '#aaa', fontSize: 14, marginBottom: 15, textTransform: 'uppercase' },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  moodChip: { backgroundColor: '#1E1E1E', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, borderWidth: 1, borderColor: '#333' },
  activeMood: { backgroundColor: '#1DB954', borderColor: '#1DB954' },
  moodText: { color: '#fff', fontWeight: 'bold' },
  activeMoodText: { color: '#fff' },
});