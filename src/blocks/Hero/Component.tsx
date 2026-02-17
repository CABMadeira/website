import React from 'react'
import { Media } from '@/components/Media'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'

export const HeroBlock: React.FC<HeroBlockProps> = (props) => {
    const { media } = props

    return (
        <section className="relative mx-auto w-full max-w-7xl">
            {/* Background media */}
            {typeof media === 'object' && media !== null && (
                <div className="absolute inset-0">
                    <Media
                        resource={media}
                        className="object-center"
                    />
                </div>
            )}
            {/* Left side: content layout */}
            <div className="relative flex items-center">
                <div className="w-full px-4 py-16 sm:px-10 lg:w-1/2">
                    <div className="max-w-md">
                        <div className="mb-6 h-2 w-24 bg-[hsl(var(--primary))]" />
                        <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl drop-shadow-[0_0_2px_white] dark:drop-shadow-none">
                            <span className="text-[hsl(var(--primary))]">
                                NO<br />
                                SHORTCUTS.<br />
                                JUST
                            </span>{' '}
                            <span className="text-[hsl(var(--yellow))] drop-shadow-[0_0_2px_white] dark:drop-shadow-none">
                                RESULTS
                            </span>
                        </h1>
                    </div>
                </div>
            </div>

            {/* Decorative Divider */}
            <div className="w-full overflow-hidden leading-none mt-12">
                <svg
                    className="relative block w-full h-20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="hsl(var(--primary))"
                        d="M0,64L48,90.7C96,117,192,171,288,176C384,181,480,139,576,117.3C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </svg>
            </div>
        </section>
    )
}
