import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock Data for the Vibe Feed
const feedData = [
  {
    id: '1',
    user: { name: 'Quintus', avatar: 'https://i.pravatar.cc/150?u=quintus', badge: '👑 Afrobeats King' },
    action: 'started a session',
    song: { title: 'Last Last', artist: 'Burna Boy', cover: 'https://i.scdn.co/image/ab67616d0000b27349d694203245f241a1bcaa72', platform: 'Spotify' },
    mood: '🔥 Hype',
    time: 'LIVE 🔴',
    isLive: true,
    listeners: 14,
    likes: 24,
    comments: 5,
  },
  {
    id: '2',
    user: { name: 'Wanjiku', avatar: 'https://i.pravatar.cc/150?u=wanjiku', badge: '😭 Sad Songs Master' },
    action: 'is feeling',
    song: { title: 'Suicidal', artist: 'Sauti Sol', cover: 'https://i.scdn.co/image/ab67616d0000b273607926d4ca9b9d319d9b62bb', platform: 'Apple Music' },
    mood: '💔 In My Feelings',
    time: '15m ago',
    likes: 12,
    comments: 2,
  },
  {
    id: '3',
    user: { name: 'Brian (TUK)', avatar: 'https://i.pravatar.cc/150?u=brian', badge: '🎓 Campus DJ' },
    action: 'just played',
    song: { title: 'Kishash', artist: 'Lil Maina', cover: 'https://i.scdn.co/image/ab67616d0000b2731a89d70d909332525d696148', platform: 'Boomplay' },
    mood: '🎉 Party',
    time: '1h ago',
    likes: 45,
    comments: 10,
  },
  {
    id: '4',
    user: { name: 'Boutross', avatar: 'https://i.pravatar.cc/150?u=boutross', badge: '🎤 Verified Artist' },
    action: 'dropped a new banger',
    song: { title: 'Angela', artist: 'Boutross', cover: 'https://i.scdn.co/image/ab67616d0000b273e0b64c892592ea208c22a0f3', platform: 'YouTube Music' },
    mood: '🚀 Exclusive Drop',
    time: 'Just Now',
    isArtistDrop: true,
    likes: 1200,
    comments: 340,
  },
];

