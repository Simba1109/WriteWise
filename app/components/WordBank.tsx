export default function WordBank() {
  const words = [
    "challenge",
    "determined",
    "practice",
    "improve",
    "success",
    "effort",
    "goal",
    "learn",
    "brave",
    "accomplish",
    "confident",
    "persevere",
  ];

  return (
    <div
      style={{
        background: "#fdf4d7",
        padding: 20,
        borderRadius: 16,
      }}
    >
      <h2
        style={{
          marginTop: 0,
          fontSize: 26,
        }}
      >
        📚 Word Bank
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {words.map((word) => (
          <button
            key={word}
            style={{
              padding: "10px 16px",
              borderRadius: 999,
              border: "none",
              background: "#6b8f71",
              color: "white",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}