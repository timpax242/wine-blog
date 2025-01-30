export interface BlogPost {
  fields: {
    title: string;
    slug: string;
    content: any; // Rich text content
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
  fields: {
    name: string;
    slug: string;
    description?: string; // Optional description field
  };
  sys: {
    id: string;
  };
}
