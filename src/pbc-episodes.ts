import * as RSSParser from 'rss-parser';

// create new parser instance
const parser = new RSSParser();
export default async function () {
  // fetch the data from pbc rss feed (simplecast)
  const rssUrl: string = 'https://rss.simplecast.com/podcasts/3985/rss';
  const pbcFeed = await parser.parseURL(rssUrl);
  const rawEpisodes = pbcFeed.items;

  const episodeCount = rawEpisodes.length;

  let latestEpisode = 0;
  rawEpisodes.forEach((e: any) => latestEpisode = Math.max(latestEpisode, Number(e.itunes.episode)));
  
  const parsedEpisodes = rawEpisodes.map((e: any) => {
    return {
      author: e.itunes.author,
      no: Number(e.itunes.episode),
      keywords: e.itunes.keywords,
      duration: e.itunes.duration,
      guid: e.guid,
      content: encodeURIComponent(e.content.replace(/\\n/g, '')),
      title: e.title.replace(/^[^ ]* /g, ''),
      date: e.pubDate,
      image: e.itunes.image,
      file: {
        url: e.enclosure.url,
        length: e.enclosure.length,
        type: e.enclosure.type,
      },
    }
  });

  return {
    episodeCount,
    latestEpisodeNo: latestEpisode,
    items: parsedEpisodes,
  }
}