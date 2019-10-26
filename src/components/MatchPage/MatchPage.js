import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/styles.module.scss";
import { heroData } from "../../constants/heroData";
import { useParams } from "react-router-dom";

export const handleImg = heroId => {
    const url = heroData.heroes[heroId].img;
    const fullUrl = `https://api.opendota.com${url}`;
    return fullUrl;
};

const MatchPage = () => {
    const [load, setLoad] = useState(false);
    const [match, setMatch] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/matches/${id}`)
            .then(res => {
                setMatch(res.data);
                setLoad(true);
            });
    }, [id]);



    const handleTeam = (start, end) => {
        const radiant = match.players.slice(start, end);
        const playerLine = radiant.map(player => {
            return matchTable(player);
        });
        return playerLine;
    };

    const matchTable = player => {
        return (
            <tr key={player.playerslot}>
                <td style={{ paddingRight: "10px", textAlign: "right" }}>
                    <div classname="hero-img">
                        <img style={{ height: "30px" }} src={handleImg(player.hero_id)} alt="" />
                    </div>

                </td>
                <td style={{ fontWeight: 700, paddingLeft: 0 }}>
                    {player.personaname}
                </td>
                <td>{player.level}</td>
                <td style={{ color: "rgb(118, 173, 121)" }}>{player.kills}</td>
                <td style={{ color: "rgb(237, 94, 94)" }}>{player.deaths}</td>
                <td style={{ color: "rgb(124, 153, 168)" }}>{player.assists}</td>
                <td>
                    {player.gold_per_min} / {player.xp_per_min}
                </td>
                <td>
                    {player.last_hits} / {player.denies}
                </td>
                <td>{player.hero_damage}</td>
                <td>{player.tower_damage}</td>
                <td>{player.hero_healing}</td>
                <td style={{ color: "rgb(201, 175, 29)" }}>{player.gold}</td>
                <td>items</td>
                <td>buffs</td>
            </tr>
        );
    };

    const tableContainer = (table, teamColour) => {
        return (
            <div className={teamColour}>
                <table cellspacing="0" cellpadding="0">
                    <tr>
                        <th>PLAYER</th>
                        <th />
                        <th>LVL</th>
                        <th style={{ color: "rgb(118, 173, 121)" }}>K</th>
                        <th style={{ color: "rgb(237, 94, 94)" }}>D</th>
                        <th style={{ color: "rgb(124, 153, 168)" }}>A</th>
                        <th>LH / DN</th>
                        <th>GPM / XPM</th>
                        <th>HD</th>
                        <th>TD</th>
                        <th>HH</th>
                        <th style={{ color: "rgb(201, 175, 29)" }}>
                            <img
                                alt=""
                                style={{ height: "12px" }}
                                src="https://api.opendota.com/apps/dota2/images/tooltips/gold.png"
                            />{" "}
                            G
                        </th>
                        <th>ITEMS</th>
                        <th>BUFFS</th>
                    </tr>
                    {table}
                </table>
            </div>
        );
    };

    if (load) {
        return (
            <div>
                {/* Radiant = (0, 5), Dire = (5, 10) */}
                {tableContainer(handleTeam(0, 5), styles.tableContainerGreen)}
                <br />
                {tableContainer(handleTeam(5, 10), styles.tableContainerRed)}
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default MatchPage;
