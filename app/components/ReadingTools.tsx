"use client";

type Props = {
  largeText: boolean;
  dyslexiaFont: boolean;
  chunkMode: boolean;
  focusMode: boolean;
  onToggleLargeText: () => void;
  onToggleDyslexiaFont: () => void;
  onToggleChunkMode: () => void;
  onToggleFocusMode: () => void;
};

export default function ReadingTools({
  largeText,
  dyslexiaFont,
  chunkMode,
  focusMode,
  onToggleLargeText,
  onToggleDyslexiaFont,
  onToggleChunkMode,
  onToggleFocusMode,
}: Props) {
  return (
    <div
      style={{
        background: "white",
        border: "2px solid #c9dff2",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
      }}
    >
      <label style={label}>
        <input
          type="checkbox"
          checked={largeText}
          onChange={onToggleLargeText}
        />
        Larger Text
      </label>

      <label style={label}>
        <input
          type="checkbox"
          checked={dyslexiaFont}
          onChange={onToggleDyslexiaFont}
        />
        Dyslexia Font
      </label>

      <label style={label}>
        <input
          type="checkbox"
          checked={chunkMode}
          onChange={onToggleChunkMode}
        />
        Chunk Passage
      </label>

      <label style={label}>
        <input
          type="checkbox"
          checked={focusMode}
          onChange={onToggleFocusMode}
        />
        Focus Mode
      </label>
    </div>
  );
}

const label = {
  display: "block",
  fontSize: 18,
  marginBottom: 12,
};