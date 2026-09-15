import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

export function SermonPlayer({ source, title }: { source: string; title: string }) {
  const player = useAudioPlayer(source); const status = useAudioPlayerStatus(player);
  useEffect(() => { void setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'duckOthers', allowsRecording: false, shouldPlayInBackground: false, shouldRouteThroughEarpiece: false }); }, []);
  return <View><Text style={{ color: '#d7e4e9', marginBottom: 10 }}>{title}</Text><TouchableOpacity onPress={() => status.playing ? player.pause() : player.play()} style={{ backgroundColor: '#7BAE7F', padding: 13, borderRadius: 22, alignSelf: 'flex-start', flexDirection: 'row', gap: 8 }}><Ionicons name={status.playing ? 'pause' : 'play'} size={18} color="#10263D" /><Text style={{ fontWeight: '800', color: '#10263D' }}>{status.playing ? 'Pause sermon' : 'Play sermon'}</Text></TouchableOpacity>{status.error ? <Text style={{ color: '#f7c8c8', marginTop: 10 }}>Unable to load this sermon. Please try again.</Text> : null}</View>;
}
