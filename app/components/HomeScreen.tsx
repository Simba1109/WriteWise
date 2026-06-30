type Props = {
  onStudent: () => void;
  onTeacher: () => void;
};

export default function HomeScreen({
  onStudent,
  onTeacher,
}: Props) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5efe4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: 760,
          background: "white",
          padding: 50,
          borderRadius: 24,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,.12)",
        }}
      >
        <h1 style={{ fontSize: 60, marginBottom: 10 }}>
          WriteWise
        </h1>

        <p style={{ fontSize: 24 }}>
          A Calm Writing Space for Students
        </p>

        <button
          onClick={onStudent}
          style={{
            width: "100%",
            padding: 22,
            marginTop: 30,
            fontSize: 24,
            border: "none",
            borderRadius: 16,
            background: "#6b8f71",
            color: "white",
            cursor: "pointer",
          }}
        >
          I am a Student
        </button>

        <button
          onClick={onTeacher}
          style={{
            width: "100%",
            padding: 22,
            marginTop: 20,
            fontSize: 24,
            border: "none",
            borderRadius: 16,
            background: "#8b6f47",
            color: "white",
            cursor: "pointer",
          }}
        >
          I am a Teacher
        </button>
      </div>
    </main>
  );
}