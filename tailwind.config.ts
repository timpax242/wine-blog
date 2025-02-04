import type { Config } from 'tailwindcss';
import type { PluginUtils } from 'tailwindcss/types/config';
import typographyPlugin from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        logo: ['var(--font-lobster)'],
      },
      colors: {
        burgundy: {
          200: '#E5B8B7',
          700: '#8C1C13',
          800: '#710E0A',
          900: '#560C08',
        },
      },
      typography: ({ theme }: PluginUtils) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            maxWidth: 'none',
            a: {
              color: theme('colors.burgundy.700'),
              '&:hover': {
                color: theme('colors.burgundy.800'),
              },
            },
            h2: {
              color: theme('colors.gray.800'),
              fontWeight: '700',
              fontSize: '1.5em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            h3: {
              color: theme('colors.gray.800'),
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
            },
            strong: {
              color: theme('colors.gray.800'),
            },
            blockquote: {
              color: theme('colors.gray.700'),
              borderLeftColor: theme('colors.burgundy.700'),
              fontStyle: 'italic',
            },
            'ul > li::before': {
              backgroundColor: theme('colors.burgundy.700'),
            },
            'ol > li::before': {
              color: theme('colors.burgundy.700'),
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.75',
          },
        },
      }),
    },
  },
  plugins: [typographyPlugin],
};

export default config;
