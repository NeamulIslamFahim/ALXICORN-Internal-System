"use client";

import { usePathname, useRouter } from "next/navigation";
import App from "./App";
import { getHomeRouteForRole, getPageFromPath, getRouteForPage } from "./routing";

export default function NextApp() {
  const pathname = usePathname();
  const router = useRouter();
  const routePage = getPageFromPath(pathname);

  return (
    <App
      routePage={routePage}
      onNavigateToPage={(page) => router.push(getRouteForPage(page))}
      onNavigateToLogin={() => router.push("/login")}
      onNavigateToHome={(user) => router.push(getHomeRouteForRole(user?.role))}
    />
  );
}
