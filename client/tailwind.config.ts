
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'orbitron': ['Orbitron', 'sans-serif'],
				'exo': ['Exo 2', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: 'hsl(var(--primary))',
				'primary-foreground': 'hsl(var(--primary-foreground))',
				secondary: 'hsl(var(--secondary))',
				'secondary-foreground': 'hsl(var(--secondary-foreground))',
				destructive: 'hsl(var(--destructive))',
				'destructive-foreground': 'hsl(var(--destructive-foreground))',
				muted: 'hsl(var(--muted))',
				'muted-foreground': 'hsl(var(--muted-foreground))',
				accent: 'hsl(var(--accent))',
				'accent-foreground': 'hsl(var(--accent-foreground))',
				popover: 'hsl(var(--popover))',
				'popover-foreground': 'hsl(var(--popover-foreground))',
				card: 'hsl(var(--card))',
				'card-foreground': 'hsl(var(--card-foreground))',
				// Custom neon colors
				'neon-blue': '#00FFFF',
				'neon-purple': '#A020F0',
				'neon-pink': '#FF10F0',
				'dark-bg': '#0A0A0F',
				'darker-bg': '#05050A',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'pulse-neon': {
					'0%, 100%': { 
						boxShadow: '0 0 15px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.6), 0 0 45px rgba(0, 255, 255, 0.4)' 
					},
					'50%': { 
						boxShadow: '0 0 20px rgba(0, 255, 255, 0.9), 0 0 40px rgba(0, 255, 255, 0.7), 0 0 60px rgba(0, 255, 255, 0.5)' 
					},
				},
				'pulse-purple': {
					'0%, 100%': { 
						boxShadow: '0 0 15px rgba(160, 32, 240, 0.8), 0 0 30px rgba(160, 32, 240, 0.6), 0 0 45px rgba(160, 32, 240, 0.4)' 
					},
					'50%': { 
						boxShadow: '0 0 20px rgba(160, 32, 240, 0.9), 0 0 40px rgba(160, 32, 240, 0.7), 0 0 60px rgba(160, 32, 240, 0.5)' 
					},
				},
				'pulse-pink': {
					'0%, 100%': { 
						boxShadow: '0 0 15px rgba(255, 16, 240, 0.8), 0 0 30px rgba(255, 16, 240, 0.6), 0 0 45px rgba(255, 16, 240, 0.4)' 
					},
					'50%': { 
						boxShadow: '0 0 20px rgba(255, 16, 240, 0.9), 0 0 40px rgba(255, 16, 240, 0.7), 0 0 60px rgba(255, 16, 240, 0.5)' 
					},
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'glow': {
					'0%, 100%': { filter: 'brightness(1)' },
					'50%': { filter: 'brightness(1.3)' },
				},
				'background-pan': {
					'0%': { backgroundPosition: '0% center' },
					'100%': { backgroundPosition: '-200% center' },
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-neon': 'pulse-neon 2s infinite',
				'pulse-purple': 'pulse-purple 2s infinite',
				'pulse-pink': 'pulse-pink 2s infinite',
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'background-pan': 'background-pan 3s linear infinite',
				'fade-in': 'fade-in 0.5s ease-out',
			},
			boxShadow: {
				'neon-blue': '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF, 0 0 20px #00FFFF',
				'neon-purple': '0 0 5px #A020F0, 0 0 10px #A020F0, 0 0 15px #A020F0, 0 0 20px #A020F0',
				'neon-pink': '0 0 5px #FF10F0, 0 0 10px #FF10F0, 0 0 15px #FF10F0, 0 0 20px #FF10F0',
				'card-glow': '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'neon-grid': 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
				'neon-glow': 'linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(160, 32, 240, 0.1), rgba(255, 16, 240, 0.1))',
			},
			backgroundSize: {
				'grid': '30px 30px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
