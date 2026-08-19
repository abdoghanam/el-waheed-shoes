import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access/admin'

export const Blog: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    description: 'Manage blog articles and news',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'createdAt'],
  },
  access: {
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      maxLength: 300,
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Manufacturing', value: 'manufacturing' },
        { label: 'Quality', value: 'quality' },
        { label: 'Industry News', value: 'news' },
        { label: 'Sustainability', value: 'sustainability' },
      ],
      defaultValue: 'manufacturing',
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'EL WAHEED SHOES Team',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
  ],
}
