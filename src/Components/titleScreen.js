/* titleScreen handles any title screen html elements, as well as providing settings for the user to select from.
    It also displays the users average scores, sourced from localstorage.
    The settings screen is conditionally rendered on whether the toggleSettings state is true.
    Furthermore, the settings conditional render includes a button which calls the handleDark function passed as props.
*/

import React from "react"

export default function TitleScreen(props) {

    const [toggleSettings, setToggleSettings] = React.useState(false) // handles conditional rendering of settings screen. Defaults to false.

    //  The function reset scores can be called from one of the buttons in the settings screen, and resets the localstorage scores for the user.
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
                        <h3>Choose a difficulty below</h3>

                        <div className="questionTypeButtons">
                            <button onClick={() => props.triviaCategorySelection("easy")} style={{background: "#2ccc88"}}
                                    className="difficultySelectButtons">Easy
                            </button>

                            <button onClick={() => props.triviaCategorySelection("medium")} style={{background: "#de862b"}}
                                    className="difficultySelectButtons">Medium
                            </button>

                            <button onClick={() => props.triviaCategorySelection("hard")} style={{background: "#c81240"}}
                                    className="difficultySelectButtons">Extreme
                            </button>

                            <h3>Or, play from one of the following preselected categories!</h3>
                            <button onClick={() => props.triviaCategorySelection("80's Trivia")} style={{background: "#de16db"}}
                                    className="difficultySelectButtons">80's Trivia
                            </button>

                            <button onClick={() => props.triviaCategorySelection("Sport")} style={{background: "rgb(61,171,178)"}}
                                    className="difficultySelectButtons">Sport
                            </button>

                            <button onClick={() => props.triviaCategorySelection("Music")} style={{background: "rgba(142,22,222,0.87)"}}
                                    className="difficultySelectButtons">Music
                            </button>

                            <button onClick={() => props.triviaCategorySelection("Film")} style={{background: "rgb(34,36,53)"}}
                                    className="difficultySelectButtons">Film & TV
                            </button>

                        </div>


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
