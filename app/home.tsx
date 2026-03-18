import { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock Data for the Vibe Feed
const feedData = [
  {
    id: '1',
    user: {
      name: 'Quintus',
      avatar: 'https://i.pravatar.cc/150?u=quintus',
    },
    action: 'is vibing to',
    song: {
      title: 'Last Last',
      artist: 'Burna Boy',
      cover: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72',
    },
    mood: '🔥 Hype',
    time: '2m ago',
    likes: 24,
    comments: 5,
  },
  {
    id: '2',
    user: {
      name: 'Wanjiku',
      avatar: 'https://i.pravatar.cc/150?u=wanjiku',
    },
    action: 'is feeling',
    song: {
      title: 'Suicidal',
      artist: 'Sauti Sol',
      cover: 'https://i.scdn.co/image/ab67616d0000b273607926d4ca9b9d319d9b62bb',
    },
    mood: '💔 In My Feelings',
    time: '15m ago',
    likes: 12,
    comments: 2,
  },
  {
    id: '3',
    user: {
      name: 'Brian (TUK)',
      avatar: 'https://i.pravatar.cc/150?u=brian',
    },
    action: 'just played',
    song: {
      title: 'Kishash',
      artist: 'Lil Maina',
      cover: 'https://i.scdn.co/image/ab67616d0000b2731a89d70d909332525d696148',
    },
    mood: '🎉 Party',
    time: '1h ago',
    likes: 45,
    comments: 10,
  },
];

export default function Home() {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter((postId) => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.feedItem}>
      {/* User Header */}
      <View style={styles.userHeader}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.username}>
            {item.user.name} <Text style={styles.actionText}>{item.action}</Text>
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>

      {/* Song Card */}
      <View style={styles.songCard}>
        <Image source={{ uri: item.song.cover }} style={styles.songCover} />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{item.song.title}</Text>
          <Text style={styles.songArtist}>{item.song.artist}</Text>
        </View>
        <View style={styles.moodTag}>
          <Text style={styles.moodText}>{item.mood}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.actionButton}>
          <Text style={styles.actionIcon}>{likedPosts.includes(item.id) ? '❤️' : '🤍'}</Text>
          <Text style={styles.actionCount}>{item.likes + (likedPosts.includes(item.id) ? 1 : 0)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>🔥</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionCount}>{item.comments}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>VibeSync 🌍</Text>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150?u=me' }} 
          style={styles.headerAvatar} 
        />
      </View>
      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 15, paddingTop: 40 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#1DB954' },
  
  feedItem: { marginBottom: 25 },
  userHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  actionText: { fontWeight: 'normal', color: '#aaa' },
  time: { color: '#666', fontSize: 12 },

  songCard: { 
    flexDirection: 'row', 
    backgroundColor: '#1a1a1a', 
    borderRadius: 12, 
    padding: 10, 
    alignItems: 'center',
    marginBottom: 10 
  },
  songCover: { width: 60, height: 60, borderRadius: 8 },
  songInfo: { flex: 1, marginLeft: 12 },
  songTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  songArtist: { color: '#aaa', fontSize: 14 },
  moodTag: { backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  moodText: { color: '#fff', fontSize: 12 },

  actions: { flexDirection: 'row', gap: 20 },
  actionButton: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionIcon: { fontSize: 20 },
  actionCount: { color: '#aaa', fontSize: 14 },
});