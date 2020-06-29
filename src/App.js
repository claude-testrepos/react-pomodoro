import React, { useEffect, useState } from "react";
import useTimer from "./useTimer";

const MODES = {
  focus: { label: "Focus", minutes: 25 },
  short: { label: "Short break", minutes: 5 },
  long: { label: "Long break", minutes: 15 },
};

function beep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  osc.connect(ctx.destination);
  osc.frequency.value = 880;
  osc.start();
  osc.stop(ctx.currentTime + 0.4);
}

export default function App() {
  const [mode, setMode] = useState("focus");
  const [completed, setCompleted] = useState(() => Number(localStorage.getItem("completed") || 0));
  useEffect(() => localStorage.setItem("completed", completed), [completed]);

  const timer = useTimer(MODES.focus.minutes * 60, () => {
    beep();
    if (mode === "focus") setCompleted((c) => c + 1);
  });

  const switchMode = (m) => {
    setMode(m);
    timer.reset(MODES[m].minutes * 60);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        timer.setRunning((r) => !r);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [timer]);

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
      <p className="count">Pomodoros today: {completed}</p>
    </div>
  );
}
