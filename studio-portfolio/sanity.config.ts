import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {media} from 'sanity-plugin-media'
import {StreamLanguage} from '@codemirror/language'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',
  projectId: '',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
    media(),
    codeInput({
      codeModes: [
        {
          name: 'rust',
          // dynamic import so the language is only be loaded on demand
          loader: () =>
            import('@codemirror/legacy-modes/mode/rust').then(({rust}) =>
              StreamLanguage.define(rust),
            ),
        },
        {
          name: 'c',
          // dynamic import so the language is only be loaded on demand
          loader: () =>
            import('@codemirror/legacy-modes/mode/clike').then(({c}) => StreamLanguage.define(c)),
        },
      ],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
