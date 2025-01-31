import { contentfulClient } from './client';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Helper function to ensure image URLs are absolute
function ensureAbsoluteUrl(url: string | undefined): string {
  if (!url) return '/placeholder.svg';
  return url.startsWith('//') ? `https:${url}` : url;
}

export const contentfulQueries = {
  getAllPosts: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const response = await contentfulClient.getEntries({
      content_type: 'post',
      limit,
      skip,
      order: ['-sys.createdAt'],
    });

    return {
      posts: response.items.map((item: any) => ({
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt,
        content: item.fields.content,
        image: ensureAbsoluteUrl(item.fields.coverImage?.fields?.file?.url),
        date: item.fields.date,
        author: item.fields.author?.fields?.name,
      })),
      total: response.total,
      currentPage: page,
      totalPages: Math.ceil(response.total / limit),
    };
  },

  getPostById: async (id: string) => {
    try {
      const post = await contentfulClient.getEntry(id);
      return {
        id: post.sys.id,
        title: post.fields.title,
        slug: post.fields.slug,
        excerpt: post.fields.excerpt,
        content: post.fields.content,
        image: ensureAbsoluteUrl(
          (post.fields as any).coverImage?.fields?.file?.url
        ),
        date: (post.fields as any).date,
        author: (post.fields as any).author?.fields?.name,
      };
    } catch {
      return null;
    }
  },

  getCategories: async () => {
    const response = await contentfulClient.getEntries({
      content_type: 'category',
      order: ['sys.createdAt'],
    });

    return response.items.map((item: any) => ({
      id: item.sys.id,
      name: item.fields.name,
      slug: item.fields.slug,
      description: item.fields.description || '',
    }));
  },

  getPostsByCategory: async (categorySlug: string) => {
    const categoryResponse = await contentfulClient.getEntries({
      content_type: 'category',
      'fields.slug[in]': categorySlug,
      limit: 1,
    });

    if (!categoryResponse.items.length) return [];

    const response = await contentfulClient.getEntries({
      content_type: 'post',
      links_to_entry: categoryResponse.items[0].sys.id,
      order: ['-sys.createdAt'],
      include: 2,
    });

    return response.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields.excerpt,
      content: item.fields.content,
      image: ensureAbsoluteUrl(item.fields.coverImage?.fields?.file?.url),
      date: item.fields.date,
      author: item.fields.author?.fields?.name,
    }));
  },

  getFooter: async () => {
    const response = await contentfulClient.getEntries({
      content_type: 'footer',
      limit: 1,
    });

    if (response.items.length) {
      return {
        title: 'Korkkikierre',
        content: 'Tutkimme viinin maailmaa, yksi siemaus kerrallaan.',
        copyright: '© 2024 Korkkikierre. Kaikki oikeudet pidätetään.',
      };
    }

    const footer = response.items[0].fields;
    return {
      title: JSON.stringify(footer.footerTitle),
      content: documentToReactComponents(footer.footerContent as Document),
      copyright: JSON.stringify(footer.footerCopyright),
    };
  },

  getMainNavigation: async () => {
    const response = await contentfulClient.getEntries({
      content_type: 'mainNavigation',
      'fields.title': 'Main menu',
      limit: 1,
    });

    if (
      !response.items.length ||
      !Array.isArray(response.items[0].fields?.menuItems)
    ) {
      return [{ label: 'Etusivu', url: '/' }];
    }

    return response.items[0].fields.menuItems.map((item: any) => ({
      label: item.fields.title,
      url: item.fields.url,
    }));
  },
};
