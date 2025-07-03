import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends(
    '@rocketseat/eslint-config/next',
    'next/core-web-vitals',
    'next/typescript',
  ),
  ...compat.plugins('simple-import-sort'),
  ...compat.config({
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
    parserOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
  }),
]

export default eslintConfig
