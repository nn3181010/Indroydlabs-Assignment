import {useState} from 'react'
import {QRCodeCanvas} from 'qrcode.react'
import './App.css'

const questions = [
  {
    question: 'Location of Charminar?',
    options: ['A:Banglore', 'B:Chennai', 'C.Hyderabad', 'D:Kolkata'],
    correct: 'C.Hyderabad',
  },
  {
    question: 'Who is the placement team head in Nxt wave?',
    options: ['A: Rahul', 'B: Naveen', 'C: Giresh', 'D: Rakesh'],
    correct: 'C: Giresh',
  },
  {
    question: 'What is the capital of France?',
    options: ['A: Berlin', 'B: Madrid', 'C: Paris', 'D: Rome'],
    correct: 'C: Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['A: Earth', 'B: Mars', 'C: Jupiter', 'D: Venus'],
    correct: 'B: Mars',
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      'A: Harper Lee',
      'B: J.K. Rowling',
      'C: George Orwell',
      'D: Mark Twain',
    ],
    correct: 'A: Harper Lee',
  },
]

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [players, setPlayers] = useState([])
  const [playerName, setPlayerName] = useState('')
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [answerSubmitted, setAnswerSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // Add player to the game
  const handleJoin = () => {
    if (playerName.trim()) {
      setPlayers([...players, playerName])
      setPlayerName('')
    }
  }

  // Handle answer submission and validation
  const handleSubmitAnswer = () => {
    setAnswerSubmitted(true)
    if (selectedAnswer === questions[currentQuestion].correct) {
      setIsCorrect(true)
      setTimeout(() => {
        // Move to the next question after a short delay
        setCurrentQuestion(currentQuestion + 1)
        setAnswerSubmitted(false)
        setIsCorrect(false)
        setSelectedAnswer('')
      }, 2000)
    } else {
      setIsCorrect(false)
    }
  }

  return (
    <div className="App">
      <h1>Quiz Game</h1>

      {/* QR Code for joining the game */}
      <QRCodeCanvas value={window.location.href} size={128} />
      <p>Scan the QR code to join the game!</p>

      {/* Player Join Section */}
      <div>
        <input
          type="text"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="button" onClick={handleJoin}>
          Join Game
        </button>
      </div>

      {/* Display list of players */}
      {players.length > 0 && (
        <div>
          <h2>Players:</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index.id}>{player}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Display current question */}
      {currentQuestion < questions.length ? (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <ul>
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index.id}>
                <button type="button" onClick={() => setSelectedAnswer(option)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>

          {/* Answer submission */}
          <button
            onClick={handleSubmitAnswer}
            type="button"
            disabled={!selectedAnswer}
          >
            Submit Answer
          </button>

          {/* Show feedback */}
          {answerSubmitted && (
            <div>
              {isCorrect ? (
                <p>Correct! Moving to next question...</p>
              ) : (
                <p>Incorrect! Try again.</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <h2>Game Over. Thanks for playing!</h2>
      )}
    </div>
  )
}

export default App
