import { PAGE_OPTIONS, ROLE_OPTIONS } from "./constants";

export const PAGE_ROUTES = {
  [PAGE_OPTIONS.USERS]: "/users",
  [PAGE_OPTIONS.TEAMS]: "/teams",
  [PAGE_OPTIONS.PROFILE]: "/profile",
};

export function getPageFromPath(pathname) {
  if (pathname === "/users") {
    return PAGE_OPTIONS.USERS;
  }

  if (pathname === "/teams") {
    return PAGE_OPTIONS.TEAMS;
  }

  if (pathname === "/profile") {
    return PAGE_OPTIONS.PROFILE;
  }

  return null;
}

export function getRouteForPage(page) {
  return PAGE_ROUTES[page] || "/";
}

export function getHomeRouteForRole(role) {
  return role === ROLE_OPTIONS.EMPLOYEE ? PAGE_ROUTES[PAGE_OPTIONS.PROFILE] : PAGE_ROUTES[PAGE_OPTIONS.USERS];
}
