import React, { useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Matches } from "../Matches/Matches"
import { MatchPage } from "../MatchPage/MatchPage"

import { Header } from "../Header/Header"
import { Footer } from "../Footer/Footer"
import { PlayerSearch } from "../PlayerSearch/PlayerSearch"
import { Context } from "../../Context"
import { Profile } from "../Profile/Profile"
import styles from "./App.module.scss"

const App = () => {
    const [count, setCount] = useState(0)
    return (
        <BrowserRouter>
            <Context.Provider value={{ count, setCount }}>
                {/* <Header /> */}
                <Switch>
                    <Route path='/' exact component={PlayerSearch} />
                    <Route path='/homepage/:id' children={<Profile />} />
                    <Route path='/matches/:id' children={<Matches />} />
                    <Route path='/match-page/:id' children={<MatchPage />} />
                </Switch>
                {/* <Footer /> */}
            </Context.Provider>
        </BrowserRouter>
    )
}

export { App }
