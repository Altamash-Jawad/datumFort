import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Footer from "./components/Footer";
import content from "./content";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />

      {content.sections.map((section, index) => (
        <Section
          key={index}
          title={section.title}
          text={section.text}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;
