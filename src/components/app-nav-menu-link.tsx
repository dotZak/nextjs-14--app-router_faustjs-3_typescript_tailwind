"use client";
import { WPMenuItem } from "@/app/layout";
import { useActivePath } from "@/lib/useActivePath";
import Link from "next/link";

export default function AppNavMenuLink({
  menuItem,
  children,
  ...rest
}: {
  menuItem: WPMenuItem;
  children: React.ReactNode;
}) {
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
