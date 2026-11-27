import Tile from "./tile";
import { checkGuess } from "../utils/checkGuess";

export default function Row({ guess, solution, submitted }) {
  const statuses = submitted ? checkGuess(guess, solution) : [];

  return (
    <div className="row">
      {Array.from({ length: 5 }).map((_, i) => (
        <Tile key={i} letter={guess[i] || ""} status={statuses[i]} />
      ))}
    </div>
  );
}