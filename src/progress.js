import React, { useState, useEffect } from "react";
import "./CircularProgress.css";

const CircularProgress = ({ progress }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const interval = setInterval(() => {
      startValue += 1;
      setValue(startValue);
      if (startValue === progress) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div
      className="circular-progress"
      style={{
        background: `conic-gradient(#4caf50 ${value * 3.6}deg, #ddd ${
          value * 3.6
        }deg 360deg)`,
      }}
    >
      <div className="inner-circle">
        <span id="progress-value">{`${value}`}</span>
      </div>
    </div>
  );
};

export default CircularProgress;
