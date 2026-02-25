import type { Block } from 'payload'

export const ShopFeaturedBlock: Block = {
    slug: 'shopFeaturedBlock',
    interfaceName: 'ShopFeaturedBlock',
    labels: {
        singular: 'Shop Featured',
        plural: 'Shop Featured',
    },
    fields: [
        {
            name: 'isCompactView',
            label: 'Compact View',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                description: 'Show only 3 products with a link to the full shop',
            },
        },
        {
            name: 'shopApiUrl',
            label: 'Shop API URL',
            type: 'text',
            required: true,
            admin: {
                placeholder: 'https://example.com/api/shop',
            },
        },
    ],
}
