import React from "react"
import {nanoid} from "nanoid";
import MarkSheet from "./markSheet";

/* The endScreen function handles all end screen html elements.
   It also allows the user to return to the main menu by calling a function (returnToMainMenu()) which is passed through props all the way from App.js
   Furthermore, it has conditional rendering of the <MarkSheet> element (markSheet.js) which can show the correct answer and the users' answer for each question.
   */
export default function EndScreen(props) {

    const [viewAnswers,setViewAnswers] = React.useState(false) // State which manages the conditional rendering of <MarkSheet>

    /* mapping the question array passed as props into an array of custom MarkSheet HTML elements  with its own props, most of which are derived from the questions array.
       these props will be used to display to the user which questions they got wrong and which questions they got right.*/
    const answerInfo = props.questions.map(Question => <MarkSheet
        key = {nanoid()}
        allAnswers = {Question.allAnswers}
        questionText={Question.questionText}
        correctAnswer ={Question.correctAnswer}
        selectedAnswers = {props.selectedAnswers}
    />)


    // conditional rendering below either renders the congratulations screen or a screen showing the users answers and the correct answers (markSheet)
    return (
        <div>
            {
                !viewAnswers ?
                <div className="endGame">
                    <h1>Congratulations!</h1>
                    <h2>Your score was: {props.score}</h2>
                    <h3>View the correct answers or play another game with the buttons below!</h3>
                    <button style={{background: "#091fdf"}} onClick={() => setViewAnswers(true)}>Correct Answers</button>
                    <button style={{background: "#28c864"}} onClick={props.playAgain}>Play Again!</button>
                    <button style={{background: "#c82860"}} onClick={props.returnToMenu}>Main Menu</button>
                </div>
                :
                <div className="showAnswers">
                    {answerInfo}
                    <button style={{background: "#27ed72"}} onClick={() => {setViewAnswers(false)}}>Return</button>
                </div>
            }
        </div>
    )
}
