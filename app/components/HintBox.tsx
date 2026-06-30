export default function HintBox() {
  const hints = [
    "Who was involved?",
    "What problem did you face?",
    "What did you do first?",
    "How did you solve the problem?",
    "What did you learn?",
  ];

  return (
    <div
      style={{
        background: "#e7f3ff",
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
      }}
    >
      <h2 style={{ marginTop: 0 }}>💬 Need a Hint?</h2>

      {hints.map((hint) => (
        <button
          key={hint}
          style={{
            width: "100%",
            textAlign: "left",
            padding: 12,
            marginTop: 10,
            borderRadius: 12,
            border: "1px solid #b9d8f7",
            background: "white",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          {hint}
        </button>
      ))}
    </div>
  );
}