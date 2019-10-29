import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './styles.scss'
import {
    handleImg,
    handleLaneImg,
    matchDuration,
    handleGameMode,
    heroName
} from '../../utils/functions';

let steamId = 87430370;

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/players/${steamId}/recentMatches`)
            .then(res => {
                setMatches(res.data);
                setLoad(true);
            });
    }, []);

    const handleMatches = () => {
        const playerLine = matches.map(match => {
            return matchesTable(match);
        });
        return playerLine;
    };

    const matchesTable = match => {
        return (
            <tbody key={match.match_id}>
                <tr>
                    <td style={{ paddingRight: "10px", textAlign: "left" }}>
                        <div className="hero-img">
                            <img style={{ height: "30px" }} src={handleImg(match.hero_id)} alt="" />
                            <Link to={`/match-page/${match.match_id}`}><b>{heroName(match.hero_id)}</b ></Link>
                            <span><img alt="" style={{ height: '15px' }} src={handleLaneImg(match.lane)} /></span>
                        </div>

                    </td>
                    <td style={{ fontWeight: 700, paddingLeft: 0 }}>
                        Result: {match.radiant_win}
                        <br />
                        x{match.party_size}
                    </td>

                    <td>
                        {matchDuration(match.duration)}
                    </td>
                    <td>
                        {handleGameMode(match.game_mode)}
                    </td>
                    <td style={{ color: "rgb(118, 173, 121)" }}>{match.kills}</td>
                    <td style={{ color: "rgb(237, 94, 94)" }}>{match.deaths}</td>
                    <td style={{ color: "rgb(124, 153, 168)" }}>{match.assists}</td>
                </tr>
            </tbody >
        );
    };

    const tableContainer = (table, teamColour) => {
        return (
            <div>
                <table cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr>
                            <th>HERO</th>
                            <th>RESULT</th>
                            <th>DURATION</th>
                            <th>GAME MODE</th>
                            <th style={{ color: "rgb(118, 173, 121)" }}>K</th>
                            <th style={{ color: "rgb(237, 94, 94)" }}>D</th>
                            <th style={{ color: "rgb(124, 153, 168)" }}>A</th>
                        </tr>
                    </tbody>
                    {table}
                </table>
            </div>
        )
    }

    if (load) {
        return (
            <div className="recentMatches-container">
                Matches{console.log("matches", matches)}
                {tableContainer(handleMatches())}
            </div>
        );
    } else {
        return <div>#</div>;
    }
};

export default Matches;
