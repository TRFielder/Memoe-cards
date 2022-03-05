import React, { useState } from "react";
import "./cards.css";

const Cards = (props) => {

    const [character] = useState(props.name);
    const [vision] = useState(props.vision);
    const [clicked, setClick] = useState(false);
    const [failCondition, setFail] = useState(false);

    const selectCard = () => {
        let card = document.getElementById(`card${character}`);
        card.classList.add("rotated");
        if(clicked) setFail(true);
        else if(!clicked) setClick(true);
    }

    return(
        <div className={"card"} id={`card${character}`} onClick={selectCard}>
            <div className="imageContainer">
                <img id={`characterImage`} src={`https://api.genshin.dev/characters/${character}/icon-big`} alt={character}></img>
                <div className="aboutCharacter">
                    <img id={`characterVision`} src={`https://api.genshin.dev/elements/${vision.toLowerCase()}/icon`} alt="vision"></img>
                </div>
            </div>
        </div>
    )       
}

export default Cards