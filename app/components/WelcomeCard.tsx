type Props = {
  studentName: string;
  writing: string;
};

export default function WelcomeCard({ studentName, writing }: Props) {
  const words = writing.trim() ? writing.trim().split(/\s+/).length : 0;

  const badges = [];

  if (words >= 10) badges.push("🌱 Effort Started");
  if (words >= 30) badges.push("✍️ Kept Writing");
  if (words >= 60) badges.push("💪 Strong Effort");
  if (words >= 100) badges.push("🏆 Writing Perseverance");

  const nextBadge =
    words < 10
      ? "Write 10 words to earn Effort Started."
      : words < 30
      ? "Write 30 words to earn Kept Writing."
      : words < 60
      ? "Write 60 words to earn Strong Effort."
      : words < 100
      ? "Write 100 words to earn Writing Perseverance."
      : "You earned all writing effort badges today!";

  return (
    <div
      style={{
        background: "white",
        border: "3px solid #d8cfc4",
        borderRadius: 24,
        padding: 28,
        marginBottom: 24,
        boxShadow: "0 8px 18px rgba(0,0,0,.08)",
      }}
    >
      <h1 style={{ fontSize: 38, marginTop: 0 }}>
        👋 Welcome, {studentName || "Writer"}!
      </h1>

      <div
        style={{
          background: "#fff8d6",
          padding: 18,
          borderRadius: 18,
          marginBottom: 20,
        }}
      >
        <h2 style={{ marginTop: 0 }}>🏅 Writing Effort Recognition</h2>

        {badges.length === 0 ? (
          <p style={{ fontSize: 18 }}>
            No badges yet. Start writing to earn recognition.
          </p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {badges.map((badge) => (
              <span
                key={badge}
                style={{
                  background: "white",
                  padding: "10px 14px",
                  borderRadius: 999,
                  fontSize: 18,
                  border: "1px solid #e0d18a",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        <p style={{ fontSize: 18, marginBottom: 0 }}>
          Next goal: {nextBadge}
        </p>
      </div>

      <h2 style={{ fontSize: 26 }}>Today’s Mission</h2>

      <p style={{ fontSize: 22, lineHeight: 1.5 }}>
        Read carefully. Think deeply. Write confidently.
      </p>

      <div
        style={{
          background: "#eef5ec",
          padding: 18,
          borderRadius: 18,
          fontSize: 22,
          marginTop: 20,
        }}
      >
        ⭐ Goal: Complete one strong R.A.C.E.S. paragraph.
      </div>
    </div>
  );
}