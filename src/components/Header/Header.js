import React from 'react';
import logo from "../../images/logo.svg"
import {NavLink} from "react-router-dom";
import "./Header.css"

const Header = () => {
    return (
        <header className="header py-3">
            <div className="container">
                <div className="d-flex justify-content-between">
                    <img className="logo" src={logo} alt="TMDB"/>
                    <nav>
                        <NavLink to="/" className="btn btn-success me-2">Main</NavLink>
                        <NavLink to="/films" className="btn btn-success me-2">Movies</NavLink>
                        <NavLink to="/serials" className="btn btn-success me-2">Serials</NavLink>
                        <NavLink to="/actors" className="btn btn-success me-2">Actors</NavLink>
                        <NavLink to="/more" className="btn btn-success me-2">More</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;