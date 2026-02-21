function SplitSection({ title, text }) {
    const styles = {
      container: {
        padding: "100px 40px",
        maxWidth: "1100px",
        margin: "0 auto",
      },
      textWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      },
      title: {
        fontSize: "32px",
        fontWeight: "600",
        margin: 0,
      },
      text: {
        fontSize: "16px",
        lineHeight: "1.6",
        color: "#555",
        margin: 0,
      },
      visual: {
        height: "300px",
        borderRadius: "16px",
        background: "linear-gradient(135deg, #f5f7fa, #e4e8f0)",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      },
    };
  
    return (
      <section>
        <div className="split-grid" style={styles.container}>
          <div style={styles.textWrapper}>
            <h2 style={styles.title}>{title}</h2>
            <p style={styles.text}>{text}</p>
          </div>
  
          <div className="split-visual" style={styles.visual}></div>

        </div>
      </section>
    );
  }
  
  export default SplitSection;
  