
import About from "./components/about-us/About";
import Amenities from "./components/amenities/Amenities";
import Comingsoon from "./components/comingsoon/Comingsoon";
import ContactForm from "./components/contact/ContactForm";
import Container2 from "./components/container2/Container2";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import HeroTailwind from "./components/hero/HeroTailwind";
import VillaPlans from "./components/villa_plans/VillaPlans";
import VillaPreview from "./components/villapreview/VillaPreview";

export default function Home() {


  return (
    <div>
      <HeroTailwind />
      <About />
      <Container2 />
      <VillaPreview />
      <VillaPlans />
      <ContactForm />
      <Amenities />
      <Footer />
    </div>
  );
}
