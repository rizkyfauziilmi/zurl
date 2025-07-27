import { MainBanner } from "./_components/main-banner";
import { Footer } from "~/components/footer";
import { Features } from "./_components/features";
import { MainNavbar } from "../components/main-navbar";
import { Solutions } from "./_components/solutions";
import { HowItWorks } from "./_components/how-it-works";
import { Pricing } from "./_components/pricing";

export default function HomePage() {
  return (
    <div className="space-y-64 overflow-x-hidden">
      <MainNavbar />
      <MainBanner />
      <Features />
      <Solutions />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
}
