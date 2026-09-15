import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function SermonPlayer({ source, title }: { source: string; title: string }) {
  const audio = useRef<HTMLAudioElement | null>(null); const [playing, setPlaying] = useState(false); const [failed, setFailed] = useState(false);
  const toggle = () => { const el = audio.current; if (!el) return; if (el.paused) el.play().then(() => setPlaying(true)).catch(() => setFailed(true)); else { el.pause(); setPlaying(false); } };
  return <View><audio ref={audio} src={source} preload="none" onEnded={() => setPlaying(false)} onError={() => setFailed(true)} /><Text style={{ color: '#d7e4e9', marginBottom: 10 }}>{title}</Text><TouchableOpacity onPress={toggle} style={{ backgroundColor: '#7BAE7F', padding: 13, borderRadius: 22, alignSelf: 'flex-start', flexDirection: 'row', gap: 8 }}><Ionicons name={playing ? 'pause' : 'play'} size={18} color="#10263D" /><Text style={{ fontWeight: '800', color: '#10263D' }}>{playing ? 'Pause sermon' : 'Play sermon'}</Text></TouchableOpacity>{failed ? <Text style={{ color: '#f7c8c8', marginTop: 10 }}>Unable to load this sermon. Please try again.</Text> : null}</View>;
}
