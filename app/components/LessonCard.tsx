type Props = {
  title: string;
  isOpen: boolean;
  isComplete: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

export default function LessonCard({
  title,
  isOpen,
  isComplete,
  onClick,
  children,
}: Props) {
  return (
    <div
      style={{
        background: "white",
        border: "2px solid #ddd",
        borderRadius: 20,
        marginBottom: 18,
        overflow: "hidden",
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: "100%",
          padding: 20,
          fontSize: 22,
          textAlign: "left",
          border: "none",
          background: isComplete ? "#eef5ec" : "#f7f7f7",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {isComplete ? "✅" : "⬜"} {title}
        <span style={{ float: "right" }}>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && <div style={{ padding: 24 }}>{children}</div>}
    </div>
  );
}