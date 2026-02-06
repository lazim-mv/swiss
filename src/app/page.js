
import About from "./components/about-us/About";
import Amenities from "./components/amenities/Amenities";
import ContactForm from "./components/contact/ContactForm";
import Container2 from "./components/container2/Container2";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import HeroTailwind from "./components/hero/HeroTailwind";
import HeroSlider from "./components/hero2/HeroSlider";
import Location from "./components/location/Location";
import VillaPlans from "./components/villa_plans/VillaPlans";
import VillaPreview from "./components/villapreview/VillaPreview";
import VillaPreviewTailwind from "./components/villapreview/VillaPreviewTailwind";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {


  return (
    <div>
      <HeroTailwind />
      <About />
      <Amenities />
      <Container2 />
      <VillaPreviewTailwind />
      <VillaPlans />
      <ContactForm />
      <Location />
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
