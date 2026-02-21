import content from "../content";

function Navbar() {
    return (
      <nav style={styles.nav}>
  <div className="container" style={styles.inner}>
    <div style={styles.logo}>{content.navbar.logo}</div>

    <div style={styles.links}>
    {content.navbar.links.map((link, index) => (
  <a
  key={index}
  href={`#${link.toLowerCase()}`}
  className="nav-link"
  >

    {link}
  </a>
))}

    </div>
  </div>
</nav>

    );
  } 
  
  const styles = {
    nav: {
      padding: "20px 0",
      borderBottom: "1px solid #eee",
      position: "sticky",
      top: 0,
      backgroundColor: "#fff",
      zIndex: 1000,
    },
    
    logo: {
      fontWeight: "600",
      fontSize: "18px",
    },
    links: {
      display: "flex",
      gap: "30px",
      fontSize: "14px",
    },
    
    inner: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    
  };
  
  export default Navbar;