'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'

export const HomeHero: React.FC<Page['hero']> = ({ media }) => {
    return (
        <div className="flex items-center justify-center -mt-16">
            {media && typeof media === 'object' && (
                <div className="flex-none w-[36rem]"> {/* fixed width in rem, constant across viewport */}
                    <Media
                        priority
                        resource={media}
                        imgClassName="w-full h-auto object-contain"
                    />
                </div>
            )}
        </div>
    )
}

