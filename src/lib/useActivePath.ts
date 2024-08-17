import { usePathname } from "next/navigation";

export function useActivePath(): (path: string) => boolean {
  const pathname = usePathname();

  const isActivePath = (path: string) => {
    if (path === "/" && pathname !== path) {
      return false;
    }

    return pathname.startsWith(
      // Strip trailing slashes when comparing…
      path.endsWith("/") ? path.slice(0, -1) : path
    );
  };

  return isActivePath;
}
