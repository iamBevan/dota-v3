import React, { useState, useEffect, useContext } from "react"
import { Context } from "../../Context"
import { Link } from "react-router-dom"
import axios from "axios"
import styles from "./Profile.module.scss"
import { useParams } from "react-router-dom"
import {
    Player,
    PlayerWl,
    ProfilePlayer,
    ProfilePlayerWl,
    Peer,
    SetCount
} from "./interfaces"
import { Matches, Peers, Heroes, PercentageBar } from "../"
import { winRate } from "../../utils/functions"
import { Hero } from "../Heroes/interface"

const Profile: React.FC = () => {
    let { id } = useParams()

    const [player, setPlayer] = useState<ProfilePlayer<Player>>(null)
    const [playerWl, setPlayerWl] = useState<ProfilePlayerWl<PlayerWl>>(null)
    const [load, setLoad] = useState(false)
    const { count, setCount } = useContext(Context) as {
        count: number
        setCount: React.Dispatch<React.SetStateAction<SetCount<string>>>
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
            let wlData = await fetchData("wl")
            let peersData = await fetchData("peers")
            let heroesData = await fetchData("heroes")
            setPlayer(data.data)
            setPlayerWl(wlData.data)
            setPeers(peersData.data)
            setHeroes(heroesData.data)
            setLoad(true)
        }

        playerList()

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
                {load && (
                    <section className={styles["player"]}>
                        <h1>{player?.profile.personaname}</h1>
                        <img
                            style={{ width: 90 }}
                            alt=''
                            src={player?.profile.avatarmedium}
                        />
                        <br />
                        <br />
                        <span>
                            <b>Wins:</b> {playerWl?.win} |
                        </span>
                        <span>
                            {" "}
                            <b>Losses</b>: {playerWl?.lose} |
                        </span>
                        <span>
                            {" "}
                            <b>Win Rate</b>:{" "}
                            {winRate(playerWl?.win, playerWl?.lose).toFixed(2)}
                            %
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
                                    playerWl?.win,
                                    playerWl?.lose
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
