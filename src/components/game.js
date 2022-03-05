import React, { useState } from "react";
import Cards from "./cards";
import "./game.css";

const Game = () => {

    const [level, setLevel] = useState(1);
    const [characters, setCharacters] = useState([
        {name: "raiden", vision: "electro"},
        {name: "zhongli", vision: "geo"},
        {name: "venti", vision: "anemo"},
        {name: "bennett", vision: "pyro"}
    ]);
    const [lose, setLose] = useState(false);
    const maxLevel = 41;

    async function getCharacterData() {
        let response = await fetch("https://api.genshin.dev/characters/")
        let characterList = await response.json()
        //Remove Thoma from character list as API does not have icon-big for this character (sorry Thoma!)
        const filteredCharList = characterList.filter(function(char) {
            return char !== "thoma" && char !== "traveler-anemo" && char !== "traveler-electro" && char !== "traveler-geo" 
        });

        let randomCharacters = []

        let counter = 0;
        while(counter < level+3){
            //Generate a random item from the character name array and check if it is already in the list of selected names with randomCharacters.some()
            let randomCharName = (filteredCharList[ Math.floor(Math.random() * filteredCharList.length) ] );
            if(!randomCharacters.some( char => char.name === randomCharName ) ){

                let visionResponse = await fetch (`https://api.genshin.dev/characters/${randomCharName}`)
                let characterData = await visionResponse.json();

                randomCharacters.push(
                    {
                        name: randomCharName,
                        vision: characterData.vision
                    }
                )
                counter++;
            }
        }
        return randomCharacters
    }

    const loseGame = () => {
        setLose(true);
    }

    const newCharacters = () => {
        setCharacters([]);
            getCharacterData().then(result => {
                    setCharacters(result)
            })
    }

    const decrementLevel = () => {
        setLevel( (level-1) );
    }

    const incrementLevel = () => {
        if (level < maxLevel) setLevel( (level+1) );
    }

    const shuffleCards = () => {
        let shufCards = characters.sort(() => 0.5 - Math.random())
        setCharacters([...shufCards])
    }

    return(
        <div className="game" id="game">

            <ul className="card-display">                
                { characters.map(char => <Cards key={char.name} name={char.name} vision={char.vision} clicked={false} shuffle={shuffleCards}/>) }               
            </ul>
            <button onClick={newCharacters}>NEW SET</button>
            <button onClick={incrementLevel}>LEVEL UP</button>
            <button onClick={decrementLevel}>LEVEL DOWN</button>
            <button onClick={shuffleCards}>SHUFFLE CARDS</button>
        </div>
    )
}
export default Game;