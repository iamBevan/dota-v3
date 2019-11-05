import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const Header = () => {
    return (
        <header>
            <nav>
                <NavLink to="/" exact>
                    Search
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
