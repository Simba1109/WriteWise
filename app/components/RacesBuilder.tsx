"use client";

type Props = {
  writing: string;
  setWriting: (text: string) => void;
};

export default function RacesBuilder({ writing, setWriting }: Props) {
  const stems = [
    "R - Restate: The prompt is asking me to...",
    "A - Answer: My answer is...",
    "C - Cite: One example is...",
    "E - Explain: This shows...",
    "S - Sum Up: Overall,...",
  ];

  function addStem(stem: string) {
    setWriting(writing + (writing ? "\n\n" : "") + stem);
  }

  return (
    <div
      style={{
        background: "#f0f7ff",
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
      }}
    >
      <h2 style={{ marginTop: 0 }}>🧱 R.A.C.E.S. Builder</h2>

      {stems.map((stem) => (
        <button
          key={stem}
          onClick={() => addStem(stem)}
          style={{
            width: "100%",
            textAlign: "left",
            padding: 12,
            marginTop: 10,
            borderRadius: 12,
            fontSize: 17,
            cursor: "pointer",
          }}
        >
          {stem}
        </button>
      ))}
    </div>
  );
}