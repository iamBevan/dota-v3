export interface Profile {
    account_id: number
    personaname: string
    name: string
    plus: boolean
    cheese: number
    steamid: string
    avatar: string
    avatarmedium: string
    avatarfull: string
    profileurl: string
    last_login: string
    loccountrycode: string
    is_contributor: boolean
}
export interface Player {
    tracked_until: string
    solo_competitive_rank: string
    competitive_rank: string
    rank_tier: number
    leaderboard_rank: number
    mmr_estimate: {
        estimate: number
        stdDev: number
        n: number
    }
    profile: Profile
}

export interface PlayerWl {
    win: number | null | undefined
    lose: number | null | undefined
}

export interface Peer {
    account_id: number
    last_played: number
    win: number
    games: number
    with_win: number
    with_games: number
    against_win: number
    against_games: number
    with_gpm_sum: number
    with_xpm_sum: number
    personaname: string
    last_login: string
    avatar: string
    avatarfull: string
}

export type SetCount<T> = T | undefined
export type ProfilePlayer<T> = T | Player | null
export type ProfilePlayerWl<T> = T | PlayerWl | null
