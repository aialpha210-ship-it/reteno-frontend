import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-24">
      <p className="font-display text-sm italic text-muted">Reteno</p>

      <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
        Capture anywhere.
        <br />
        Learn in one place.
      </h1>

      <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
        Turn useful content from Instagram and YouTube into knowledge you can
        actually retain — without opening another app.
      </p>

      <div className="mt-10">
        <Button href="/dashboard">Get Started</Button>
      </div>
    </main>
  );
}
