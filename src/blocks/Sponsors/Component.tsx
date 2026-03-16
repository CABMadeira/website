import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import React from 'react'

type SponsorItem = {
    id?: string | null
    name: string
    logo: number | MediaType
    url?: string | null
    openInNewTab?: boolean | null
}

type SponsorsBlockProps = {
    id?: string | null
    title?: string | null
    sponsors?: SponsorItem[] | null
}

export const SponsorsBlock: React.FC<SponsorsBlockProps> = ({ id, title, sponsors }) => {
    if (!sponsors?.length) return null

    return (
        <section id={`block-${id ?? 'sponsors'}`}>
            <div className="mx-auto w-full max-w-6xl px-4">
                {title ? (
                    <h2 className="mb-8 text-center text-2xl font-bold text-[hsl(var(--primary))]">{title}</h2>
                ) : null}

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {sponsors.map((sponsor, index) => {
                        const content = (
                            <div
                                className="flex h-28 items-center justify-center rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                                style={{ borderColor: 'hsl(var(--border))' }}
                            >
                                {typeof sponsor.logo === 'object' ? (
                                    <Media
                                        resource={sponsor.logo}
                                        imgClassName="max-h-16 w-auto object-contain"
                                    />
                                ) : (
                                    <span className="text-sm font-medium text-[hsl(var(--foreground))]">{sponsor.name}</span>
                                )}
                            </div>
                        )

                        if (sponsor.url) {
                            return (
                                <a
                                    key={sponsor.id ?? `${sponsor.name}-${index}`}
                                    href={sponsor.url}
                                    target={sponsor.openInNewTab ? '_blank' : undefined}
                                    rel={sponsor.openInNewTab ? 'noopener noreferrer' : undefined}
                                    aria-label={sponsor.name}
                                >
                                    {content}
                                </a>
                            )
                        }

                        return <div key={sponsor.id ?? `${sponsor.name}-${index}`}>{content}</div>
                    })}
                </div>
            </div>
        </section>
    )
}
