import logo from "@/assets/cakesbyjack logo.jpeg";

export function BrandLogo({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={logo}
      alt="Cakes by Jack"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
    />
  );
}