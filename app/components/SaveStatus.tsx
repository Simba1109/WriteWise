type Props = {
  writing: string;
};

export default function SaveStatus({ writing }: Props) {
  const hasWriting = writing.trim().length > 0;

  return (
    <div
      style={{
        background: hasWriting ? "#e8f5e9" : "#f1f1f1",
        border: hasWriting ? "3px solid #4caf50" : "3px solid #ccc",
        padding: 18,
        borderRadius: 18,
        marginTop: 20,
        fontSize: 18,
      }}
    >
      {hasWriting ? "✅ Autosaved draft" : "Start writing to autosave."}
    </div>
  );
}