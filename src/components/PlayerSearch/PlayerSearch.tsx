import React, { useState } from "react";
import { Link } from "react-router-dom";

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
            <span>
                <br />
                Or try one of these:{" "}
                <span>
                    <b>329579 160226 2078533</b>
                </span>
                {steamId}
            </span>
        </div>
    );
};

export { PlayerSearch };
