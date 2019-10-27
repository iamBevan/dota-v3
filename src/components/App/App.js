import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../HomePage/HomePage";
import Matches from "../Matches/Matches";
import { UserContext } from "../UserContext/UserContext";
import MatchPage from '../MatchPage/MatchPage'
import '../../styles/styles.module.scss';

const App = () => {
    const [steamId, setSteamId] = useState(311360822);

    return (
        <BrowserRouter>
            <Layout>
                <section>
                    <UserContext.Provider value={{ steamId, setSteamId }}>
                        <Switch>
                            <Route path="/" exact component={HomePage} />
                            <Route path="/matches" component={Matches} />
                            <Route
                                path='/match-page/:id' children={<MatchPage />}
                            />
                        </Switch>
                    </UserContext.Provider>
                </section>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
