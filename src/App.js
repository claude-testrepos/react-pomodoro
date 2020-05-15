import React, { useState, useEffect } from "react";

export default function App() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="app">
      <h1>{mm}:{ss}</h1>
      <button onClick={() => setRunning(!running)}>{running ? "Pause" : "Start"}</button>
    </div>
  );
}
