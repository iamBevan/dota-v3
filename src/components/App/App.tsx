import React, { useState } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Matches, MatchPage, PlayerSearch, Profile } from "../"
import { Context } from "../../Context"

const App = () => {
    const [count, setCount] = useState(1)
    return (
        <BrowserRouter>
            {/* <Header /> */}
            <Switch>
                <Context.Provider value={{ count, setCount }}>
                    <Route path='/' exact component={PlayerSearch} />
                    <Route path='/profile/:id' children={<Profile />} />
                    <Route
                        path='/matches/:id'
                        children={<Matches size={20} />}
                    />
                    <Route path='/match-page/:id' children={<MatchPage />} />
                </Context.Provider>
            </Switch>
            {/* <Footer /> */}
        </BrowserRouter>
    )
}

export { App }
