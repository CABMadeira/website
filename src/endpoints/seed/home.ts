import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'home',
      media: heroImage.id,
    },
    layout: [
      {
        blockName: 'Last Matches Block',
        blockType: 'lastMatches',
        label: 'Resultados',
        title: 'Últimas Partidas',
        description: 'Confira os resultados das partidas mais recentes de nossos times.',
        matches: [
          {
            id: '1',
            team1: 'Elite Basketball Club',
            team2: 'City Riders',
            score1: 85,
            score2: 72,
            date: '2025-01-02',
            competition: 'Liga Nacional',
          },
          {
            id: '2',
            team1: 'Urban Warriors',
            team2: 'Elite Basketball Club',
            score1: 78,
            score2: 82,
            date: '2024-12-30',
            competition: 'Liga Nacional',
          },
          {
            id: '3',
            team1: 'Elite Basketball Club',
            team2: 'Summit Kings',
            score1: 91,
            score2: 68,
            date: '2024-12-28',
            competition: 'Liga Nacional',
          },
        ],
      },
      {
        blockName: 'Calendar Block',
        blockType: 'calendar',
        label: 'Calendário',
        title: 'Próximas Partidas',
        description: 'Confira o calendário de partidas programadas para as próximas semanas.',
        buttonText: 'Ver Calendário Completo',
        matches: [
          {
            id: '1',
            team1: 'Elite Basketball Club',
            team2: 'Phoenix Rising',
            date: '2025-01-15',
            competition: 'Liga Nacional',
          },
          {
            id: '2',
            team1: 'Elite Basketball Club',
            team2: 'Thunder Force',
            date: '2025-01-18',
            competition: 'Copa Regional',
          },
          {
            id: '3',
            team1: 'Urban Warriors',
            team2: 'Elite Basketball Club',
            date: '2025-01-22',
            competition: 'Liga Nacional',
          },
          {
            id: '4',
            team1: 'Elite Basketball Club',
            team2: 'Dynasty Sports',
            date: '2025-01-25',
            competition: 'Liga Nacional',
          },
          {
            id: '5',
            team1: 'Elite Basketball Club',
            team2: 'Northern Legends',
            date: '2025-02-01',
            competition: 'Copa Regional',
          },
        ],
      },
      {
        blockName: 'Standings Block',
        blockType: 'standings',
        label: 'Classificação',
        title: 'Tabela de Classificação',
        description: 'Acompanhe a posição de todas as equipes na liga.',
        categories: [
          {
            categoryTitle: 'Série A - Homens',
            emoji: '🏀',
            teams: [
              {
                position: 1,
                team: 'Elite Basketball Club',
                games: 24,
                wins: 20,
                losses: 4,
                points: 40,
              },
              {
                position: 2,
                team: 'Urban Warriors',
                games: 24,
                wins: 18,
                losses: 6,
                points: 36,
              },
              {
                position: 3,
                team: 'City Riders',
                games: 24,
                wins: 16,
                losses: 8,
                points: 32,
              },
              {
                position: 4,
                team: 'Summit Kings',
                games: 24,
                wins: 12,
                losses: 12,
                points: 24,
              },
            ],
          },
          {
            categoryTitle: 'Série B - Mulheres',
            emoji: '👩‍🦰',
            teams: [
              {
                position: 1,
                team: 'Elite Warriors Women',
                games: 20,
                wins: 18,
                losses: 2,
                points: 36,
              },
              {
                position: 2,
                team: 'Phoenix Femme',
                games: 20,
                wins: 16,
                losses: 4,
                points: 32,
              },
              {
                position: 3,
                team: 'Diamond Queens',
                games: 20,
                wins: 14,
                losses: 6,
                points: 28,
              },
              {
                position: 4,
                team: 'Starlight Stars',
                games: 20,
                wins: 10,
                losses: 10,
                points: 20,
              },
            ],
          },
          {
            categoryTitle: 'Youth - Crianças',
            emoji: '🧒',
            teams: [
              {
                position: 1,
                team: 'Elite Kids Team',
                games: 16,
                wins: 15,
                losses: 1,
                points: 30,
              },
              {
                position: 2,
                team: 'Young Legends',
                games: 16,
                wins: 13,
                losses: 3,
                points: 26,
              },
              {
                position: 3,
                team: 'Rising Stars Academy',
                games: 16,
                wins: 11,
                losses: 5,
                points: 22,
              },
              {
                position: 4,
                team: 'Future Champions',
                games: 16,
                wins: 8,
                losses: 8,
                points: 16,
              },
            ],
          },
        ],
      },
      {
        blockName: 'Teams Showcase Block',
        blockType: 'teamsShowcase',
        label: 'Equipes',
        title: 'Conheça Nossas Equipes',
        description:
          'Conheça os times profissionais, amadores e infantis que representam nosso clube.',
        buttonText: 'Saiba Mais',
        teams: [
          {
            icon: '🏀',
            category: 'Série A - Homens',
            description:
              'Nossa equipe principal competindo na liga nacional. Com talentos consolidados e atletas em desenvolvimento, buscamos o título todos os anos.',
            players: 15,
            achievements: '5 títulos consecutivos',
          },
          {
            icon: '👩‍🦰',
            category: 'Série B - Mulheres',
            description:
              'Equipe feminina em crescimento constante. Com atletas dedicadas e um programa forte de base, estamos construindo o futuro do basquete feminino.',
            players: 12,
            achievements: '3 títulos estaduais',
          },
          {
            icon: '🧒',
            category: 'Categoria Infantil',
            description:
              'Programa de base focado em desenvolvimento técnico e formação de cidadãos. Investindo nas futuras gerações de atletas.',
            players: 40,
            achievements: '8 títulos em categorias de base',
          },
        ],
      },
    ],
    meta: {
      description: 'An open-source website built with Payload and Next.js.',
      image: heroImage.id,
      title: 'Payload Website Template',
    },
    title: 'Home',
  }
}
