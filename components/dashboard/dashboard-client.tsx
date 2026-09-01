"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { knowledgeItems } from "@/lib/mock-data";

const navigation = [
  ["Home", "/dashboard"],
  ["Library", "/dashboard"],
  ["Review", "/dashboard/review"],
  ["Search", "/dashboard/search"],
  ["Settings", "/dashboard/settings"],
] as const;

export function DashboardClient() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [captureOpen, setCaptureOpen] = useState(false);
  const items = useMemo(
    () => knowledgeItems.filter((item) =>
      (filter === "All" || item.source === filter) &&
      `${item.title} ${item.tag}`.toLowerCase().includes(query.toLowerCase())
    ),
    [filter, query]
  );

  return (
    <div className="min-h-screen bg-[#fbfaf7] lg:pl-64">
      <aside className="fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-white px-3 py-2 lg:inset-y-0 lg:left-0 lg:right-auto lg:w-64 lg:flex-col lg:border-r lg:border-t-0 lg:p-5">
        <Link href="/" className="hidden font-display text-3xl italic lg:block">Reteno</Link>
        <nav className="flex flex-1 justify-around lg:mt-12 lg:block lg:space-y-1" aria-label="Dashboard">
          {navigation.map(([name, href]) => <Link key={name} href={href} className={`block rounded-xl px-3 py-2 text-sm ${name === "Home" ? "bg-accent-soft text-accent" : "text-muted hover:bg-paper"}`}>{name}</Link>)}
        </nav>
        <div className="hidden rounded-xl bg-paper p-3 lg:block"><p className="text-xs text-muted">Free plan</p><p className="mt-1 text-sm font-medium">12 of 15 captures left</p><button className="mt-3 text-xs font-medium text-accent">Upgrade plan</button></div>
        <div className="hidden items-center gap-2 pt-4 lg:flex"><span className="grid h-8 w-8 place-items-center rounded-full bg-amber-200 text-xs">DS</span><span className="text-sm">Dipanshi</span></div>
      </aside>

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-8 lg:px-12 lg:pb-12">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <label className="order-2 flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 sm:order-1 sm:max-w-md"><span className="text-muted">Search</span><input aria-label="Search your knowledge" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your knowledge..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted" /></label>
          <div className="order-1 flex items-center gap-3 sm:order-2"><button className="hidden rounded-full border border-line px-4 py-2 text-sm sm:block">Ask Reteno</button><span className="grid h-9 w-9 place-items-center rounded-full bg-amber-200 text-xs lg:hidden">DS</span></div>
        </header>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-semibold tracking-[.16em] text-accent">LIBRARY</p><h1 className="mt-2 font-display text-5xl">Your Knowledge</h1><p className="mt-2 text-muted">Everything useful you&apos;ve captured, in one place.</p></div><button onClick={() => setCaptureOpen((open) => !open)} className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white">+ Capture</button></div>
          {captureOpen && <div className="mt-5 grid gap-3 rounded-2xl border border-line bg-white p-4 sm:grid-cols-3"><CaptureOption title="Instagram" copy="Send a Reel to Reteno on Instagram" /><CaptureOption title="YouTube" copy="Send a YouTube video to Reteno on WhatsApp" /><CaptureOption title="Web (coming soon)" copy="Paste a URL when web capture arrives." /></div>}
          <div className="mt-9 flex flex-wrap gap-2">{["All", "Instagram", "YouTube"].map((source) => <button key={source} onClick={() => setFilter(source)} className={`rounded-full px-4 py-2 text-sm ${filter === source ? "bg-ink text-white" : "border border-line bg-white text-muted"}`}>{source}</button>)}<button className="ml-auto rounded-full border border-line bg-white px-4 py-2 text-sm text-muted">Newest</button></div>
          <section className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="flex items-start justify-between"><div><p className="text-sm font-medium">Your YouTube video is being processed...</p><p className="mt-1 text-sm text-muted">Transcribing - this usually takes a few moments</p></div><span className="text-xs text-muted">68%</span></div><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-amber-100"><div className="h-full w-[68%] rounded-full bg-amber-500" /></div></section>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <Link href={`/dashboard/knowledge/${item.id}`} key={item.id} className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-md"><div className={`h-28 bg-gradient-to-br ${item.thumbnail} p-4`}><span className="rounded-full bg-white/80 px-2 py-1 text-xs">{item.source}</span></div><div className="p-5"><div className="flex justify-between text-xs text-muted"><span>{item.tag}</span><span>{item.date}</span></div><h2 className="mt-3 font-display text-2xl leading-tight group-hover:underline">{item.title}</h2><p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p></div></Link>)}</div>
        </section>
      </main>
    </div>
  );
}

function CaptureOption({ title, copy }: { title: string; copy: string }) {
  return <div><p className="font-medium">{title}</p><p className="mt-1 text-xs text-muted">{copy}</p></div>;
}
