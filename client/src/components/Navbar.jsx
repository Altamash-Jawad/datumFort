import content from "../content";

function Navbar() {
    return (
      <nav style={styles.nav}>
        <div style={styles.logo}>{content.navbar.logo}</div>
        <div style={styles.links}>
  {content.navbar.links.map((link, index) => (
    <span key={index}>{link}</span>
  ))}
        </div>
      </nav>
    );
  } 
  
  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      borderBottom: "1px solid #eee",
    },
    logo: {
      fontWeight: "600",
      fontSize: "18px",
    },
    links: {
      display: "flex",
      gap: "30px",
      fontSize: "14px",
      cursor: "pointer",
    },
  };
  
  export default Navbar;