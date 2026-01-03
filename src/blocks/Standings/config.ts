import { Block } from 'payload'

export const Standings: Block = {
  slug: 'standings',
  labels: {
    singular: 'Standings',
    plural: 'Standings',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'Classificações',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Tabela de Posições',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Positio athletarum in certamine - Acompanhe a classificação de todas as categorias',
    },
    {
      name: 'categories',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'categoryTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'emoji',
          type: 'text',
          required: true,
        },
        {
          name: 'teams',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'position',
              type: 'number',
              required: true,
            },
            {
              name: 'team',
              type: 'text',
              required: true,
            },
            {
              name: 'games',
              type: 'number',
              required: true,
            },
            {
              name: 'wins',
              type: 'number',
              required: true,
            },
            {
              name: 'losses',
              type: 'number',
              required: true,
            },
            {
              name: 'points',
              type: 'number',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
