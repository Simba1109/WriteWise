type Props = {
  writing: string;
};

export default function BadgePanel({ writing }: Props) {
  const words = writing.trim()
    ? writing.trim().split(/\s+/).length
    : 0;

  const badges = [];

  if (words >= 10) badges.push("🌱 Getting Started");
  if (words >= 30) badges.push("✍️ Writer");
  if (words >= 60) badges.push("⭐ Paragraph Master");
  if (words >= 100) badges.push("🏆 Writing Champion");

  return (
    <div
      style={{
        background: "#fff8d6",
        padding: 20,
        borderRadius: 16,
        marginTop: 20,
      }}
    >
      <h2 style={{ marginTop: 0 }}>🏅 My Badges</h2>

      {badges.length === 0 ? (
        <p>Write 10 words to earn your first badge!</p>
      ) : (
        badges.map((badge) => (
          <div
            key={badge}
            style={{
              padding: 12,
              marginTop: 10,
              background: "white",
              borderRadius: 12,
              fontSize: 20,
            }}
          >
            {badge}
          </div>
        ))
      )}
    </div>
  );
}