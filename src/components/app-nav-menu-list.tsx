import flatListToHierarchical from "@/lib/flatListToHierarchical";
import { AppNavMenuItem } from "./app-nav-menu-item";
import { WPMenu, WPMenuItem } from "@/app/layout";

export function AppNavMenuList({ menu }: { menu: WPMenu }) {
  const menuItems = flatListToHierarchical(menu.menuItems.nodes);

  return (
    <ul>
      {menuItems.map((item: WPMenuItem) => (
        <AppNavMenuItem key={item.key} menuItem={item} />
      ))}
    </ul>
  );
}
