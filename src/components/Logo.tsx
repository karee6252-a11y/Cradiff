import Image from "next/image";

type LogoProps = {
  /** Height-based sizing classes, e.g. "h-10". Width scales automatically. */
  className?: string;
  priority?: boolean;
};

const LOGO_W = 420;
const LOGO_H = 389;

export default function Logo({ className = "h-10", priority = false }: LogoProps) {
  return (
    <span className={`relative inline-block w-auto ${className}`}>
      {/* Cream mark for dark theme */}
      <Image
        src="/cis-logo-light.png"
        alt="Cardiff International School"
        width={LOGO_W}
        height={LOGO_H}
        priority={priority}
        className="hidden h-full w-auto select-none dark:block"
      />
      {/* Burgundy mark for light theme */}
      <Image
        src="/cis-logo.png"
        alt="Cardiff International School"
        width={LOGO_W}
        height={LOGO_H}
        priority={priority}
        className="block h-full w-auto select-none dark:hidden"
      />
    </span>
  );
}
