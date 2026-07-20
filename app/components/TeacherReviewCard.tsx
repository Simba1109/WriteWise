"use client";

type Props = {
  title: string;
  value: string;
  needsRevision: boolean;
  onNeedsRevisionChange: (checked: boolean) => void;
};

export default function TeacherReviewCard({
  title,
  value,
  needsRevision,
  onNeedsRevisionChange,
}: Props) {
  return (
    <div
      style={{
        background: "white",
        border: needsRevision ? "3px solid #d97706" : "2px solid #ddd",
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

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginTop: 16,
          padding: 12,
          background: needsRevision ? "#fff7ed" : "#f9fafb",
          borderRadius: 12,
          cursor: "pointer",
          fontSize: 17,
          fontWeight: 700,
        }}
      >
        <input
          type="checkbox"
          checked={needsRevision}
          onChange={(event) =>
            onNeedsRevisionChange(event.target.checked)
          }
          style={{
            width: 20,
            height: 20,
            cursor: "pointer",
          }}
        />

        Needs Revision
      </label>
    </div>
  );
}