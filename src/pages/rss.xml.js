import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const research = await getCollection('research');
  return rss({
    title: 'Aayush Bankar — Systems Security & Low-Level Engineering',
    description: 'Kernel vulnerability teardowns, Android framework analysis, and verifiable high-throughput data engines.',
    site: context.site,
    items: research.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/research/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
