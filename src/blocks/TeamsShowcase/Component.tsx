import React from 'react'

interface Team {
    icon: string
    category: string
    description: string
    players: number
    achievements: string
}

interface TeamsShowcaseBlockProps {
    label?: string
    title?: string
    description?: string
    buttonText?: string
    teams?: Team[]
}

type Props = {
    className?: string
} & TeamsShowcaseBlockProps

export const TeamsShowcaseBlock: React.FC<Props> = ({
    label = 'Equipes',
    title = 'Conheça Nossas Equipes',
    description = 'Tres cohortes fortitudinem et gloriam in ludo haberent - Três categorias, uma missão',
    buttonText = 'Conhecer Equipe',
    teams = []
}) => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container relative z-10">
                <div className="mb-16">
                    <div className="inline-block mb-4">
                        <span className="dark:text-yellow-400 text-purple-600 text-sm font-bold uppercase tracking-widest">{label}</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black dark:text-white text-slate-900 mb-4">
                        <span className="dark:bg-gradient-to-r dark:from-yellow-400 dark:via-blue-400 dark:to-pink-400 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {title}
                        </span>
                    </h2>
                    <p className="dark:text-gray-400 text-slate-600 text-lg max-w-2xl">{description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {teams && teams.map((team, idx) => (
                        <div
                            key={idx}
                            className="group relative dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 dark:border dark:border-slate-700 border border-blue-200 dark:hover:border-yellow-400 hover:border-purple-400 transition-all overflow-hidden dark:hover:shadow-2xl dark:hover:shadow-yellow-400/20 hover:shadow-lg hover:shadow-purple-400/20 transform hover:-translate-y-2"
                        >
                            {/* Gradient background effect */}
                            <div className="absolute inset-0 dark:bg-gradient-to-br from-blue-400/10 to-purple-400/10 bg-gradient-to-br from-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-10 transition-opacity" />
                            <div className="absolute top-0 right-0 w-40 h-40 dark:bg-gradient-to-br dark:from-yellow-400/10 dark:to-transparent bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">{team.icon}</div>

                                <h3 className="text-2xl font-black dark:text-white text-slate-900 mb-3 dark:group-hover:text-yellow-400 group-hover:text-purple-600 transition-colors">
                                    {team.category}
                                </h3>

                                <p className="dark:text-gray-300 text-slate-700 text-sm leading-relaxed mb-8 italic">
                                    "{team.description}"
                                </p>

                                <div className="grid grid-cols-2 gap-4 pt-8 dark:border-t dark:border-slate-700 border-t border-blue-200">
                                    <div className="dark:bg-slate-900/50 bg-blue-100/50 rounded-lg p-4 backdrop-blur-sm">
                                        <p className="text-4xl font-black dark:text-yellow-400 text-purple-600">{team.players}</p>
                                        <p className="text-xs dark:text-gray-400 text-slate-600 uppercase tracking-wider font-bold">Atletas</p>
                                    </div>
                                    <div className="dark:bg-slate-900/50 bg-purple-100/50 rounded-lg p-4 backdrop-blur-sm">
                                        <p className="text-3xl font-black dark:text-orange-400 text-pink-600">{team.achievements}</p>
                                        <p className="text-xs dark:text-gray-400 text-slate-600 uppercase tracking-wider font-bold">Títulos</p>
                                    </div>
                                </div>

                                <button className="w-full mt-8 dark:bg-gradient-to-r dark:from-yellow-400 dark:to-orange-500 dark:text-slate-900 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-3 rounded-lg dark:hover:shadow-lg dark:hover:shadow-yellow-400/50 hover:shadow-lg hover:shadow-purple-400/50 transition-all transform hover:scale-105 uppercase tracking-wider text-sm">
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

