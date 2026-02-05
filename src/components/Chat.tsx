import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { getAIResponseFromPrompt } from "../helpers/helpers";
import Welcome from "./Welcome";

const styles: Record<string, React.CSSProperties> = {
  page: {
    background: "#f5f7fb",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
  },

  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1.5rem",
    textAlign: "center",
  },

  layout: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.5rem",
    alignItems: "stretch",
  },

  panel: {
    background: "#ffffff",
    borderRadius: 16,
    padding: "1.25rem",
    boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
  },

  label: {
    marginBottom: "0.5rem",
    fontWeight: 600,
    fontSize: "0.95rem",
  },

  textarea: {
    height: "220px",
    resize: "none",
    padding: "1rem",
    fontSize: "1rem",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    outline: "none",
    lineHeight: 1.5,
    marginBottom: "1rem",
  },

  button: {
    padding: "0.85rem",
    borderRadius: 12,
    border: "none",
    fontSize: "1rem",
    fontWeight: 600,
    background: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },

  responseWrapper: {
    flex: 1,
    borderRadius: 12,
    border: "1px solid #9ca3af", // 👈 light black border
    background: "#ffffff",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },

  responseEmpty: {
    padding: "1rem",
    color: "#9ca3af",
    fontStyle: "italic",
  },

  loading: {
    padding: "1rem",
    color: "#6b7280",
    fontStyle: "italic",
  },
};

export default function Chat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    try {
      const result = await getAIResponseFromPrompt(prompt, response);
      setResponse(result);
      setPrompt("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page} data-color-mode="light">
      <Welcome />

      <h1 style={styles.title}>AI Chat</h1>

      <div style={styles.layout}>
        {/* LEFT: PROMPT */}
        <div style={styles.panel}>
          <label style={styles.label}>Your Prompt</label>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask something…"
            style={styles.textarea}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Generating…" : "Generate"}
          </button>
        </div>

        {/* RIGHT: RESPONSE */}
        <div style={styles.panel}>
          <label style={styles.label}>AI Response</label>

          <div style={styles.responseWrapper}>
            {loading && (
              <div style={styles.loading}>Generating response…</div>
            )}

            {!loading && response && (
              <MDEditor
                value={response}
                preview="preview"
                hideToolbar
                height="100%"
              />
            )}

            {!loading && !response && (
              <div style={styles.responseEmpty}>
                The response will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
