/** @type {import('tailwindcss').Config} */
// Configuración de Tailwind para KotoDojo.
// Tras cambiar clases en index.html, js/ o data/, regenera el CSS con:  npm run build:css
module.exports = {
    content: ['./index.html', './js/**/*.js', './data/**/*.js'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                jp: ['"Noto Sans JP"', 'sans-serif']
            },
            colors: {
                sakura: {
                    50: '#fff1f2',
                    100: '#ffe4e6',
                    200: '#fecdd3',
                    300: '#fda4af',
                    400: '#fb7185',
                    500: '#f43f5e',
                    600: '#e11d48',
                    700: '#be123c'
                },
                matcha: {
                    400: '#a3e635',
                    500: '#84cc16',
                    600: '#65a30d',
                    700: '#4d7c0f'
                }
            }
        }
    }
};
