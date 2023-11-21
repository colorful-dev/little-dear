import antfu from '@antfu/eslint-config'

// @ts-expect-error missing types
import tailwind from 'eslint-plugin-tailwindcss'

// @ts-expect-error missing types
import react from 'eslint-plugin-react'

// @ts-expect-error missing types
import hooks from 'eslint-plugin-react-hooks'

// @ts-expect-error missing types
import next from '@next/eslint-plugin-next'

export default antfu({
  typescript: {
    parserOptions: {
      project: true,
    },
  },
  rules: {
    'ts/array-type': 'off',
    'ts/consistent-type-definitions': 'off',

    'ts/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    'ts/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

    'no-console': 'warn',
    'node/prefer-global/process': 'off',
  },
}, {
  files: ['**/*.ts', '**/*.tsx'],
  plugins: {
    'react': react,
    'tailwindcss': tailwind,
    '@next/next': next,
    'react-hooks': hooks,
  },
  rules: {
    ...react.configs['jsx-runtime'].rules,
    ...hooks.configs.recommended.rules,
    ...next.configs.recommended.rules,
    ...next.configs['core-web-vitals'].rules,
    ...tailwind.configs.recommended.rules,
  },
})
