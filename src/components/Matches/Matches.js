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

    if (load) {
        return (
            <div>
                Matches{console.log("matches", matches)}
                <ul>
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
                </ul>
            </div>
        );
    } else {
        return <div>#</div>;
    }
};

export default Matches;
