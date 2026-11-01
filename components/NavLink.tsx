"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  const active =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`relative ${className}`}
    >
      {children}

      {active && (
        <span
          className="
            absolute
            left-1/2
            -translate-x-1/2
            top-5
            w-1
            h-px
            bg-white
          "
        />
      )}

    </Link>
  );
}