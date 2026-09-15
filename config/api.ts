import { Platform } from 'react-native';

// Replace this single value when the app moves to its permanent domain.
export const publicAppBaseUrl = 'https://calvary-waterford-app.vercel.app';
export const podcastFeedUrl = Platform.select({
  web: '/api/podcast-feed',
  default: publicAppBaseUrl + '/api/podcast-feed',
}) as string;
