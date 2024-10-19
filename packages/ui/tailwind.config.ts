import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
		colors: {
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
			  DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
			  foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
			success: {
			  DEFAULT: "hsl(var(--success))",
			  foreground: "hsl(var(--success-foreground))",
			},
			sidebar: {
				DEFAULT: 'hsl(var(--sidebar-background))',
				foreground: 'hsl(var(--sidebar-foreground))',
				primary: 'hsl(var(--sidebar-primary))',
				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
				accent: 'hsl(var(--sidebar-accent))',
				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
				border: 'hsl(var(--sidebar-border))',
				ring: 'hsl(var(--sidebar-ring))'
			}
		  },
		  borderRadius: {
			xl: `calc(var(--radius) + 4px)`,
			lg: `var(--radius)`,
			md: `calc(var(--radius) - 2px)`,
			sm: "calc(var(--radius) - 4px)",
		  },
		  fontFamily: {
			sans: ["var(--font-geist-sans)"],
			mono: ["var(--font-geist-mono)"],
		  },
		  transitionProperty: {
			width: "width",
		  },
		  keyframes: {
			"accordion-down": {
			  from: { height: "0px" },
			  to: { height: "var(--radix-accordion-content-height)" },
			},
			"accordion-up": {
			  from: { height: "var(--radix-accordion-content-height)" },
			  to: { height: "0px" },
			},
			"background-shine": {
			  from: {
				backgroundPosition: "0 0",
			  },
			  to: {
				backgroundPosition: "-200% 0",
			  },
			},
			"fade-in-right": {
			  from: {
				opacity: "0",
				transform: "translateX(-400px)",
			  },
			  to: {
				opacity: "1",
				transform: "translateX(0)",
			  },
			},
			"fade-in-left": {
			  from: {
				opacity: "0",
				transform: "translateX(400px)",
			  },
			  to: {
				opacity: "1",
				transform: "translateX(0)",
			  },
			},
			"fade-in": {
			  from: {
				opacity: "0",
			  },
			  to: {
				opacity: "1",
			  },
			},
			"fade-out": {
			  from: {
				opacity: "1",
			  },
			  to: {
				opacity: "0",
			  },
			},
			"spin-around": {
			  "0%": {
				transform: "translateZ(0) rotate(0)",
			  },
			  "15%, 35%": {
				transform: "translateZ(0) rotate(90deg)",
			  },
			  "65%, 85%": {
				transform: "translateZ(0) rotate(270deg)",
			  },
			  "100%": {
				transform: "translateZ(0) rotate(360deg)",
			  },
			},
			slide: {
			  to: {
				transform: "translate(calc(100cqw - 100%), 0)",
			  },
			},
	
			"border-beam": {
			  "100%": {
				"offset-distance": "100%",
			  },
			},
		  },
		  animation: {
			"fade-in-right": "fade-in-right 0.2s ease-in-out",
			"fade-in-left": "fade-in-left 0.2s ease-in-out",
			"accordion-down": "accordion-down 0.2s ease-out",
			"accordion-up": "accordion-up 0.2s ease-out",
			"background-shine": "background-shine 4s linear infinite",
			"text-shimmer": "background-shine 2.5s ease-out infinite alternate",
			"fade-in": "fade-in 0.6s ease-in",
			"fade-out": "fade-out 0.6s ease-out",
			"spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
			slide: "slide var(--speed) ease-in-out infinite alternate",
			"border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
		  },
		},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;



