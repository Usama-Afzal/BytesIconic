/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                accent: 'var(--color-accent)',
                bg: 'var(--color-bg)',
                surface: 'var(--color-surface)',
                card: 'var(--color-card)',
                text: 'var(--color-text)',
                'text-muted': 'var(--color-text-muted)',
                border: 'var(--color-border)',
            },
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
                display: ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
    darkMode: 'class', // Enable class-based dark mode
}
