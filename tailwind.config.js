/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#6366f1',
                secondary: '#8b5cf6',
                accent: '#06b6d4',
                'dark-bg': '#0a0a0f',
                'dark-surface': '#121218',
                'dark-card': '#1a1a24',
            },
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
                display: ['Orbitron', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
