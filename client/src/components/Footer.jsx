function Footer() {
    return (
      <footer style={styles.footer}>
        © {new Date().getFullYear()} DatumFort. All rights reserved.
      </footer>
    );
  }
  
  const styles = {
    footer: {
      padding: "60px 20px",
      textAlign: "center",
      borderTop: "1px solid #eee",
      fontSize: "14px",
      color: "#777",
    },
  };
  
  export default Footer;
  