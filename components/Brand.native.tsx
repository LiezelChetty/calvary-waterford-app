import React from 'react';
import { View } from 'react-native';
import { SvgUri } from 'react-native-svg';

const logo = require('../assets/calvary-waterford-logo.svg');
const emblem = require('../assets/calvary-waterford-emblem.svg');

export function Brand({ dark = false }: { dark?: boolean }) {
  return <View style={{ height: 46, justifyContent: 'center' }}><SvgUri uri={logo} width={190} height={42} fill={dark ? '#fff' : undefined} /></View>;
}
export function Emblem() { return <SvgUri uri={emblem} width={42} height={42} />; }
