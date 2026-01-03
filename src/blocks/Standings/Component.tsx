import React from 'react'

interface Team {
    position: number
    team: string
    games: number
    wins: number
    losses: number
    points: number
}

interface Category {
    categoryTitle: string
    emoji: string
    teams: Team[]
}

interface StandingsBlockProps {
    label?: string
    title?: string
    description?: string
    categories?: Category[]
}

const StandingsTable: React.FC<{ category: Category }> = ({ category }) => {
    return (
        <div className="dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 bg-gradient-to-br from-blue-50 to-white rounded-2xl overflow-hidden dark:border dark:border-slate-700 border border-blue-200 dark:hover:border-yellow-400/30 hover:border-purple-400 transition-all dark:hover:shadow-xl dark:hover:shadow-slate-900/50 hover:shadow-lg hover:shadow-purple-400/20">
            <div className="dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 px-8 py-6 dark:border-b dark:border-slate-700 border-b border-blue-200">
                <h3 className="text-2xl font-black dark:text-white text-slate-900">
                    <span className="text-2xl mr-2">{category.emoji}</span>
                    {category.categoryTitle}
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="dark:bg-slate-900/80 dark:border-b dark:border-slate-700 bg-blue-50 border-b border-blue-200">
                            <th className="px-6 py-4 text-left text-xs font-black dark:text-gray-400 text-slate-600 uppercase tracking-wider">#</th>
                            <th className="px-6 py-4 text-left text-xs font-black dark:text-gray-400 text-slate-600 uppercase tracking-wider">Equipe</th>
                            <th className="px-6 py-4 text-center text-xs font-black dark:text-gray-400 text-slate-600 uppercase tracking-wider">J</th>
                            <th className="px-6 py-4 text-center text-xs font-black dark:text-gray-400 text-slate-600 uppercase tracking-wider">V</th>
                            <th className="px-6 py-4 text-center text-xs font-black dark:text-gray-400 text-slate-600 uppercase tracking-wider">D</th>
                            <th className="px-6 py-4 text-center text-xs font-black dark:text-gray-400 text-slate-600 uppercase tracking-wider">PTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.teams && category.teams.map((row, idx) => (
                            <tr
                                key={row.position}
                                className={`dark:border-b dark:border-slate-700/50 border-b border-blue-100 dark:hover:bg-slate-700/30 hover:bg-blue-100 transition-colors ${idx === 0 ? 'dark:bg-yellow-400/5 bg-purple-50' : ''}`}
                            >
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-sm ${row.position === 1 ? 'dark:bg-yellow-400 dark:text-slate-900 bg-yellow-400 text-white' : row.position === 2 ? 'dark:bg-gray-400 dark:text-slate-900 bg-gray-400 text-white' : row.position === 3 ? 'dark:bg-orange-600 dark:text-white bg-orange-600 text-white' : 'dark:text-gray-400 text-slate-600'
                                        }`}>
                                        {row.position}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`font-bold text-sm ${row.team.includes('Our Club') ? 'dark:text-yellow-400 text-purple-600' : 'dark:text-white text-slate-900'
                                        }`}>
                                        {row.team}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center dark:text-gray-300 text-slate-700 font-semibold">{row.games}</td>
                                <td className="px-6 py-4 text-center dark:text-green-400 text-green-600 font-black">{row.wins}</td>
                                <td className="px-6 py-4 text-center dark:text-red-400 text-red-600 font-black">{row.losses}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="font-black text-lg dark:text-yellow-400 text-purple-600">{row.points}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

type Props = {
    className?: string
} & StandingsBlockProps

export const StandingsBlock: React.FC<Props> = ({
    label = 'Classificações',
    title = 'Tabela de Posições',
    description = 'Positio athletarum in certamine - Acompanhe a classificação de todas as categorias',
    categories = []
}) => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container">
                <div className="mb-16">
                    <div className="inline-block mb-4">
                        <span className="dark:text-yellow-400 text-purple-600 text-sm font-bold uppercase tracking-widest">{label}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black dark:text-white text-slate-900 mb-4">
                        <span className="dark:bg-gradient-to-r dark:from-yellow-400 dark:via-orange-400 dark:to-red-500 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {title}
                        </span>
                    </h2>
                    <p className="dark:text-gray-400 text-slate-600 text-lg max-w-2xl">{description}</p>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                    {categories && categories.map((category, idx) => (
                        <StandingsTable key={idx} category={category} />
                    ))}
                </div>
            </div>
        </section>
    )
}

