import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['app/frontend/**/*.{ts,vue}'],
  },
  {
    ignores: ['node_modules/', 'public/', 'vendor/', 'tmp/'],
  },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    rules: {
      // Formatting-only rules relaxed for a template project
      'vue/multi-word-component-names': 'off',
      // Props keep Rails' snake_case naming (no key transformation layer)
      'vue/prop-name-casing': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/max-attributes-per-line': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'semi': ['warn', 'never'],
      'quotes': ['warn', 'single', { avoidEscape: true }],
    },
  },
)
