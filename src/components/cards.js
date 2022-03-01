import React, { useState } from "react";
import "./cards.css";

const Cards = (props) => {

    const [character, setCharacter] = useState(props.name)
    const [vision, setVision] = useState(props.vision);

    async function getCharacterData() {
        let response = await fetch("https://api.genshin.dev/characters/")
        let characterList = await response.json()
        //Remove Thoma from character list as API does not have icon-big for this character (sorry Thoma!)
        const noThomaCharacterList = characterList.filter(function(char) {
            return char !== "thoma"
        });

        let charName = (noThomaCharacterList[Math.floor(Math.random()*noThomaCharacterList.length)])

        let visionResponse = await fetch (`https://api.genshin.dev/characters/${charName}`)
        let characterData = await visionResponse.json();

        let charObj = {
            name: charName,
            vision: characterData.vision
        }
        return charObj
    }


    function handleCharacterChange() {
        const img=document.getElementById(`characterImage${props.num}`)
        const visionImg = document.getElementById(`characterVision${props.num}`)
        getCharacterData().then(result => {
            setCharacter(() => {
                let newCharacter = result.name;
                return newCharacter
            });
            
            setVision(() => {
                let newVision = result.vision;
                return newVision;
            });
        }).then( () => {
            img.src=getCharacterImage();
            visionImg.src = getVisionImage();
        });
    }

    function getCharacterImage() {
        let url = `https://api.genshin.dev/characters/${character}/icon-big`
        if(character.includes("traveler")) { 
            url = `https://api.genshin.dev/characters/${character}/icon-big-lumine`;
        }
        return url;
    }

    function getVisionImage() {
        let url = `https://api.genshin.dev/elements/${vision.toLowerCase()}/icon`
        return url;
    }

    return(
        <div onClick={handleCharacterChange} className="card">
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