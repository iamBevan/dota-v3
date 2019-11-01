import React, { useState, useEffect, useContext } from "react";
import Context from "../../Context";

import axios from "axios";
import "./styles.scss";
import { PlayerSearch } from "../PlayerSearch/PlayerSearch";
import { useParams } from "react-router-dom";

interface Profile {
    account_id: number;
    personaname: string;
    name: string;
    plus: true;
    cheese: number;
    steamid: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    profileurl: string;
    last_login: string;
    loccountrycode: string;
    is_contributor: false;
}

interface Player {
    tracked_until: string;
    solo_competitive_rank: string;
    competitive_rank: string;
    rank_tier: number;
    leaderboard_rank: number;
    mmr_estimate: {
        estimate: number;
        stdDev: number;
        n: number;
    };
    profile: Profile;
}

interface PlayerWl {
    win: number;
    lose: number;
}

// let steamId = 87430370;

const winRate = (w: number, l: number) => {
    let total = w + l;

    return ((w / total) * 100).toFixed(2);
};

const HomePage = () => {
    let { id } = useParams();

    const [player, setPlayer] = useState<Player | null>(null);
    const [load, setLoad] = useState(false);
    const [playerWl, setPlayerWl] = useState<PlayerWl | null>(null);
    const { count, setCount } = useContext(Context) as {
        count: number;
        setCount: React.Dispatch<React.SetStateAction<string | undefined>>;
    };

    useEffect(() => {
        axios.get(`https://api.opendota.com/api/players/${id}`).then(res => {
            setPlayer(res.data);
            setLoad(true);
            setCount(id);
        });
        axios.get(`https://api.opendota.com/api/players/${id}/wl`).then(res => {
            setPlayerWl(res.data);
            setLoad(true);
        });

        const cleanup = () => {
            setPlayer(null);
            setLoad(false);
            console.log("homepage cleanup");
        };

        return cleanup;
    }, [id]);

    if (load && player !== null && playerWl !== null) {
        return (
            <div className="homepage-container">
                <div className="item1"></div>
                <div className="item2">
                    <span className="homepage-title">Title</span>
                    <section className="player">
                        <h1>{player.profile.personaname}</h1>
                        <img
                            style={{ width: 90 }}
                            alt=""
                            src={player.profile.avatarmedium}
                        />
                        <br />
                        <br />
                        <span>Wins: {playerWl.win} |</span>
                        <span> Losses: {playerWl.lose} |</span>
                        <span>
                            {" "}
                            Win Rate: {winRate(playerWl.win, playerWl.lose)}%
                        </span>
                    </section>
                </div>
                <div className="item3">
                    {" "}
                    <span className="homepage-title">Title</span>Main
                </div>
                <div className="item4">
                    {" "}
                    <span className="homepage-title">Title</span>Right
                </div>
                <div className="item5">
                    {" "}
                    <span className="homepage-title">Title</span>Footer
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="player">
                    <div className=""></div>
                </div>
            </div>
        );
    }
};

export default HomePage;
