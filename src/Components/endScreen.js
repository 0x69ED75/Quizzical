import React from "react"
import {nanoid} from "nanoid";
import AnswerDisplay from "./answerDisplay";

/* The endScreen function handles all end screen html elements.
    It displays the user's chosen answers, alongside whether these were correct or incorrect
   It also allows the user to return to the main menu by calling a function (returnToMainMenu()) which is passed through props all the way from App.js
   */
export default function EndScreen(props) {

    /* mapping the question array passed as props into an array of custom AnswerDisplay HTML elements  with its own props, most of which are derived from the questions array.
       these props will be used to display to the user which questions they got wrong and which questions they got right.*/
    const answerInfo = props.questions.map(Question => <AnswerDisplay
        key = {nanoid()}
        allAnswers = {Question.allAnswers}
        questionText={Question.questionText}
        correctAnswer ={Question.correctAnswer}
        selectedAnswers = {props.selectedAnswers}
    />)

    const styles = {
        color: props.score > 2 ? "#28c864" : "#c82860"
    }


    // Rendering below displays the users scores, and then displays the answerInfo array of JSX elements.
    return (
        <div>
                <div className="showAnswers">
                    <div className="congratulate">
                        <h1>Congratulations!</h1>
                        <h2>Your score was: <span style={styles}> {props.score} </span> </h2>
                        <h2>You can see your correct answers below!</h2>
                        <button style={{background: "#28c864"}} onClick={() => props.playAgain(true)}>Play Again!</button>
                        <button style={{background: "#c82860"}} onClick={() => props.playAgain(false)}>Main Menu</button>
                    </div>
                    {answerInfo}
                </div>
        </div>
    )
}
