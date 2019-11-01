import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import "./styles.scss";

const PlayerSearch = () => {
    const [inputChange, setInputChange] = useState("");
    const [steamId, setSteamId] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputChange(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSteamId(inputChange);
    };
    return (
        <div className="searchbox-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your Steam ID:{" "}
                    <input
                        type="text"
                        value={inputChange}
                        onChange={handleInputChange}
                    />{" "}
                </label>
                <Link to={`/homepage/${inputChange}`}>
                    <button type="button">Submit</button>
                </Link>
            </form>
            {steamId}
            <span className="homepage-title">Title</span>

            <span>
                Or try one of these: <span>62716984 160226 2078533</span>
            </span>
        </div>
    );
};

export { PlayerSearch };
