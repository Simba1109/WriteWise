type Props = {
  writing: string;
};

export default function FinalParagraphBox({ writing }: Props) {
  return (
    <div
      style={{
        background: "#f7f7ff",
        border: "4px solid #6b5ca5",
        padding: 24,
        borderRadius: 24,
        marginTop: 24,
        fontSize: 20,
        boxShadow: "0 8px 18px rgba(0,0,0,.12)",
      }}
    >
      <h2 style={{ marginTop: 0 }}>📄 Final Paragraph</h2>

      <p style={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
        {writing || "Your paragraph will appear here as you write."}
      </p>
    </div>
  );
}