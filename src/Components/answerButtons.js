/*
This function contains the html for each button, as well as what should occur when its pressed.
It has dynamic style depending on whenever the prop "selected" is true.
On click, it runs a function passed as props, passing a parameter also given by props.
It doesnt make much sense to call a function with props and then pass it a parameter also with props, but I cant seem to find a cleaner way at the moment
 */

import React from "react"

export default function AnswerButtons(props) {

    const styles = {
        backgroundColor: props.selected ? "#ece932" : "",
    }

    return (
        <button style={styles}
                onClick={function(){ props.highlightanswer(props.answerValue);}}
        >{props.answerValue}</button>
    )
}
