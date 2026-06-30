"use client";

import { useState } from "react";

type Props = {
  text: string;
};

export default function AudioDirections({ text }: Props) {
  const [isReading, setIsReading] = useState(false);

  function readText() {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.rate = 0.85;
    speech.pitch = 1;

    speech.onend = () => setIsReading(false);

    setIsReading(true);
    window.speechSynthesis.speak(speech);
  }

  function stopReading() {
    window.speechSynthesis.cancel();
    setIsReading(false);
  }

  return (
    <div>
      <button
        onClick={readText}
        style={{
          width: "100%",
          padding: 18,
          borderRadius: 16,
          fontSize: 20,
          cursor: "pointer",
        }}
      >
        🔊 Read Directions
      </button>

      {isReading && (
        <button
          onClick={stopReading}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 16,
            fontSize: 18,
            cursor: "pointer",
            marginTop: 10,
          }}
        >
          ⏹ Stop Audio
        </button>
      )}
    </div>
  );
}