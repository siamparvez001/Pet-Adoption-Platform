import HappyTailsSection from "@/components/HappyTailsSection";
import Hero from "@/components/Hero";
import WhyAdoptSection from "@/components/WhyAdoptSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <WhyAdoptSection></WhyAdoptSection>
      <HappyTailsSection></HappyTailsSection>
    </div>
  );
}
