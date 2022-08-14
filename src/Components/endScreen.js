import React from "react"

/* The endScreen function handles all endscreen html elements.
   It also allows the user to return to the main menu through a hack solution of just refreshing the page. This isn't ideal but will do for now TODO: <- */
export default function EndScreen(props) {


    return (
        <div className="endGame">
            <h1>Congratulations!</h1>
            <h2>Your score was: {props.score}</h2>
            <h3>Click the button below to play again!</h3>
            <button style={{background:"#28c864"}} onClick={props.playAgain}>Play Again!</button>
            <button style={{background:"#c82860"}} onClick={props.returnToMenu}>Main Menu</button>
        </div>
    )
}
