import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?u=me' }} style={styles.avatar} />
          <Text style={styles.username}>Quintus</Text>
          <Text style={styles.handle}>@quintus_vibes</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>142</Text>
              <Text style={styles.statLabel}>Vibes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1.2k</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>450</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Vibe Stats 📊</Text>
          <View style={styles.card}>
            <Text style={styles.vibeText}>You are a <Text style={styles.highlight}>Night Listener 🌙</Text></Text>
            <Text style={styles.subText}>Most played: <Text style={styles.highlight}>Gengetone</Text></Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Artists 🎧</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.artistScroll}>
            {['Burna Boy', 'Sauti Sol', 'Drake', 'Wakadinali'].map((artist, i) => (
              <View key={i} style={styles.artistCard}>
                <Image source={{ uri: `https://i.pravatar.cc/150?u=${artist}` }} style={styles.artistImg} />
                <Text style={styles.artistName}>{artist}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  scrollContent: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#1DB954', marginBottom: 10 },
  username: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  handle: { color: '#888', fontSize: 14, marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 30 },
  statItem: { alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#666', fontSize: 12 },
  section: { marginBottom: 25 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  card: { backgroundColor: '#1E1E1E', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#333' },
  vibeText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  highlight: { color: '#1DB954' },
  subText: { color: '#aaa', fontSize: 14 },
  artistScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  artistCard: { marginRight: 15, alignItems: 'center' },
  artistImg: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  artistName: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});