import { auth } from "~/server/auth";
import { Button } from "./ui/button";
import { Brand } from "./brand";

export async function MainNavbar() {
  const session = await auth();

  return (
    <div className="bg-background sticky top-0 z-50 flex items-center justify-between border-b px-4 py-2">
      <div className="flex-1/5">
        <Brand />
      </div>
      <div className="flex flex-3/5 items-center justify-center gap-8">
        <a href="#features">
          <p className="text-muted-foreground hover:text-primary text-sm hover:underline">
            Features
          </p>
        </a>
        <a href="#solutions">
          <p className="text-muted-foreground hover:text-primary text-sm hover:underline">
            Solutions
          </p>
        </a>
        <a href="#how-it-works">
          <p className="text-muted-foreground hover:text-primary text-sm hover:underline">
            How it works
          </p>
        </a>
        <a href="#pricing">
          <p className="text-muted-foreground hover:text-primary text-sm hover:underline">
            Pricing
          </p>
        </a>
      </div>
      <div className="flex flex-1/5 items-center justify-end">
        {session?.user ? (
          <Button variant="ghost">Sign out</Button>
        ) : (
          <Button variant="ghost">Sign in</Button>
        )}
      </div>
    </div>
  );
}
