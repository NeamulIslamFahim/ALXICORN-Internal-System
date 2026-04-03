import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { UserManagementNormalizer } from "../../../src/userManagement/normalizers.js";
import { PERMISSION_OPTIONS, ROLE_OPTIONS, SENIORITY_OPTIONS, STATUS_OPTIONS } from "../../../src/userManagement/constants.js";

const dataDir = path.join(process.cwd(), "src", "userManagement", "data");
const runtimePath = path.join(dataDir, "runtimeData.json");
const seedPath = path.join(dataDir, "seedData.json");
const ALLOWED_ROLES = Object.values(ROLE_OPTIONS);
const ALLOWED_STATUSES = Object.values(STATUS_OPTIONS);
const ALLOWED_SENIORITY = Object.values(SENIORITY_OPTIONS);
const ALLOWED_PERMISSIONS = [...PERMISSION_OPTIONS, "ALL ACCESS"];

const ROUTE_CONTRACT = {
  route: "/api/user-management",
  methods: {
    GET: {
      description: "Returns the current user-management snapshot.",
      response: {
        users: "User[]",
        teams: "Team[]",
      },
    },
    POST: {
      description: "Saves the full user-management snapshot.",
      requiredBody: {
        users: [
          "id",
          "full_name",
          "email",
          "password",
          "role",
          "status",
          "permissions",
          "team_id",
          "seniority_role",
          "created_at",
        ],
        teams: ["id", "name", "team_lead_id", "members"],
      },
    },
  },
};

async function readJsonFile(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  return JSON.parse(content);
}

async function loadData() {
  try {
    return await readJsonFile(runtimePath);
  } catch {
    const seed = await readJsonFile(seedPath);
    await fs.writeFile(runtimePath, `${JSON.stringify(seed, null, 2)}\n`, "utf8");
    return seed;
  }
}

function badRequest(message, details = []) {
  return NextResponse.json(
    {
      ok: false,
      message,
      details,
      contract: ROUTE_CONTRACT.methods.POST,
    },
    { status: 400 }
  );
}

