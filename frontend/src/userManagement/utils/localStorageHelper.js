export function readJSON(key, fallback) {
  // Read a JSON value safely from localStorage.
  try {
    if (typeof window === "undefined") {
      return fallback;
    }

    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  // Save a JSON value safely so the app does not crash on storage errors.
  try {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage write errors so the app can still render.
  }
}

export function makeId(prefix = "id") {
  // Create a simple unique id for new users and teams.
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function nowStamp() {
  // Store dates in one standard format.
  return new Date().toISOString();
}
