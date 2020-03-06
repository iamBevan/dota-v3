import React from "react"
import { NavLink } from "react-router-dom"
import styles from "./Header.module.scss"

const Header = () => {
    return (
        <header className={styles["header"]}>
            <nav className={styles["nav"]}>
                <NavLink to='/' exact>
                    Search
                </NavLink>
            </nav>
        </header>
    )
}

export { Header }
