import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    description: 'Header logo and navigation',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navigation',
      type: 'relationship',
      relationTo: 'navigation',
    },
  ],
}
