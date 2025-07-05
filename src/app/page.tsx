import { TracingBeam } from "~/components/ui/tracing-beam";
import { Demo } from "./_components/demo";
import { MainBanner } from "./_components/main-banner";

export default function Home() {
  return (
    <div>
      <MainBanner />
      <TracingBeam>
        <Demo />
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome to Next.js</h1>
          <p className="text-xl">This is a demo page</p>
        </div>
      </TracingBeam>
    </div>
  );
}
