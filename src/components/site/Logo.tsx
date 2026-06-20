import logoImg from "@/assets/images/1.webp";

export function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <img
      src={logoImg}
      alt="Future Kayan — كيان المستقبل"
      className={className}
      width={400}
      height={400}
      loading="eager"
    />
  );
}
