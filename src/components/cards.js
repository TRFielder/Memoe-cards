import React, { useState } from "react";
import "./cards.css";

const Cards = (props) => {

    const [character] = useState(props.name)
    const [vision] = useState(props.vision);

    return(
        <div className="card">
            <div className="imageContainer">
                <img id={`characterImage${props.num}`} src={`https://api.genshin.dev/characters/${character}/icon-big`} alt={character}></img>
                <div className="aboutCharacter">
                    <img id={`characterVision${props.num}`} src={`https://api.genshin.dev/elements/${vision.toLowerCase()}/icon`} alt="vision"></img>
                </div>
            </div>
        </div>
    )       
}

export default Cards