import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../HomePage/HomePage";
import Matches from "../Matches/Matches";
import MatchPage from "../MatchPage/MatchPage";
import "../../styles/styles.module.scss";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <section>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <Route path="/matches" component={Matches} />
                        <Route
                            path="/match-page/:id"
                            children={<MatchPage />}
                        />
                    </Switch>
                </section>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
