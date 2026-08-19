import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  admin: {
    description: 'Company info, contact details, social links',
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      defaultValue: 'EL WAHEED SHOES',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+20 1114093000',
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'ELWAHEED@GMAIL.COM',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      defaultValue: '201114093000',
    },
    {
      name: 'facebookUrl',
      type: 'text',
      defaultValue: 'https://www.facebook.com/@alwaheed100/',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          localized: true,
        },
        {
          name: 'city',
          type: 'text',
          defaultValue: 'El Mahalla El Kubra',
        },
        {
          name: 'governorate',
          type: 'text',
          defaultValue: 'Gharbia',
        },
        {
          name: 'country',
          type: 'text',
          defaultValue: 'Egypt',
        },
        {
          name: 'coordinates',
          type: 'group',
          fields: [
            {
              name: 'lat',
              type: 'number',
            },
            {
              name: 'lng',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'EL WAHEED SHOES - Egyptian Footwear Manufacturer',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Premium Egyptian footwear manufacturer since 2010. 15+ years of manufacturing excellence. Wholesale, OEM, and private label footwear production.',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
