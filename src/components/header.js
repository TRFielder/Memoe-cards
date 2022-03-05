import React from "react";
import "./styles/header.css"

class Header extends React.Component {

    render() {
        return (
            <div id="header">
                <div className="innerHeader">
                    <div className="logoContainer">
                        <h1>Memoe Cards</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;