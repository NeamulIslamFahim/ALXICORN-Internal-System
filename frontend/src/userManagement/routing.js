import { PAGE_OPTIONS, ROLE_OPTIONS } from "./constants";

// Keep route lookups in one place so page navigation stays consistent.
export const PAGE_ROUTES = {
  [PAGE_OPTIONS.USERS]: "/users",
  [PAGE_OPTIONS.TEAMS]: "/teams",
  [PAGE_OPTIONS.PROFILE]: "/profile",
};

const ROUTE_PAGES = Object.entries(PAGE_ROUTES).reduce((lookup, [page, route]) => {
  lookup[route] = page;
  return lookup;
}, {});

export function getPageFromPath(pathname) {
  return ROUTE_PAGES[pathname] || null;
}

export function getRouteForPage(page) {
  return PAGE_ROUTES[page] || "/";
}

// Employees land on their profile, while admins start from the users screen.
export function getHomeRouteForRole(role) {
  return role === ROLE_OPTIONS.EMPLOYEE ? PAGE_ROUTES[PAGE_OPTIONS.PROFILE] : PAGE_ROUTES[PAGE_OPTIONS.USERS];
}
