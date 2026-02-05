import { useEffect, useState } from "react";
import { getWelcomeMessage } from "../helpers/helpers";

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.75rem",
  },

  container: {
    width: "100%",
    maxWidth: 640,
    padding: "0.85rem 1.25rem",
    borderRadius: 12,
    background: "linear-gradient(135deg, #eef2ff, #f5f7ff)",
    color: "#0d6d11",
    textAlign: "center",
    fontSize: "0.95rem",
    fontWeight: 500,
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
    border: "1px solid #e0e7ff",
  },

  loading: {
    color: "#6b7280",
    fontStyle: "italic",
  },

  hidden: {
    display: "none",
  },
};

export default function Welcome() {
  const [isLoading, setIsLoading] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    const init = async () => {
      const message = await getWelcomeMessage();
      setWelcomeMessage(message ?? "");
      setIsLoading(false);
    };

    init();
  }, []);

  // Nothing to show → collapse completely
  if (!isLoading && !welcomeMessage) {
    return <div style={styles.hidden} />;
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {isLoading ? (
          <span style={styles.loading}>Connecting to AI service…</span>
        ) : (
          <span>{welcomeMessage}</span>
        )}
      </div>
    </div>
  );
}
