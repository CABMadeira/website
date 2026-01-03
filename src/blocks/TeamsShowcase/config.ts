import { Block } from 'payload'

export const TeamsShowcase: Block = {
  slug: 'teamsShowcase',
  labels: {
    singular: 'Teams Showcase',
    plural: 'Teams Showcase',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'Equipes',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Conheça Nossas Equipes',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Tres cohortes fortitudinem et gloriam in ludo haberent - Três categorias, uma missão',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      defaultValue: 'Conhecer Equipe',
    },
    {
      name: 'teams',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'players',
          type: 'number',
          required: true,
        },
        {
          name: 'achievements',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
