import { Document } from '@contentful/rich-text-types';
import type { Entry, EntryFields } from 'contentful';

export interface Author {
  contentTypeId: 'author';
  fields: {
    name: EntryFields.Text;
  };
  sys: {
    id: string;
  };
}

export interface BlogPost {
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
        name: string;
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
}

export interface BlogPostResponse {
  items: BlogPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  fields: {
    name: string;
    slug: string;
    description?: string;
  };
}

export interface Footer {
  fields: {
    footerTitle: string;
    footerContent: Document;
    footerCopyright: string;
  };
}
