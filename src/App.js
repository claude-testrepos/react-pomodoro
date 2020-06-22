import React, { useState } from "react";
import useTimer from "./useTimer";

const MODES = {
  focus: { label: "Focus", minutes: 25 },
  short: { label: "Short break", minutes: 5 },
  long: { label: "Long break", minutes: 15 },
};

export default function App() {
  const [mode, setMode] = useState("focus");
  const [completed, setCompleted] = useState(0);

  const timer = useTimer(MODES.focus.minutes * 60, () => {
    if (mode === "focus") setCompleted((c) => c + 1);
  });

  const switchMode = (m) => {
    setMode(m);
    timer.reset(MODES[m].minutes * 60);
  };

  const mm = String(Math.floor(timer.seconds / 60)).padStart(2, "0");
  const ss = String(timer.seconds % 60).padStart(2, "0");
  document.title = `${mm}:${ss} - ${MODES[mode].label}`;

  return (
    <div className={`app ${mode}`}>
      <div className="modes">
        {Object.entries(MODES).map(([key, m]) => (
          <button key={key} className={key === mode ? "active" : ""} onClick={() => switchMode(key)}>
            {m.label}
          </button>
        ))}
      </div>
      <h1 className="clock">{mm}:{ss}</h1>
      <button className="start" onClick={() => timer.setRunning(!timer.running)}>
        {timer.running ? "Pause" : "Start"}
      </button>
    </div>
  );
}
