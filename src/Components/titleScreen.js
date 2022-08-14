import React from "react"

export default function TitleScreen(props) {

    const [toggleSettings, setToggleSettings] = React.useState(false)

     function resetScores(){
         localStorage.removeItem("averageScore")
         localStorage.removeItem("scores")
    }

    return (
        <div>
            {
                !toggleSettings
                    ?
                    <div className="welcomeScreen">
                        <h1>Quizzical</h1>
                        <h3>A quiz game with new questions each time you play!</h3>
                        <h3>Choose a difficulty below, or just press play now to play at normal difficulty.</h3>
                        <button onClick={() => props.difficultySelection("easy")} style={{background: "#2ccc88"}}
                                className="difficultyButton">Easy
                        </button>
                        <button onClick={() => props.difficultySelection("hard")} style={{background: "#c81240"}}
                                className="difficultyButton">Extreme
                        </button>
                        <button className="startButton" onClick={props.handleClick}>Play Now!</button>

                        <div className="Scores">
                            {!localStorage.getItem("averageScore")
                                && <h3>After you play, your average score will be here!</h3>}

                            {localStorage.getItem("averageScore")
                                && <h3>Average Score: {localStorage.getItem("averageScore")}</h3>}
                        </div>


                        <div className="SettingsButton">
                            <button style={{background: "#7d7c7c"}} onClick={() => setToggleSettings(true)}>Settings </button>
                        </div>
                    </div>
                    :
                    <div className="Settings">
                        <h1>Settings</h1>
                        <button style={{background: "#d51e1e"}} onClick={() => resetScores() }>Reset Scores</button>
                        <button style={{background: "#2e2b2b"}} onClick={() => props.handleDark()}>Dark Mode</button>
                        <button style={{background: "#13d763"}} onClick={() => setToggleSettings(false)}>Main Menu</button>
                    </div>
            }

        </div>
    )
}
