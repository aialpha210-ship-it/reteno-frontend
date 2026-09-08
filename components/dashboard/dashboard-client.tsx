"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { CaptureForm } from "@/components/capture/CaptureForm";
import { CaptureStatusBadge } from "@/components/capture/CaptureStatusBadge";
import { getCaptures } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import type { Capture } from "@/types";

const navigation = [
  ["Home", "/dashboard"],
  ["Library", "/dashboard"],
  ["Review", "/dashboard/review"],
  ["Search", "/dashboard/search"],
  ["Settings", "/dashboard/settings"],
] as const;

export function DashboardClient() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [captureOpen, setCaptureOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [captures, setCaptures] = useState<Capture[]>([]);
  const [totalCaptures, setTotalCaptures] = useState<number>(0);
  const [isFetchingCaptures, setIsFetchingCaptures] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) router.replace("/login");
  }, [isLoading, router, user]);

  const fetchCaptures = useCallback(async () => {
    setIsFetchingCaptures(true);
    setFetchError(null);
    try {
      const data = await getCaptures();
      setCaptures(data?.items || []);
      setTotalCaptures(data?.total || 0);
    } catch (err: any) {
      if (err.status === 401) {
        setFetchError("Your session has expired. Please log in again.");
        router.replace("/login");
      } else {
        setFetchError("Unable to load your captures.");
      }
    } finally {
      setIsFetchingCaptures(false);
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchCaptures();
    }
  }, [user, fetchCaptures]);

  const items = useMemo(
    () => captures.filter((item) =>
      (filter === "All" || item.source.toLowerCase() === filter.toLowerCase()) &&
      `${item.title || ""} ${item.source_url}`.toLowerCase().includes(query.toLowerCase())
    ),
    [filter, query, captures]
  );

  async function logOut() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await createClient().auth.signOut();
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  if (isLoading || !user) {
    return <main className="grid min-h-screen place-items-center bg-[#fbfaf7] text-sm text-muted" role="status">Checking your session…</main>;
  }

  const displayName = user.user_metadata.full_name || user.email?.split("@")[0] || "Account";
  const initials = String(displayName).split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#fbfaf7] lg:pl-64">
      <aside className="fixed inset-x-0 bottom-0 z-20 flex border-t border-line bg-white px-3 py-2 lg:inset-y-0 lg:left-0 lg:right-auto lg:w-64 lg:flex-col lg:border-r lg:border-t-0 lg:p-5">
        <Link href="/" className="hidden font-display text-3xl italic lg:block">Reteno</Link>
        <nav className="flex flex-1 justify-around lg:mt-12 lg:block lg:space-y-1" aria-label="Dashboard">
          {navigation.map(([name, href]) => <Link key={name} href={href} className={`block rounded-xl px-3 py-2 text-sm ${name === "Home" ? "bg-accent-soft text-accent" : "text-muted hover:bg-paper"}`}>{name}</Link>)}
        </nav>
        <div className="hidden rounded-xl bg-paper p-3 lg:block"><p className="text-xs text-muted">Free plan</p><p className="mt-1 text-sm font-medium">12 of 15 captures left</p><button className="mt-3 text-xs font-medium text-accent">Upgrade plan</button></div>
        <div className="hidden items-center gap-2 pt-4 lg:flex"><span className="grid h-8 w-8 place-items-center rounded-full bg-amber-200 text-xs">{initials}</span><div className="min-w-0"><span className="block truncate text-sm">{displayName}</span><button onClick={logOut} disabled={isLoggingOut} className="text-xs text-muted hover:text-ink disabled:opacity-60">{isLoggingOut ? "Logging out…" : "Log out"}</button></div></div>
      </aside>

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-8 lg:px-12 lg:pb-12">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <label className="order-2 flex min-w-[240px] flex-1 items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 sm:order-1 sm:max-w-md"><span className="text-muted">Search</span><input aria-label="Search your knowledge" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your knowledge..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted" /></label>
          <div className="order-1 flex items-center gap-3 sm:order-2"><button className="hidden rounded-full border border-line px-4 py-2 text-sm sm:block">Ask Reteno</button><button onClick={logOut} disabled={isLoggingOut} className="grid h-9 w-9 place-items-center rounded-full bg-amber-200 text-xs lg:hidden" aria-label="Log out">{isLoggingOut ? "…" : initials}</button></div>
        </header>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-semibold tracking-[.16em] text-accent">LIBRARY</p><h1 className="mt-2 font-display text-5xl">Your Knowledge</h1><p className="mt-2 text-muted">Everything useful you&apos;ve captured, in one place.</p></div><button onClick={() => setCaptureOpen((open) => !open)} className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white">+ Capture</button></div>
          {captureOpen && (
            <div className="mt-5 rounded-2xl border border-line bg-white p-4">
              <CaptureForm onSuccess={() => { setCaptureOpen(false); fetchCaptures(); }} />
            </div>
          )}
          <div className="mt-9 flex flex-wrap gap-2">{["All", "Instagram", "YouTube"].map((source) => <button key={source} onClick={() => setFilter(source)} className={`rounded-full px-4 py-2 text-sm ${filter === source ? "bg-ink text-white" : "border border-line bg-white text-muted"}`}>{source}</button>)}<button className="ml-auto rounded-full border border-line bg-white px-4 py-2 text-sm text-muted">Newest</button></div>

          <div className="mt-7">
            {isFetchingCaptures ? (
              <p className="text-sm text-muted">Loading your captures...</p>
            ) : fetchError ? (
              <p className="text-sm text-red-500">{fetchError}</p>
            ) : captures.length === 0 ? (
              <p className="text-sm text-muted">You haven&apos;t captured anything yet.</p>
            ) : items.length === 0 ? (
              <p className="text-sm text-muted">No captures match your search.</p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <Link href={`/dashboard/knowledge/${item.id}`} key={item.id} className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className={`h-28 bg-gradient-to-br from-gray-100 to-gray-50 p-4`}>
                      <span className="rounded-full bg-white/80 px-2 py-1 text-xs capitalize">{item.source}</span>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center text-xs text-muted">
                        <CaptureStatusBadge status={item.status} />
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                      <h2 className="mt-3 font-display text-xl leading-tight group-hover:underline truncate" title={item.title || item.source_url}>
                        {item.title || item.source_url}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
