const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function createMonthlySeries(base, offset, spread) {
  return MONTHS.map((month, index) => ({
    month,
    hours: clamp(Math.round(base * 0.08) + index % 2 + 3 + Math.round(offset / 4), 2, 10),
    tasks: clamp(Math.round(base * 0.11) + (index % 3) + 5 + Math.round(spread / 3), 3, 10),
    projects: clamp(Math.round(base * 0.09) + ((index + 1) % 4) + 2 + Math.round(offset / 5), 2, 10),
  }));
}

export function buildOverviewScopeOptions(users = [], teams = []) {
  return {
    scopeModes: [
      { value: "ALL", label: "All" },
      { value: "TEAM", label: "Team wise" },
      { value: "PERSON", label: "Person wise" },
    ],
    teamOptions: teams.map((team) => ({
      value: team.id,
      label: team.name,
    })),
    personOptions: users.map((user) => ({
      value: user.id,
      label: user.full_name,
    })),
  };
}

export function buildOverviewAnalytics(users = [], teams = [], scopeMode = "ALL", scopeId = "") {
  const selectedTeam = scopeMode === "TEAM" ? teams.find((team) => team.id === scopeId) || null : null;
  const selectedUser = scopeMode === "PERSON" ? users.find((user) => user.id === scopeId) || null : null;

  const scopedUsers =
    scopeMode === "TEAM" && selectedTeam
      ? users.filter((user) => selectedTeam.members.some((member) => member.user_id === user.id))
      : scopeMode === "PERSON" && selectedUser
        ? users.filter((user) => user.id === selectedUser.id)
        : users;

  const activeUsers = scopedUsers.filter((user) => user.status === "ACTIVE").length;
  const teamCount =
    scopeMode === "TEAM" && selectedTeam
      ? 1
      : scopeMode === "PERSON"
        ? Math.max(1, teams.filter((team) => team.members.some((member) => member.user_id === selectedUser?.id)).length)
        : Math.max(teams.length, 1);
  const userCount = Math.max(scopedUsers.length, 1);
  const scopeOffset = scopeMode === "ALL" ? teams.length + users.length : scopeMode === "TEAM" ? userCount + 3 : userCount + 1;

  const activeProjects = clamp(teamCount * 4 + activeUsers, 6, 24);
  const totalTasks = clamp(userCount * 8 + activeUsers * 2 + scopeOffset, 18, 72);
  const completedTasks = clamp(Math.round(totalTasks * (0.36 + Math.min(activeUsers, 4) * 0.02)), 8, totalTasks);
  const hoursLogged = clamp(Math.round((activeUsers * 14 + teamCount * 5 + scopeOffset) / 3), 12, 40);
  const monthlyPerformance = createMonthlySeries(48 + userCount * 6, scopeOffset, activeUsers);

  const performanceValue = clamp(Math.round((completedTasks / Math.max(totalTasks, 1)) * 100) + 42, 84, 97);
  const completedProjects = clamp(Math.round(activeProjects * 0.42), 4, activeProjects);
  const inProgressProjects = clamp(Math.round(activeProjects * 0.38), 3, activeProjects - completedProjects);
  const doneProjects = Math.max(activeProjects - completedProjects - inProgressProjects, 1);

  const taskCompleted = clamp(Math.round(totalTasks * 0.5), 8, totalTasks);
  const taskInProgress = clamp(Math.round(totalTasks * 0.27), 4, totalTasks - taskCompleted);
  const taskTodo = Math.max(totalTasks - taskCompleted - taskInProgress, 1);

  const utilizationValue = clamp(Math.round((hoursLogged / 18) * 100), 72, 94);
  const currentWeekHours = clamp(Math.round((hoursLogged / 17) * 32), 24, 38);
  const weeklyCapacity = 40;
  const billableHours = clamp(Math.round(currentWeekHours * 0.62), 14, currentWeekHours);
  const nonBillableHours = Math.max(currentWeekHours - billableHours, 1);
  const efficiencyGain = clamp(Math.round(utilizationValue * 0.13), 8, 19);

  return {
    scopeLabel:
      scopeMode === "TEAM" && selectedTeam
        ? selectedTeam.name
        : scopeMode === "PERSON" && selectedUser
          ? selectedUser.full_name
          : "All Workspace",
    metrics: [
      { label: "Active Projects", value: activeProjects, delta: "+12.5%", tone: "green", icon: "P" },
      { label: "Total Task", value: totalTasks, delta: "+12.5%", tone: "blue", icon: "T" },
      { label: "Completed Task", value: completedTasks, delta: "+12.5%", tone: "purple", icon: "C" },
      { label: "Hours Logged", value: hoursLogged, delta: "+12.5%", deltaTone: "negative", tone: "orange", icon: "H" },
    ],
    monthlyPerformance,
    projectPerformance: [
      { label: "Completed Projects", value: completedProjects, color: "#1877f2" },
      { label: "In-Progress Projects", value: inProgressProjects, color: "#fb923c" },
      { label: "Done Projects", value: doneProjects, color: "#eef2f7" },
    ],
    taskDistribution: [
      { label: "Completed", value: taskCompleted, color: "#1877f2" },
      { label: "In-Progress", value: taskInProgress, color: "#f97316" },
      { label: "To-Do", value: taskTodo, color: "#6d28d9" },
    ],
    performanceValue,
    utilizationValue,
    weeklyEfficiencyGain: efficiencyGain,
    currentWeekHours,
    weeklyCapacity,
    billableHours,
    nonBillableHours,
    hourBreakdown: [
      { label: "Billable Hours", value: billableHours, tone: "green" },
      { label: "Non-Billable Hours", value: nonBillableHours, tone: "orange" },
    ],
    hourStatus: [
      { label: "Capacity", value: `${weeklyCapacity}h` },
      { label: "Allocated", value: `${currentWeekHours}h` },
      { label: "Available", value: `${Math.max(weeklyCapacity - currentWeekHours, 0)}h` },
    ],
  };
}
