const { XMLParser } = require('fast-xml-parser');
const rssUrl = 'https://anchor.fm/s/8e64bc0/podcast/rss';
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_', trimValues: true });
const list = (v) => Array.isArray(v) ? v : v ? [v] : [];
const text = (v) => typeof v === 'object' && v ? v['#text'] || '' : v || '';

module.exports = async (_request, response) => {
  response.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=86400');
  try {
    const upstream = await fetch(rssUrl);
    if (!upstream.ok) throw new Error('Feed unavailable');
    const channel = parser.parse(await upstream.text()).rss.channel;
    const episodes = list(channel.item).map((item) => ({
      id: text(item.guid) || item.enclosure?.['@_url'],
      title: text(item.title),
      description: text(item.description) || text(item['content:encoded']),
      publishedAt: text(item.pubDate),
      duration: text(item['itunes:duration']),
      audioUrl: item.enclosure?.['@_url'] || null,
      artworkUrl: item['itunes:image']?.['@_href'] || channel['itunes:image']?.['@_href'] || null,
      episodeUrl: text(item.link) || null,
    })).filter((episode) => episode.id && episode.title && episode.audioUrl);
    response.status(200).json({ source: rssUrl, episodes });
  } catch (_) {
    response.status(502).json({ error: 'Unable to load the Calvary Waterford podcast feed.', episodes: [] });
  }
};
