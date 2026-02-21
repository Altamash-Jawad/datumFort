function Section({ title, text, id }) {

    return (
      <section id={id} style={styles.section}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.text}>{text}</p>
      </section>
    );
  }
  
  const styles = {
    section: {
      padding: "120px 20px",
      borderTop: "1px solid #eee",
    },
    title: {
      fontSize: "32px",
      fontWeight: "600",
      marginBottom: "24px",
      textAlign: "center",
    },
    text: {
      fontSize: "17px",
      color: "#555",
      maxWidth: "700px",
      margin: "0 auto",
      lineHeight: "1.7",
      textAlign: "center",
    },
  };
  
  
  export default Section;
  