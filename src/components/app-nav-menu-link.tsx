"use client";
import { WPMenuItem } from "@/app/layout";
import { useActivePath } from "@/lib/useActivePath";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppNavMenuLink({
  menuItem,
  children,
  ...rest
}: {
  menuItem: WPMenuItem;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActivePath = useActivePath();
  return (
    <>
      <Link
        id={menuItem.id}
        href={menuItem.uri}
        style={{
          fontWeight: isActivePath(menuItem.uri) ? "bold" : "normal",
        }}
        {...rest}
      >
        {menuItem.label}
      </Link>
      {children}
    </>
  );
}
