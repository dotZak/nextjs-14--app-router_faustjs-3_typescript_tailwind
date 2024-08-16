import { WPMenuItem } from "@/app/layout";
import AppNavMenuLink from "./app-nav-menu-link";

export function AppNavMenuItem({ menuItem }: { menuItem: WPMenuItem }) {
  return (
    <li id={menuItem.id}>
      <AppNavMenuLink menuItem={menuItem}>
        {menuItem.children && (
          <ul>
            {menuItem.children.map((item: WPMenuItem) => (
              <AppNavMenuItem key={item.key} menuItem={item} />
            ))}
          </ul>
        )}
      </AppNavMenuLink>
    </li>
  );
}
