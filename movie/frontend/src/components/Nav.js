import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/navStyle.css';

function Nav() {
    const location = useLocation();

    return (
        <div className="navContainer">
            <img src="https://img.icons8.com/glyph-neue/344/movie-projector.png" alt="Title" />
            <nav>
                <Link to="/" className={location.pathname === '/' ? "active" : "nonActive"}>
                    <div className="navMenus">Popular</div>
                </Link>
                <Link to="/HighRated" className={location.pathname === '/HighRated' ? "active" : "nonActive"}>
                    <div className="navMenus">TopRated</div>
                </Link>
            </nav>
        </div>
    )
}

export default Nav