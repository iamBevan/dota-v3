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
import { Matches, Peers, Heroes } from "../"
import { Hero } from "../Heroes/interface"
import { Summary } from "../Summary/Summary"
import { Performance } from "../Performance/Performance"

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
        <div className={styles.homepageContainer}>
            {load && (
                <Summary
                    avatarmedium={player?.profile.personaname}
                    personaname={player?.profile.personaname}
                    win={playerWl?.win}
                    lose={playerWl?.lose}
                />
            )}

            <Performance />

            <div className={styles.mainContainer}>
                <div className={styles.matchesContainer}>
                    <Matches size={11} />
                    <Link to={`/matches/${count}`}>
                        <div style={{ textAlign: "center" }}>
                            <span>More...</span>
                        </div>
                    </Link>
                </div>
                <div className={styles.sidebarContainer}>
                    <span>
                        <Peers peers={peers} load={load} />
                    </span>
                    <br />
                    <span>
                        <Heroes heroes={heroes} load={load} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export { Profile }
