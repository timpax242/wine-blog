import { Asset, Entry, EntryFields } from 'contentful';
import { Document } from '@contentful/rich-text-types';
import { ReactNode } from 'react';

// Post
export interface PostEntrySkeleton {
  contentTypeId: 'post';
  fields: {
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    hero?: EntryFields.Boolean;
    content: Document;
    excerpt?: EntryFields.Symbol;
    coverImage: Asset;
    date?: EntryFields.Date;
    author?: Entry<AuthorEntrySkeleton>;
    category?: Entry<CategoryEntrySkeleton>[];
  };
}

export type Post = {
  title: string;
  slug: string;
  hero?: boolean;
  content: Document;
  excerpt?: string;
  image: string;
  date?: string;
  author?: {
    name: string;
    bio?: string;
    image?: string;
  };
  category?: {
    name?: string;
    slug: string;
    description?: string;
  }[];
};

export type PostsResponse = {
  posts: Post[];
  total: number;
  currentPage: number;
  totalPages: number;
};

// Author
export type AuthorEntrySkeleton = {
  contentTypeId: 'author';
  fields: {
    name: EntryFields.Symbol;
    bio?: EntryFields.Symbol;
    image?: Asset;
  };
};

export type Author = {
  name: string;
  bio?: string;
  image?: Asset;
};

// Category
export type CategoryEntrySkeleton = {
  contentTypeId: 'category';
  fields: {
    name?: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    description?: Document;
  };
};

export type Category = {
  name?: string;
  slug: string;
  description?: Document;
};

// Navigation
export type MainNavigationEntrySkeleton = {
  contentTypeId: 'mainNavigation';
  fields: {
    title?: EntryFields.Symbol;
    menuItems?: Entry<MenuItemEntrySkeleton>[];
  };
};

export type MainNavigation = {
  title?: string;
  menuItems?: MenuItem[];
};

export type MenuItemEntrySkeleton = {
  contentTypeId: 'menuItem';
  fields: {
    title?: EntryFields.Symbol;
    url?: EntryFields.Symbol;
    order?: EntryFields.Integer;
    isExternal?: EntryFields.Boolean;
  };
};

export type MenuItem = {
  title?: string;
  url?: string;
  order?: number;
  isExternal?: boolean;
};

// Footer
export type FooterEntrySkeleton = {
  contentTypeId: 'footer';
  fields: {
    footerTitle?: EntryFields.Symbol;
    footerContent?: Document;
    footerCopyright?: EntryFields.Symbol;
  };
};
export type Footer = {
  footerTitle: string;
  footerContent: string | ReactNode;
  footerCopyright: string;
};