const leaderboardData = [
  { id: '1', name: 'Brian', score: '2,400m', avatar: 'https://i.pravatar.cc/150?u=brian', rank: '🥇' },
  { id: '2', name: 'Stacy', score: '2,100m', avatar: 'https://i.pravatar.cc/150?u=stacy', rank: '🥈' },
  { id: '3', name: 'You', score: '1,850m', avatar: 'https://i.pravatar.cc/150?u=me', rank: '🥉' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [lowDataMode, setLowDataMode] = useState(false);
  
  // Mock Auth State: Set to false to simulate a guest user
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return false;
    }
    return true;
  };

  const toggleLike = (id: string) => {
    if (!checkAuth()) return;

    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter((postId) => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const getPlatformInfo = (platform?: string) => {
    switch(platform) {
      case 'Spotify': return { color: '#1DB954', icon: '🟢' };
      case 'Apple Music': return { color: '#FA243C', icon: '🍎' };
      case 'Boomplay': return { color: '#00A3FF', icon: '🔵' };
      case 'YouTube Music': return { color: '#FF0000', icon: '▶️' };
      default: return { color: '#888', icon: '🎵' };
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={[styles.feedItem, item.isLive && styles.liveFeedItem, item.isArtistDrop && styles.artistFeedItem]}>
      {/* User Header */}
      <View style={styles.userHeader}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.username}>
            {item.user.name}
            {item.user.badge && <Text style={styles.badge}> {item.user.badge}</Text>}
          </Text>
          <Text style={styles.actionText}>{item.action}</Text>
          <Text style={[styles.time, item.isLive && styles.liveTime]}>{item.time}</Text>
          {lowDataMode && !item.isLive && <Text style={styles.cachedText}>💾 Cached</Text>}
        </View>
        {item.isLive && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveBadgeText}>🎧 {item.listeners}</Text>
          </View>
        )}
        {item.isArtistDrop && (
          <View style={styles.exclusiveBadge}>
            <Text style={styles.exclusiveText}>✨ NEW DROP</Text>
          </View>
        )}
      </View>

      {/* Song Card */}
      <View style={styles.songCard}>
        <Image source={{ uri: item.song.cover }} style={[styles.songCover, lowDataMode && styles.lowDataImage]} />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{item.song.title}</Text>
          <Text style={styles.songArtist}>{item.song.artist}</Text>
          <Text style={[styles.platformText, { color: getPlatformInfo(item.song.platform).color }]}>
            {getPlatformInfo(item.song.platform).icon} {item.song.platform}
          </Text>
        </View>
        <View style={styles.moodTag}>
          <Text style={styles.moodText}>{item.mood}</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.reactionContainer}>
          <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.reactionButton}>
            <Text style={styles.reactionIcon}>{likedPosts.includes(item.id) ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reactionButton}><Text style={styles.reactionIcon}>🔥</Text></TouchableOpacity>
          <TouchableOpacity style={styles.reactionButton}><Text style={styles.reactionIcon}>😭</Text></TouchableOpacity>
          <TouchableOpacity style={styles.reactionButton}><Text style={styles.reactionIcon}>🎧</Text></TouchableOpacity>
        </View>

        {item.isLive ? (
          <TouchableOpacity style={styles.joinSessionBtn}>
            <Text style={styles.joinSessionText}>Join Session</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.commentButton}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionCount}>{item.comments}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.vibeReportCard}>
      {/* Live Zones Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>⚡ Live Zones (Groups)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.liveScroll}>
          <TouchableOpacity style={styles.liveCard}>
            <View style={styles.liveCardHeader}>
              <Text style={styles.liveCardTitle}>TUK Chill 🌿</Text>
              <Text style={styles.liveCardCount}>🔴 42</Text>
            </View>
            <View style={styles.liveAvatars}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?u=1' }} style={styles.miniAvatar} />
              <Image source={{ uri: 'https://i.pravatar.cc/150?u=2' }} style={[styles.miniAvatar, { marginLeft: -10 }]} />
              <Image source={{ uri: 'https://i.pravatar.cc/150?u=3' }} style={[styles.miniAvatar, { marginLeft: -10 }]} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.liveCard, { backgroundColor: '#2A1B3D' }]}>
            <View style={styles.liveCardHeader}>
              <Text style={styles.liveCardTitle}>Afro Beats 🥁</Text>
              <Text style={styles.liveCardCount}>🔴 12</Text>
            </View>
            <View style={styles.liveAvatars}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?u=4' }} style={styles.miniAvatar} />
              <Image source={{ uri: 'https://i.pravatar.cc/150?u=5' }} style={[styles.miniAvatar, { marginLeft: -10 }]} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Rising Stars Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>🌟 Rising Stars (Kenya)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.artistScroll}>
          {['Buruklyn Boyz', 'Maandy', 'Wakadinali'].map((artist, index) => (
            <TouchableOpacity key={index} style={styles.artistCard}>
              <Image source={{ uri: `https://i.pravatar.cc/150?u=${artist}` }} style={styles.artistImage} />
              <Text style={styles.artistName}>{artist}</Text>
              <View style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join Fan Club</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Leaderboard Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>🏆 Top Listeners (TUK)</Text>
        {leaderboardData.map((item) => (
          <View key={item.id} style={styles.leaderboardItem}>
            <Text style={styles.rank}>{item.rank}</Text>
            <Image source={{ uri: item.avatar }} style={styles.leaderboardAvatar} />
            <Text style={styles.leaderboardName}>{item.name}</Text>
            <Text style={styles.leaderboardScore}>{item.score}</Text>
          </View>
        ))}
      </View>

      {/* AI Vibe Report */}
      <View style={styles.aiReportContainer}>
        <View style={styles.reportHeader}>
          <Text style={styles.vibeTitle}>📈 Weekly Wrapped</Text>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.funnyStat}>
          <Text style={styles.funnyStatText}>“You listened to heartbreak songs at 2am 😭”</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.reportHeader}>
          <Text style={styles.vibeTitle}>🤖 AI Vibe ID</Text>
          <View style={styles.weekBadge}>
            <Text style={styles.weekBadgeText}>Your Profile</Text>
          </View>
        </View>

        <View style={styles.personalityItem}>
          <Text style={styles.personalityEmoji}>🌙</Text>
          <View>
            <Text style={styles.personalityLabel}>Night Listener</Text>
            <Text style={styles.personalitySub}>You vibe mostly 10PM - 2AM</Text>
          </View>
        </View>

        <View style={styles.personalityItem}>
          <Text style={styles.personalityEmoji}>💥</Text>
          <View>
            <Text style={styles.personalityLabel}>Hype Beast</Text>
            <Text style={styles.personalitySub}>You love high energy beats</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>My Badges 🏅</Text>
        <View style={styles.badgesRow}>
          <View style={styles.badgeItem}><Text style={styles.badgeEmoji}>👑</Text><Text style={styles.badgeText}>Afrobeats King</Text></View>
          <View style={styles.badgeItem}><Text style={styles.badgeEmoji}>🔥</Text><Text style={styles.badgeText}>Streak Master</Text></View>
          <View style={styles.badgeItem}><Text style={styles.badgeEmoji}>🇰🇪</Text><Text style={styles.badgeText}>Local Hero</Text></View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Genre Breakdown</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Gengetone 🇰🇪</Text>
          <Text style={styles.statValue}>65%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '65%' }]} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>VibeSync 🇰🇪</Text>
          <Text style={styles.streak}>🔥 12 Day Streak</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setLowDataMode(!lowDataMode)} style={[styles.dataSaverBtn, lowDataMode && styles.dataSaverActive]}>
            <Text style={styles.dataSaverText}>{lowDataMode ? '⚡ Saver On' : '📶 High Res'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={checkAuth}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?u=me' }} 
              style={styles.headerAvatar} 
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/post')}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', paddingHorizontal: 15, paddingTop: 40 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  streak: { color: '#FFD700', fontSize: 14, fontWeight: 'bold', marginTop: 2 },
  dataSaverBtn: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, borderWidth: 1, borderColor: '#333' },
  dataSaverActive: { backgroundColor: '#1DB954', borderColor: '#1DB954' },
  dataSaverText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#1DB954' },
  
  vibeReportCard: { marginBottom: 20 },
  sectionContainer: { marginBottom: 25 },
  aiReportContainer: { backgroundColor: '#1C1C1E', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#333', marginBottom: 20 },

  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  vibeTitle: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  shareBtn: {
    backgroundColor: '#1DB954',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  shareBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  weekBadge: {
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  weekBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  funnyStat: {
    backgroundColor: 'rgba(29, 185, 84, 0.1)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  funnyStatText: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
  },
  personalityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 12,
  },
  personalityEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  personalityLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  personalitySub: {
    color: '#888',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 15,
  },
  sectionTitle: {
    color: '#aaa',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statValue: {
    color: '#1DB954',
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1DB954',
    borderRadius: 3,
  },

  // Live Section Styles
  liveScroll: { marginTop: 10, marginBottom: 5 },
  liveCard: {
    backgroundColor: '#1DB954',
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    width: 140,
    height: 100,
    justifyContent: 'space-between',
  },
  liveCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  liveCardTitle: { color: '#fff', fontWeight: 'bold', fontSize: 14, flex: 1, marginRight: 5 },
  liveCardCount: { color: '#fff', fontSize: 10, fontWeight: 'bold', backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  liveAvatars: { flexDirection: 'row' },
  miniAvatar: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: '#fff' },

  // Artist Section Styles
  artistScroll: { marginTop: 10 },
  artistCard: { marginRight: 15, alignItems: 'center', width: 100 },
  artistImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 8, borderWidth: 2, borderColor: '#1DB954' },
  artistName: { color: '#fff', fontWeight: 'bold', fontSize: 12, textAlign: 'center', marginBottom: 4 },
  joinButton: { backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  joinButtonText: { color: '#1DB954', fontSize: 10, fontWeight: 'bold' },

  // Artist Drop Styles
  artistFeedItem: { borderColor: '#FFD700', borderWidth: 1, backgroundColor: '#1a1a00' },
  exclusiveBadge: { backgroundColor: '#FFD700', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  exclusiveText: { color: '#000', fontWeight: 'bold', fontSize: 10 },

  // Leaderboard Styles
  leaderboardItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, backgroundColor: '#121212', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#222' },
  rank: { fontSize: 18, marginRight: 10 },
  leaderboardAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  leaderboardName: { color: '#fff', fontWeight: 'bold', flex: 1 },
  leaderboardScore: { color: '#1DB954', fontWeight: 'bold' },

  // Badges Styles
  badgesRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  badgeItem: { alignItems: 'center', backgroundColor: '#1E1E1E', padding: 10, borderRadius: 10, width: '30%' },
  badgeEmoji: { fontSize: 20 },
  badgeText: { color: '#ccc', fontSize: 10, marginTop: 5, textAlign: 'center' },

  feedItem: { marginBottom: 25, backgroundColor: '#121212', padding: 15, borderRadius: 16 },
  liveFeedItem: { borderWidth: 1, borderColor: '#1DB954', borderRadius: 16, padding: 10, marginHorizontal: -10, backgroundColor: '#0a0a0a' },
  userHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  username: { color: '#fff', fontWeight: 'bold', fontSize: 16, flexDirection: 'row' },
  badge: { fontSize: 12, color: '#FFD700' },
  actionText: { color: '#aaa', fontSize: 14 },
  time: { color: '#666', fontSize: 12 },
  cachedText: { color: '#1DB954', fontSize: 10, marginTop: 2 },
  liveTime: { color: '#FF4444', fontWeight: 'bold' },
  liveBadge: { backgroundColor: '#1DB954', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  liveBadgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  songCard: { 
    flexDirection: 'row', 
    backgroundColor: '#1E1E1E', 
    borderRadius: 12, 
    padding: 10, 
    alignItems: 'center',
    marginBottom: 10 
  },
  lowDataImage: { opacity: 0.5 },
  songCover: { width: 60, height: 60, borderRadius: 8 },
  songInfo: { flex: 1, marginLeft: 12 },
  songTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  songArtist: { color: '#aaa', fontSize: 14 },
  platformText: { fontSize: 10, fontWeight: 'bold', marginTop: 4 },
  moodTag: { backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  moodText: { color: '#fff', fontSize: 12 },

  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  reactionContainer: { flexDirection: 'row', gap: 15 },
  reactionButton: { padding: 5 },
  actionIcon: { fontSize: 20 },
  commentButton: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  actionCount: { color: '#aaa', fontSize: 14 },
  
  joinSessionBtn: { backgroundColor: '#1DB954', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  joinSessionText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1DB954',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabIcon: { color: '#fff', fontSize: 30, fontWeight: 'bold', marginTop: -2 },
});