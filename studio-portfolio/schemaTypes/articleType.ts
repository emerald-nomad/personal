import {defineField, defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          fields: [
            defineField({
              name: 'caption',
              type: 'string',
            }),
          ],
        },
        {
          type: 'code',
          options: {
            language: 'javascript',
            languageAlternatives: [
              {title: 'Javascript', value: 'javascript'},
              {title: 'Rust', value: 'rust'},
              {title: 'C', value: 'clike'},
            ],
          },
        },
      ],
    }),
  ],
})
