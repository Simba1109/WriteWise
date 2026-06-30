"use client";

import { useEffect, useState } from "react";
import type { ReadingSupports } from "../types";
import ReadingTools from "./ReadingTools";

type Props = {
  passage: string;
  supports?: ReadingSupports;
};

export default function ReadingPassage({ passage, supports }: Props) {
  const [largeText, setLargeText] = useState(supports?.largerText ?? false);
  const [chunkMode, setChunkMode] = useState(supports?.chunkPassage ?? false);
  const [dyslexiaFont, setDyslexiaFont] = useState(supports?.dyslexiaFont ?? false);
  const [focusMode, setFocusMode] = useState(supports?.focusMode ?? false);
  const [showTools, setShowTools] = useState(false);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const chunks = passage
    ? passage.split(/\n\s*\n|(?<=\.)\s+(?=[A-Z])/).filter(Boolean)
    : ["No reading passage added yet."];

  const currentChunk = chunks[chunkIndex] || chunks[0];

  const speed =
    supports?.readingSpeed === "slow"
      ? 0.7
      : supports?.readingSpeed === "fast"
      ? 1.05
      : 0.85;

  useEffect(() => {
    setLargeText(supports?.largerText ?? false);
    setChunkMode(supports?.chunkPassage ?? false);
    setDyslexiaFont(supports?.dyslexiaFont ?? false);
    setFocusMode(supports?.focusMode ?? false);
    setChunkIndex(0);
    setIsReading(false);
    window.speechSynthesis.cancel();
  }, [supports]);

  function readText(text: string) {
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      text || "No reading passage was added."
    );

    speech.rate = speed;
    speech.onend = () => setIsReading(false);
    speech.onerror = () => setIsReading(false);

    setIsReading(true);
    window.speechSynthesis.speak(speech);
  }

  function stopReading() {
    window.speechSynthesis.cancel();
    setIsReading(false);
  }

  const passageStyle = {
    fontSize: largeText ? 28 : 20,
    lineHeight: 1.8,
    whiteSpace: "pre-wrap" as const,
    fontFamily: dyslexiaFont ? "Verdana, Arial, sans-serif" : "Arial, sans-serif",
    letterSpacing: dyslexiaFont ? "0.06em" : "normal",
    wordSpacing: dyslexiaFont ? "0.16em" : "normal",
  };

  return (
    <div
      style={{
        background: focusMode ? "#fffbe8" : "#eef7ff",
        border: focusMode ? "4px solid #d4b106" : "3px solid #6aa6d9",
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
      }}
    >
      <h2 style={{ marginTop: 0 }}>Reading Passage</h2>

      {supports?.readPassage !== false && (
        <>
          <button
            onClick={() => readText(chunkMode ? currentChunk : passage)}
            style={button}
          >
            🔊 Read Passage
          </button>

          {isReading && (
            <button onClick={stopReading} style={button}>
              ⏹ Stop Reading
            </button>
          )}
        </>
      )}

      <button onClick={() => setShowTools(!showTools)} style={button}>
        ⚙️ Reading Tools {showTools ? "▲" : "▼"}
      </button>

      {showTools && (
        <ReadingTools
          largeText={largeText}
          dyslexiaFont={dyslexiaFont}
          chunkMode={chunkMode}
          focusMode={focusMode}
          onToggleLargeText={() => setLargeText(!largeText)}
          onToggleDyslexiaFont={() => setDyslexiaFont(!dyslexiaFont)}
          onToggleChunkMode={() => {
            setChunkMode(!chunkMode);
            setChunkIndex(0);
          }}
          onToggleFocusMode={() => setFocusMode(!focusMode)}
        />
      )}

      {focusMode && <div style={focusNotice}>Focus Mode is ON</div>}

      {chunkMode ? (
        <div>
          <p style={{ fontSize: 18 }}>
            Chunk {chunkIndex + 1} of {chunks.length}
          </p>

          <p style={passageStyle}>{currentChunk}</p>

          <button
            onClick={() => setChunkIndex((i) => Math.max(i - 1, 0))}
            style={button}
          >
            ← Previous Chunk
          </button>

          <button
            onClick={() =>
              setChunkIndex((i) => Math.min(i + 1, chunks.length - 1))
            }
            style={button}
          >
            Next Chunk →
          </button>
        </div>
      ) : (
        <p style={passageStyle}>
          {passage || "No reading passage added yet."}
        </p>
      )}
    </div>
  );
}

const button = {
  width: "100%",
  padding: 16,
  borderRadius: 16,
  fontSize: 20,
  cursor: "pointer",
  marginBottom: 12,
};

const focusNotice = {
  background: "#fff9d6",
  border: "2px solid #d4b106",
  borderRadius: 14,
  padding: 14,
  marginBottom: 18,
  fontWeight: "bold",
  textAlign: "center" as const,
  fontSize: 20,
};