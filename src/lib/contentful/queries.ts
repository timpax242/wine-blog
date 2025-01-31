import { contentfulClient } from './client';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// Helper function to ensure image URLs are absolute and provide a fallback
function ensureAbsoluteUrl(url: string | undefined): string {
  if (!url) return '/placeholder.svg';
  return url.startsWith('//') ? `https:${url}` : url;
}

export const contentfulQueries = {
  // Fetch paginated blog posts with optional limit
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

  // Fetch a single blog post by its slug with full content and author details
  getPostBySlug: async (slug: string) => {
    try {
      // Include depth of 2 to get nested references (e.g., author data)
      const response = await contentfulClient.getEntries({
        content_type: 'post',
        'fields.slug': slug,
        limit: 1,
        include: 2,
      });

      if (!response.items.length) return null;

      const fields = response.items[0].fields as any;

      return {
        id: response.items[0].sys.id,
        title: fields.title,
        slug: fields.slug,
        excerpt: fields.excerpt,
        content: fields.content as unknown as Document,
        image: ensureAbsoluteUrl(fields.coverImage?.fields?.file?.url),
        date: fields.date,
        author: {
          name: fields.author?.fields?.name,
          bio: fields.author?.fields?.bio,
          image: ensureAbsoluteUrl(
            fields.author?.fields?.image?.fields?.file?.url
          ),
        },
      };
    } catch {
      return null;
    }
  },

  // Fetch the featured hero post marked with hero flag
  getHeroPost: async () => {
    try {
      const response = await contentfulClient.getEntries({
        content_type: 'post',
        'fields.hero': true,
        limit: 1,
      });

      if (!response.items.length) return null;

      const fields = response.items[0].fields as any;

      return {
        id: response.items[0].sys.id,
        title: fields.title,
        slug: fields.slug,
        excerpt: fields.excerpt,
        content: fields.content,
        image: ensureAbsoluteUrl(fields.coverImage?.fields?.file?.url),
        date: fields.date,
        author: fields.author?.fields?.name,
      };
    } catch {
      return null;
    }
  },

  // Fetch all available categories for navigation and filtering
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

  // Fetch all posts associated with a specific category
  getPostsByCategory: async (categorySlug: string) => {
    // First find the category entry
    const categoryResponse = await contentfulClient.getEntries({
      content_type: 'category',
      'fields.slug[in]': categorySlug,
      limit: 1,
    });

    if (!categoryResponse.items.length) return [];

    // Then find all posts linked to this category
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

  // Fetch footer content and settings
  getFooter: async () => {
    const response = await contentfulClient.getEntries({
      content_type: 'footer',
      limit: 1,
    });

    // Return default footer content if no custom footer is defined
    if (response.items.length) {
      return {
        title: 'Korkkikierre',
        content: 'Tutkimme viinin maailmaa, yksi siemaus kerrallaan.',
        copyright: '© 2024 Korkkikierre. Kaikki oikeudet pidätetään.',
      };
    }

    // Parse and return custom footer content from Contentful
    const footer = response.items[0].fields;
    return {
      title: JSON.stringify(footer.footerTitle),
      content: documentToReactComponents(footer.footerContent as Document),
      copyright: JSON.stringify(footer.footerCopyright),
    };
  },

  // Fetch main navigation menu items
  getMainNavigation: async () => {
    const response = await contentfulClient.getEntries({
      content_type: 'mainNavigation',
      'fields.title': 'Main menu',
      limit: 1,
    });

    // Return default navigation if no custom menu is defined
    if (
      !response.items.length ||
      !Array.isArray(response.items[0].fields?.menuItems)
    ) {
      return [{ label: 'Etusivu', url: '/' }];
    }

    // Transform navigation items to expected format
    return response.items[0].fields.menuItems.map((item: any) => ({
      label: item.fields.title,
      url: item.fields.url,
    }));
  },
};
