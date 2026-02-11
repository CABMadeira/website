import React from 'react'

import type { HeroBlock as HeroBlockProps } from '@/payload-types'

export const HomeHero: React.FC<HeroBlockProps> = () => {
    return (
        <div className="flex items-center justify-center -mt-16">
            hello world
        </div>
    )
}

