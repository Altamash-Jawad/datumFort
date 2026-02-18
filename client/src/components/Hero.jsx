import content from "../content";

function Hero() {
    return (
      <section style={styles.hero}>
        <h1 style={styles.title}>
  {content.hero.title}
</h1>
  
<p style={styles.subtitle}>
  {content.hero.subtitle}
</p>
  
<button style={styles.button}>
  {content.hero.buttonText}
</button>
      </section>
    );
  }
  
  const styles = {
    hero: {
      padding: "120px 20px",
      textAlign: "center",
    },
    title: {
      fontSize: "42px",
      fontWeight: "600",
      marginBottom: "20px",
    },
    subtitle: {
      fontSize: "18px",
      color: "#555",
      marginBottom: "40px",
    },
    button: {
      padding: "14px 28px",
      fontSize: "16px",
      border: "none",
      backgroundColor: "#111",
      color: "#fff",
      cursor: "pointer",
    },
  };
  
  export default Hero;