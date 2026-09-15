import React from 'react';
import { Image, View } from 'react-native';

const logo = require('../assets/calvary-waterford-logo.svg');
const emblem = require('../assets/calvary-waterford-emblem.svg');

// On web RN's Image renders the SVG as a normal browser image; no SVG transformer is needed.
export function Brand() { return <View style={{ height: 46, justifyContent: 'center' }}><Image source={logo} resizeMode="contain" style={{ width: 190, height: 42, alignSelf: 'flex-start' }} accessibilityLabel="Calvary Waterford" /></View>; }
export function Emblem() { return <Image source={emblem} resizeMode="contain" style={{ width: 42, height: 42 }} accessibilityLabel="Calvary Waterford emblem" />; }
