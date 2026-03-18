import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const trendingData = {
  'TUK Campus': [
    { id: '1', title: 'Le Plane E Landile', artist: 'Major Lazer', plays: '🔥 Blasting in Hostels', cover: 'https://i.scdn.co/image/ab67616d0000b273caec072d2f95c2b01213376f', platform: 'Boomplay' },
    { id: '2', title: 'Kishash', artist: 'Lil Maina', plays: 'played 500 times today', cover: 'https://i.scdn.co/image/ab67616d0000b2731a89d70d909332525d696148', platform: 'Spotify' },
  ],
  'Gengetone': [
    { id: '1', title: 'Kaskie Vibaya', artist: 'Fathermoh', plays: '120k plays', cover: 'https://i.scdn.co/image/ab67616d0000b2735f3dde3a01754890e09a9b5c', platform: 'YouTube Music' },
    { id: '2', title: 'Wajackoyah', artist: 'Lil Maina', plays: '98k plays', cover: 'https://i.scdn.co/image/ab67616d0000b2731a89d70d909332525d696148', platform: 'Boomplay' },
  ],
  'Nairobi': [
    { id: '1', title: 'Angela', artist: 'Boutross', plays: 'Trending in Westlands', cover: 'https://i.scdn.co/image/ab67616d0000b273e0b64c892592ea208c22a0f3', platform: 'Apple Music' },
    { id: '2', title: 'Tea', artist: 'Bien', plays: 'Morning Vibe ☕', cover: 'https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533', platform: 'Spotify' },
  ]
};

const nearbyVibesData = [
  { id: '1', user: { name: 'Jamal', avatar: 'https://i.pravatar.cc/150?u=jamal' }, song: { title: 'Unavailable', artist: 'Davido' }, distance: '50m away' },
  { id: '2', user: { name: 'Aisha', avatar: 'https://i.pravatar.cc/150?u=aisha' }, song: { title: 'Terminator', artist: 'King Promise' }, distance: '120m away' },
];

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState<'TUK Campus' | 'Gengetone' | 'Nairobi'>('TUK Campus');

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Local Trending 🇰🇪</ThemedText>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {(['TUK Campus', 'Gengetone', 'Nairobi'] as const).map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* List */}
      <View style={{ flex: 1 }}>
        <FlatList
        data={trendingData[activeTab]}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}</Text>
            <Image source={{ uri: item.cover }} style={styles.cover} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.artist}>{item.artist}</Text>
              <Text style={styles.platform}>{item.platform}</Text>
            </View>
            <Text style={styles.plays}>{item.plays}</Text>
          </View>
        )}
        />

        {/* Real-Life Integration */}
        <View style={styles.nearbySection}>
          <Text style={styles.sectionTitle}>Vibes Near You 📍</Text>
          {nearbyVibesData.map((item) => (
            <View key={item.id} style={styles.nearbyItem}>
              <Image source={{ uri: item.user.avatar }} style={styles.nearbyAvatar} />
              <View style={styles.nearbyInfo}>
                <Text style={styles.nearbyUser}>{item.user.name} is listening to...</Text>
                <Text style={styles.nearbySong}>{item.song.title} by {item.song.artist}</Text>
              </View>
              <Text style={styles.nearbyDistance}>{item.distance}</Text>
            </View>
          ))}
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#050505' },
  header: { marginBottom: 20 },
  tabs: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#121212', borderRadius: 25, padding: 4, borderWidth: 1, borderColor: '#222' },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 20 },
  activeTab: { backgroundColor: '#1DB954' },
  tabText: { color: '#888', fontWeight: 'bold' },
  activeTabText: { color: '#fff' },
  
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1a1a1a' },
  rank: { color: '#fff', fontSize: 16, fontWeight: 'bold', width: 25, textAlign: 'center', marginRight: 10 },
  cover: { width: 50, height: 50, borderRadius: 6, marginRight: 15 },
  info: { flex: 1 },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  artist: { color: '#aaa', fontSize: 14, marginTop: 2 },
  platform: { color: '#666', fontSize: 10, marginTop: 2, textTransform: 'uppercase' },
  plays: { color: '#1DB954', fontSize: 12, fontWeight: 'bold' },

  nearbySection: { marginTop: 30 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  nearbyItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#121212', padding: 12, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#222' },
  nearbyAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  nearbyInfo: { flex: 1 },
  nearbyUser: { color: '#aaa', fontSize: 12 },
  nearbySong: { color: '#fff', fontWeight: 'bold', fontSize: 14, marginTop: 2 },
  nearbyDistance: { color: '#1DB954', fontSize: 12, fontWeight: 'bold' },
});
