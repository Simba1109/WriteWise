type Props = {
  writing: string;
};

export default function ReplayWriting({ writing }: Props) {
  return (
    <div
      style={{
        background: "#f3e8ff",
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
      }}
    >
      <h2 style={{ marginTop: 0 }}>▶ Replay Writing</h2>

      <p style={{ fontSize: 18 }}>
        Replay will help students review their writing step by step.
      </p>

      <button
        onClick={() => alert(writing || "No writing yet.")}
        style={{
          width: "100%",
          padding: 14,
          borderRadius: 12,
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        ▶ Replay My Writing
      </button>
    </div>
  );
}