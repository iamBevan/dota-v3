import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import Context from "../../Context";

const Header = () => {
    const { count, setCount } = useContext(Context) as {
        count: number;
        setCount: React.Dispatch<React.SetStateAction<string | undefined>>;
    };
    return (
        <header>
            <nav>
                <NavLink to="/" exact>
                    Home
                </NavLink>
                <NavLink to={`/matches/${count}`}>Matches</NavLink>
            </nav>
        </header>
    );
};

export default Header;
