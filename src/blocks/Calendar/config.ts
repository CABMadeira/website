import { Block } from 'payload'

export const Calendar: Block = {
  slug: 'calendar',
  labels: {
    singular: 'Calendar',
    plural: 'Calendar',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'Calendário',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Próximas Partidas',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Pugna futura et gloria expectanda - Acompanhe o calendário de jogos',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      defaultValue: 'Ver Calendário Completo',
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
