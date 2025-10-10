import { clsx } from "clsx";

type BrandIconProps = {
  src: string; // path inside /public
  color: string; // hex color like #6DB33F
  size?: number; // px
  className?: string;
};

export default function BrandIcon({ src, color, size = 48, className }: BrandIconProps) {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    backgroundColor: "black",
    // @ts-expect-error custom property
    "--brand-color": color,
  };

  return (
    <span
      className={clsx(
        "brand-icon inline-block rounded-lg",
        className
      )}
      style={style}
      // Using CSS custom property for hover color via group
      data-color={color}
    />
  );
}
