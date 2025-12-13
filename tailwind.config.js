/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                swan: {
                    white: '#f8f9fa',
                    blue: '#4a90e2',
                    dark: '#343a40',
                }
            }
        },
    },
    plugins: [],
}
