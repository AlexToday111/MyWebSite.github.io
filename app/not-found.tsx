import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container py-24 text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="mt-2 text-muted">Страница не найдена.</p>
      <Link href="/" className="mt-6 inline-block rounded-xl bg-white/10 px-4 py-2 hover:bg-white/15">
        На главную
      </Link>
    </main>
  );
}


