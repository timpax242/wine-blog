import { contentfulClient } from './client';
import type { BlogPost, BlogPostResponse, Category, Footer } from './types';

// Helper function to ensure image URLs are absolute
function ensureAbsoluteUrl(url: string | undefined): string {
  if (!url) return '/placeholder.svg'; // Fallback for missing images
  if (url.startsWith('//')) return `https:${url}`; // Fix protocol-relative URLs
  return url;
}

export const contentfulQueries = {
  // Get all blog posts with pagination
  getAllPosts: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit; // Calculate offset for pagination

    const response = await contentfulClient.getEntries<BlogPost>({
      content_type: 'post',
      limit, // How many posts to fetch
      skip, // How many posts to skip
      order: ['-sys.createdAt'], // Use system timestamp instead of custom date field
    });

    // Transform Contentful response into our app's format
    return {
      posts: response.items.map((item) => ({
        id: item.sys.id,
        title: item.fields.title,
        slug: item.fields.slug,
        excerpt: item.fields.excerpt,
        content: item.fields.content,
        image: ensureAbsoluteUrl(item.fields.coverImage?.fields?.file?.url),
        date: item.fields.date,
        author: item.fields.author?.fields?.name,
      })),
      total: response.total, // Total number of posts
      currentPage: page, // Current page number
      totalPages: Math.ceil(response.total / limit), // Calculate total pages
    };
  },

  // Get a single post by its ID
  getPostById: async (id: string) => {
    try {
      const post = await contentfulClient.getEntry<BlogPost>(id);

      // Transform single post into our app's format
      return {
        id: post.sys.id,
        title: post.fields.title,
        slug: post.fields.slug,
        excerpt: post.fields.excerpt,
        content: post.fields.content,
        image: ensureAbsoluteUrl(post.fields.coverImage?.fields?.file?.url),
        date: post.fields.date,
        author: post.fields.author?.fields?.name,
      };
    } catch (error) {
      return null; // Return null if post not found
    }
  },

  // Get all categories
  getCategories: async () => {
    const response = await contentfulClient.getEntries<Category>({
      content_type: 'category',
      order: ['fields.name'], // Sort alphabetically by name
      select: [
        // Only fetch these fields
        'fields.name',
        'fields.slug',
        'fields.description',
        'sys.id',
      ],
    });

    // Transform categories into our app's format
    return response.items.map((item) => ({
      id: item.sys.id,
      name: item.fields.name,
      slug: item.fields.slug,
      description: item.fields.description || '',
    }));
  },

  getPostsByCategory: async (categorySlug: string) => {
    // First get the category to get its ID
    const categoryResponse = await contentfulClient.getEntries<Category>({
      content_type: 'category',
      'fields.slug': categorySlug,
      limit: 1,
    });

    if (!categoryResponse.items.length) {
      return [];
    }

    const categoryId = categoryResponse.items[0].sys.id;

    // Then get all posts that reference this category
    const response = await contentfulClient.getEntries<BlogPost>({
      content_type: 'post',
      'fields.category.sys.id': categoryId, // Changed from [in] operator to direct reference
      order: ['-fields.date'],
      include: 2,
    });

    return response.items.map((item) => ({
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

  getFooter: async (): Promise<FooterResponse> => {
    const response = await contentfulClient.getEntries<Footer>({
      content_type: 'footer',
      limit: 1,
    });

    if (!response.items.length) {
      return {
        title: 'Korkkikierre',
        content: 'Tutkimme viinin maailmaa, yksi siemaus kerrallaan.',
        copyright: '© 2024 Korkkikierre. Kaikki oikeudet pidätetään.',
      };
    }

    const footer = response.items[0].fields;
    return {
      title: footer.footerTitle,
      content: footer.footerContent,
      copyright: footer.footerCopyright,
    };
  },
};
