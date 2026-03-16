import type { Block } from 'payload'

export const SponsorsBlock: Block = {
  slug: 'sponsorsBlock',
  interfaceName: 'SponsorsBlock',
  labels: {
    singular: 'Sponsors',
    plural: 'Sponsors',
  },
  admin: {
    disableBlockName: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Sponsors',
    },
    {
      name: 'sponsors',
      type: 'array',
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            placeholder: 'https://example.com',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}
