import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";
import { Link } from "react-router-dom";

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [load, setLoad] = useState(false);
    const { steamId } = useContext(UserContext);

    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/players/${steamId}/recentMatches`)
            .then(res => {
                setMatches(res.data);
                setLoad(true);
            });
    }, [steamId]);

    const handleMatches = () => {
        const playerLine = matches.map(match => {
            return matchesTable(match);
        });
        return playerLine;
    };

    const matchesTable = match => {
        return (
            <tr key={match.match_id}>
                <td style={{ paddingRight: "10px", textAlign: "right" }}>
                    <div classname="hero-img">
                        {/* <img style={{ height: "30px" }} src={handleImg(player.hero_id)} alt="" /> */}
                        <Link to={`/match-page/${match.match_id}`}><b>{match.match_id}</b ></Link>
                    </div>

                </td>
                <td style={{ fontWeight: 700, paddingLeft: 0 }}>
                    {match.radiant_win}
                    Result
                </td>

                <td>
                    {match.duration}
                </td>
                <td>
                    {match.game_mode}
                </td>
                <td style={{ color: "rgb(118, 173, 121)" }}>{match.kills}</td>
                <td style={{ color: "rgb(237, 94, 94)" }}>{match.deaths}</td>
                <td style={{ color: "rgb(124, 153, 168)" }}>{match.assists}</td>
            </tr>
        );
    };

    const tableContainer = (table, teamColour) => {
        return (
            <div>
                <table cellspacing="0" cellpadding="0">
                    <tr>
                        <th>HERO</th>
                        <th>RESULT</th>
                        <th>DURATION</th>
                        <th>GAME MODE</th>
                        <th style={{ color: "rgb(118, 173, 121)" }}>K</th>
                        <th style={{ color: "rgb(237, 94, 94)" }}>D</th>
                        <th style={{ color: "rgb(124, 153, 168)" }}>A</th>
                    </tr>
                    {table}
                </table>
            </div>
        )
    }

    if (load) {
        return (
            <div>
                Matches{console.log("matches", matches)}
                {/* <ul>
                    {matches.map(match => {
                        return (
                            <li key={match.match_id}>
                                <Link to={`/match-page/${match.match_id}`}><b>{"Match ID: "}</b ></Link>
                                {match.match_id}
                                <b>{" hero ID: "}</b>
                                {match.hero_id}
                            </li>
                        );
                    })}
                </ul> */}
                {tableContainer(handleMatches())}
            </div>
        );
    } else {
        return <div>#</div>;
    }
};

export default Matches;
