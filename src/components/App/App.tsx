import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Matches from "../Matches/Matches";
import MatchPage from "../MatchPage/MatchPage";
import "../../styles/styles.module.scss";
import Header from "../Header/Header";
import { PlayerSearch } from "../PlayerSearch/PlayerSearch";
import Context from "../../Context";

const App = () => {
    const [count, setCount] = useState(0);
    return (
        <Context.Provider value={{ count, setCount }}>
            <BrowserRouter>
                <section>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={PlayerSearch} />
                        <Route path="/homepage/:id" children={<HomePage />} />
                        <Route path="/matches/:id" children={<Matches />} />
                        <Route
                            path="/match-page/:id"
                            children={<MatchPage />}
                        />
                    </Switch>
                </section>
            </BrowserRouter>
        </Context.Provider>
    );
};

export default App;
