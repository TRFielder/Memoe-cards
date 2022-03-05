import React, { useEffect, useState } from "react";
import Cards from "./cards";
import "./game.css";

const Game = () => {

    const [level, setLevel] = useState(1);
    const [characters, setCharacters] = useState([
        {name: "raiden", vision: "electro", clicked: false},
        {name: "zhongli", vision: "geo", clicked: false},
        {name: "venti", vision: "anemo", clicked: false},
        {name: "bennett", vision: "pyro", clicked: false}
    ]);
    const [lose, setLose] = useState(false);
    const maxLevel = 41;
    const minLevel = 1;

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
                        vision: characterData.vision,
                        clicked: false
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
                    console.log("New chars set")
                    console.log(level)
            })
    }

    const decrementLevel = () => {
        if(level > minLevel) setLevel(level-1);
    }

    const incrementLevel = () => {
        if(level < maxLevel) setLevel(level+1);
    }

    useEffect(() => {
        newCharacters();
    }, [level])

    const cardClicked = (character) => {
        //checkWinLose;
        let card = document.getElementById(`card-${character}`);
        card.classList.toggle("rotated");

        let updatedChars = characters;

        let index = updatedChars.findIndex(item => item.name === character)

        updatedChars[index].clicked = true;
        if(checkWinLose()){
            incrementLevel();
        } 
        else {
            let shufCards = updatedChars.sort(() => 0.5 - Math.random())
            setCharacters([...shufCards])
        }
    }

    const checkWinLose = () => {
        return(characters.every(char => char.clicked === true))
            
    }

    return(
        <div className="game" id="game">

            <ul className="card-display">                
                { characters.map(char => <Cards key={char.name} name={char.name} vision={char.vision} clicked={false} cardClicked={cardClicked}/>) }               
            </ul>
            <button onClick={newCharacters}>NEW SET</button>
            <button onClick={incrementLevel}>LEVEL UP</button>
            <button onClick={decrementLevel}>LEVEL DOWN</button>
            <p>Level: {level}</p>
        </div>
    )
}
export default Game;