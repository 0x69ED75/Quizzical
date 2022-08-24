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

    const [selectedAnswers, setSelectedAnswers] = React.useState({})
    const [score,setScore] = React.useState(0)
    const [gameEnd,setGameEnd] = React.useState(false)
    const [correctAns,setCorrectAns] = React.useState([])


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
        - Handle Highlight / remove Highlight are functions which either remove or add selected answers to the selectedAnswers state object.
     */
    const questionContents = props.questions.map(Question => <QuestionContent
        darkmode={props.darkmode}
        key = {nanoid()}
        questionText={Question.questionText}
        allAnswers ={Question.allAnswers}
        handleHighlight = {handleHighlight}
        selectedAnswers={selectedAnswers}
    />)


    // stores the selected answers in state for each question by updating the state object with the questionText as a key, and the chosen answer as the value.
    function handleHighlight(chosenAnswer,questionText){
        setSelectedAnswers(prevState => ({...prevState, [questionText]: chosenAnswer }));
    }


    // Managing endGame rules, gathers an array of the correct answers, comparing these to the incorrect answers.
    function endGame(){

        // going through each question, checking if the answer in each question matches that given by the user.
        props.questions.forEach(Question =>{
            if(selectedAnswers[Question.questionText] === Question.correctAnswer){ // accessing the selectAnswers object, using the current iterated questions text as key, then checking if this matches the correct answer.
                setScore(prevScore => prevScore + 1)
            }
        })
        let correctAnswers = props.questions.map(Question => Question.correctAnswer) // mapping each question correct question to a new array
        setCorrectAns(correctAnswers)
        setGameEnd(true)
    }

    // this function manages the local storage of scores and average scores.
    function manageLocalStorage(){
        // Managing local storage scores:
        let old = localStorage.getItem("scores");
        if(old === null) localStorage.setItem("scores", ""+ score)
        else localStorage.setItem("scores", old + "," + score)
        // calculating average score
        let scoreArr = localStorage.getItem("scores").split(",").map(item => Number.parseInt(item));
        let avg = Math.round(scoreArr.reduce((a, b) => a + b, 0) / scoreArr.length);
        localStorage.setItem("averageScore",""+avg)
    }


    // A hack workaround to reset the game to its initial state by calling A state which exists in App.js, which therefore forces a refresh of this component
    function playAgain(isPlayAgain){
        setSelectedAnswers([])
        setScore(0)
        setGameEnd(false)
        isPlayAgain ? props.playAgain() : props.returnMenu()
    }

        return (
            <div className="questionScreen">
                {
                    !gameEnd
                        ?
                        <div className="questionContainer">
                            {questionContents}
                            <button onClick={endGame} className="submitButton" >Submit</button>
                        </div>
                        :
                        <div className="gameEnd">
                            <EndScreen score={score}
                                       playAgain={(isPlayAgain) => playAgain(isPlayAgain)}
                                       selectedAnswers={selectedAnswers}
                                       correctAnswers={correctAns}
                                       questions = {props.questions}
                            />
                        </div>
                }
            </div>
    )
}
