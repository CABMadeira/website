import type { NextMatchBlock as NextMatchBlockProps } from '@/payload-types'
import { fetchUtil } from '@/utilities/fetchUtil'
import { NextMatchCard } from './Component.client'
import { load } from 'cheerio'

export type GameEvent = {
    date: string
    time: string
    homeTeam: string
    awayTeam: string
    competition: string
    gender: 'male' | 'female'
}

const monthMap: Record<string, string> = {
    Jan: '01',
    Fev: '02',
    Mar: '03',
    Abr: '04',
    Mai: '05',
    Jun: '06',
    Jul: '07',
    Ago: '08',
    Set: '09',
    Out: '10',
    Nov: '11',
    Dez: '12',
}

function parseDateTime(raw: string, seasonStartYear: number) {
    const match = raw.match(/^([A-Za-z]{3})\s+(\d{1,2})\s+@\s+(\d{2}:\d{2})$/)
    if (!match) return { date: '', time: '' }

    const [, monthAbbr, day, time] = match
    const month = monthMap[monthAbbr]
    if (!month) return { date: '', time }

    const paddedDay = day.padStart(2, '0')
    const monthNumber = parseInt(month)

    const year =
        monthNumber >= 8 ? seasonStartYear : seasonStartYear + 1

    return {
        date: `${year}-${month}-${paddedDay}`,
        time,
    }
}

async function extractFirstMatch(
    url: string,
    gender: 'male' | 'female'
): Promise<GameEvent | null> {
    const res = await fetchUtil(url, {
        next: { revalidate: 3600 },
    })

    const html = await res.text()
    const $ = load(html)

    let event: GameEvent | null = null

    $('.game-slide').each((_, el) => {
        if (event) return false

        const rawDateTime = $(el)
            .find('.game-dateTime')
            .text()
            .trim()

        const teams = $(el).find('.game-teams h4')
        const homeTeam = teams.eq(0).text().trim()
        const awayTeam = teams.eq(1).text().trim()

        if (
            homeTeam !== 'CAB Madeira' &&
            awayTeam !== 'CAB Madeira'
        ) {
            return
        }

        const competition = $(el)
            .find('.game-category')
            .text()
            .trim()

        const { date, time } = parseDateTime(rawDateTime, 2025)

        event = {
            date,
            time,
            homeTeam,
            awayTeam,
            competition,
            gender,
        }

        return false
    })

    return event
}

export const NextMatchBlock: React.FC<NextMatchBlockProps> = async ({
    maleApiUrl,
    femaleApiUrl,
}) => {

    const [maleMatch, femaleMatch] = await Promise.all([
        extractFirstMatch(maleApiUrl, 'male'),
        extractFirstMatch(femaleApiUrl, 'female'),
    ])

    return (
        <NextMatchCard
            maleEvent={maleMatch}
            femaleEvent={femaleMatch}
        />
    )
}
