import React from "react"
import './style.css';
import TitleScreen from "./Components/titleScreen"
import QuestionMain from "./Components/questionMain"

// TODO: fix being able to go to main menu and click play and get same q

export default function App() {
    const [darkMode, setDarkMode] = React.useState(localStorage.getItem("darkMode") === "dark")
    const [triviaCategory, setTriviaCategory] = React.useState("")
    const [playAgain,setPlayagain] = React.useState(false)
    const [gameStart, setGameStart]= React.useState(false)
    const [questions,setQuestions] = React.useState([{
        questionText:"",
        correctAnswer:"",
        incorrectAnswer:""
    }])

    // this useEffect grabs questions and answers from an API, and then pushes them into an array, and setting this array to state, this state is passed to questionMain as props to be broken down into questions.
    React.useEffect(() => { // to create an async useEffect, must create async function inside useEffect and call it immediately

            async function fetchData() { // fetching data from API. Returns an object containing question info.
                const res = await fetch(triviaCategory)
                return await res.json()
            }
            fetchData().then(APIResponse => { // once a response is received from the API:
                let questionsarr = []
                for (let i = 0; i < 5; i++) {
                    console.log(APIResponse[i].difficulty)
                    console.log(APIResponse[i].tags)
                    questionsarr.push({
                        questionNumber: i,
                        questionText: APIResponse[i].question,
                        correctAnswer: APIResponse[i].correctAnswer,
                        incorrectAnswer: APIResponse[i].incorrectAnswers,
                        allAnswers: shuffle([APIResponse[i].correctAnswer, APIResponse[i].incorrectAnswers[0], APIResponse[i].incorrectAnswers[1], APIResponse[i].incorrectAnswers[2]])
                    })
                }
                setQuestions(questionsarr)
                setGameStart(true) // starting the game after the questions are fetched from the API.
            });
    }, [playAgain,triviaCategory]); // putting playAgain as a dependency to gen new questions when the user wishes to play again. Also triviaCategory should be a dependency to gen new questions when triviaCategory is changed.

    // handles setting dark mode by setting background color property of the DOM body
    React.useEffect(() => {

        if(darkMode){
            document.body.style.backgroundColor = "#000000";
            document.getElementById('main').style.color = "#7681d0";
        }
        else{
            document.body.style.backgroundColor = "#F5F5F5";
            document.getElementById('main').style.color = "#293264";
        }

    }, [darkMode]);

    // a function which shuffles any array given to it. I use this to shuffle the selection of answers into a random order.
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    // handles the triviaCategory of the questions chosen by user. defaults to medium if nothing is chosen. This function is passed through props to title screen.
    function triviaCategorySelection(triviaCategory){
        switch(triviaCategory) {
            case "easy":
                console.log("trivia Category set: Easy")
                setTriviaCategory("https://the-trivia-api.com/api/questions?limit=5&difficulty=easy")
                break;
            case "medium":
                console.log("trivia Category set: Medium")
                setTriviaCategory("https://the-trivia-api.com/api/questions?limit=5&region=GB&difficulty=medium")
                break;
            case "hard":
                console.log("trivia Category set: Hard")
                setTriviaCategory("https://the-trivia-api.com/api/questions?limit=5&difficulty=hard")
                break;
            case "80's Trivia":
                console.log("trivia Category set: 80's Trivia")
                setTriviaCategory("https://the-trivia-api.com/api/questions?limit=5&tags=1980's")
                break;
            case "Music":
                console.log("trivia Category set: 80's Trivia")
                setTriviaCategory("https://the-trivia-api.com/api/questions?categories=music&limit=5")
                break;
            case "Film":
                console.log("trivia Category set: 80's Trivia")
                setTriviaCategory("https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=5")
                break;
            case "Sport":
                console.log("trivia Category set: 80's Trivia")
                setTriviaCategory("https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=5")
                break;
        }
    }

    /* This function handles dark mode in localstorage, so that users preferences are remembered between sessions
        It also handles setting the state darkMode to the appropriate value.
        It is passed as props to titleScreen
     */
    function setMemoryDarkMode(){
        if(localStorage.getItem("darkMode") === "dark"){
            localStorage.setItem("darkMode","light")
            setDarkMode(false)
        }
        else{
            localStorage.setItem("darkMode","dark")
            setDarkMode(true)
        }
    }

    // this function handles returning the user to the main menu. It also silently generates new questions in the background, so if the user wishes to play again there is new questions.
    function returnToMainMenu(){
        setGameStart(false)
        setPlayagain(prevState => !prevState) // causes refresh of this component, causing useEffect to generate new questions
    }


return(
    <div>
        <main id="main">
            {
                !gameStart
                    ?
                    <TitleScreen triviaCategorySelection={(triviaCategory) => triviaCategorySelection(triviaCategory)}
                                 handleDark={() => {setMemoryDarkMode()}}
                    />
                    :
                    <div className="questionContainer">
                        <QuestionMain questions={questions}
                                      resetGame={setPlayagain}
                                      darkmode={darkMode}
                                      returnMenu={() => {returnToMainMenu()}}
                        />
                    </div>
            }
        </main>
    </div>
)
}
