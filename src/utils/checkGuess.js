// Compares a guess with the solution and returns a status for each letter,
// e.g. ["correct", "absent", "present", "absent", "absent"]
export function checkGuess(guess, solution) {
  const result = Array(5).fill("absent");
  const unmatched = {}; // solution letters that were not green

  // Pass 1: exact matches (green)
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = "correct";
    } else {
      unmatched[solution[i]] = (unmatched[solution[i]] || 0) + 1;
    }
  }

  // Pass 2: right letter, wrong place (yellow)
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    if (unmatched[guess[i]] > 0) {
      result[i] = "present";
      unmatched[guess[i]]--;
    }
  }

  return result;
}

// Builds a { LETTER: status } map for the on-screen keyboard.
// If a letter has several results, the best one wins (green > yellow > gray).
export function getKeyStatuses(pastGuesses, solution) {
  const rank = { absent: 1, present: 2, correct: 3 };
  const keyMap = {};

  pastGuesses.forEach((guess) => {
    checkGuess(guess, solution).forEach((status, i) => {
      const letter = guess[i];
      if (!keyMap[letter] || rank[status] > rank[keyMap[letter]]) {
        keyMap[letter] = status;
      }
    });
  });

  return keyMap;
}