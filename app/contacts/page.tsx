import FinalCallout from "@/components/FinalCallout";

export default function ContactsPage() {
  return (
    <main className="relative">
      <section className="relative min-h-[100svh] overflow-visible">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-10%] top-[15%] h-[85rem] w-[85rem] rounded-full bg-gradient-to-tr from-violet-500/35 to-fuchsia-500/25 blur-3xl animate-soft-blink" />
          <div className="absolute right-[-10%] bottom-[-15%] h-[85rem] w-[85rem] rounded-full bg-gradient-to-bl from-fuchsia-500/30 to-purple-500/25 blur-3xl animate-soft-blink" />
        </div>
        <FinalCallout />
      </section>
    </main>
  );
}
