import { useState, useEffect, useCallback } from "react";
import { WORDS } from "../data/words";
import { getKeyStatuses } from "../utils/checkGuess";

const pickWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

export default function useWordle() {
  const [solutionWord, setSolutionWord] = useState(pickWord);
  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS"); // IN_PROGRESS | WON | LOST
  const [message, setMessage] = useState("");

  // One function handles both the physical and the on-screen keyboard
  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== "IN_PROGRESS") return; // stop input after win/loss

      if (key === "ENTER") {
        if (currentGuess.length < 5) {
          setMessage("Not enough letters");
          return;
        }
        const updatedGuesses = [...pastGuesses, currentGuess];
        setPastGuesses(updatedGuesses);
        setCurrentGuess("");
        setMessage("");

        if (currentGuess === solutionWord) {
          setGameStatus("WON");
        } else if (updatedGuesses.length === 6) {
          setGameStatus("LOST");
        }
      } else if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [gameStatus, currentGuess, pastGuesses, solutionWord]
  );

  // Listen for the physical keyboard
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      handleKey(e.key.toUpperCase());
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown); // cleanup
  }, [handleKey]);

  const resetGame = () => {
    setSolutionWord(pickWord());
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
    setMessage("");
  };

  const keyStatuses = getKeyStatuses(pastGuesses, solutionWord);

  return {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    message,
    keyStatuses,
    handleKey,
    resetGame,
  };
}