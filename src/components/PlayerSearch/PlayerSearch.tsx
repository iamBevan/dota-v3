import React, { useState } from "react"
import { Link } from "react-router-dom"

import styles from "./PlayerSearch.module.scss"

const PlayerSearch = () => {
    const [inputChange, setInputChange] = useState("")
    const [steamId, setSteamId] = useState("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputChange(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSteamId(inputChange)
    }
    return (
        <div className={styles["landing"]}>
            <h1 className={styles["landing__heading"]}>
                Dota<span className={styles["landing__heading--two"]}>2</span>{" "}
                Statistics
            </h1>
            <form className={styles["landing__form"]} onSubmit={handleSubmit}>
                <input
                    className={styles["landing__form__input"]}
                    type='text'
                    value={inputChange}
                    onChange={handleInputChange}
                    placeholder='Search by SteamID...'
                />
                <Link to={`/profile/${inputChange}`}>
                    <button
                        className={styles[`landing__form__button`]}
                        type='submit'
                    >
                        Search
                    </button>
                </Link>
            </form>
            <span>
                <br />
                Or try one of these: <br />
                <span>
                    <b>
                        <br /> 329579
                        <br /> 160226
                        <br /> 2078533
                    </b>
                </span>
                {steamId}
            </span>
        </div>
    )
}

export { PlayerSearch }
