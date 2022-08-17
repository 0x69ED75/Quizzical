/*
This function contains the html for each button, as well as what should occur when its pressed.
It has dynamic style depending on whenever the prop "selected" is true.
On click, it runs a function passed as props, passing a parameter also given by props.
 */

import React from "react"

export default function AnswerButtons(props) {

    // calculating which style to use for the buttons.
    function calculateStyle(){
        if(props.selected){
            return("#ece932")
        }
        else if(props.darkmode){
            return ("#4a646b")
        }

    }

    const styles = {
        backgroundColor: calculateStyle(),
        color: props.darkmode && !props.selected ? "#dcdcd0" : ""
    }

    return (
        <button id="answerButton" style={styles}
                onClick={function(){ props.highlightanswer(props.answerValue,props.questionText);}}
        >{props.answerValue}</button>
    )
}
