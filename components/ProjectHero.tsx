import Image from "next/image";
import { withBasePath } from "@/lib/paths";
import GlassCard from "./GlassCard";

export default function ProjectHero({ title, description, image, children }: { title: string; description: string; image: string; children?: React.ReactNode }) {
  return (
    <GlassCard className="p-4 sm:p-6 grid gap-6 sm:grid-cols-2 items-center">
      <div className="order-2 sm:order-1">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-white/70 font-readable">{description}</p>
        <div className="mt-4 flex gap-3">{children}</div>
      </div>
      <div className="order-1 sm:order-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
          <div className="overflow-hidden rounded-xl">
            <Image src={withBasePath(image)} alt={title} width={900} height={600} className="w-full object-cover" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
