import React, { useState, useEffect, useContext } from "react"
import { Context } from "../../Context"
import { Link } from "react-router-dom"
import axios from "axios"
import styles from "./Profile.module.scss"
import { useParams } from "react-router-dom"
import { Player, PlayerWl } from "./interfaces"
import { PercentageBar } from "../PercentageBar/PercentageBar"
import { Matches } from "../Matches/Matches"
import { Peers } from "../Peers/Peers"
import { Peer } from "./interfaces"
import { winRate } from "../../utils/functions"
import { Heroes } from "../Heroes/Heroes"
import { Hero } from "../Heroes/interface"

const Profile: React.FC = () => {
    let { id } = useParams()

    const [player, setPlayer] = useState<Player | null>(null)
    const [load, setLoad] = useState(false)
    const [playerWl, setPlayerWl] = useState<PlayerWl | null>(null)
    const { count, setCount } = useContext(Context) as {
        count: number
        setCount: React.Dispatch<React.SetStateAction<string | undefined>>
    }
    const [peers, setPeers] = useState<Peer[]>([])
    const [heroes, setHeroes] = useState<Hero[]>([])

    useEffect(() => {
        const fetchData = async (url?: string) => {
            const response = await axios(
                url
                    ? `https://api.opendota.com/api/players/${id}/${url}`
                    : `https://api.opendota.com/api/players/${id}/`
            )
            return response
        }
        const playerList = async () => {
            let data = await fetchData()
            setPlayer(data.data)
        }
        const playerWl = async () => {
            let data = await fetchData("wl")
            setPlayerWl(data.data)
            setLoad(true)
        }
        const peerList = async () => {
            let data = await fetchData("peers")
            setPeers(data.data)
            setLoad(true)
        }
        const heroList = async () => {
            let data = await fetchData("heroes")
            setHeroes(data.data)
            setLoad(true)
        }

        playerList()
        playerWl()
        peerList()
        heroList()

        const cleanUp = () => {
            setPlayer(null)
            setLoad(false)
            setPeers([])
            setHeroes([])
        }

        return cleanUp
    }, [id, setCount])

    return (
        <div className={styles["homepage-container"]}>
            <div
                className={[
                    styles["player-container"],
                    [styles["border-shadow"]]
                ].join(" ")}
            >
                {load && player && playerWl !== null && (
                    <section className={styles["player"]}>
                        <h1>{player.profile.personaname}</h1>
                        <img
                            style={{ width: 90 }}
                            alt=''
                            src={player.profile.avatarmedium}
                        />
                        <br />
                        <br />
                        <span>
                            <b>Wins:</b> {playerWl.win} |
                        </span>
                        <span>
                            {" "}
                            <b>Losses</b>: {playerWl.lose} |
                        </span>
                        <span>
                            {" "}
                            <b>Win Rate</b>:{" "}
                            {winRate(playerWl.win, playerWl.lose).toFixed(2)}%
                            <br />
                        </span>
                        <br />
                        <div
                            style={{
                                height: "2px",
                                width: "500px",
                                margin: "auto"
                            }}
                        >
                            <PercentageBar
                                percentage={winRate(
                                    playerWl.win,
                                    playerWl.lose
                                ).toFixed(0)}
                            />
                        </div>
                    </section>
                )}

                <section className={styles["rank"]}>
                    <h1>Competitive Rank</h1>
                    <img
                        src='https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_8.png'
                        alt=''
                    />
                </section>
            </div>
            <div className={styles["main-container"]}>
                <div className={styles["matches-container"]}>
                    <Matches size={11} />
                    <Link to={`/matches/${count}`}>
                        <div style={{ textAlign: "center" }}>
                            <b>More...</b>
                        </div>
                    </Link>
                </div>
                <div className={styles["sidebar-container"]}>
                    <span className={styles["sidebar-child"]}>
                        <Peers peers={peers} load={load} />
                    </span>
                    <br />
                    <span className='sidebar-child'>
                        <Heroes heroes={heroes} load={load} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export { Profile }
