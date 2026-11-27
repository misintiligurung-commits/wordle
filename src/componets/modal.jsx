export default function Modal({ gameStatus, solution, attempts, onPlayAgain }) {
  if (gameStatus === "IN_PROGRESS") return null;

  const won = gameStatus === "WON";

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{won ? "🎉 You won!" : "Game over"}</h2>
        {won ? (
          <p>You found the word in {attempts} {attempts === 1 ? "try" : "tries"}.</p>
        ) : (
          <>
            <p>The hidden word was:</p>
            <h3 className="answer">{solution}</h3>
          </>
        )}
        <button onClick={onPlayAgain}>Play again</button>
      </div>
    </div>
  );
}