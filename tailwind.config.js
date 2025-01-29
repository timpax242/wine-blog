module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Lobster", "cursive"],
      },
      colors: {
        burgundy: {
          200: "#E5B8B7",
          700: "#8C1C13",
          800: "#710E0A",
          900: "#560C08",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.900"),
            maxWidth: "none",
            a: {
              color: theme("colors.burgundy.700"),
              "&:hover": {
                color: theme("colors.burgundy.800"),
              },
            },
            h2: {
              color: theme("colors.gray.800"),
              fontWeight: "700",
              fontSize: "1.5em",
              marginTop: "1.5em",
              marginBottom: "0.5em",
            },
            h3: {
              color: theme("colors.gray.800"),
              fontWeight: "600",
              fontSize: "1.25em",
              marginTop: "1.5em",
              marginBottom: "0.5em",
            },
            strong: {
              color: theme("colors.gray.800"),
            },
            blockquote: {
              color: theme("colors.gray.700"),
              borderLeftColor: theme("colors.burgundy.700"),
              fontStyle: "italic",
            },
            "ul > li::before": {
              backgroundColor: theme("colors.burgundy.700"),
            },
            "ol > li::before": {
              color: theme("colors.burgundy.700"),
            },
          },
        },
        lg: {
          css: {
            fontSize: "1.125rem",
            lineHeight: "1.75",
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

