import { Document } from '@contentful/rich-text-types';
import type { Entry } from 'contentful';

export interface BlogPost {
  contentTypeId: 'post';
  fields: {
    title: string;
    slug: string;
    content: Document;
    excerpt: string;
    coverImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    date: string;
    author?: {
      fields: {
        name?: string;
        // Add other author fields if needed
      };
    };
    category?: {
      fields: {
        name: string;
        slug: string;
        description?: string;
      };
      sys: {
        id: string;
      };
    };
  };
  sys: {
    id: string;
    createdAt: string;
  };
}

export interface BlogPostResponse {
  items: BlogPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  contentTypeId: 'category';
  fields: {
    name: string;
    slug: string;
    description?: string;
  };
  sys: {
    id: string;
  };
}

export interface Footer {
  fields: {
    footerTitle: string;
    footerContent: Document;
    footerCopyright: string;
  };
}
