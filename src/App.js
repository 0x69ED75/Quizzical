import React from "react"
import './style.css';
import TitleScreen from "./Components/titleScreen"
import QuestionMain from "./Components/questionMain"


export default function App() {
    const [difficulty, setDifficulty] = React.useState("https://the-trivia-api.com/api/questions?limit=5&region=GB&difficulty=medium")
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
            const res = await fetch(difficulty)
            return await res.json()
        }

        fetchData().then(response => { // once a response is received from the API:
            let questionsarr = []
            for(let i = 0; i< 5; i++){
                questionsarr.push({
                    questionNumber:i,
                    questionText:response[i].question,
                    correctAnswer:response[i].correctAnswer,
                    incorrectAnswer:response[i].incorrectAnswers,
                    allAnswers: shuffle([response[i].correctAnswer,response[i].incorrectAnswers[0],response[i].incorrectAnswers[1],response[i].incorrectAnswers[2]])
                })
            }
            setQuestions(questionsarr)
        });
    }, [playAgain,difficulty]); // putting playAgain as a dependency to gen new questions when the user wishes to play again. Also difficulty should be a dependency to gen new questions when difficulty is changed.

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

    // handles the difficulty of the questions chosen by user. defaults to medium if a difficult is not chosen. This function is passed through props to title screen.
    function difficultySelection(difficultySelect){
        if(difficultySelect === "easy"){
            console.log("difficulty set: Easy")
            setDifficulty("https://the-trivia-api.com/api/questions?limit=5&difficulty=easy")
        }
        else if(difficultySelect === "hard"){
            console.log("difficulty set: Hard")
            setDifficulty("https://the-trivia-api.com/api/questions?limit=5&difficulty=hard")
        }
    }

return(
    <div>
        <main>
            {
                !gameStart
                    ?
                    <TitleScreen  difficultySelection={(difficultySelect) => difficultySelection(difficultySelect)} handleClick={() => {setGameStart(true)}}/>
                    :
                    <div className="questionContainer">
                        <QuestionMain questions={questions} resetGame={setPlayagain}/>
                    </div>
            }
        </main>
    </div>
)
}
