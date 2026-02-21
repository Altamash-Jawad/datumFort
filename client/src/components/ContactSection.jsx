import { useState } from "react";

function ContactSection({ id, title, text }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setErrors({});
      }

    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    section: {
      padding: "100px 40px",
      maxWidth: "700px",
      margin: "0 auto",
      textAlign: "center",
    },
    title: {
      fontSize: "32px",
      fontWeight: "600",
      marginBottom: "20px",
    },
    text: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "40px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    input: {
      padding: "14px 16px",
      fontSize: "14px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      outline: "none",
    },
    textarea: {
      padding: "14px 16px",
      fontSize: "14px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      minHeight: "120px",
      resize: "vertical",
      outline: "none",
    },
    error: {
      color: "red",
      fontSize: "13px",
      textAlign: "left",
      marginBottom: "10px",
    },
    button: {
      padding: "14px",
      fontSize: "14px",
      fontWeight: "600",
      backgroundColor: loading ? "#444" : "#111",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.8 : 1,
      marginTop: "10px",
    },
    success: {
      marginTop: "20px",
      color: "green",
      fontWeight: "500",
    },
  };

  return (
    <section id={id}>
      <div style={styles.section}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.text}>{text}</p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            style={styles.input}
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <textarea
            name="message"
            placeholder="Your Message"
            style={styles.textarea}
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
          ></textarea>
          {errors.message && <p style={styles.error}>{errors.message}</p>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {submitted && (
          <p style={styles.success}>
            Thank you! We'll get back to you shortly.
          </p>
        )}
      </div>
    </section>
  );
}

export default ContactSection;
