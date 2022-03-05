import React, { useState } from "react";
import "./cards.css";

const Cards = (props) => {

    const [character] = useState(props.name);
    const [vision] = useState(props.vision);
    const [clicked, setClick] = useState(props.clicked);

    const selectCard = () => {
        let card = document.getElementById(`card-${character}`);
        card.classList.toggle("rotated");
        setClick(true);
        props.shuffle();
    }


    return(
        <div className={"card"} id={`card-${character}`} onClick={selectCard}>
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