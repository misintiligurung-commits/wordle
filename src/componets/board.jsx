import Row from "./row";

export default function GameBoard({ pastGuesses, currentGuess, solution }) {
  return (
    <div className="board">
      {Array.from({ length: 6 }).map((_, i) => {
        if (i < pastGuesses.length) {
          return <Row key={i} guess={pastGuesses[i]} solution={solution} submitted />;
        }
        if (i === pastGuesses.length) {
          return <Row key={i} guess={currentGuess} solution={solution} />;
        }
        return <Row key={i} guess="" solution={solution} />;
      })}
    </div>
  );
}