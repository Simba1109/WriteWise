"use client";

type Props = {
  title: string;
  value: string;
};

export default function TeacherReviewCard({
  title,
  value,
}: Props) {
  return (
    <div
      style={{
        background: "white",
        border: "2px solid #ddd",
        borderRadius: 18,
        padding: 20,
        marginBottom: 18,
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 12,
        }}
      >
        {title}
      </h3>

      <div
        style={{
          minHeight: 90,
          padding: 14,
          background: "#f8f8f8",
          borderRadius: 12,
          whiteSpace: "pre-wrap",
          fontSize: 18,
        }}
      >
        {value.trim().length > 0
          ? value
          : "Student has not completed this section yet."}
      </div>
    </div>
  );
}