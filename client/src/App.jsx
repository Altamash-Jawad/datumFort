import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import SplitSection from "./components/SplitSection";
import Footer from "./components/Footer";
import content from "./content";
import ContactSection from "./components/ContactSection";


function App() {
  return (
    <div>
      <Navbar />
      <Hero />

      {content.sections.map((section, index) => {
  if (section.type === "split") {
    return (
      <SplitSection
        key={index}
        id={section.id}
        title={section.title}
        text={section.text}
      />
    );
  }

  if (section.type === "contact") {
    return (
      <ContactSection
        key={index}
        id={section.id}
        title={section.title}
        text={section.text}
      />
    );
  }

  return (
    <Section
      key={index}
      id={section.id}
      title={section.title}
      text={section.text}
    />
  );
})}


      <Footer />
    </div>
  );
}

export default App;
