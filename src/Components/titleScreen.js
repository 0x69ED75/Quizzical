import React from "react"

export default function titleScreen(props) {

    return (
        <div className="welcomeScreen">
            <h1>Quizzical</h1>
            <h3>A quiz game with new questions each time you play!</h3>
            <button className="startButton" onClick={props.handleClick}>Play Now!</button>
        </div>
    )
}
