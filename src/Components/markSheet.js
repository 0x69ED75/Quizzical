/*
Marksheet is a React component responsible for giving an overview of the correct answer to a single question, as well as showing the user whether they got the question correct.
A little more work needs to be done here than just simply display what is given since the props given are not adequate on their own to calculate which answer was selected for which question.
This is because the Object representing all answers chosen are in the order of which they were chosen, not the same order in which questions are displayed.
    e.g. if you answered question 3 and then question 1, question 3 will sit at the top of the array.
It is possible to just find similarities between the answers the user chose and the array of answers available for each question, but this falls short when questions share some answers, which happens fairly frequently.
Therefore, there is an useffect to find which answer was chosen for each question.
 */
import React from "react"
export default function MarkSheet(props) {

    const [chosenAnswer,setChosenAnswer] = React.useState()

    /* It is this useEffect's job to find out which answer the user has selected for each question.
    It does this by getting the keys from the selectedAnswers object, which is the text of each question.
    We then find the key that matches the question text of the question we are currently looking at.
    If it matches, we know we are looking at the right question, so we can return the answer matching this key in the selectedAnswers Object. */

    React.useEffect(() => {
        Object.keys(props.selectedAnswers).forEach(selectedAnswerText =>{
            if(props.questionText === selectedAnswerText){
                setChosenAnswer(props.selectedAnswers[selectedAnswerText])
            }
        })
    }, []); // has no deps as nothing should cause this to call again.



    // conditional styling for if the question is correct, the questions text is green, else it is red.
    const styles = {
        color: chosenAnswer === props.correctAnswer ? "#35b935" : "#d83242"
    }

    // Pretty standard JSX rendering, except one component's text is calculated via function "findChosenAnswer"
    return (
        <div className="showAnswers">
            <h2 style={styles}>{props.questionText}</h2>
            <h3>Chosen Answer: {chosenAnswer} </h3>
            <h3>Correct Answer: {props.correctAnswer}</h3>
        </div>
    )

}