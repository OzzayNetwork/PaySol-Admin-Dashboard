/**
 * Permission checks for the admin console.
 *
 * Read from the auth store, not from a local copy: login already returns the
 * list (AuthController::present() puts it in the same `user` object as
 * first_name/last_name) and initFromLocalStorage() restores that whole object on
 * a refresh, so there is nothing to fetch on load.
 */

import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

export function usePermissions() {
  const authStore = useAuthStore();

  // A super admin is not a flag — it is a role key, and /auth/me returns the
  // full list of permission names for it. So there is no special case here.
  const permissions = computed(() => authStore.user?.permissions ?? []);

  /** ANY of the listed permissions. This is what the backend middleware does. */
  function canAny(...names) {
    const flat = names.flat().filter(Boolean);
    if (flat.length === 0) return true; // ungated item
    return flat.some((name) => permissions.value.includes(name));
  }

  /** Used where an action genuinely needs every one of them. Rare. */
  function canAll(...names) {
    const flat = names.flat().filter(Boolean);
    if (flat.length === 0) return true;
    return flat.every((name) => permissions.value.includes(name));
  }

  /**
   * Filters the menu array down to what this admin may see.
   *
   * Dropping an item is convenience, not enforcement — EnsureAdminPermission on
   * the API is the actual wall. A hidden item and a 403 are different states and
   * both need to work.
   */
  function filterMenu(items) {
    return items
      .filter((item) => item.heading !== true && !item.hidden && canAny(item.permissions))
      .map((item) => {
        if (!item.children) return item;
        const children = item.children
          .filter((child) => !child.hidden && canAny(child.permissions))
          .map((child) => ({
            ...child,
            // A group with nothing left in it should not leave an empty shell.
            visible: child.permissions == null || canAny(child.permissions),
          }));
        return { ...item, children };
      })
      .filter((item) => !item.children || item.children.length > 0);
  }

  return { permissions, canAny, canAll, filterMenu };
}
