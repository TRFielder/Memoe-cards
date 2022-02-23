import React, { useState } from "react";

const Cards = () => {

    const [character, setCharacter] = useState("amber")

    async function getCharacterNames() {
        let response = await fetch("https://api.genshin.dev/characters/")
        let characterList = await response.json()
        return (characterList[Math.floor(Math.random()*characterList.length)])
    }

    function handleCharacterChange() {
        const img=document.getElementById("characterImage")
        getCharacterNames().then(result => {
            setCharacter(() => {
                let newCharacter = result;
                return newCharacter
            });
        })
        
        img.src=getCharacterImage(character);
    }

    function getCharacterImage() {
        let url = `https://api.genshin.dev/characters/${character}/portrait`
        return url;
    }


    return(
        <div className="image" width={"200px"}>
            <img onClick={handleCharacterChange} id="characterImage" src={getCharacterImage(character)} alt={character} width={"200px"}></img>
        </div>
    )       
}


export default Cards