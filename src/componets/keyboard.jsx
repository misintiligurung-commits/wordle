const KEY_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

export default function Keyboard({ onKey, keyStatuses }) {
  return (
    <div className="keyboard">
      {KEY_ROWS.map((row, i) => (
        <div className="keyboard-row" key={i}>
          {row.map((key) => {
            const classes = ["key"];
            if (key.length > 1) classes.push("wide");
            if (keyStatuses[key]) classes.push(keyStatuses[key]);

            return (
              <button
                key={key}
                className={classes.join(" ")}
                onClick={(e) => {
                  onKey(key);
                  e.currentTarget.blur(); // stops Enter from re-clicking this button
                }}
              >
                {key === "BACKSPACE" ? "⌫" : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}