import Link from "next/link";

export default function NewsPage() {
  return (
    <main className="relative min-h-[calc(100dvh-160px)] overflow-hidden px-4 py-14 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-red-700/15 blur-3xl dark:bg-red-500/20" />
        <div className="absolute -right-20 top-36 h-72 w-72 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />
        <div className="absolute bottom-0 left-1/2 h-56 w-3xl -translate-x-1/2 bg-linear-to-r from-transparent via-red-700/15 to-transparent blur-2xl dark:via-red-500/20" />
      </div>

      <section className="relative mx-auto w-full max-w-4xl border border-black/10 bg-white/85 p-8 shadow-2xl shadow-black/10 backdrop-blur-md dark:border-white/15 dark:bg-black/45 dark:shadow-black/60 sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-black/60 dark:text-white/60">
          News Feed
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-black dark:text-white sm:text-5xl">
          Personalized news hub is ready
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/70 dark:text-white/70 sm:text-lg">
          This is a starter destination page for successful post-login routing.
          Your onboarding flow now redirects here when the user is already onboarded
          or completes onboarding.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="border border-black/20 px-5 py-2.5 text-sm font-medium text-black transition hover:border-black/40 hover:bg-black/5 dark:border-white/30 dark:text-white dark:hover:bg-white/10"
          >
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
