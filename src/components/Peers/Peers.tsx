import React from "react"
import { Link } from "react-router-dom"
import { Peer } from "../Profile/interfaces"
import { PercentageBar } from "../"
import { lastPlayed } from "../../utils/functions"
// import styles from "./Peers.module.scss"

const Peers = props => {
    const winRate = (w: number, t: number) => {
        let result = (w / t) * 100
        return result
    }
    const handlePeers = (peers: Peer[]) => {
        if (peers !== undefined) {
            const peerLine = peers.slice(0, 5).map(peer => {
                return (
                    <tr key={peer.account_id}>
                        <td style={{ paddingLeft: "15px" }}>
                            <div className='peer-img-name'>
                                <div className='peer-img'>
                                    <img
                                        style={{
                                            height: "30px",
                                            float: "left",
                                            paddingRight: "10px"
                                        }}
                                        src={peer.avatar}
                                        alt=''
                                    />{" "}
                                </div>
                                <div className='peer-name'>
                                    <Link to={`/homepage/${peer.account_id}`}>
                                        <b>{peer.personaname}</b>
                                        <br />
                                    </Link>
                                    {lastPlayed(peer.last_played)}
                                </div>
                            </div>
                        </td>
                        <td>{peer.with_games}</td>
                        <td>
                            {winRate(peer.with_win, peer.games).toFixed(1)}
                            <div style={{ height: "5px" }}></div>
                            <div
                                style={{
                                    height: "2px",
                                    width: "80px",
                                    margin: "auto"
                                }}
                            >
                                <PercentageBar
                                    percentage={winRate(
                                        peer.with_win,
                                        peer.games
                                    ).toFixed(0)}
                                />
                            </div>
                        </td>
                    </tr>
                )
            })
            return peerLine
        } else {
            return
        }
    }

    if (props.load) {
        return (
            <div className='peers'>
                <table>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>Player</th>
                            <th>Matches</th>
                            <th>Winrate %</th>
                        </tr>
                    </thead>
                    <tbody>{handlePeers(props.peers)}</tbody>
                </table>
            </div>
        )
    } else {
        return <div />
    }
}

export { Peers }
