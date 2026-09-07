"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { createClient } from "@/lib/supabase/client";

type AuthFormProps = { mode: "login" | "signup" };

function messageForError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials")) return "Email or password is incorrect.";
  if (normalized.includes("already registered") || normalized.includes("already been registered")) return "An account with this email already exists. Try logging in.";
  if (normalized.includes("email not confirmed")) return "Please confirm your email before logging in.";
  return message || "Something went wrong. Please try again.";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const isSignup = mode === "signup";

  useEffect(() => {
    if (!isLoading && user) router.replace("/dashboard");
  }, [isLoading, router, user]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");
    setNotice("");
    setSubmitting(true);
    try {
      const supabase = createClient();
      const result = isSignup
        ? await supabase.auth.signUp({ email, password, options: { data: fullName ? { full_name: fullName } : undefined } })
        : await supabase.auth.signInWithPassword({ email, password });

      if (result.error) {
        setError(messageForError(result.error.message));
        return;
      }
      if (isSignup && !result.data.session) {
        setNotice("Check your email to confirm your account, then return here to log in.");
        return;
      }
      router.replace(searchParams.get("next")?.startsWith("/") ? searchParams.get("next")! : "/dashboard");
      router.refresh();
    } catch {
      setError("We couldn’t reach the authentication service. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const heading = isSignup ? "Create your account" : "Welcome back";
  return <main className="grid min-h-screen place-items-center bg-paper px-5 py-10"><section className="w-full max-w-md rounded-2xl border border-line bg-white p-6 sm:p-8"><Link href="/" className="font-display text-3xl italic">Reteno</Link><p className="mt-7 text-xs font-semibold tracking-[.16em] text-accent">{isSignup ? "GET STARTED" : "LOG IN"}</p><h1 className="mt-2 font-display text-4xl">{heading}</h1><p className="mt-2 text-sm leading-6 text-muted">{isSignup ? "Start keeping the things you want to remember." : "Log in to your personal knowledge library."}</p><form className="mt-7 space-y-4" onSubmit={onSubmit}>{isSignup && <label className="block text-sm font-medium">Full name<input value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 outline-none focus:border-accent" /></label>}<label className="block text-sm font-medium">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 outline-none focus:border-accent" /></label><label className="block text-sm font-medium">Password<input required type="password" minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isSignup ? "new-password" : "current-password"} className="mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 outline-none focus:border-accent" /></label>{error && <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}{notice && <p role="status" className="rounded-xl bg-accent-soft px-3 py-2 text-sm text-accent">{notice}</p>}<button disabled={submitting || isLoading} className="w-full rounded-full bg-ink px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Please wait…" : isSignup ? "Create account" : "Log in"}</button></form><p className="mt-5 text-center text-sm text-muted">{isSignup ? "Already have an account?" : "New to Reteno?"} <Link href={isSignup ? "/login" : "/signup"} className="font-medium text-ink underline">{isSignup ? "Log in" : "Create an account"}</Link></p></section></main>;
}
