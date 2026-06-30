type Props = {
  writing: string;
};

export default function ProgressTracker({ writing }: Props) {
  const words = writing.trim()
    ? writing.trim().split(/\s+/).length
    : 0;

  const progress = Math.min(100, Math.round((words / 100) * 100));

  return (
    <div
      style={{
        background: "#e8f5e9",
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
      }}
    >
      <h2 style={{ marginTop: 0 }}>📈 Progress Tracker</h2>

      <div
        style={{
          width: "100%",
          height: 20,
          background: "#d9d9d9",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#4caf50",
            transition: "width .3s",
          }}
        />
      </div>

      <p style={{ marginTop: 12, fontSize: 18 }}>
        {words} words written
      </p>

      <p style={{ fontSize: 16 }}>
        Goal: 100 words
      </p>
    </div>
  );
}