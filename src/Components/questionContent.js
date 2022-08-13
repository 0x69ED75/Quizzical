import React from "react"
import AnswerButtons from "./answerButtons";
import {nanoid} from "nanoid";

export default function QuestionContent(props) {


    /* Answervalues is an array containing AnswerButton elements, which are mapped from an existing array containing all 4 answers for each question.
     these elements are passed a range of props including:
    *  Answer: is the buttons value, it is one of the answers to the questions.
    * IsCorrect: states whether the answer is correct or not.
    * Selected: states whether this answer has been selected.
    * highlightAnswer: a conditional which either runs a function which selects an element or deselects it.*/
    const answerValues = props.allAnswers.map(answer => <AnswerButtons
        answerValue = {answer}
        isCorrect = {answer === props.correctAnswer}
        selected = {props.selectedAnswers.includes(answer)}
        highlightanswer = {props.selectedAnswers.includes(answer) ?
        (value,handleCorrect) => props.removeHighlight(value)
            :  (value,handleCorrect) => props.handleHighlight(value)
        }
        key = {nanoid()}
    />)


    return (
        <div className="questionScreen">
            <div className="questions">
                <h1>{props.questionText}</h1>
                <div className="questionButtons">
                    {answerValues}
                </div>
            </div>

        </div>


    )
}
