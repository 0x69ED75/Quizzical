/*
Marksheet is a React component responsible for giving an overview of the correct answer to each question, as well as showing the user whether they got the question correct.
A little more work needs to be done here than just simply display what is given since the props given are not adequate on their own to calculate which answer was selected for which question.
This is because the Object representing all answers chosen are in the order of which they were chosen, not the same order in which questions are displayed.
    e.g. if you answered question 3 and then question 1, question 3 will sit at the top of the array.
Therefore there is an extra function to find which answer was chosen for each question.
 */
import React from "react"
export default function MarkSheet(props) {

    /* It is this functions job to find out which answer the user has selected for each question.
    It does this by parsing all the answers the user has selected for all questions, as well as all the answers for the current question as arrays
    * After this, it finds any similarities between these two arrays, using filter.
    * The outcome of this filter must be the answer the user has chosen for the current question, so it is returned. */
    function findChosenAnswer(){
        let allAns = Object.values(props.allAnswers)
        let allChosenAns = Object.values(props.selectedAnswers)
        return allAns.filter(answer => allChosenAns.includes(answer));
    }

    // conditional styling for if the question is correct, the questions text is green, else it is red.
    const styles = {
        color: findChosenAnswer().includes(props.correctAnswer) ? "#35b935" : "#d83242"
    }

    // Pretty standard JSX rendering, except one component's text is calculated via function "findChosenAnswer"
    return (
        <div className="showAnswers">
            <h2 style={styles}>{props.questionText}</h2>
            <h3>Chosen Answer: {findChosenAnswer()}</h3>
            <h3>Correct Answer: {props.correctAnswer}</h3>
        </div>
    )

}