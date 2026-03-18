import { useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const initialMessages = [
  {
    id: '1',
    sender: 'them',
    type: 'text',
    content: 'Yo! You gotta hear this track 🔥',
    time: '10:02 AM',
  },
  {
    id: '2',
    sender: 'them',
    type: 'song',
    song: {
      title: 'Kishash',
      artist: 'Lil Maina',
      cover: 'https://i.scdn.co/image/ab67616d0000b2731a89d70d909332525d696148',
      platform: 'Boomplay',
    },
    caption: 'This beat is insane 🤯',
    time: '10:03 AM',
  },
  {
    id: '3',
    sender: 'me',
    type: 'text',
    content: 'Wait, let me reply with a vibe...',
    time: '10:05 AM',
  },
  {
    id: '4',
    sender: 'me',
    type: 'song',
    song: {
      title: 'Angela',
      artist: 'Boutross',
      cover: 'https://i.scdn.co/image/ab67616d0000b273e0b64c892592ea208c22a0f3',
      platform: 'YouTube Music',
    },
    caption: 'This one hits harder though 🚀',
    time: '10:06 AM',
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: 'me',
      type: 'text',
      content: inputText,
      time: 'Just now',
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const sendMockSong = () => {
    const newSongMsg = {
      id: Date.now().toString(),
      sender: 'me',
      type: 'song',
      song: {
        title: 'Tea',
        artist: 'Bien',
        cover: 'https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533',
        platform: 'Spotify',
      },
      caption: 'Morning vibes ☕',
      time: 'Just now',
    };
    setMessages([...messages, newSongMsg]);
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

  const renderMessage = ({ item }: any) => {
    const isMe = item.sender === 'me';
    
    return (
      <View style={[styles.messageRow, isMe ? styles.myMessageRow : styles.theirMessageRow]}>
        {!isMe && <Image source={{ uri: 'https://i.pravatar.cc/150?u=quintus' }} style={styles.avatar} />}
        
        <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
          {item.type === 'song' ? (
            <View style={styles.songCard}>
              <Image source={{ uri: item.song.cover }} style={styles.songCover} />
              <View style={styles.songInfo}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.songTitle}>{item.song.title}</Text>
                  <Text style={styles.songArtist}>{item.song.artist}</Text>
                  <Text style={[styles.platformText, { color: getPlatformInfo(item.song.platform).color }]}>
                    {getPlatformInfo(item.song.platform).icon} {item.song.platform}
                  </Text>
                </View>
                <TouchableOpacity style={styles.playButton}>
                  <Text style={styles.playIcon}>▶️</Text>
                </TouchableOpacity>
              </View>
              {item.caption && <Text style={styles.caption}>{item.caption}</Text>}
            </View>
          ) : (
            <Text style={styles.messageText}>{item.content}</Text>
          )}
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quintus (Vibing to Burna Boy)</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.listContent}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={90}>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.musicButton} onPress={sendMockSong}>
            <Text style={styles.musicIcon}>🎵</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type or send a song..."
            placeholderTextColor="#666"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#1a1a1a', alignItems: 'center', paddingTop: 50, backgroundColor: '#050505' },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  listContent: { padding: 15 },
  
  messageRow: { flexDirection: 'row', marginBottom: 15, alignItems: 'flex-end' },
  myMessageRow: { justifyContent: 'flex-end' },
  theirMessageRow: { justifyContent: 'flex-start' },
  
  avatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  
  bubble: { maxWidth: '75%', padding: 12, borderRadius: 16 },
  myBubble: { backgroundColor: '#1DB954', borderBottomRightRadius: 2 },
  theirBubble: { backgroundColor: '#1E1E1E', borderBottomLeftRadius: 2 },
  
  messageText: { color: '#fff', fontSize: 16 },
  time: { color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 5, alignSelf: 'flex-end' },
  
  songCard: { width: 200 },
  songCover: { width: '100%', height: 120, borderRadius: 8, marginBottom: 8 },
  songInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  songTitle: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  songArtist: { color: '#eee', fontSize: 12 },
  platformText: { fontSize: 10, fontWeight: 'bold', marginTop: 2 },
  playButton: { backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', marginLeft: 5 },
  playIcon: { fontSize: 12, color: '#fff' },
  caption: { color: '#fff', fontStyle: 'italic', fontSize: 14, marginTop: 5 },

  inputContainer: { flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#050505', borderTopWidth: 1, borderTopColor: '#1a1a1a' },
  musicButton: { padding: 10, marginRight: 10 },
  musicIcon: { fontSize: 24 },
  input: { flex: 1, backgroundColor: '#1E1E1E', color: '#fff', borderRadius: 25, paddingHorizontal: 20, paddingVertical: 12, marginRight: 10, fontSize: 16 },
  sendButton: { padding: 10 },
  sendText: { color: '#1DB954', fontSize: 20, fontWeight: 'bold' },
});