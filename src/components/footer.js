import React from "react";
import { FaGithub } from "react-icons/fa"
import "./styles/footer.css"

class Footer extends React.Component {
    render() {
        return (
            <div id="footer">
                <div className="innerFooter">
                    <div className="logoContainer">
                        <p>Tom Fielder 2022 <a href="https://github.com/TRFielder" target="_blank" rel="noreferrer"> <FaGithub /> </a> </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;