import { Footer } from "~/components/footer";
import { MainNavbar } from "~/components/main-navbar";

export default function RedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainNavbar />
      {children}
      <Footer />
    </div>
  );
}
