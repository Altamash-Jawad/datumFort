function Section({ title, text }) {
    return (
      <section style={styles.section}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.text}>{text}</p>
      </section>
    );
  }
  
  const styles = {
    section: {
      padding: "100px 20px",
      textAlign: "center",
      borderTop: "1px solid #eee",
    },
    title: {
      fontSize: "28px",
      marginBottom: "20px",
    },
    text: {
      fontSize: "16px",
      color: "#555",
      maxWidth: "600px",
      margin: "0 auto",
    },
  };
  
  export default Section;
  