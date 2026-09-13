import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

type Tab = 'Home' | 'Listen' | 'Events' | 'More';

const navy = '#10263D';
const cream = '#F7F3EA';
const green = '#7BAE7F';
const muted = '#66727D';
const line = '#E9E6DF';

const quickLinks = [
  { icon: 'book-outline', label: 'Scripture' },
  { icon: 'headset-outline', label: 'Sermons' },
  { icon: 'heart-outline', label: 'Prayer' },
  { icon: 'calendar-outline', label: 'Events' },
];

const sermons = [
  { tag: 'SUNDAY MORNING', title: 'Latest message from Calvary Waterford', meta: 'Listen to the latest teaching' },
  { tag: 'SUNDAY MORNING', title: 'Verse-by-verse Bible teaching', meta: 'Calvary Waterford teaching library' },
  { tag: 'SPECIAL TEACHING', title: 'Growing together in faith', meta: 'Listen to this teaching' },
];

const events = [
  { day: 'MON', time: '6:00 PM', title: 'Bible Study', detail: 'Church Building' },
  { day: 'TUE', time: '6:00 AM', title: 'Prayer Meeting', detail: 'Meadowbank' },
  { day: 'WED', time: '7:00 PM', title: 'Home Groups', detail: 'Message for details' },
  { day: 'SUN', time: '9:00 AM', title: 'Sunday Service', detail: 'Calvary Waterford' },
  { day: 'SUN', time: '11:00 AM', title: 'Sunday Service', detail: 'Calvary Waterford' },
];

export default function App() {
  const [active, setActive] = useState<Tab>('Home');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        {active === 'Home' && <HomeScreen onNavigate={setActive} />}
        {active === 'Listen' && <ListenScreen />}
        {active === 'Events' && <EventsScreen />}
        {active === 'More' && <MoreScreen />}
        <TabBar active={active} onChange={setActive} />
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
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={22} color={navy} />
        </TouchableOpacity>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>TODAY'S THOUGHT</Text>
        <Text style={styles.heroTitle}>Be still, and know that I am God.</Text>
        <Text style={styles.heroRef}>Psalm 46:10</Text>
        <TouchableOpacity style={styles.heroButton} onPress={() => onNavigate('Listen')}>
          <Ionicons name="play" size={14} color={navy} />
          <Text style={styles.heroButtonText}>Listen</Text>
        </TouchableOpacity>
      </View>

      <SectionHeader title="Grow in faith" action="See all" />
      <View style={styles.quickGrid}>
        {quickLinks.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.quickCard}
            onPress={() => item.label === 'Sermons' ? onNavigate('Listen') : item.label === 'Events' ? onNavigate('Events') : undefined}
          >
            <Ionicons name={item.icon as any} size={25} color={green} />
            <Text style={styles.quickLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <SectionHeader title="Latest teaching" action="All sermons" onPress={() => onNavigate('Listen')} />
      <TouchableOpacity style={styles.sermonCard} onPress={() => onNavigate('Listen')}>
        <View style={styles.sermonArtwork}>
          <Ionicons name="headset" size={27} color="white" />
        </View>
        <View style={styles.sermonCopy}>
          <Text style={styles.sermonTag}>{sermons[0].tag}</Text>
          <Text style={styles.sermonTitle}>{sermons[0].title}</Text>
          <Text style={styles.sermonMeta}>{sermons[0].meta}</Text>
        </View>
        <Ionicons name="play-circle" size={38} color={navy} />
      </TouchableOpacity>

      <SectionHeader title="This week" action="Calendar" onPress={() => onNavigate('Events')} />
      <View style={styles.eventCard}>
        {events.slice(0, 3).map((event) => <Event key={`${event.day}-${event.time}-${event.title}`} {...event} />)}
      </View>

      <View style={styles.locationCard}>
        <View style={styles.locationIcon}><Ionicons name="location-outline" size={22} color={green} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.locationTitle}>Find us</Text>
          <Text style={styles.locationText}>59/60 Lower Yellow Road, Waterford City</Text>
        </View>
      </View>
      <View style={styles.spacer} />
    </ScrollView>
  );
}

function ListenScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ScreenTitle eyebrow="LISTEN" title="Teaching" subtitle="Grow in faith through the Word of God." />
      <View style={styles.featurePlayer}>
        <View style={styles.featureArtwork}><Ionicons name="headset" size={36} color="white" /></View>
        <Text style={styles.playerTag}>LATEST MESSAGE</Text>
        <Text style={styles.playerTitle}>Latest message from Calvary Waterford</Text>
        <Text style={styles.playerMeta}>Sunday Morning · Calvary Waterford</Text>
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={18} color={navy} />
          <Text style={styles.playButtonText}>Play message</Text>
        </TouchableOpacity>
      </View>
      <SectionHeader title="Recent teaching" action="" />
      {sermons.map((sermon, index) => (
        <TouchableOpacity key={`${sermon.title}-${index}`} style={styles.listCard}>
          <View style={styles.smallArtwork}><Ionicons name="play" size={17} color="white" /></View>
          <View style={styles.listCopy}>
            <Text style={styles.sermonTag}>{sermon.tag}</Text>
            <Text style={styles.listTitle}>{sermon.title}</Text>
            <Text style={styles.sermonMeta}>{sermon.meta}</Text>
          </View>
          <Ionicons name="chevron-forward" size={19} color={muted} />
        </TouchableOpacity>
      ))}
      <View style={styles.infoBox}><Ionicons name="information-circle-outline" size={21} color={green} /><Text style={styles.infoText}>Sermon audio can be connected to the church's teaching feed in the next stage.</Text></View>
    </ScrollView>
  );
}

function EventsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ScreenTitle eyebrow="CALVARY WATERFORD" title="What's on" subtitle="Stay connected with what's happening this week." />
      <View style={styles.serviceCard}>
        <View><Text style={styles.serviceEyebrow}>SUNDAY SERVICES</Text><Text style={styles.serviceTitle}>9:00 AM & 11:00 AM</Text><Text style={styles.serviceText}>Join us at 59/60 Lower Yellow Road, Waterford City.</Text></View>
        <Ionicons name="people-outline" size={30} color={green} />
      </View>
      <SectionHeader title="This week" action="" />
      <View style={styles.eventCard}>
        {events.map((event) => <Event key={`${event.day}-${event.time}-${event.title}`} {...event} />)}
      </View>
      <View style={styles.weeklyCard}>
        <Text style={styles.weeklyTitle}>Food Cloud Sunday</Text>
        <Text style={styles.weeklyText}>Every Sunday at 12:45 PM</Text>
        <Text style={styles.weeklyText}>A practical way we serve our local community.</Text>
      </View>
    </ScrollView>
  );
}

function MoreScreen() {
  const items = [
    ['heart-outline', 'Prayer', 'Make prayer part of your day.'],
    ['people-outline', 'Groups', 'Find community and grow together.'],
    ['happy-outline', 'Kids Ministry', 'A place for children to learn about Jesus.'],
    ['gift-outline', 'Giving', 'Support the ministry of Calvary Waterford.'],
    ['information-circle-outline', 'About Calvary', 'Who we are, what we believe and our story.'],
    ['mail-outline', 'Contact', 'Get in touch with the church team.'],
  ];
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ScreenTitle eyebrow="CALVARY WATERFORD" title="More" subtitle="Everything you need to stay connected." />
      <View style={styles.moreList}>
        {items.map(([icon, title, text]) => (
          <TouchableOpacity key={title} style={styles.moreRow}>
            <View style={styles.moreIcon}><Ionicons name={icon as any} size={22} color={green} /></View>
            <View style={styles.listCopy}><Text style={styles.listTitle}>{title}</Text><Text style={styles.sermonMeta}>{text}</Text></View>
            <Ionicons name="chevron-forward" size={19} color={muted} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.aboutCard}>
        <Text style={styles.aboutEyebrow}>CALVARY WATERFORD</Text>
        <Text style={styles.aboutTitle}>A church family in Waterford City</Text>
        <Text style={styles.aboutText}>Verse-by-verse Scripture teaching, prayer, evangelism, discipleship and community.</Text>
      </View>
    </ScrollView>
  );
}

function ScreenTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return <View style={styles.screenTitle}><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.pageTitle}>{title}</Text><Text style={styles.pageSubtitle}>{subtitle}</Text></View>;
}

function SectionHeader({ title, action, onPress }: { title: string; action: string; onPress?: () => void }) {
  return <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>{title}</Text>{action ? <TouchableOpacity onPress={onPress}><Text style={styles.sectionLink}>{action}</Text></TouchableOpacity> : null}</View>;
}

function Event({ day, time, title, detail }: { day: string; time: string; title: string; detail: string }) {
  return <View style={styles.eventRow}><View style={styles.dateBox}><Text style={styles.dateDay}>{day}</Text><Text style={styles.dateTime}>{time}</Text></View><View style={styles.eventCopy}><Text style={styles.eventTitle}>{title}</Text><Text style={styles.eventDetail}>{detail}</Text></View><Ionicons name="chevron-forward" size={19} color={muted} /></View>;
}

