import React, { useState } from "react";
import Cards from "./cards";
import "./game.css";

const Game = () => {

    const [level, setLevel] = useState(1)
    const [characters, setCharacters] = useState([])

    async function getCharacterData() {
        let response = await fetch("https://api.genshin.dev/characters/")
        let characterList = await response.json()
        //Remove Thoma from character list as API does not have icon-big for this character (sorry Thoma!)
        const noIconCharacterList = characterList.filter(function(char) {
            return char !== "thoma" && char !== "traveler-anemo" && char !== "traveler-electro" && char !== "traveler-geo" 
        });
        let charName;
        let characterData;
        let randomCharacters = []
        for (let i = 0; i < level+3; i++) {
            charName = (noIconCharacterList[Math.floor(Math.random()*noIconCharacterList.length)])
            let visionResponse = await fetch (`https://api.genshin.dev/characters/${charName}`)
            characterData = await visionResponse.json();
            randomCharacters[i] = {
                name: charName,
                vision: characterData.vision
            }
        }
        return randomCharacters
    }

    const decrementLevel = () => {
        setLevel(level-1)
    }

    const incrementLevel = () => {
        setLevel(level+1)
    }

    const newCharacters = () => {
        setCharacters([]);
        let numCards = level+3;
        for (let i = 0; i < numCards; i++) {
            getCharacterData().then(result => {
                    setCharacters(characters => [...characters, result[i]])
            })
        }
    }

    return(
        <div className="game" id="game">

            <ul className="card-display">                
                {characters.map(char => <Cards key={char.name} name={char.name} vision={char.vision} />)}               
            </ul>
            <button onClick={newCharacters}>NEW SET</button>
            <button onClick={incrementLevel}>LEVEL UP</button>
            <button onClick={decrementLevel}>LEVEL DOWN</button>

        </div>
    )
}
export default Game;