import * as React from "react"
import { heroData } from "../constants/heroData"
import { gameMode } from "../constants/gameMode"
import moment from "moment"
import {
    Player,
    PlayerWl,
    ProfilePlayer,
    ProfilePlayerWl
} from "../components/Profile/interfaces"

export const playerTeam = (team: number) => {
    if (team < 128) {
        return "Radiant"
    }

    return "Dire"
}

export const winRate = (
    wins: number | null | undefined,
    losses: number | null | undefined
): number => {
    const result = (w, l) => {
        let total = w + l
        return (w / total) * 100
    }

    const calc =
        (wins && losses) !== (null || undefined) ? result(wins, losses) : 0

    return calc
}

export const handleImg = (heroId: number) => {
    const url = heroData.heroes[heroId].img
    const fullUrl = `https://api.opendota.com${url}`
    return fullUrl
}

export const handleLaneImg = (laneId: number) => {
    if (laneId === null) {
        return
    }
    const url = `https://www.opendota.com/assets/images/dota2/lane_${laneId}.svg`
    return url
}

export const handleGameMode = (modeId: number): string => {
    return gameMode.modes[modeId].name
}

export const heroName = (id: number): string => {
    return heroData.heroes[id].localized_name
}

export const matchDuration = (time: number) => {
    let hrs = Math.floor(time / 3600)
    let mins = Math.floor((time % 3600) / 60)
    let secs = time % 60

    let result = ""

    if (hrs > 0) {
        result += "" + hrs + ":" + (mins < 10 ? "0" : "")
    }

    result += "" + mins + ":" + (secs < 10 ? "0" : "")
    result += "" + secs

    return result
}

export const matchResult = (team: number, win: boolean) => {
    if (team < 128 && win === true) {
        return <div style={{ color: "rgb(118, 173, 121)" }}> Won Match ></div>
    }
    if (team < 128 && win === false) {
        return <div style={{ color: "rgb(237, 94, 94)" }}> Lost Match ></div>
    }
    if (team > 127 && win === true) {
        return <div style={{ color: "rgb(237, 94, 94)" }}> Lost Match ></div>
    }

    return <div style={{ color: "rgb(118, 173, 121)" }}> Won Match ></div>
}

export const lastPlayed = (date: number) => {
    return moment.unix(date).fromNow()
}

export const skillBracket = (skill: number) => {
    switch (skill) {
        case 0:
            return "Normal Skill"
        case 1:
            return "High Skill"
        case 2:
            return "Very High Skill"
        default:
            return "Unknown Skill"
    }
}
