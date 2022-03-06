import React, { useEffect, useState } from "react";
import Cards from "./cards";
import "./styles/game.css";

const Game = () => {

    const [level, setLevel] = useState(1);
    const [characters, setCharacters] = useState([]);
    const [lose, setLose] = useState(false);
    const [clearLevel, setClearLevel] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
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
            })
    }

    const resetLevel = () => {
        console.log("resetting game")
        setLevel(1);
        setScore(0);
        setLose(false);
        //Added this to ensure you can keep playing even if you fail on level 1
        //Without this, need to f5 the page to start over if you lose on level 1...
        if(level === 1) {
            let resetChars = characters;
            resetChars.forEach(item => item.clicked = false)
            setCharacters(resetChars)
        }
    }

    const incrementLevel = () => {
        if(level < maxLevel) {
            setLevel(level+1);
            setClearLevel(false);
        }
    }

    useEffect(() => {
        if(score > highScore) setHighScore(score)
    }, [score])

    useEffect(() => {
        newCharacters();
    }, [level])

    useEffect(() => {
        //Check for win when characters are updated
        if(clearLevel) {
            incrementLevel();
        }
    }, [clearLevel] )

    const cardClicked = (character) => {
        if(checkLose(character)) {
            loseGame();
        }

        let card = document.getElementById(`card-${character}`);
        card.addEventListener("animationend", function() {
            card.classList.remove("rotated");
        })
        card.classList.toggle("rotated");

        let updatedChars = characters;
        let index = updatedChars.findIndex(item => item.name === character)

        if(!updatedChars[index].clicked) {
            updatedChars[index].clicked = true
            incrementScore();
        } else if (updatedChars[index].clicked) {
            loseGame();
        };

        
      
        let shufCards = updatedChars.sort(() => 0.5 - Math.random())
        setCharacters([...shufCards])

        checkWin();
    }

    const incrementScore = () => {
        setScore(score+1);
    }

    const checkWin = () => {
        if(characters.every(char => char.clicked === true)) {
            setClearLevel(true);
        }
    }

    const checkLose = (character) => {
        let index = characters.findIndex(item => item.name === character)
        if(characters[index].clicked === true) {
            return true
        }
        return false;
    }

    if(lose) {
        return(
            <div className="game" id="game">
                <p>YOU LOST AT LEVEL: {level}</p>
                <p>Score: {score}</p>
            <button onClick={resetLevel}>RESTART</button>
            <p>Level: {level}</p>
        </div>
        )
    }
    else {
        return(
        <div className="game" id="game">

            <ul className="card-display">                
                { characters.map(char => <Cards key={char.name} name={char.name} vision={char.vision} clicked={false} shouldLose={false} cardClicked={cardClicked} />) }               
            </ul>
            <button onClick={resetLevel}>RESTART</button>
            <div id="scoreboard">
                <p>Level: {level}</p>
                <p>Score: {score}</p>
                <p>High score: {highScore}</p>
                <p>Click on every card, but don't click the same one twice!</p>
            </div>
        </div>
        );
    }
}
export default Game;