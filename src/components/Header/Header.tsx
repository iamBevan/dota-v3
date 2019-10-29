import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const Header = () => (
    <header>
        <nav>
            <NavLink to="/" exact>
                Home
            </NavLink>
            <NavLink to="/matches">Matches</NavLink>
        </nav>
    </header>
);

export default Header;
