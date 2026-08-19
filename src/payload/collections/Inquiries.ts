import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'companyName',
    description: 'Customer quote requests and inquiries — only admins can read/update/delete. Public creation is handled by /api/contact and /api/quote with rate limiting.',
    defaultColumns: ['companyName', 'contactPerson', 'country', 'status', 'priority', 'createdAt'],
  },
  access: {
    create: ({ req: { user } }) => !!user,
    read: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      required: true,
    },
    {
      name: 'contactPerson',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'productCategory',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'requiredQuantity',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'designFile',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
