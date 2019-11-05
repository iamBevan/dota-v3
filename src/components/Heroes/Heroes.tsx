import React from "react";
import "./styles.scss";
import { Hero } from "./interface";
import { handleImg, heroName } from "../../utils/functions";
import { PercentageBar } from "../PercentageBar/PercentageBar";

const Heroes = props => {
    const winRate = (w: number, t: number) => {
        let result = (w / t) * 100;
        return result;
    };
    const handleHeroes = (heroes: Hero[]) => {
        if (heroes !== undefined) {
            const heroLine = heroes.slice(0, 5).map(hero => {
                return (
                    <tr key={hero.hero_id}>
                        <td style={{ paddingLeft: "15px" }}>
                            <div className="hero-img-name">
                                <div className="hero-img">
                                    <img src={handleImg(hero.hero_id)} alt="" />
                                </div>
                                <div className="hero-name">
                                    {heroName(hero.hero_id)}
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
                );
            });
            return heroLine;
        } else {
            return;
        }
    };

    if (props.load) {
        return (
            <div className="heroes">
                <table>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>Hero</th>
                            <th>Matches</th>
                            <th>Winrate %</th>
                        </tr>
                    </thead>
                    <tbody>{handleHeroes(props.heroes)}</tbody>
                </table>
            </div>
        );
    } else {
        return <div />;
    }
};

export { Heroes };
