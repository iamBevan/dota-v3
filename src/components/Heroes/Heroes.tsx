import React from "react"
import styles from "./Heroes.module.scss"
import { Hero } from "./interface"
import { handleImg, heroName, lastPlayed } from "../../utils/functions"
import { PercentageBar } from "../"

const Heroes = (props: { load: any; heroes: Hero[] }) => {
    const winRate = (w: number, t: number) => {
        let result = (w / t) * 100
        return result
    }
    const handleHeroes = (heroes: Hero[]) => {
        if (heroes !== undefined) {
            const heroLine = heroes.slice(0, 5).map(hero => {
                return (
                    <tr key={hero.hero_id}>
                        <td style={{ paddingLeft: "15px" }}>
                            <div className={styles["hero-img-name"]}>
                                <div className={styles["hero-img"]}>
                                    <img
                                        style={{
                                            height: "30px",
                                            float: "left",
                                            paddingRight: "10px"
                                        }}
                                        src={handleImg(hero.hero_id)}
                                        alt=''
                                    />{" "}
                                </div>
                                <div className={styles["hero-name"]}>
                                    <span>{heroName(hero.hero_id)}</span> <br />
                                    {lastPlayed(hero.last_played)}
                                </div>
                            </div>
                        </td>
                        <td>{hero.games}</td>
                        <td>
                            {winRate(hero.win, hero.games).toFixed(1)}
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
                                        hero.win,
                                        hero.games
                                    ).toFixed(0)}
                                />
                            </div>
                        </td>
                    </tr>
                )
            })
            return heroLine
        } else {
            return
        }
    }

    if (props.load) {
        return (
            <div className={styles["heroes"]}>
                <table>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>Hero</th>
                            <th>Heroes</th>
                            <th>Winrate %</th>
                        </tr>
                    </thead>
                    <tbody>{handleHeroes(props.heroes)}</tbody>
                </table>
            </div>
        )
    } else {
        return <div />
    }
}

export { Heroes }
