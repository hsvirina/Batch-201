import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'], // игнорируем сам конфиг
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module', // лучше module для NestJS
      parserOptions: {
        project: './tsconfig.json', // путь к tsconfig
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
      },
    },
  },
  {
    rules: {
      // Обычные правила для всего проекта
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
    overrides: [
      {
        files: ['src/**/*.dto.ts'], // отключаем для всех DTO
        rules: {
          '@typescript-eslint/no-unsafe-call': 'off',
          '@typescript-eslint/no-unsafe-argument': 'off',
        },
      },
    ],
  }
);
