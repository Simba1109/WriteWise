type Props = {
  writing: string;
};

export default function StudentWritingView({ writing }: Props) {
  return (
    <div
      style={{
        marginTop: 40,
        background: "#f7f7ff",
        padding: 24,
        borderRadius: 16,
      }}
    >
      <h2>📖 Student Writing</h2>

      {writing.trim() ? (
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 14,
            fontSize: 20,
            whiteSpace: "pre-wrap",
          }}
        >
          {writing}
        </div>
      ) : (
        <p>No student writing submitted yet.</p>
      )}
    </div>
  );
}