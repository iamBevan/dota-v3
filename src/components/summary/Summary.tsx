import React from "react"
import { PercentageBar } from "../PercentageBar/PercentageBar"
import styles from "./Summary.module.scss"
import { winRate } from "../../utils/functions"

interface Props {
    avatarmedium: string | undefined
    personaname: string | undefined
    win: number | undefined | null
    lose: number | undefined | null
}

const Summary = (props: Props) => {
    return (
        <section
            className={[styles.playerContainer, [styles.borderShadow]].join(
                " "
            )}
        >
            <div className={styles.player}>
                <div className={styles.info}>
                    <img alt='' src={props.avatarmedium} />
                    <div>
                        <h1 className={styles.h1}>{props?.personaname}</h1>
                        <span>
                            <span>Wins:</span> {props?.win} |
                        </span>
                        <span>
                            {" "}
                            <span>Losses</span>: {props?.lose} |
                        </span>
                        <span>
                            {" "}
                            <span>Win Rate</span>:{" "}
                            {winRate(props?.win, props?.lose).toFixed(2)}
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
                                    props?.win,
                                    props?.lose
                                ).toFixed(0)}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.rank}>
                    <h1 className={styles.h1}>Competitive Rank</h1>
                    <img
                        src='https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_8.png'
                        alt=''
                    />
                </div>
            </div>
        </section>
    )
}

export { Summary }
