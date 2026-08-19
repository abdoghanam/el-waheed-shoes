import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'homePage',
  admin: {
    description: 'Homepage content and layout',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'headline',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Egyptian Footwear Manufacturing Excellence Since 2010',
        },
        {
          name: 'subheadline',
          type: 'text',
          localized: true,
          defaultValue: 'High-quality footwear production for wholesalers, brands, and global partners.',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'cta',
          type: 'array',
          maxRows: 2,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
          defaultValue: [
            { label: 'Request A Quote', url: '/quote' },
            { label: 'Explore Products', url: '/products' },
          ],
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'suffix',
          type: 'text',
        },
      ],
      defaultValue: [
        { value: '15', suffix: '+', label: 'Years Experience' },
        { value: '120', suffix: '', label: 'Skilled Workers' },
        { value: '25,000', suffix: '', label: 'Pairs Monthly Production' },
        { value: '4,000', suffix: ' m²', label: 'Factory Area' },
      ],
    },
    {
      name: 'whyChooseUs',
      type: 'group',
      localized: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Why Choose EL WAHEED SHOES',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'We combine Egyptian craftsmanship with modern manufacturing technology to deliver footwear that meets international quality standards.',
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'icon',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
