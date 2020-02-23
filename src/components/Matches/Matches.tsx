import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import styles from "./Matches.module.scss"
import {
    handleImg,
    handleLaneImg,
    matchDuration,
    handleGameMode,
    heroName,
    matchResult,
    lastPlayed,
    skillBracket,
    playerTeam
} from "../../utils/functions"

const Matches = props => {
    let { id } = useParams()

    const [matches, setMatches] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/players/${id}/recentMatches`)
            .then(res => {
                setMatches(res.data)
                setLoad(true)
            })

        const cleanup = () => {
            setMatches([])
            setLoad(false)
            console.log("matches cleanup")
        }

        return cleanup
    }, [id])

    const handleMatches = () => {
        const playerLine = matches.slice(0, props.size).map(match => {
            return matchesTable(match)
        })
        return playerLine
    }

    const matchesTable = match => {
        const partySize = () => {
            if (match.party_size === null) {
                return <div></div>
            } else {
                return (
                    <div>
                        <svg viewBox='0 0 24 24' className='party'>
                            <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
                            <circle cx='9' cy='7' r='4'></circle>
                            <path d='M23 21v-2a4 4 0 0 0-3-3.87'></path>
                            <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
                        </svg>{" "}
                        {match.party_size}
                    </div>
                )
            }
        }

        return (
            <tbody key={match.match_id}>
                <tr>
                    <td style={{ textAlign: "left", paddingLeft: "10px" }}>
                        <div className='hero-img'>
                            <img
                                style={{
                                    height: "30px",
                                    float: "left",
                                    paddingRight: "10px"
                                }}
                                src={handleImg(match.hero_id)}
                                alt=''
                            />{" "}
                            <div>
                                <Link to={`/match-page/${match.match_id}`}>
                                    <b>{heroName(match.hero_id)}</b>
                                </Link>{" "}
                                <span>
                                    <img
                                        alt=''
                                        style={{ height: "15px" }}
                                        src={handleLaneImg(match.lane)}
                                    />
                                </span>
                                <br />
                                {lastPlayed(match.start_time)}
                            </div>
                        </div>
                    </td>
                    <td style={{ textAlign: "left" }}>
                        {matchResult(match.player_slot, match.radiant_win)}

                        <span>{partySize()}</span>
                    </td>
                    <td>
                        {handleGameMode(match.game_mode)}
                        <br />
                        {skillBracket(match.skill)}
                    </td>
                    <td>
                        {matchDuration(match.duration)}
                        <br />
                        {playerTeam(match.player_slot)}
                    </td>
                    <td style={{ color: "rgb(118, 173, 121)" }}>
                        {match.kills}
                    </td>
                    <td style={{ color: "rgb(237, 94, 94)" }}>
                        {match.deaths}
                    </td>
                    <td style={{ color: "rgb(124, 153, 168)" }}>
                        {match.assists}
                    </td>
                </tr>
            </tbody>
        )
    }

    const tableContainer = () => {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th style={{ textAlign: "left", width: "250px" }}>
                                HERO
                            </th>
                            <th
                                style={{
                                    textAlign: "left",
                                    paddingLeft: 0,
                                    width: "60px"
                                }}
                            >
                                RESULT
                            </th>
                            <th>GAME MODE</th>
                            <th>DURATION</th>
                            <th style={{ color: "rgb(118, 173, 121)" }}>K</th>
                            <th style={{ color: "rgb(237, 94, 94)" }}>D</th>
                            <th style={{ color: "rgb(124, 153, 168)" }}>A</th>
                        </tr>
                    </tbody>
                    {handleMatches()}
                </table>
            </div>
        )
    }
    if (load) {
        return <div>{tableContainer()}</div>
    } else {
        return <div>#</div>
    }
}

export default Matches
