export function formatRoleLabel(role = "") {
  return String(role).replace(/_+/g, " ");
}

export function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

export function getLabelById(items = [], id, labelKey = "name", fallback = "-") {
  const item = items.find((entry) => entry?.id === id);
  return item ? item[labelKey] : fallback;
}

export function buildOptionsFromItems(items = [], valueKey = "id", labelKey = "name") {
  return items.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
}

export function filterActiveUsers(users = []) {
  return users.filter((user) => user.status === "ACTIVE");
}

export function filterUsers(users = [], query = "", roleFilter = "ALL", statusFilter = "ALL") {
  const normalizedQuery = String(query).trim().toLowerCase();

  return users.filter((user) => {
    const matchesSearch =
      !normalizedQuery ||
      user.full_name.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery);

    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
    const matchesStatus = statusFilter === "ALL" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });
}

export function optionsFromStrings(values = []) {
  return values.map((value) => ({ value, label: String(value) }));
}

export function toggleArrayItem(list = [], item) {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item];
}
