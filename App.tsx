import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const navy = '#10263D';
const cream = '#F7F3EA';
const green = '#7BAE7F';
const muted = '#66727D';

const quickLinks = [
  { icon: 'book-outline', label: 'Scripture' },
  { icon: 'headset-outline', label: 'Sermons' },
  { icon: 'heart-outline', label: 'Prayer' },
  { icon: 'calendar-outline', label: 'Events' },
];

export default function App() {
  const [active, setActive] = useState('Home');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>CALVARY WATERFORD</Text>
            <Text style={styles.greeting}>Good morning</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color={navy} />
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>TODAY'S THOUGHT</Text>
          <Text style={styles.heroTitle}>Be still, and know that I am God.</Text>
          <Text style={styles.heroRef}>Psalm 46:10</Text>
          <TouchableOpacity style={styles.heroButton}>
            <Ionicons name="play" size={14} color={navy} />
            <Text style={styles.heroButtonText}>Listen</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Grow in faith</Text>
          <Text style={styles.sectionLink}>See all</Text>
        </View>
        <View style={styles.quickGrid}>
          {quickLinks.map((item) => (
            <TouchableOpacity key={item.label} style={styles.quickCard}>
              <Ionicons name={item.icon as any} size={25} color={green} />
              <Text style={styles.quickLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest teaching</Text>
          <Text style={styles.sectionLink}>All sermons</Text>
        </View>
        <TouchableOpacity style={styles.sermonCard}>
          <View style={styles.sermonArtwork}>
            <Ionicons name="headset" size={27} color="white" />
          </View>
          <View style={styles.sermonCopy}>
            <Text style={styles.sermonTag}>SUNDAY MORNING</Text>
            <Text style={styles.sermonTitle}>Latest message from Calvary Waterford</Text>
            <Text style={styles.sermonMeta}>Listen to the latest teaching</Text>
          </View>
          <Ionicons name="play-circle" size={38} color={navy} />
        </TouchableOpacity>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>This week</Text>
          <Text style={styles.sectionLink}>Calendar</Text>
        </View>
        <View style={styles.eventCard}>
          <Event day="MON" time="6:00 PM" title="Bible Study" detail="Church Building" />
          <Event day="TUE" time="6:00 AM" title="Prayer Meeting" detail="Meadowbank" />
          <Event day="WED" time="7:00 PM" title="Home Groups" detail="Message for details" />
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.tabBar}>
        {[
          ['Home', 'home-outline'],
          ['Listen', 'headset-outline'],
          ['Events', 'calendar-outline'],
          ['More', 'menu-outline'],
        ].map(([label, icon]) => {
          const selected = active === label;
          return (
            <TouchableOpacity key={label} style={styles.tab} onPress={() => setActive(label)}>
              <Ionicons name={selected ? (icon.replace('-outline', '') as any) : (icon as any)} size={22} color={selected ? green : muted} />
              <Text style={[styles.tabLabel, selected && styles.tabLabelActive]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

function Event({ day, time, title, detail }: { day: string; time: string; title: string; detail: string }) {
  return (
    <View style={styles.eventRow}>
      <View style={styles.dateBox}><Text style={styles.dateDay}>{day}</Text><Text style={styles.dateTime}>{time}</Text></View>
      <View style={styles.eventCopy}><Text style={styles.eventTitle}>{title}</Text><Text style={styles.eventDetail}>{detail}</Text></View>
      <Ionicons name="chevron-forward" size={19} color={muted} />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cream },
  content: { padding: 24, paddingBottom: 110 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 26 },
  eyebrow: { fontSize: 11, fontWeight: '800', letterSpacing: 2, color: green, marginBottom: 7 },
  greeting: { fontSize: 29, fontWeight: '700', color: navy },
  iconButton: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  hero: { backgroundColor: navy, borderRadius: 24, padding: 27, marginBottom: 30 },
  heroEyebrow: { color: '#B8C8D3', fontSize: 10, fontWeight: '800', letterSpacing: 1.8, marginBottom: 17 },
  heroTitle: { color: '#FFFFFF', fontSize: 27, lineHeight: 35, fontWeight: '600', maxWidth: 310 },
  heroRef: { color: '#B8C8D3', fontSize: 13, marginTop: 14 },
  heroButton: { alignSelf: 'flex-start', marginTop: 22, paddingHorizontal: 17, paddingVertical: 11, borderRadius: 20, backgroundColor: green, flexDirection: 'row', gap: 7, alignItems: 'center' },
  heroButtonText: { color: navy, fontSize: 13, fontWeight: '800' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 13, marginTop: 3 },
  sectionTitle: { color: navy, fontSize: 19, fontWeight: '750' },
  sectionLink: { color: green, fontSize: 12, fontWeight: '800' },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 11, marginBottom: 28 },
  quickCard: { width: '48%', minHeight: 105, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 17, justifyContent: 'space-between' },
  quickLabel: { color: navy, fontSize: 14, fontWeight: '700' },
  sermonCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 28 },
  sermonArtwork: { width: 72, height: 72, borderRadius: 14, backgroundColor: '#27435B', alignItems: 'center', justifyContent: 'center' },
  sermonCopy: { flex: 1 },
  sermonTag: { fontSize: 9, letterSpacing: 1.2, fontWeight: '800', color: green, marginBottom: 5 },
  sermonTitle: { color: navy, fontSize: 14, fontWeight: '750', lineHeight: 19 },
  sermonMeta: { color: muted, fontSize: 11, marginTop: 4 },
  eventCard: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 16 },
  eventRow: { minHeight: 77, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E9E6DF', gap: 13 },
  dateBox: { width: 62 },
  dateDay: { color: green, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
  dateTime: { color: muted, fontSize: 10, marginTop: 4 },
  eventCopy: { flex: 1 },
  eventTitle: { color: navy, fontSize: 14, fontWeight: '750' },
  eventDetail: { color: muted, fontSize: 11, marginTop: 4 },
  spacer: { height: 20 },
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 82, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E8E5DE', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 11 },
  tab: { alignItems: 'center', width: 75 },
  tabLabel: { color: muted, fontSize: 10, fontWeight: '700', marginTop: 5 },
  tabLabelActive: { color: green },
});
