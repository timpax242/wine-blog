import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { contentfulClient } from './client';
import {
  TypeCategorySkeleton,
  TypeFooterSkeleton,
  TypeMainNavigationSkeleton,
  TypePostSkeleton,
  TypeAuthorSkeleton,
} from './types/';
import { Asset, Entry } from 'contentful';

/**
 * Ensures URLs are absolute by prepending https: if needed
 * Falls back to placeholder image if URL is undefined
 */
const ensureAbsoluteUrl = (url?: string): string => {
  if (!url) return '/placeholder.svg';
  return url.startsWith('//') ? `https:${url}` : url;
};

/**
 * Extracts image URL and title from Contentful image field
 */
const extractImageData = (imageField?: Asset) => {
  if (imageField && 'fields' in imageField) {
    return {
      imageUrl: ensureAbsoluteUrl(imageField.fields.file?.url as string),
      imageTitle: imageField.fields.title as string,
    };
  } else {
    return { imageUrl: '', imageTitle: '' };
  }
};

/**
 * Extracts author data from Contentful author field
 */
const extractAuthorData = (
  authorField?: Entry<TypeAuthorSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS', string>
) => {
  if (authorField && 'fields' in authorField) {
    return {
      name: authorField.fields.name,
      bio: authorField.fields.bio,
      ...extractImageData(authorField.fields.image),
    };
  } else {
    return undefined;
  }
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
  getAllPosts: async (page = 1, limit = 10) => {
    try {
      const skip = (page - 1) * limit;
      const response =
        await contentfulClient.withoutUnresolvableLinks.getEntries<TypePostSkeleton>(
          {
            content_type: 'post',
            limit,
            skip,
            order: ['-sys.createdAt'],
            include: 2,
          }
        );

      const posts = response.items.map((item) => {
        return {
          title: item.fields.title,
          slug: item.fields.slug,
          excerpt: item.fields.excerpt,
          content: item.fields?.content,
          ...extractImageData(item.fields.coverImage),
          date: item.fields?.date,
          author: extractAuthorData(item.fields.author),
        };
      });

      return {
        posts: posts,
        total: response.total,
        currentPage: page,
        totalPages: Math.ceil(response.total / limit),
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return {
        posts: [],
        total: 0,
        currentPage: page,
        totalPages: 0,
      };
    }
  },
  /**
   * Retrieves random posts for features like "Related Posts"
   * Only fetches minimal fields for performance
   * @param limit - Number of random posts to return
   */
  getRandomPosts: async (limit = 3) => {
    try {
      const response =
        await contentfulClient.withoutUnresolvableLinks.getEntries<TypePostSkeleton>(
          {
            content_type: 'post',
            limit: 100, // Fetch more to randomize from
            select: ['fields.title', 'fields.slug', 'fields.coverImage'],
            include: 2,
          }
        );

      // Shuffle and take first 3
      const shuffled = response.items.sort(() => 0.5 - Math.random());

      const posts = shuffled.slice(0, limit).map((item) => {
        return {
          title: item.fields.title,
          slug: item.fields.slug,
          ...extractImageData(item.fields.coverImage),
        };
      });

      return posts;
    } catch (error) {
      console.error('Error fetching random posts:', error);
      return [];
    }
  },

  /**
   * Fetches a single post by its slug with full post data
   * Includes nested references up to 2 levels deep
   * @param slug - URL slug of the post
   */
  getPostBySlug: async (slug: string) => {
    try {
      const response =
        await contentfulClient.withoutUnresolvableLinks.getEntries<TypePostSkeleton>(
          {
            content_type: 'post',
            'fields.slug[in]': [slug],
            limit: 1,
            include: 2,
          }
        );

      if (!response.items.length) return null;

      const item = response.items[0];

      return {
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt,
        content: item.fields.content,
        ...extractImageData(item.fields.coverImage),
        date: item.fields?.date,
        author: extractAuthorData(item.fields.author),
      };
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
  },

  /**
   * Retrieves the featured hero post marked with hero flag
   * Returns full post data including author information
   */
  getHeroPost: async () => {
    try {
      const response =
        await contentfulClient.withoutUnresolvableLinks.getEntries<TypePostSkeleton>(
          {
            content_type: 'post',
            'fields.hero': true,
            limit: 1,
            include: 2,
          }
        );

      if (!response.items.length) return null;

      const item = response.items[0];

      return {
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt,
        content: item.fields.content,
        ...extractImageData(item.fields.coverImage),
        date: item.fields?.date,
        author: extractAuthorData(item.fields.author),
      };
    } catch (error) {
      console.error('Error fetching hero post:', error);
      return null;
    }
  },

  /**
   * Fetches all available categories
   * Orders by creation date
   */
  getCategories: async () => {
    try {
      const response =
        await contentfulClient.withoutUnresolvableLinks.getEntries<TypeCategorySkeleton>(
          {
            content_type: 'category',
            order: ['sys.createdAt'],
          }
        );

      return response.items.map((item) => ({
        id: item.sys.id,
        ...item.fields,
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  /**
   * Retrieves all posts for a specific category
   * First finds category by slug, then finds all linked posts
   * @param categorySlug - URL slug of the category
   */
  getPostsByCategory: async (categorySlug: string) => {
    try {
      const categoryResponse =
        await contentfulClient.getEntries<TypeCategorySkeleton>({
          content_type: 'category',
          'fields.slug': categorySlug,
          limit: 1,
          include: 2,
        });

      if (!categoryResponse.items.length) return [];

      const response =
        await contentfulClient.withoutUnresolvableLinks.getEntries<TypePostSkeleton>(
          {
            content_type: 'post',
            links_to_entry: categoryResponse.items[0].sys.id,
            order: ['-sys.createdAt'],
            include: 2,
          }
        );

      return response.items.map((item) => ({
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt,
        content: item.fields.content,
        ...extractImageData(item.fields.coverImage),
        date: item.fields?.date,
        author: extractAuthorData(item.fields.author),
      }));
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      return [];
    }
  },

  /**
   * Fetches main navigation menu items
   * Falls back to default home menu if no custom menu is defined
   */
  getMainNavigation: async () => {
    const defaultMenu = [{ title: 'Etusivu', url: '/' }];

    try {
      const response =
        await contentfulClient.withoutUnresolvableLinks.getEntries<TypeMainNavigationSkeleton>(
          {
            content_type: 'mainNavigation',
            'fields.title': 'Main menu',
            limit: 1,
            include: 2,
          }
        );

      if (!response.items.length || !response.items[0].fields.menuItems) {
        return defaultMenu;
      }

      return response.items[0].fields.menuItems.map((item) => ({
        title: item && 'fields' in item ? (item.fields.title as string) : '',
        url: item && 'fields' in item ? (item.fields.url as string) : '#',
      }));
    } catch (error) {
      console.error('Error fetching main navigation:', error);
      return defaultMenu;
    }
  },

  /**
   * Retrieves footer content with fallback to default values
   * Transforms rich text content to React components
   */
  getFooter: async () => {
    try {
      const response =
        await contentfulClient.withoutUnresolvableLinks.getEntries<TypeFooterSkeleton>(
          {
            content_type: 'footer',
            limit: 1,
          }
        );

      if (!response.items.length) throw new Error('No footer data found');

      const footer = response.items[0].fields;
      return {
        footerTitle: footer.footerTitle ?? 'Korkkikierre',
        footerContent: footer.footerContent
          ? documentToReactComponents(footer.footerContent)
          : 'Tutkimme viinin maailmaa, yksi siemaus kerrallaan.',
        footerCopyright:
          footer.footerCopyright ??
          '© 2024 Korkkikierre. Kaikki oikeudet pidätetään.',
      };
    } catch (error) {
      console.warn('Using default footer due to error:', error);
      return {
        footerTitle: 'Korkkikierre',
        footerContent: 'Tutkimme viinin maailmaa, yksi siemaus kerrallaan.',
        footerCopyright: '© 2024 Korkkikierre. Kaikki oikeudet pidätetään.',
      };
    }
  },
};