function invalidValue(pathName, message, expected, received) {
  return {
    path: pathName,
    message,
    expected,
    received,
  };
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeUser(user) {
  return {
    id: String(user.id || "").trim(),
    full_name: String(user.full_name || "").trim(),
    email: String(user.email || "").trim().toLowerCase(),
    password: String(user.password || ""),
    role: UserManagementNormalizer.normalizeRole(user.role),
    status: UserManagementNormalizer.normalizeStatus(user.status),
    permissions: Array.isArray(user.permissions)
      ? user.permissions.map((permission) => UserManagementNormalizer.normalizePermission(permission))
      : [],
    team_id: user.team_id ? String(user.team_id).trim() : null,
    seniority_role: UserManagementNormalizer.normalizeSeniority(user.seniority_role),
    created_at: String(user.created_at || "").trim(),
  };
}

function normalizeTeam(team) {
  return {
    id: String(team.id || "").trim(),
    name: String(team.name || "").trim(),
    team_lead_id: team.team_lead_id ? String(team.team_lead_id).trim() : null,
    members: Array.isArray(team.members)
      ? team.members.map((member) => ({
          user_id: String(member?.user_id || "").trim(),
          seniority_role: UserManagementNormalizer.normalizeSeniority(member?.seniority_role),
        }))
      : [],
  };
}

function validateUser(user, index, teamIds) {
  const errors = [];
  const pathName = `users[${index}]`;

  if (!isPlainObject(user)) {
    return [invalidValue(pathName, "User must be an object.", "object", typeof user)];
  }

  if (!user.id) {
    errors.push(invalidValue(`${pathName}.id`, "User id is required.", "non-empty string", user.id));
  }

  if (!user.full_name) {
    errors.push(invalidValue(`${pathName}.full_name`, "Full name is required.", "non-empty string", user.full_name));
  }

  if (!user.email || !user.email.includes("@")) {
    errors.push(invalidValue(`${pathName}.email`, "Email must be valid.", "email string", user.email));
  }

  if (!user.password) {
    errors.push(invalidValue(`${pathName}.password`, "Password is required.", "non-empty string", user.password));
  }

  if (!ALLOWED_ROLES.includes(user.role)) {
    errors.push(invalidValue(`${pathName}.role`, "Role is invalid.", ALLOWED_ROLES.join(" | "), user.role));
  }

  if (!ALLOWED_STATUSES.includes(user.status)) {
    errors.push(invalidValue(`${pathName}.status`, "Status is invalid.", ALLOWED_STATUSES.join(" | "), user.status));
  }

  if (!ALLOWED_SENIORITY.includes(user.seniority_role)) {
    errors.push(
      invalidValue(
        `${pathName}.seniority_role`,
        "Seniority role is invalid.",
        ALLOWED_SENIORITY.join(" | "),
        user.seniority_role
      )
    );
  }

  if (!Array.isArray(user.permissions)) {
    errors.push(invalidValue(`${pathName}.permissions`, "Permissions must be an array.", "string[]", user.permissions));
  } else {
    user.permissions.forEach((permission, permissionIndex) => {
      if (!ALLOWED_PERMISSIONS.includes(permission)) {
        errors.push(
          invalidValue(
            `${pathName}.permissions[${permissionIndex}]`,
            "Permission is invalid.",
            ALLOWED_PERMISSIONS.join(" | "),
            permission
          )
        );
      }
    });
  }

  if (user.team_id && !teamIds.has(user.team_id)) {
    errors.push(
      invalidValue(`${pathName}.team_id`, "team_id must reference an existing team.", "known team id or null", user.team_id)
    );
  }

  if (!user.created_at || Number.isNaN(Date.parse(user.created_at))) {
    errors.push(invalidValue(`${pathName}.created_at`, "created_at must be a valid ISO date.", "ISO date string", user.created_at));
  }

  if (user.role === ROLE_OPTIONS.SUPER_ADMIN && !user.permissions.includes("ALL ACCESS")) {
    errors.push(
      invalidValue(
        `${pathName}.permissions`,
        "Super Admin must include ALL ACCESS permission.",
        'array containing "ALL ACCESS"',
        user.permissions
      )
    );
  }

  return errors;
}

function validateTeam(team, index, userIds) {
  const errors = [];
  const pathName = `teams[${index}]`;

  if (!isPlainObject(team)) {
    return [invalidValue(pathName, "Team must be an object.", "object", typeof team)];
  }

  if (!team.id) {
    errors.push(invalidValue(`${pathName}.id`, "Team id is required.", "non-empty string", team.id));
  }

  if (!team.name) {
    errors.push(invalidValue(`${pathName}.name`, "Team name is required.", "non-empty string", team.name));
  }

  if (team.team_lead_id && !userIds.has(team.team_lead_id)) {
    errors.push(
      invalidValue(
        `${pathName}.team_lead_id`,
        "team_lead_id must reference an existing user.",
        "known user id or null",
        team.team_lead_id
      )
    );
  }

  if (!Array.isArray(team.members)) {
    errors.push(invalidValue(`${pathName}.members`, "Members must be an array.", "TeamMember[]", team.members));
    return errors;
  }

  const seenMembers = new Set();

  team.members.forEach((member, memberIndex) => {
    const memberPath = `${pathName}.members[${memberIndex}]`;

    if (!isPlainObject(member)) {
      errors.push(invalidValue(memberPath, "Member must be an object.", "object", typeof member));
      return;
    }

    if (!member.user_id || !userIds.has(member.user_id)) {
      errors.push(
        invalidValue(`${memberPath}.user_id`, "user_id must reference an existing user.", "known user id", member.user_id)
      );
    }

    if (!ALLOWED_SENIORITY.includes(member.seniority_role)) {
      errors.push(
        invalidValue(
          `${memberPath}.seniority_role`,
          "Member seniority role is invalid.",
          ALLOWED_SENIORITY.join(" | "),
          member.seniority_role
        )
      );
    }

    if (member.user_id) {
      if (seenMembers.has(member.user_id)) {
        errors.push(
          invalidValue(`${memberPath}.user_id`, "Duplicate team member detected.", "unique user id", member.user_id)
        );
      }

      seenMembers.add(member.user_id);
    }
  });

  if (team.team_lead_id && !team.members.some((member) => member.user_id === team.team_lead_id)) {
    errors.push(
      invalidValue(
        `${pathName}.team_lead_id`,
        "Team lead must also appear in members.",
        "user id included in team members",
        team.team_lead_id
      )
    );
  }

  return errors;
}

function validatePayload(payload) {
  if (!isPlainObject(payload)) {
    return [invalidValue("body", "Request body must be a JSON object.", "{ users: User[], teams: Team[] }", typeof payload)];
  }

  const errors = [];

  if (!Array.isArray(payload.users)) {
    errors.push(invalidValue("users", "users is required.", "User[]", payload.users));
  }

  if (!Array.isArray(payload.teams)) {
    errors.push(invalidValue("teams", "teams is required.", "Team[]", payload.teams));
  }

  if (errors.length > 0) {
    return errors;
  }

  const normalizedTeams = payload.teams.map(normalizeTeam);
  const teamIds = new Set(normalizedTeams.map((team) => team.id).filter(Boolean));
  const normalizedUsers = payload.users.map(normalizeUser);
  const userIds = new Set(normalizedUsers.map((user) => user.id).filter(Boolean));

  normalizedUsers.forEach((user, index) => {
    errors.push(...validateUser(user, index, teamIds));
  });

  normalizedTeams.forEach((team, index) => {
    errors.push(...validateTeam(team, index, userIds));
  });

  const seenUserEmails = new Set();
  const seenUserIds = new Set();
  const seenTeamIds = new Set();

  normalizedUsers.forEach((user, index) => {
    if (user.id) {
      if (seenUserIds.has(user.id)) {
        errors.push(invalidValue(`users[${index}].id`, "Duplicate user id detected.", "unique id", user.id));
      }
      seenUserIds.add(user.id);
    }

    if (user.email) {
      if (seenUserEmails.has(user.email)) {
        errors.push(invalidValue(`users[${index}].email`, "Duplicate email detected.", "unique email", user.email));
      }
      seenUserEmails.add(user.email);
    }
  });

  normalizedTeams.forEach((team, index) => {
    if (team.id) {
      if (seenTeamIds.has(team.id)) {
        errors.push(invalidValue(`teams[${index}].id`, "Duplicate team id detected.", "unique id", team.id));
      }
      seenTeamIds.add(team.id);
    }
  });

  return errors;
}

export async function GET() {
  try {
    const data = await loadData();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ message: "Failed to load user management data." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return badRequest("Content-Type must be application/json.", [
        invalidValue("headers.content-type", "Unsupported content type.", "application/json", contentType || null),
      ]);
    }

    const payload = await request.json();
    const validationErrors = validatePayload(payload);

    if (validationErrors.length > 0) {
      return badRequest("Invalid payload for /api/user-management.", validationErrors);
    }

    const nextData = UserManagementNormalizer.normalizeSeedData({
      users: payload.users,
      teams: payload.teams,
    });

    await fs.writeFile(runtimePath, `${JSON.stringify(nextData, null, 2)}\n`, "utf8");

    return NextResponse.json(
      {
        ok: true,
        message: "User management data saved successfully.",
        data: nextData,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: "Failed to save user management data." }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {
      ok: true,
      contract: ROUTE_CONTRACT,
      enums: {
        roles: ALLOWED_ROLES,
        statuses: ALLOWED_STATUSES,
        seniorityRoles: ALLOWED_SENIORITY,
        permissions: ALLOWED_PERMISSIONS,
      },
    },
    { status: 200 }
  );
}
