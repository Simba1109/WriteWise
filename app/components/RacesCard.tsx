"use client";

type PartKey = "restate" | "answer" | "cite" | "explain" | "sum";

type Props = {
  partKey: PartKey;
  letter: string;
  title: string;
  subtitle: string;
  color: string;
  dark: string;
  starters: string[];
  vocabulary: string[];
  quotes: string[];
  hints: string[];
  isOpen: boolean;
  completed: boolean;
  value: string;
  onOpen: () => void;
  onChange: (part: PartKey, value: string) => void;
};

export default function RacesCard({
  partKey,
  letter,
  title,
  subtitle,
  color,
  dark,
  starters,
  vocabulary,
  quotes,
  hints,
  isOpen,
  completed,
  value,
  onOpen,
  onChange,
}: Props) {
  const sectionHint = hints[0] || subtitle;

  function addText(text: string) {
    onChange(partKey, value ? value + " " + text : text);
  }

  function activateCard() {
    onOpen();
  }

  return (
    <div
      style={{
        background: color,
        border: `4px solid ${dark}`,
        borderRadius: 26,
        marginBottom: 24,
        boxShadow: "0 8px 18px rgba(0,0,0,.12)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={activateCard}
        style={{
          width: "100%",
          padding: 22,
          background: dark,
          color: "white",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontSize: 28,
          fontWeight: "bold",
        }}
      >
        {completed ? "✅" : "⬜"} {letter} - {title}
        <span style={{ float: "right" }}>
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 21, fontWeight: "bold" }}>
            {subtitle}
          </p>

          <div style={hintBox}>
            💡 {sectionHint}
          </div>

          <select
            defaultValue=""
            onFocus={activateCard}
            onClick={activateCard}
            onChange={(e) => {
              if (e.target.value) addText(e.target.value);
              e.target.value = "";
            }}
            style={selectBox}
          >
            <option value="">
              Sentence starter dropdown
            </option>

            {starters.map((starter) => (
              <option
                key={starter}
                value={starter}
              >
                {starter}
              </option>
            ))}
          </select>

          <select
            defaultValue=""
            onFocus={activateCard}
            onClick={activateCard}
            onChange={(e) => {
              if (e.target.value) addText(e.target.value);
              e.target.value = "";
            }}
            style={selectBox}
          >
            <option value="">
              Vocabulary dropdown
            </option>

            {vocabulary.length === 0 ? (
              <option value="">
                No vocabulary added yet
              </option>
            ) : (
              vocabulary.map((word) => (
                <option
                  key={word}
                  value={word}
                >
                  {word}
                </option>
              ))
            )}
          </select>
          {partKey === "cite" && (
            <div style={quoteBox}>
              <strong>Quote Bank</strong>

              {quotes.length === 0 ? (
                <p>No quotes added yet.</p>
              ) : (
                quotes.map((quote) => (
                  <button
                    key={quote}
                    onClick={() => {
                      activateCard();
                      addText(quote);
                    }}
                    style={quoteButton}
                  >
                    {quote}
                  </button>
                ))
              )}
            </div>
          )}

          <textarea
            value={value}
            onFocus={activateCard}
            onClick={activateCard}
            onChange={(e) =>
              onChange(partKey, e.target.value)
            }
            placeholder={`Write your ${title} sentence here...`}
            style={textArea}
          />
        </div>
      )}
    </div>
  );
}

const hintBox = {
  background: "white",
  padding: 16,
  borderRadius: 16,
  marginTop: 16,
  marginBottom: 16,
  fontSize: 19,
};

const selectBox = {
  width: "100%",
  padding: 16,
  borderRadius: 16,
  fontSize: 19,
  marginBottom: 14,
};

const quoteBox = {
  background: "white",
  padding: 18,
  borderRadius: 16,
  marginBottom: 16,
  fontSize: 18,
};
const quoteButton = {
  width: "100%",
  display: "block",
  textAlign: "left" as const,
  padding: 12,
  marginTop: 10,
  borderRadius: 12,
  fontSize: 17,
  cursor: "pointer",
};

const textArea = {
  width: "100%",
  minHeight: 150,
  padding: 18,
  fontSize: 21,
  borderRadius: 16,
};