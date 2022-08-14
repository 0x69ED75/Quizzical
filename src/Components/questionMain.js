/*
This function manages everything to do with questions and their answers such as:
  - Holding important states such as selected Answers, the users score and whether the game is ongoing.
  - mapping Questions and their respective answers to an array of QuestionContent elements, with respective props.
  - highlighting / un-highlighting chosen answers
  - ending the game
 */

import React from "react"
import {nanoid} from "nanoid"
import QuestionContent from "./questionContent";
import EndScreen from "./endScreen"

export default function QuestionMain(props) {

    const [selectedAnswers, setSelectedAnswers] = React.useState([])
    const [score,setScore] = React.useState(0)
    const [gameEnd,setGameEnd] = React.useState(false)

    /* useEffect runs everytime gameEnd changes, as a side effect. I can't just call manageLocalStorage in the endGame function since react state setting is asynchronous.
        This meant that within the endGame function, the state change wasn't being reflected until that function was over and another called.
        There was no other best place to put this than in a useEffect, as other candidates for good places to run this function had unintended side effects.*/
    React.useEffect(() => {

        if(gameEnd){ // must check if gameEnd is true, since otherwise this function will run twice, once in gameEnd and once again in playAgain, giving two copies of the users score.
            manageLocalStorage()
        }

    }, [gameEnd]);


    /* Mapping each question to the QuestionContent element, which is given a range of props.
        - selectedAnswers is an array of answers the users has selected, stored in state. It has a limit of 5.
        - Handle Highlight / remove Highlight are functions which either remove or add selected answers to the selectedAnswers state array.
     */
    const questionContents = props.questions.map(Question => <QuestionContent
        darkmode={props.darkmode}
        key = {nanoid()}
        questionText={Question.questionText}
        allAnswers ={Question.allAnswers}
        handleHighlight = {handleHighlight}
        removeHighlight = {removeHighlight}
        selectedAnswers={selectedAnswers}
    />)

    function handleHighlight(value){
        if(selectedAnswers.length < 5) {
            setSelectedAnswers(oldSelectedAnswers => [...oldSelectedAnswers, value])
        }
    }

    function removeHighlight(value){
        setSelectedAnswers(prevState => prevState.filter(answer => answer !== value))
    }

    // Managing endGame rules, gathers an array of the correct answers, comparing these to the incorrect answers.
    function endGame(value){

        let correctAnswers = props.questions.map(Question => Question.correctAnswer) // mapping each question correct question to a new array
        selectedAnswers.forEach(answer =>{
            if(correctAnswers.includes(answer)){
                setScore(prevState => prevState +1);
            }
        })
        setGameEnd(true)
    }
    // this function manages the local storage of scores and average scores.
    function manageLocalStorage(){
        // Managing local storage scores:
        console.log(score)
        let old = localStorage.getItem("scores");
        if(old === null) localStorage.setItem("scores", ""+ score)
        else localStorage.setItem("scores", old + "," + score)
        // calculating average score
        let scoreArr = localStorage.getItem("scores").split(",").map(item => Number.parseInt(item));
        let avg = Math.round(scoreArr.reduce((a, b) => a + b, 0) / scoreArr.length);
        localStorage.setItem("averageScore",""+avg)
    }


    // A hack workaround to reset the game to its initial state by calling A state which exists in App.js, which therefore forces a refresh of this component
    function playAgain(){
        setSelectedAnswers([])
        setScore(0)
        setGameEnd(false)
        props.resetGame(prevResetGame => !prevResetGame)
    }

        return (
            <div className="questionScreen">
                {
                    !gameEnd
                        ?
                        <div className="questionContainer">
                            {questionContents}
                            <button onClick={endGame} className="dynamicAnswerButton" >Submit</button>
                        </div>
                        :
                        <div className="endGame">
                            <EndScreen score={score} playAgain={playAgain} returnToMenu={props.returnMenu}/>
                        </div>
                }
            </div>
    )
}
