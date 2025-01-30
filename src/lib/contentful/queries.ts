import { contentfulClient } from './client';
import type { BlogPost, BlogPostResponse, Category } from './types';

// Helper function to ensure absolute URLs
function ensureAbsoluteUrl(url: string | undefined): string {
  if (!url) return '/placeholder.svg';
  if (url.startsWith('//')) return `https:${url}`;
  return url;
}

export const contentfulQueries = {
  // Get all blog posts with pagination
  getAllPosts: async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const response = await contentfulClient.getEntries<BlogPost>({
      content_type: 'post',
      limit,
      skip,
      order: ['-fields.date'],
    });

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
      total: response.total,
      currentPage: page,
      totalPages: Math.ceil(response.total / limit),
    };
  },

  // Get single post by ID
  getPostById: async (id: string) => {
    try {
      const post = await contentfulClient.getEntry<BlogPost>(id);

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
      return null;
    }
  },

  // Search posts
  searchPosts: async (query: string) => {
    const response = await contentfulClient.getEntries<BlogPost>({
      content_type: 'post',
      query,
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

  getCategories: async () => {
    const response = await contentfulClient.getEntries<Category>({
      content_type: 'category',
      order: ['fields.name'],
      select: ['fields.name', 'fields.slug', 'fields.description', 'sys.id'],
    });

    return response.items.map((item) => ({
      id: item.sys.id,
      name: item.fields.name,
      slug: item.fields.slug,
      description: item.fields.description || '',
    }));
  },
};
