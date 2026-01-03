import React from 'react'

interface Match {
    id: string
    team1: string
    team2: string
    date: string
    competition?: string
}

interface CalendarBlockProps {
    label?: string
    title?: string
    description?: string
    buttonText?: string
    matches?: Match[]
}

const CalendarMatch: React.FC<{ match: Match }> = ({ match }) => {
    return (
        <div className="dark:bg-slate-800/50 dark:border dark:border-slate-700 bg-blue-50 border border-blue-200 rounded-lg p-4 dark:hover:border-yellow-400/30 hover:border-purple-400 dark:hover:bg-slate-800 hover:bg-purple-100 transition-all">
            <div className="text-xs font-semibold dark:text-yellow-400 text-purple-600 uppercase tracking-wider mb-2">
                {match.competition}
            </div>
            <div className="text-sm font-bold dark:text-white text-slate-900 mb-2">
                {match.date}
            </div>
            <div className="space-y-1">
                <p className="text-sm dark:text-gray-300 text-slate-700">{match.team1}</p>
                <p className="text-xs dark:text-gray-500 text-slate-600 text-center py-1">VS</p>
                <p className="text-sm dark:text-gray-300 text-slate-700">{match.team2}</p>
            </div>
        </div>
    )
}

type Props = {
    className?: string
} & CalendarBlockProps

export const CalendarBlock: React.FC<Props> = ({
    label = 'Calendário',
    title = 'Próximas Partidas',
    description = 'Pugna futura et gloria expectanda - Acompanhe o calendário de jogos',
    buttonText = 'Ver Calendário Completo',
    matches = []
}) => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container">
                <div className="mb-16">
                    <div className="inline-block mb-4">
                        <span className="dark:text-orange-400 text-purple-600 text-sm font-bold uppercase tracking-widest">{label}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black dark:text-white text-slate-900 mb-4">
                        <span className="dark:bg-gradient-to-r dark:from-orange-400 dark:via-yellow-400 dark:to-red-400 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                            {title}
                        </span>
                    </h2>
                    <p className="dark:text-gray-400 text-slate-600 text-lg max-w-2xl">{description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                    {matches && matches.map((match: Match) => (
                        <CalendarMatch key={match.id} match={match} />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <button className="inline-block dark:bg-gradient-to-r dark:from-orange-400 dark:to-red-500 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full hover:shadow-2xl dark:hover:shadow-orange-400/50 hover:shadow-purple-400/50 transition-all transform hover:scale-105">
                        {buttonText}
                    </button>
                </div>
            </div>
        </section>
    )
}

