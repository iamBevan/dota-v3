import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.scss";

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

let steamId = 87430370;

const winRate = (w: number, l: number) => {
    let total = w + l;

    return ((w / total) * 100).toFixed(2);
};

const HomePage = () => {
    const [player, setPlayer] = useState<Player | null>(null);
    const [load, setLoad] = useState(false);
    const [inputChange, setInputChange] = useState("");
    const [playerWl, setPlayerWl] = useState<PlayerWl | null>(null);

    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/players/${steamId}`)
            .then(res => {
                setPlayer(res.data);
                setLoad(true);
            });
        axios
            .get(`https://api.opendota.com/api/players/${steamId}/wl`)
            .then(res => {
                setPlayerWl(res.data);
                setLoad(true);
            });

        const cleanup = () => {
            setPlayer(null);
            setLoad(false);
            console.log("homepage cleanup");
        };

        return cleanup;
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputChange(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // setSteamId(inputChange);
    };

    if (load && player !== null && playerWl !== null) {
        return (
            <div className="homepage-container">
                <div className="player">
                    <div>
                        <h1>{player.profile.personaname}</h1>
                        <img
                            style={{ width: 90 }}
                            alt=""
                            src={player.profile.avatarmedium}
                        />
                        <div>Wins: {playerWl.win}</div>
                        <div>Losses: {playerWl.lose}</div>
                        <div>
                            Win Rate: {winRate(playerWl.win, playerWl.lose)}%
                        </div>
                    </div>
                </div>
                {/* {console.log("player: ", player)} */}
                <h2>62716984</h2>
                <h2>160226</h2>
                <h2>2078533</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Steam ID:
                        <br />
                        <input
                            type="text"
                            value={inputChange}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
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
