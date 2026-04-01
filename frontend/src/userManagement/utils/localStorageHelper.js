export function readJSON(key, fallback) {
  // Read a JSON value safely from localStorage.
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  // Save a JSON value safely so the app does not crash on storage errors.
  try {
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

export function downloadJSON(filename, data) {
  // Let the user download the current app data as a JSON file.
  if (typeof document === "undefined") {
    return;
  }

  const fileName = filename || "seedData.json";
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
