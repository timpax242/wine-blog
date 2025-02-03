# AI-Assisted Next.js Blog with Contentful

This is a modern blog application built with [Next.js](https://nextjs.org), leveraging AI-assisted development tools and Contentful as a headless CMS. The project was developed using [Cursor](https://cursor.sh/) editor and [V0](https://v0.dev/) for rapid UI prototyping.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Content Management**: [Contentful](https://www.contentful.com/) Headless CMS
- **Styling**: Tailwind CSS
- **Development Tools**:
  - Cursor Editor (AI-powered development)
  - V0 (AI UI generation)
  - TypeScript for type safety

## Getting Started

First, set up your environment variables:

```bash
cp .env.example .env.local
```

Add your Contentful credentials to `.env.local`:

```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- 📝 Blog posts managed through Contentful CMS
- 🎨 Modern UI components from Shadcn UI
- 📱 Responsive design with Tailwind CSS
- ⚡ Server-side rendering for optimal performance
- 🤖 AI-assisted development workflow

## AI Development Workflow

This project showcases modern AI-assisted development practices:

- **Cursor Editor**: Used for intelligent code completion and AI-powered development assistance
- **V0**: Employed for rapid UI prototyping and component generation
- **TypeScript**: Enhanced with AI-powered type suggestions and error detection

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Contentful Documentation](https://www.contentful.com/developers/docs/)
- [Cursor Editor](https://cursor.sh/)
- [V0 Documentation](https://v0.dev/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
