import { fetchUtil } from '@/utilities/fetchUtil'
import type { TeamStandingsBlock as TeamStandingsBlockProps } from '@/payload-types'
import { TeamStandings } from './Component.client'
import React from 'react'
import { load } from 'cheerio'

export type TeamStanding = {
    rank: number;
    teamName: string;
    logoUrl: string;
    matches: number;
    wins: number;
    losses: number;
    points: number;
}

async function scrapeStandings(url: string): Promise<TeamStanding[]> {
    const res = await fetchUtil(url, { next: { revalidate: 3600 }, debug: true })
    const html = await res.text()
    const $ = load(html)

    const standings: TeamStanding[] = []

    // Select rows of the main standings table
    $('table.standings tbody tr').each((_, el) => {
        const cells = $(el).find('td');
        const firstCell = $(cells[0])
        const rank = parseInt(firstCell.text().trim().split(/\s+/)[0])
        const logoUrl = firstCell.find('img').attr('src')?.trim()
        const teamName = firstCell.find('div.ml-2').text().trim()


        const matches = parseInt($(cells[1]).text().trim())
        const wins = parseInt($(cells[2]).text().trim())
        const losses = parseInt($(cells[3]).text().trim())
        const points = parseInt($(cells[12]).text().trim())


        standings.push({
            rank,
            teamName,
            logoUrl: logoUrl || '',
            matches,
            wins,
            losses,
            points,
        })
    });

    return standings
}

export const TeamStandingsBlock: React.FC<TeamStandingsBlockProps> = async ({
    maleApiUrl,
    femaleApiUrl,
}) => {
    // Scrape both male and female standings in parallel
    const [maleData, femaleData] = await Promise.all([
        scrapeStandings(maleApiUrl),
        scrapeStandings(femaleApiUrl),
    ])

    // Pass arrays to the client component
    return <TeamStandings maleData={maleData} femaleData={femaleData} />
}
