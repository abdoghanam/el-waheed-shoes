import type { CollectionConfig } from 'payload'
import { adminOnly } from '../access/admin'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description: 'Upload and manage images and files',
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    fileSize: 10 * 1024 * 1024,
  },
  access: {
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}
