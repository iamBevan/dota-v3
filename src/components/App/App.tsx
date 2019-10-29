import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Matches from "../Matches/Matches";
import MatchPage from "../MatchPage/MatchPage";
import "../../styles/styles.module.scss";
import Header from "../Header/Header";

const App = () => {
    return (
        <BrowserRouter>
            <section>
                <Header />
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/matches" component={Matches} />
                    <Route path="/match-page/:id" children={<MatchPage />} />
                </Switch>
            </section>
        </BrowserRouter>
    );
};

export default App;
