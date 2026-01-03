import React from 'react'

interface Match {
    id: string
    team1: string
    team2: string
    score1: number
    score2: number
    date: string
    competition?: string
}

interface LastMatchesBlockProps {
    label?: string
    title?: string
    description?: string
    matches?: Match[]
}

const MatchCardHorizontal: React.FC<{ match: Match }> = ({ match }) => {
    const isWin = match.score1 > match.score2

    return (
        <div className="group dark:bg-gradient-to-r dark:from-slate-800 dark:via-slate-750 dark:to-slate-800 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 rounded-xl p-5 dark:border dark:border-slate-700 border border-blue-200 dark:hover:border-yellow-400/50 hover:border-purple-400 transition-all dark:hover:shadow-xl dark:hover:shadow-yellow-400/10 hover:shadow-lg hover:shadow-purple-400/20">
            <div className="flex items-center justify-between gap-6">
                {/* Team 1 */}
                <div className="flex-1 text-right">
                    <p className="text-sm font-bold dark:text-white text-slate-900 dark:group-hover:text-yellow-400 group-hover:text-purple-600 transition-colors">
                        {match.team1}
                    </p>
                    <p className="text-xs dark:text-gray-500 text-slate-500 mt-1">{match.competition}</p>
                </div>

                {/* Score */}
                <div className="flex flex-col items-center gap-1 min-w-[100px]">
                    <div className="flex items-center gap-3">
                        <span className={`text-3xl font-black ${isWin ? 'dark:text-green-400 text-green-600' : 'dark:text-red-400 text-red-600'}`}>
                            {match.score1}
                        </span>
                        <span className="text-xl dark:text-gray-600 text-gray-400">-</span>
                        <span className="text-3xl font-black dark:text-gray-400 text-slate-600">{match.score2}</span>
                    </div>
                    <p className="text-xs dark:text-gray-500 text-slate-500">{match.date}</p>
                </div>

                {/* Team 2 */}
                <div className="flex-1">
                    <p className="text-sm font-bold dark:text-white text-slate-900 dark:group-hover:text-yellow-400 group-hover:text-purple-600 transition-colors">
                        {match.team2}
                    </p>
                    <p className="text-xs dark:text-gray-500 text-slate-500 mt-1 text-left">Final</p>
                </div>

                {/* Win indicator */}
                {isWin && (
                    <div className="dark:text-yellow-400 text-purple-600 text-xl animate-pulse">✓</div>
                )}
            </div>
        </div>
    )
}

type Props = {
    className?: string
} & LastMatchesBlockProps

export const LastMatchesBlock: React.FC<Props> = ({
    label = 'Resultados',
    title = 'Últimas Partidas',
    description = 'Spectaculum praeteriti victoriarum - Reviva os melhores momentos das nossas equipes',
    matches = []
}) => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container">
                <div className="mb-16">
                    <div className="inline-block mb-4">
                        <span className="dark:text-yellow-400 text-purple-600 text-sm font-bold uppercase tracking-widest">{label}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black dark:text-white text-slate-900 mb-4">
                        <span className="dark:bg-gradient-to-r dark:from-yellow-400 dark:via-orange-400 dark:to-red-500 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent">
                            {title}
                        </span>
                    </h2>
                    <p className="dark:text-gray-400 text-slate-600 text-lg max-w-2xl">{description}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {matches && matches.map((match: Match) => (
                        <MatchCardHorizontal key={match.id} match={match} />
                    ))}
                </div>
            </div>
        </section>
    )
}

