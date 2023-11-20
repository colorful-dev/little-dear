import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import { tailwindTheme } from './src/config'

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    colors: tailwindTheme as Config['theme'],
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config
