import { useEffect, useRef, useState } from "react";

export default function useTimer(initial, onDone) {
  const [seconds, setSeconds] = useState(initial);
  const [running, setRunning] = useState(false);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          setRunning(false);
          done.current();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const reset = (value) => {
    setRunning(false);
    setSeconds(value);
  };

  return { seconds, running, setRunning, reset };
}
