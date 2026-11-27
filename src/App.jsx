import GameBoard from "./componets/board";
import Keyboard from "./componets/keyboard";
import Modal from "./componets/modal";
import useWordle from "./hooks/useWordle";
import "./App.css";

export default function App() {
  const {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    message,
    keyStatuses,
    handleKey,
    resetGame,
  } = useWordle();

  return (
    <div className="app">
      <h1>Wordle Clone</h1>
      <p className="message">{message}</p>

      <GameBoard
        pastGuesses={pastGuesses}
        currentGuess={currentGuess}
        solution={solutionWord}
      />

      <Keyboard onKey={handleKey} keyStatuses={keyStatuses} />

      <Modal
        gameStatus={gameStatus}
        solution={solutionWord}
        attempts={pastGuesses.length}
        onPlayAgain={resetGame}
      />
    </div>
  );
}