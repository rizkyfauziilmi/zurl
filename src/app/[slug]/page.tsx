import { api } from "~/trpc/server";
import { notFound, redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const shortUrl = await api.shortUrl.getRedirect({ slug });

  if (!shortUrl) {
    notFound();
  }

  redirect(shortUrl.originalUrl);
}
