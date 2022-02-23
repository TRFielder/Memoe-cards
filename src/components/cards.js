import React, { useState } from "react";
import "./cards.css";

const Cards = () => {

    const [character, setCharacter] = useState("traveler-anemo")
    const [vision, setVision] = useState("anemo");

    async function getCharacterNames() {
        let response = await fetch("https://api.genshin.dev/characters/")
        let characterList = await response.json()
        //Remove Thoma from character list as API does not have icon-big for this character (sorry Thoma!)
        const noThomaCharacterList = characterList.filter(function(char) {
            return char !== "thoma"
        });

        return (noThomaCharacterList[Math.floor(Math.random()*noThomaCharacterList.length)])
    }

    async function getCharacterVision () {
        let response = await fetch (`https://api.genshin.dev/characters/${character}`)
        let characterInfo = await response.json();
        return characterInfo.vision;
    }

    function handleCharacterChange() {
        const img=document.getElementById("characterImage")
        const visionImg = document.getElementById("characterVision")
        getCharacterNames().then(result => {
            setCharacter(() => {
                let newCharacter = result;
                return newCharacter
            });
        })
        getCharacterVision().then( result => {
            setVision(() => {
                let newVision = result;
                return newVision;
            });
        })
        
        img.src=getCharacterImage(character)
        visionImg.src = `https://api.genshin.dev/elements/${vision.toLowerCase()}/icon`;
        console.log(visionImg.src)
    }

    function getCharacterImage() {
        let url = `https://api.genshin.dev/characters/${character}/icon-big`
        if(character.includes("traveler")) { 
            url = `https://api.genshin.dev/characters/${character}/icon-big-lumine`;
        }
        return url;
    }


    return(
        <div className="card">
            <div className="imageContainer">
                <img onClick={handleCharacterChange} id="characterImage" src={getCharacterImage()} alt={character}></img>
                <div className="aboutCharacter">
                    <img id="characterVision" src={`https://api.genshin.dev/elements/anemo/icon`} alt="vision"></img>
                </div>
            </div>
        </div>
    )       
}


export default Cards