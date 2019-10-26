import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext/UserContext";
import './styles.scss';

const HomePage = () => {
    const [player, setPlayer] = useState([]);
    const [load, setLoad] = useState(false);
    const [inputChange, setInputChange] = useState("");
    const { steamId, setSteamId } = useContext(UserContext);

    useEffect(() => {
        axios.get(`https://api.opendota.com/api/players/${steamId}`).then(res => {
            setPlayer(res.data);
            setLoad(true);
        });
    }, [steamId]);

    const handleInputChange = event => {
        setInputChange(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setSteamId(inputChange);
    };

    if (load) {
        return (
            <div className="homepage-container">
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
                <div>
                    <h1>{player.profile.personaname}</h1>
                    <img
                        style={{ width: 150 }}
                        alt=""
                        src={player.profile.avatarmedium}
                    />
                </div>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default HomePage;
