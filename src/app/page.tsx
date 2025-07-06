import { TracingBeam } from "~/components/ui/tracing-beam";
import { MainBanner } from "./_components/main-banner";
import { Footer } from "~/components/footer";
import { MainNavbar } from "~/components/main-navbar";

export default function HomePage() {
  return (
    <div>
      <MainNavbar />
      <MainBanner />
      <TracingBeam>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome to Next.js</h1>
          <p className="text-xl">This is a demo page</p>
        </div>
      </TracingBeam>
      <Footer />
    </div>
  );
}
