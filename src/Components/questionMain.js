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
export default function QuestionMain(props) {

    const [selectedAnswers, setSelectedAnswers] = React.useState([])
    const [score,setScore] = React.useState(0)
    const [gameEnd,setGameEnd] = React.useState(false)


    /* Mapping each question to the QuestionContent element, which is given a range of props.
        - selectedAnswers is an array of answers the users has selected, stored in state. It has a limit of 5.
        - Handle Highlight / remove Highlight are functions which either remove or add selected answers to the selectedAnswers state array.
     */
    const questionContents = props.questions.map(Question => <QuestionContent
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
                            <button onClick={endGame} className="dynamicAnswerButton">Submit</button>
                        </div>
                        :
                        <div className="endGame">
                            <h1>Congratulations!</h1>
                            <h2>Your score was: {score}</h2>
                            <h3>How abouts you try again?</h3>
                            <button onClick={playAgain}>Play Again!</button>
                        </div>
                }
            </div>
    )
}
