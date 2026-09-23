import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import globals from 'globals'

export default defineConfigWithVueTs(
    { ignores: ['dist/**', '.docker/**', 'public/**'] },
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    {
        languageOptions: {
            globals: { ...globals.browser },
        },
        rules: {
            // Single-word names (Header, Footer, Content ...) are used throughout this theme.
            'vue/multi-word-component-names': 'off',
        },
    },
    {
        files: ['vite.config.ts', 'eslint.config.ts', 'tests/**'],
        languageOptions: { globals: { ...globals.node } },
    },
)
