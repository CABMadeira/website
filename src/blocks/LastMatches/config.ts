import { Block } from 'payload'

export const LastMatches: Block = {
  slug: 'lastMatches',
  labels: {
    singular: 'Last Matches',
    plural: 'Last Matches',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'Resultados',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Últimas Partidas',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'Spectaculum praeteriti victoriarum - Reviva os melhores momentos das nossas equipes',
    },
    {
      name: 'matches',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'id',
          type: 'text',
          required: true,
        },
        {
          name: 'team1',
          type: 'text',
          required: true,
        },
        {
          name: 'team2',
          type: 'text',
          required: true,
        },
        {
          name: 'score1',
          type: 'number',
          required: true,
        },
        {
          name: 'score2',
          type: 'number',
          required: true,
        },
        {
          name: 'date',
          type: 'text',
          required: true,
        },
        {
          name: 'competition',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