function TabBar({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  const tabs: [Tab, string][] = [['Home', 'home-outline'], ['Listen', 'headset-outline'], ['Events', 'calendar-outline'], ['More', 'menu-outline']];
  return <View style={styles.tabBar}>{tabs.map(([label, icon]) => { const selected = active === label; return <TouchableOpacity key={label} style={styles.tab} onPress={() => onChange(label)}><Ionicons name={selected ? (icon.replace('-outline', '') as any) : (icon as any)} size={22} color={selected ? green : muted} /><Text style={[styles.tabLabel, selected && styles.tabLabelActive]}>{label}</Text></TouchableOpacity>; })}</View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: cream },
  app: { flex: 1 },
  content: { padding: 24, paddingBottom: 120 },
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
  sectionTitle: { color: navy, fontSize: 19, fontWeight: '700' },
  sectionLink: { color: green, fontSize: 12, fontWeight: '800' },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 11, marginBottom: 28 },
  quickCard: { width: '48%', minHeight: 105, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 17, justifyContent: 'space-between' },
  quickLabel: { color: navy, fontSize: 14, fontWeight: '700' },
  sermonCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 28 },
  sermonArtwork: { width: 72, height: 72, borderRadius: 14, backgroundColor: '#27435B', alignItems: 'center', justifyContent: 'center' },
  sermonCopy: { flex: 1 },
  sermonTag: { fontSize: 9, letterSpacing: 1.2, fontWeight: '800', color: green, marginBottom: 5 },
  sermonTitle: { color: navy, fontSize: 14, fontWeight: '700', lineHeight: 19 },
  sermonMeta: { color: muted, fontSize: 11, marginTop: 4 },
  eventCard: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 16, marginBottom: 24 },
  eventRow: { minHeight: 77, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: line, gap: 13 },
  dateBox: { width: 62 }, dateDay: { color: green, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 }, dateTime: { color: muted, fontSize: 10, marginTop: 4 },
  eventCopy: { flex: 1 }, eventTitle: { color: navy, fontSize: 14, fontWeight: '700' }, eventDetail: { color: muted, fontSize: 11, marginTop: 4 },
  locationCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 13, marginTop: 2 },
  locationIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: cream, alignItems: 'center', justifyContent: 'center' },
  locationTitle: { color: navy, fontSize: 14, fontWeight: '700' }, locationText: { color: muted, fontSize: 11, lineHeight: 16, marginTop: 3 },
  spacer: { height: 20 },
  screenTitle: { marginBottom: 26 }, pageTitle: { color: navy, fontSize: 32, fontWeight: '700' }, pageSubtitle: { color: muted, fontSize: 14, lineHeight: 21, marginTop: 8, maxWidth: 320 },
  featurePlayer: { backgroundColor: navy, borderRadius: 24, padding: 22, marginBottom: 30 }, featureArtwork: { width: 68, height: 68, borderRadius: 18, backgroundColor: '#27435B', alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
  playerTag: { color: '#B8C8D3', fontSize: 9, fontWeight: '800', letterSpacing: 1.4 }, playerTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '700', lineHeight: 29, marginTop: 7 }, playerMeta: { color: '#B8C8D3', fontSize: 12, marginTop: 8 },
  playButton: { alignSelf: 'flex-start', backgroundColor: green, borderRadius: 22, paddingHorizontal: 17, paddingVertical: 11, flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 20 }, playButtonText: { color: navy, fontWeight: '800', fontSize: 12 },
  listCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 11 }, smallArtwork: { width: 54, height: 54, borderRadius: 14, backgroundColor: '#27435B', alignItems: 'center', justifyContent: 'center' }, listCopy: { flex: 1 }, listTitle: { color: navy, fontSize: 14, fontWeight: '700', lineHeight: 19 },
  infoBox: { marginTop: 15, backgroundColor: '#EEF4EE', borderRadius: 16, padding: 15, flexDirection: 'row', gap: 10, alignItems: 'flex-start' }, infoText: { flex: 1, color: muted, fontSize: 11, lineHeight: 17 },
  serviceCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 19, flexDirection: 'row', justifyContent: 'space-between', gap: 15, marginBottom: 28 }, serviceEyebrow: { color: green, fontSize: 9, fontWeight: '900', letterSpacing: 1.2 }, serviceTitle: { color: navy, fontSize: 21, fontWeight: '700', marginTop: 7 }, serviceText: { color: muted, fontSize: 11, lineHeight: 16, marginTop: 7, maxWidth: 270 },
  weeklyCard: { backgroundColor: navy, borderRadius: 20, padding: 20 }, weeklyTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' }, weeklyText: { color: '#B8C8D3', fontSize: 12, lineHeight: 18, marginTop: 7 },
  moreList: { backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 15, marginBottom: 22 }, moreRow: { minHeight: 76, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: line, gap: 13 }, moreIcon: { width: 43, height: 43, borderRadius: 14, backgroundColor: cream, alignItems: 'center', justifyContent: 'center' },
  aboutCard: { backgroundColor: navy, borderRadius: 22, padding: 22 }, aboutEyebrow: { color: green, fontSize: 9, fontWeight: '900', letterSpacing: 1.5 }, aboutTitle: { color: '#FFFFFF', fontSize: 21, fontWeight: '700', lineHeight: 28, marginTop: 9 }, aboutText: { color: '#B8C8D3', fontSize: 12, lineHeight: 19, marginTop: 9 },
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 82, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E8E5DE', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 11 }, tab: { alignItems: 'center', width: 75 }, tabLabel: { color: muted, fontSize: 10, fontWeight: '700', marginTop: 5 }, tabLabelActive: { color: green },
});
