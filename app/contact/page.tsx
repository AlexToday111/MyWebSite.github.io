"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  return (
    <main className="container py-16 reveal">
      <h1 className="text-3xl sm:text-4xl font-bold">Контакты</h1>
      <form
        className="mt-6 grid max-w-xl gap-4"
        action="https://formspree.io/f/your-id"
        method="POST"
        onSubmit={() => setStatus("Отправлено")}
        aria-labelledby="contact-form"
      >
        <label className="grid gap-2">
          <span className="text-sm">Имя</span>
          <input
            name="name"
            required
            className="rounded-xl border border-white/10 bg-card/60 px-3 py-2"
            placeholder="Ваше имя"
            aria-required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm">Email</span>
          <input
            type="email"
            name="email"
            required
            className="rounded-xl border border-white/10 bg-card/60 px-3 py-2"
            placeholder="you@example.com"
            aria-required
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm">Сообщение</span>
          <textarea
            name="message"
            required
            rows={6}
            className="rounded-xl border border-white/10 bg-card/60 px-3 py-2"
            placeholder="Чем я могу помочь?"
            aria-required
          />
        </label>
        <button className="rounded-xl bg-[hsl(var(--accent-blue))]/90 px-4 py-2 text-black hover:bg-[hsl(var(--accent-blue))]" aria-live="polite">
          Отправить
        </button>
        {status && <p className="text-sm text-muted">{status}</p>}
      </form>
    </main>
  );
}

