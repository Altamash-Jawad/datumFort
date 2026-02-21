import content from "../content";

function Hero() {
    return (
<section id="home" style={styles.hero}>

  <div className="container">
    <h1 style={styles.title}>
      {content.hero.title}
    </h1>

    <p style={styles.subtitle}>
      {content.hero.subtitle}
    </p>

    <button style={styles.button}>
      {content.hero.buttonText}
    </button>
  </div>
</section>

    );
  }
  
  const styles = {
    hero: {
      padding: "140px 20px",
      textAlign: "center",
    },
    title: {
      fontSize: "56px",
      fontWeight: "600",
      lineHeight: "1.1",
      letterSpacing: "-1px",
      marginBottom: "24px",
    },
    subtitle: {
      fontSize: "18px",
      color: "#555",
      maxWidth: "600px",
      margin: "0 auto 40px auto",
      lineHeight: "1.6",
    },
    button: {
      padding: "14px 32px",
      fontSize: "16px",
      border: "none",
      backgroundColor: "#111",
      color: "#fff",
      cursor: "pointer",
    },
  };
  
  
  export default Hero;