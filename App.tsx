import React, { useState } from 'react';
import { ImageBackground, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

type Tab = 'Home' | 'Listen' | 'Events' | 'More';

const navy = '#10263D';
const navyDeep = '#091B2D';
const cream = '#F6F1E7';
const green = '#7BAE7F';
const greenSoft = '#DCEBDD';
const muted = '#68747F';
const line = '#E5E0D7';

const heroImage = 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85';
const sermonImage = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85';

// Real public Calvary Waterford sermon audio for testing.
const testAudioUrl = 'https://d3ctxlq1ktw2nl.cloudfront.net/staging/2022-10-11/296459251-44100-2-c32fc9c7da663.m4a';

const sermons = [
  {
    tag: 'CALVARY WATERFORD · 16 OCT 2022',
    title: 'Galatians 2:15–21',
    meta: 'Danny Keating · 42 min',
    audioUrl: testAudioUrl,
  },
  {
    tag: 'CALVARY WATERFORD · 1 JAN 2023',
    title: 'Today — Hebrews 3:7–14',
    meta: 'Danny Keating · 46 min',
    audioUrl: null,
  },
  {
    tag: 'CALVARY WATERFORD · 4 SEP 2022',
    title: 'Galatians 1:1–5',
    meta: 'Danny Keating · 49 min',
    audioUrl: null,
  },
];

const events = [
  { day: 'MON', time: '6:00 PM', title: 'Bible Study', detail: 'Church Building' },
  { day: 'TUE', time: '6:00 AM', title: 'Prayer Meeting', detail: 'Meadowbank' },
  { day: 'WED', time: 'EVENING', title: 'Home Groups', detail: 'Message for details' },
  { day: 'SUN', time: '9:00 AM', title: 'Sunday Service', detail: '59/60 Lower Yellow Road' },
  { day: 'SUN', time: '11:00 AM', title: 'Sunday Service', detail: '59/60 Lower Yellow Road' },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <AppShell />
    </SafeAreaProvider>
  );
}

function AppShell() {
  const [active, setActive] = useState<Tab>('Home');
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        <View style={styles.screen}>
          {active === 'Home' && <HomeScreen onNavigate={setActive} />}
          {active === 'Listen' && <ListenScreen />}
          {active === 'Events' && <EventsScreen />}
          {active === 'More' && <MoreScreen />}
        </View>
        <TabBar active={active} onChange={setActive} bottomInset={insets.bottom} />
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>CALVARY WATERFORD</Text>
          <Text style={styles.greeting}>Good morning</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={22} color={navy} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ImageBackground source={{ uri: heroImage }} imageStyle={styles.heroImage} style={styles.heroPhoto}>
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroEyebrow}>A MOMENT TO BE STILL</Text>
          <Text style={styles.heroTitle}>Be still, and know that I am God.</Text>
          <Text style={styles.heroRef}>Psalm 46:10</Text>
          <TouchableOpacity style={styles.heroButton} onPress={() => onNavigate('Listen')}>
            <Ionicons name="play" size={14} color={navy} />
            <Text style={styles.heroButtonText}>Listen & reflect</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Grow in faith</Text>
          <Text style={styles.sectionSub}>Take a little time with God today.</Text>
        </View>
        <TouchableOpacity onPress={() => onNavigate('More')}>
          <Text style={styles.sectionLink}>See all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickGrid}>
        <QuickCard icon="book-outline" title="Scripture" subtitle="Read the Word" />
        <QuickCard icon="headset-outline" title="Sermons" subtitle="Listen & learn" onPress={() => onNavigate('Listen')} />
        <QuickCard icon="heart-outline" title="Prayer" subtitle="Slow down & pray" />
        <QuickCard icon="calendar-outline" title="Events" subtitle="What's happening" onPress={() => onNavigate('Events')} />
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Latest teaching</Text>
          <Text style={styles.sectionSub}>Real Calvary Waterford sermons</Text>
        </View>
        <TouchableOpacity onPress={() => onNavigate('Listen')}>
          <Text style={styles.sectionLink}>All sermons</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.sermonFeature} onPress={() => onNavigate('Listen')}>
        <ImageBackground source={{ uri: sermonImage }} style={styles.sermonImage} imageStyle={styles.sermonImageRadius}>
          <View style={styles.sermonImageShade} />
          <Ionicons name="headset" size={25} color="#FFFFFF" />
        </ImageBackground>
        <View style={styles.sermonCopy}>
          <Text style={styles.sermonTag}>{sermons[0].tag}</Text>
          <Text style={styles.sermonTitle}>{sermons[0].title}</Text>
          <Text style={styles.sermonMeta}>{sermons[0].meta}</Text>
        </View>
        <View style={styles.playCircle}><Ionicons name="play" size={16} color="#FFFFFF" /></View>
      </TouchableOpacity>

      <View style={styles.darkQuote}>
        <Text style={styles.darkQuoteLabel}>SUNDAY MORNINGS</Text>
        <Text style={styles.darkQuoteTitle}>Come as you are. Worship, hear the Word, pray and grow together.</Text>
        <Text style={styles.darkQuoteMeta}>09:00 & 11:00 · Waterford City</Text>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>This week</Text>
          <Text style={styles.sectionSub}>Find your place in the church family.</Text>
        </View>
        <TouchableOpacity onPress={() => onNavigate('Events')}><Text style={styles.sectionLink}>Calendar</Text></TouchableOpacity>
      </View>

      <View style={styles.eventCard}>
        {events.slice(0, 3).map((event) => <Event key={`${event.day}-${event.time}-${event.title}`} {...event} />)}
      </View>

      <View style={styles.locationCard}>
        <View style={styles.locationIcon}><Ionicons name="location-outline" size={21} color={green} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.locationTitle}>Find us</Text>
          <Text style={styles.locationText}>59/60 Lower Yellow Road, Waterford City</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function QuickCard({ icon, title, subtitle, onPress }: { icon: any; title: string; subtitle: string; onPress?: () => void }) {
  return (
    <TouchableOpacity style={styles.quickCard} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.quickIcon}><Ionicons name={icon} size={23} color={green} /></View>
      <View><Text style={styles.quickLabel}>{title}</Text><Text style={styles.quickSub}>{subtitle}</Text></View>
    </TouchableOpacity>
  );
}

function ListenScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = sermons[selectedIndex];
  const player = useAudioPlayer(selected.audioUrl || testAudioUrl);
  const status = useAudioPlayerStatus(player);
  const progress = status.duration > 0 ? Math.min(status.currentTime / status.duration, 1) : 0;

  const togglePlay = () => {
    if (status.playing) player.pause();
    else player.play();
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ScreenTitle eyebrow="LISTEN" title="Teaching" subtitle="Slow down. Listen to the Word. Let it sink in." />

      <View style={styles.playerCard}>
        <ImageBackground source={{ uri: sermonImage }} style={styles.playerArtwork} imageStyle={styles.playerArtworkImage}>
          <View style={styles.playerShade} />
          <View style={styles.playerIcon}><Ionicons name="headset" size={28} color="#FFFFFF" /></View>
        </ImageBackground>
        <Text style={styles.playerTag}>NOW PLAYING · TEST AUDIO</Text>
        <Text style={styles.playerTitle}>{selected.title}</Text>
        <Text style={styles.playerMeta}>{selected.meta}</Text>
        <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progress * 100}%` }]} /></View>
        <View style={styles.timeRow}><Text style={styles.timeText}>{formatTime(status.currentTime)}</Text><Text style={styles.timeText}>{formatTime(status.duration)}</Text></View>
        <TouchableOpacity style={styles.bigPlay} onPress={togglePlay}>
          <Ionicons name={status.playing ? 'pause' : 'play'} size={20} color={navy} />
          <Text style={styles.bigPlayText}>{status.playing ? 'Pause sermon' : 'Play sermon'}</Text>
        </TouchableOpacity>
        <Text style={styles.audioNote}>This is a real public Calvary Waterford sermon loaded for testing the app's audio player.</Text>
      </View>

      <View style={styles.sectionHeader}><View><Text style={styles.sectionTitle}>Sermon library</Text><Text style={styles.sectionSub}>From the Calvary Waterford teaching archive.</Text></View></View>
      {sermons.map((sermon, index) => (
        <TouchableOpacity
          key={sermon.title}
          style={[styles.listCard, selectedIndex === index && styles.listCardSelected]}
          onPress={() => setSelectedIndex(index)}
        >
          <View style={styles.smallArtwork}><Ionicons name="play" size={15} color="#FFFFFF" /></View>
          <View style={styles.listCopy}>
            <Text style={styles.sermonTag}>{sermon.tag}</Text>
            <Text style={styles.listTitle}>{sermon.title}</Text>
            <Text style={styles.sermonMeta}>{sermon.meta}{sermon.audioUrl ? ' · Audio ready' : ' · Archive item'}</Text>
          </View>
          <Ionicons name={selectedIndex === index ? 'checkmark-circle' : 'chevron-forward'} size={21} color={selectedIndex === index ? green : muted} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.archiveButton} onPress={() => Linking.openURL('https://www.calvarywaterford.com/sermons')}>
        <Ionicons name="open-outline" size={18} color={navy} />
        <Text style={styles.archiveButtonText}>Open full Calvary sermon library</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function EventsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ScreenTitle eyebrow="CALVARY WATERFORD" title="What's on" subtitle="Stay connected with what's happening in the church family." />
      <View style={styles.serviceCard}>
        <View style={{ flex: 1 }}><Text style={styles.serviceEyebrow}>SUNDAY SERVICES</Text><Text style={styles.serviceTitle}>09:00 & 11:00</Text><Text style={styles.serviceText}>59/60 Lower Yellow Road, Waterford City</Text></View>
        <View style={styles.serviceIcon}><Ionicons name="people-outline" size={27} color={green} /></View>
      </View>
      <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>This week</Text></View>
      <View style={styles.eventCard}>{events.map((event) => <Event key={`${event.day}-${event.time}-${event.title}`} {...event} />)}</View>
      <View style={styles.weeklyCard}>
        <Text style={styles.weeklyEyebrow}>EVERY SUNDAY</Text>
        <Text style={styles.weeklyTitle}>Food Cloud</Text>
        <Text style={styles.weeklyText}>12:45 PM · A practical way we serve our local community.</Text>
      </View>
    </ScrollView>
  );
}

function MoreScreen() {
  const items = [
    ['heart-outline', 'Prayer', 'Make prayer part of your day.'],
    ['people-outline', 'Groups', 'Find community and grow together.'],
    ['happy-outline', 'Kids Ministry', 'A safe and fun place for children to learn about God.'],
    ['gift-outline', 'Giving', 'Support the ministry of Calvary Waterford.'],
    ['information-circle-outline', 'About Calvary', 'Who we are, what we believe and our story.'],
    ['mail-outline', 'Contact', 'Get in touch with the church team.'],
  ];
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ScreenTitle eyebrow="CALVARY WATERFORD" title="More" subtitle="A few more ways to stay connected." />
      <View style={styles.moreList}>{items.map(([icon, title, text]) => (
        <TouchableOpacity key={title} style={styles.moreRow}>
          <View style={styles.moreIcon}><Ionicons name={icon as any} size={22} color={green} /></View>
          <View style={styles.listCopy}><Text style={styles.listTitle}>{title}</Text><Text style={styles.sermonMeta}>{text}</Text></View>
          <Ionicons name="chevron-forward" size={19} color={muted} />
        </TouchableOpacity>
      ))}</View>
      <View style={styles.aboutCard}>
        <Text style={styles.aboutEyebrow}>CALVARY WATERFORD</Text>
        <Text style={styles.aboutTitle}>A church family in Waterford City.</Text>
        <Text style={styles.aboutText}>Verse-by-verse Scripture teaching, prayer, evangelism, discipleship and community.</Text>
      </View>
    </ScrollView>
  );
}

function ScreenTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return <View style={styles.screenTitle}><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.pageTitle}>{title}</Text><Text style={styles.pageSubtitle}>{subtitle}</Text></View>;
}

function Event({ day, time, title, detail }: { day: string; time: string; title: string; detail: string }) {
  return <View style={styles.eventRow}><View style={styles.dateBox}><Text style={styles.dateDay}>{day}</Text><Text style={styles.dateTime}>{time}</Text></View><View style={styles.eventCopy}><Text style={styles.eventTitle}>{title}</Text><Text style={styles.eventDetail}>{detail}</Text></View><Ionicons name="chevron-forward" size={18} color={muted} /></View>;
}

function TabBar({ active, onChange, bottomInset }: { active: Tab; onChange: (tab: Tab) => void; bottomInset: number }) {
  const tabs: [Tab, string][] = [['Home', 'home-outline'], ['Listen', 'headset-outline'], ['Events', 'calendar-outline'], ['More', 'menu-outline']];
  return (
    <View style={[styles.tabBar, { paddingBottom: Math.max(bottomInset, 7), height: 65 + Math.max(bottomInset, 7) }]}>
      {tabs.map(([label, icon]) => {
        const selected = active === label;
        return <TouchableOpacity key={label} style={styles.tab} onPress={() => onChange(label)} activeOpacity={0.8}>
          <View style={[styles.tabIconWrap, selected && styles.tabIconSelected]}><Ionicons name={selected ? (icon.replace('-outline', '') as any) : (icon as any)} size={22} color={selected ? green : muted} /></View>
          <Text style={[styles.tabLabel, selected && styles.tabLabelActive]}>{label}</Text>
        </TouchableOpacity>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cream },
  app: { flex: 1, backgroundColor: cream },
  screen: { flex: 1 },
  content: { paddingHorizontal: 22, paddingTop: 22, paddingBottom: 34 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 },
  eyebrow: { fontSize: 10, fontWeight: '900', letterSpacing: 2.2, color: green, marginBottom: 6 },
  greeting: { fontSize: 31, fontWeight: '800', color: navy, letterSpacing: -0.7 },
  notificationButton: { width: 47, height: 47, borderRadius: 24, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 3 },
  notificationDot: { position: 'absolute', top: 12, right: 12, width: 7, height: 7, borderRadius: 4, backgroundColor: green },
  heroPhoto: { height: 330, borderRadius: 28, overflow: 'hidden', marginBottom: 30 },
  heroImage: { borderRadius: 28 },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(9,27,45,0.57)' },
  heroContent: { flex: 1, justifyContent: 'flex-end', padding: 27 },
  heroEyebrow: { color: '#D7E4E9', fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 14 },
  heroTitle: { color: '#FFFFFF', fontSize: 29, lineHeight: 37, fontWeight: '700', letterSpacing: -0.4, maxWidth: 320 },
  heroRef: { color: '#D7E4E9', fontSize: 14, marginTop: 10 },
  heroButton: { alignSelf: 'flex-start', marginTop: 19, paddingHorizontal: 17, paddingVertical: 12, borderRadius: 22, backgroundColor: green, flexDirection: 'row', gap: 8, alignItems: 'center' },
  heroButtonText: { color: navy, fontSize: 13, fontWeight: '900' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 13, marginTop: 2 },
  sectionTitle: { color: navy, fontSize: 21, fontWeight: '800', letterSpacing: -0.3 },
  sectionSub: { color: muted, fontSize: 11, marginTop: 4 },
  sectionLink: { color: green, fontSize: 12, fontWeight: '900', paddingBottom: 2 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 11, marginBottom: 29 },
  quickCard: { width: '48.3%', minHeight: 116, backgroundColor: '#FFFFFF', borderRadius: 21, padding: 16, justifyContent: 'space-between', shadowColor: '#000', shadowOpacity: 0.025, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 1 },
  quickIcon: { width: 42, height: 42, borderRadius: 15, backgroundColor: greenSoft, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { color: navy, fontSize: 15, fontWeight: '800' },
  quickSub: { color: muted, fontSize: 10, marginTop: 3 },
  sermonFeature: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 28 },
  sermonImage: { width: 76, height: 76, alignItems: 'center', justifyContent: 'center' },
  sermonImageRadius: { borderRadius: 17 },
  sermonImageShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(9,27,45,0.42)', borderRadius: 17 },
  sermonCopy: { flex: 1 },
  sermonTag: { fontSize: 8.5, letterSpacing: 1.05, fontWeight: '900', color: green, marginBottom: 5 },
  sermonTitle: { color: navy, fontSize: 15, fontWeight: '800', lineHeight: 19 },
  sermonMeta: { color: muted, fontSize: 10.5, marginTop: 4, lineHeight: 15 },
  playCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: navy, alignItems: 'center', justifyContent: 'center' },
  darkQuote: { backgroundColor: navyDeep, borderRadius: 24, padding: 24, marginBottom: 29 },
  darkQuoteLabel: { color: green, fontSize: 9, fontWeight: '900', letterSpacing: 1.8, marginBottom: 12 },
  darkQuoteTitle: { color: '#FFFFFF', fontSize: 20, lineHeight: 28, fontWeight: '700' },
  darkQuoteMeta: { color: '#AFC0CA', fontSize: 11, marginTop: 15 },
  eventCard: { backgroundColor: '#FFFFFF', borderRadius: 21, paddingHorizontal: 15, marginBottom: 24 },
  eventRow: { minHeight: 76, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: line, gap: 12 },
  dateBox: { width: 61 },
  dateDay: { color: green, fontSize: 9.5, fontWeight: '900', letterSpacing: 1.2 },
  dateTime: { color: muted, fontSize: 9.5, marginTop: 4 },
  eventCopy: { flex: 1 },
  eventTitle: { color: navy, fontSize: 13.5, fontWeight: '800' },
  eventDetail: { color: muted, fontSize: 10.5, marginTop: 4 },
  locationCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 13 },
  locationIcon: { width: 42, height: 42, borderRadius: 15, backgroundColor: greenSoft, alignItems: 'center', justifyContent: 'center' },
  locationTitle: { color: navy, fontSize: 13, fontWeight: '800' },
  locationText: { color: muted, fontSize: 10.5, marginTop: 4 },
  screenTitle: { marginBottom: 24 },
  pageTitle: { color: navy, fontSize: 34, fontWeight: '800', letterSpacing: -0.8 },
  pageSubtitle: { color: muted, fontSize: 13, lineHeight: 19, marginTop: 7, maxWidth: 330 },
  playerCard: { backgroundColor: navyDeep, borderRadius: 27, padding: 18, marginBottom: 29 },
  playerArtwork: { height: 175, borderRadius: 20, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  playerArtworkImage: { borderRadius: 20 },
  playerShade: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(9,27,45,0.48)' },
  playerIcon: { width: 62, height: 62, borderRadius: 31, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  playerTag: { color: green, fontSize: 8.5, fontWeight: '900', letterSpacing: 1.5, marginBottom: 7 },
  playerTitle: { color: '#FFFFFF', fontSize: 21, fontWeight: '800' },
  playerMeta: { color: '#AFC0CA', fontSize: 11, marginTop: 6 },
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: '#31485A', marginTop: 21, overflow: 'hidden' },
  progressFill: { height: 4, backgroundColor: green, borderRadius: 2 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 7 },
  timeText: { color: '#8EA1AD', fontSize: 9 },
  bigPlay: { alignSelf: 'stretch', marginTop: 18, paddingVertical: 13, borderRadius: 21, backgroundColor: green, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  bigPlayText: { color: navy, fontSize: 13, fontWeight: '900' },
  audioNote: { color: '#8EA1AD', fontSize: 9.5, lineHeight: 14, marginTop: 12, textAlign: 'center' },
  listCard: { backgroundColor: '#FFFFFF', borderRadius: 19, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10, borderWidth: 1, borderColor: 'transparent' },
  listCardSelected: { borderColor: green, backgroundColor: '#F9FCF9' },
  smallArtwork: { width: 48, height: 48, borderRadius: 14, backgroundColor: navy, alignItems: 'center', justifyContent: 'center' },
  listCopy: { flex: 1 },
  listTitle: { color: navy, fontSize: 14, fontWeight: '800' },
  archiveButton: { backgroundColor: greenSoft, borderRadius: 19, padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 10 },
  archiveButtonText: { color: navy, fontSize: 11, fontWeight: '900' },
  serviceCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 19, flexDirection: 'row', alignItems: 'center', marginBottom: 29 },
  serviceEyebrow: { color: green, fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
  serviceTitle: { color: navy, fontSize: 25, fontWeight: '800', marginTop: 7 },
  serviceText: { color: muted, fontSize: 10.5, marginTop: 5, lineHeight: 16 },
  serviceIcon: { width: 50, height: 50, borderRadius: 18, backgroundColor: greenSoft, alignItems: 'center', justifyContent: 'center' },
  weeklyCard: { backgroundColor: navyDeep, borderRadius: 22, padding: 21 },
  weeklyEyebrow: { color: green, fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
  weeklyTitle: { color: '#FFFFFF', fontSize: 23, fontWeight: '800', marginTop: 7 },
  weeklyText: { color: '#AFC0CA', fontSize: 11, lineHeight: 17, marginTop: 6 },
  moreList: { gap: 9 },
  moreRow: { backgroundColor: '#FFFFFF', borderRadius: 19, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 12 },
  moreIcon: { width: 45, height: 45, borderRadius: 16, backgroundColor: greenSoft, alignItems: 'center', justifyContent: 'center' },
  aboutCard: { backgroundColor: navyDeep, borderRadius: 23, padding: 23, marginTop: 20 },
  aboutEyebrow: { color: green, fontSize: 9, fontWeight: '900', letterSpacing: 1.6 },
  aboutTitle: { color: '#FFFFFF', fontSize: 22, lineHeight: 28, fontWeight: '800', marginTop: 10 },
  aboutText: { color: '#AFC0CA', fontSize: 11.5, lineHeight: 18, marginTop: 10 },
  tabBar: { backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: line, flexDirection: 'row', paddingTop: 7, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: -4 }, elevation: 8 },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', gap: 2 },
  tabIconWrap: { width: 42, height: 31, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  tabIconSelected: { backgroundColor: greenSoft },
  tabLabel: { color: muted, fontSize: 10, fontWeight: '800' },
  tabLabelActive: { color: green },
});
