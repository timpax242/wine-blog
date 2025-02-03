import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { contentfulClient } from './client';
import {
  CategoryEntrySkeleton,
  FooterEntrySkeleton,
  MainNavigationEntrySkeleton,
  PostEntrySkeleton,
  Category,
  Footer,
  MenuItem,
  Post,
  PostsResponse,
} from './types';

/**
 * Ensures URLs are absolute by prepending https: if needed
 * Falls back to placeholder image if URL is undefined
 */
const ensureAbsoluteUrl = (url?: string): string => {
  if (!url) return '/placeholder.svg';
  return url.startsWith('//') ? `https:${url}` : url;
};

/**
 * Collection of Contentful query functions for fetching and transforming content
 */
export const contentfulQueries = {
  /**
   * Fetches paginated blog posts with full post data
   * @param page - Page number for pagination
   * @param limit - Number of posts per page
   */
  getAllPosts: async (page = 1, limit = 10): Promise<PostsResponse> => {
    const skip = (page - 1) * limit;
    const response = await contentfulClient.getEntries<PostEntrySkeleton>({
      content_type: 'post',
      limit,
      skip,
      order: ['-sys.createdAt'],
    });

    return {
      posts: response.items.map((item) => ({
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt,
        content: item.fields?.content,
        image: ensureAbsoluteUrl(item.fields?.coverImage?.fields?.file?.url),
        date: item.fields?.date,
        author: item.fields?.author?.fields && {
          name: item.fields.author.fields.name,
          bio: item.fields.author.fields.bio,
          image: ensureAbsoluteUrl(
            item.fields.author.fields.image?.fields?.file?.url
          ),
        },
      })),
      total: response.total,
      currentPage: page,
      totalPages: Math.ceil(response.total / limit),
    };
  },

  /**
   * Retrieves random posts for features like "Related Posts"
   * Only fetches minimal fields for performance
   * @param limit - Number of random posts to return
   */
  getRandomPosts: async (limit = 3) => {
    const entries = await contentfulClient.getEntries<PostEntrySkeleton>({
      content_type: 'post',
      limit: 100, // Fetch more to randomize from
      select: ['fields.title', 'fields.slug', 'fields.coverImage'],
    });

    // Shuffle and take first 3
    const shuffled = entries.items.sort(() => 0.5 - Math.random());

    return shuffled.slice(0, limit).map((entry) => ({
      title: entry.fields.title as string,
      slug: entry.fields.slug as string,
      image: ensureAbsoluteUrl(entry.fields?.coverImage?.fields?.file?.url),
    }));
  },

  /**
   * Fetches a single post by its slug with full post data
   * Includes nested references up to 2 levels deep
   * @param slug - URL slug of the post
   */
  getPostBySlug: async (slug: string): Promise<Post | null> => {
    try {
      const response = await contentfulClient.getEntries<PostEntrySkeleton>({
        content_type: 'post',
        'fields.slug[in]': [slug], // Use an array for safety
        limit: 1,
        include: 2,
      });

      if (!response.items.length) return null;

      const item = response.items[0];

      return {
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt,
        content: item.fields?.content,
        image: ensureAbsoluteUrl(item.fields?.coverImage?.fields?.file?.url),
        date: item.fields?.date,
        author: item.fields?.author?.fields && {
          name: item.fields.author.fields.name,
          bio: item.fields.author.fields.bio,
          image: ensureAbsoluteUrl(
            item.fields.author.fields.image?.fields?.file?.url
          ),
        },
      };
    } catch {
      return null;
    }
  },

  /**
   * Retrieves the featured hero post marked with hero flag
   * Returns full post data including author information
   */
  getHeroPost: async (): Promise<Post | null> => {
    try {
      const response = await contentfulClient.getEntries<PostEntrySkeleton>({
        content_type: 'post',
        'fields.hero': true,
        limit: 1,
      });

      if (!response.items.length) return null;

      const item = response.items[0];

      return {
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt,
        content: item.fields?.content,
        image: ensureAbsoluteUrl(item.fields?.coverImage?.fields?.file?.url),
        date: item.fields?.date,
        author: item.fields?.author?.fields && {
          name: item.fields.author.fields.name,
          bio: item.fields.author.fields.bio,
          image: ensureAbsoluteUrl(
            item.fields.author.fields.image?.fields?.file?.url
          ),
        },
      };
    } catch {
      return null;
    }
  },

  /**
   * Fetches all available categories
   * Orders by creation date
   */
  getCategories: async (): Promise<Category[]> => {
    const response = await contentfulClient.getEntries<CategoryEntrySkeleton>({
      content_type: 'category',
      order: ['sys.createdAt'],
    });

    return response.items.map((item) => ({
      id: item.sys.id,
      ...item.fields,
    }));
  },

  /**
   * Retrieves all posts for a specific category
   * First finds category by slug, then finds all linked posts
   * @param categorySlug - URL slug of the category
   */
  getPostsByCategory: async (categorySlug: string): Promise<Post[]> => {
    const categoryResponse =
      await contentfulClient.getEntries<CategoryEntrySkeleton>({
        content_type: 'category',
        'fields.slug': categorySlug,
        limit: 1,
      });

    if (!categoryResponse.items.length) return [];

    const response = await contentfulClient.getEntries<PostEntrySkeleton>({
      content_type: 'post',
      links_to_entry: categoryResponse.items[0].sys.id,
      order: ['-sys.createdAt'],
      include: 2,
    });

    return response.items.map((item) => ({
      title: item.fields.title,
      slug: item.fields.slug,
      excerpt: item.fields?.excerpt,
      content: item.fields?.content,
      image: ensureAbsoluteUrl(item.fields?.coverImage?.fields?.file?.url),
      date: item.fields?.date,
      author: item.fields?.author?.fields && {
        name: item.fields.author.fields.name,
        bio: item.fields.author.fields.bio,
        image: ensureAbsoluteUrl(
          item.fields.author.fields.image?.fields?.file?.url
        ),
      },
    }));
  },

  /**
   * Fetches main navigation menu items
   * Falls back to default home menu if no custom menu is defined
   */
  getMainNavigation: async (): Promise<MenuItem[]> => {
    const defaultMenu: MenuItem[] = [{ title: 'Etusivu', url: '/' }];

    try {
      const response =
        await contentfulClient.getEntries<MainNavigationEntrySkeleton>({
          content_type: 'mainNavigation',
          'fields.title': 'Main menu',
          limit: 1,
        });

      if (!response.items.length || !response.items[0].fields.menuItems) {
        return defaultMenu;
      }

      return (
        response.items[0].fields.menuItems as Array<{
          fields: { title: string; url: string };
        }>
      ).map((item) => ({
        title: item.fields.title,
        url: item.fields.url,
      }));
    } catch {
      return defaultMenu;
    }
  },

  /**
   * Retrieves footer content with fallback to default values
   * Transforms rich text content to React components
   */
  getFooter: async (): Promise<Footer> => {
    const response = await contentfulClient.getEntries<FooterEntrySkeleton>({
      content_type: 'footer',
      limit: 1,
    });

    const defaultFooter: Footer = {
      footerTitle: 'Korkkikierre',
      footerContent: 'Tutkimme viinin maailmaa, yksi siemaus kerrallaan.',
      footerCopyright: '© 2024 Korkkikierre. Kaikki oikeudet pidätetään.',
    };

    if (!response.items.length) return defaultFooter;

    const footer = response.items[0].fields;
    return {
      footerTitle: footer.footerTitle ?? defaultFooter.footerTitle,
      footerContent: footer.footerContent
        ? documentToReactComponents(footer.footerContent)
        : defaultFooter.footerContent,
      footerCopyright: footer.footerCopyright ?? defaultFooter.footerCopyright,
    };
  },
};
