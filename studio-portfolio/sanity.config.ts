import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool} from 'sanity/presentation'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {media} from 'sanity-plugin-media'
import {StreamLanguage} from '@codemirror/language'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio',
  projectId: process.env.SANITY_STUDIO_SANITY_PROJECT_ID as string,
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
    presentationTool({
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
