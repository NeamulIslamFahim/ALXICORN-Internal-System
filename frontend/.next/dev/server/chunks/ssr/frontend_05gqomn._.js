module.exports = [
"[project]/frontend/src/userManagement/data/seedData.json.[json].cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "users": [
        {
            "id": "user-super-admin",
            "full_name": "Super Admin",
            "email": "superadmin@example.com",
            "password": "SuperAdmin@123",
            "role": "SUPER ADMIN",
            "status": "ACTIVE",
            "permissions": [
                "ALL ACCESS"
            ],
            "team_id": null,
            "seniority_role": "LEAD",
            "created_at": "2026-04-01T00:00:00.000Z"
        },
        {
            "id": "user-admin",
            "full_name": "Admin User",
            "email": "admin@example.com",
            "password": "Admin@123",
            "role": "ADMIN",
            "status": "ACTIVE",
            "permissions": [
                "USER CREATE",
                "USER EDIT",
                "USER DEACTIVATE",
                "TEAM MANAGE"
            ],
            "team_id": "user-admin",
            "seniority_role": "LEAD",
            "created_at": "2026-04-01T00:00:00.000Z"
        },
        {
            "id": "user-employee",
            "full_name": "Asif Ahmed",
            "email": "asif@example.com",
            "password": "asif@123",
            "role": "EMPLOYEE",
            "status": "ACTIVE",
            "permissions": [],
            "team_id": "team-frontend",
            "seniority_role": "MID",
            "created_at": "2026-04-01T00:00:00.000Z"
        }
    ],
    "teams": []
};
}),
"[project]/frontend/src/userManagement/utils/localStorageHelper.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "makeId",
    ()=>makeId,
    "nowStamp",
    ()=>nowStamp,
    "readJSON",
    ()=>readJSON,
    "writeJSON",
    ()=>writeJSON
]);
function readJSON(key, fallback) {
    // Read a JSON value safely from localStorage.
    try {
        if ("TURBOPACK compile-time truthy", 1) {
            return fallback;
        }
        //TURBOPACK unreachable
        ;
        const value = undefined;
    } catch  {
        return fallback;
    }
}
function writeJSON(key, value) {
    // Save a JSON value safely so the app does not crash on storage errors.
    try {
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
        //TURBOPACK unreachable
        ;
    } catch  {
    // Ignore storage write errors so the app can still render.
    }
}
function makeId(prefix = "id") {
    // Create a simple unique id for new users and teams.
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return `${prefix}-${crypto.randomUUID()}`;
    }
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function nowStamp() {
    // Store dates in one standard format.
    return new Date().toISOString();
}
}),
"[project]/frontend/src/userManagement/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PAGE_OPTIONS",
    ()=>PAGE_OPTIONS,
    "PERMISSION_OPTIONS",
    ()=>PERMISSION_OPTIONS,
    "ROLE_OPTIONS",
    ()=>ROLE_OPTIONS,
    "SENIORITY_OPTIONS",
    ()=>SENIORITY_OPTIONS,
    "STATUS_OPTIONS",
    ()=>STATUS_OPTIONS,
    "STORAGE_KEYS",
    ()=>STORAGE_KEYS
]);
const ROLE_OPTIONS = {
    SUPER_ADMIN: "SUPER ADMIN",
    ADMIN: "ADMIN",
    EMPLOYEE: "EMPLOYEE"
};
const PAGE_OPTIONS = {
    USERS: "users",
    TEAMS: "teams",
    PROFILE: "profile"
};
const STATUS_OPTIONS = {
    ACTIVE: "ACTIVE",
    INACTIVE: "INACTIVE",
    TERMINATED: "TERMINATED"
};
const SENIORITY_OPTIONS = {
    JUNIOR: "JUNIOR",
    MID: "MID",
    SENIOR: "SENIOR",
    LEAD: "LEAD"
};
const PERMISSION_OPTIONS = [
    "USER CREATE",
    "USER EDIT",
    "USER DEACTIVATE",
    "TEAM MANAGE"
];
const STORAGE_KEYS = {
    users: "um_users",
    teams: "um_teams",
    authUserId: "um_auth_user_id",
    page: "um_page",
    seedSignature: "um_seed_signature"
};
}),
"[project]/frontend/src/userManagement/normalizers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserManagementNormalizer",
    ()=>UserManagementNormalizer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$data$2f$seedData$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/data/seedData.json.[json].cjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/utils/localStorageHelper.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/constants.js [app-ssr] (ecmascript)");
;
;
;
class UserManagementNormalizer {
    static roleLookup = {
        SUPER_ADMIN: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN,
        ADMIN: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].ADMIN,
        EMPLOYEE: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].EMPLOYEE
    };
    static statusLookup = {
        ACTIVE: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE,
        INACTIVE: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].INACTIVE,
        TERMINATED: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].TERMINATED
    };
    static seniorityLookup = {
        JUNIOR: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"].JUNIOR,
        MID: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"].MID,
        SENIOR: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"].SENIOR,
        LEAD: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"].LEAD
    };
    static permissionLookup = {
        USER_CREATE: "USER CREATE",
        USER_EDIT: "USER EDIT",
        USER_DEACTIVATE: "USER DEACTIVATE",
        TEAM_MANAGE: "TEAM MANAGE",
        ALL_ACCESS: "ALL ACCESS"
    };
    static normalizeToken(value) {
        return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");
    }
    static normalizeRole(value) {
        const normalized = this.normalizeToken(value).replace(/_+/g, "_");
        return this.roleLookup[normalized] || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].EMPLOYEE;
    }
    static normalizeStatus(value) {
        const normalized = this.normalizeToken(value);
        return this.statusLookup[normalized] || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE;
    }
    static normalizeSeniority(value) {
        const normalized = this.normalizeToken(value);
        return this.seniorityLookup[normalized] || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"].JUNIOR;
    }
    static normalizePermission(value) {
        const normalized = this.normalizeToken(value);
        return this.permissionLookup[normalized] || String(value || "").trim().toUpperCase();
    }
    static normalizeSeedData(seed = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$data$2f$seedData$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]) {
        const teams = Array.isArray(seed?.teams) ? seed.teams.filter(Boolean).map((team, index)=>({
                id: team.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeId"])(`team-${index}`),
                name: String(team.name || "").trim() || "Team",
                team_lead_id: team.team_lead_id || null,
                members: Array.isArray(team.members) ? team.members.filter(Boolean).map((member)=>({
                        user_id: member.user_id,
                        seniority_role: this.normalizeSeniority(member.seniority_role)
                    })) : []
            })) : [];
        const teamIds = new Set(teams.map((team)=>team.id));
        const users = Array.isArray(seed?.users) ? seed.users.filter(Boolean).map((user, index)=>({
                id: user.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeId"])(`user-${index}`),
                full_name: String(user.full_name || "").trim() || "User",
                email: String(user.email || "").trim().toLowerCase(),
                password: String(user.password || ""),
                role: this.normalizeRole(user.role),
                status: this.normalizeStatus(user.status),
                permissions: Array.isArray(user.permissions) ? user.permissions.map((item)=>this.normalizePermission(item)) : [],
                team_id: user.team_id && teamIds.has(user.team_id) ? user.team_id : null,
                seniority_role: this.normalizeSeniority(user.seniority_role),
                created_at: user.created_at || (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowStamp"])()
            })) : [];
        users.forEach((user)=>{
            if (user.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN && !user.permissions.includes("ALL ACCESS")) {
                user.permissions = [
                    "ALL ACCESS"
                ];
            }
        });
        const userIds = new Set(users.map((user)=>user.id));
        const nextTeams = teams.map((team)=>{
            const members = team.members.filter((member)=>userIds.has(member.user_id));
            const leadExists = team.team_lead_id && userIds.has(team.team_lead_id);
            const leadId = leadExists ? team.team_lead_id : members[0]?.user_id || null;
            const uniqueMembers = [];
            const seen = new Set();
            if (leadId) {
                seen.add(leadId);
                uniqueMembers.push({
                    user_id: leadId,
                    seniority_role: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"].LEAD
                });
            }
            members.forEach((member)=>{
                if (!seen.has(member.user_id)) {
                    seen.add(member.user_id);
                    uniqueMembers.push(member);
                }
            });
            return {
                ...team,
                team_lead_id: leadId,
                members: uniqueMembers
            };
        });
        return {
            users,
            teams: nextTeams
        };
    }
    static buildSeedSignature(seed) {
        return JSON.stringify({
            users: seed.users,
            teams: seed.teams
        });
    }
}
}),
"[project]/frontend/src/userManagement/store.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserManagementStore",
    ()=>UserManagementStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$data$2f$seedData$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/data/seedData.json.[json].cjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/utils/localStorageHelper.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$normalizers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/normalizers.js [app-ssr] (ecmascript)");
;
;
;
;
class UserManagementStore {
    constructor(seed = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$data$2f$seedData$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]){
        this.seed = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$normalizers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserManagementNormalizer"].normalizeSeedData(seed);
        this.seedSignature = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$normalizers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserManagementNormalizer"].buildSeedSignature(this.seed);
    }
    static isValidUser(user) {
        return user && typeof user === "object" && typeof user.email === "string" && typeof user.password === "string" && Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"]).includes(user.role) && Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"]).includes(user.status);
    }
    static isValidTeam(team) {
        return team && typeof team === "object" && typeof team.name === "string" && Array.isArray(team.members);
    }
    static getUserById(users, userId) {
        return users.find((user)=>user.id === userId) || null;
    }
    static countActiveSuperAdmins(users) {
        return users.filter((user)=>user.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN && user.status === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE).length;
    }
    static canUse(user, permission) {
        if (!user) {
            return false;
        }
        if (user.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN) {
            return true;
        }
        return user.permissions.includes(permission);
    }
    static saveTeamMembers(teams, teamForm, teamId) {
        const nextMembers = teamForm.members.map((member)=>({
                user_id: member.user_id,
                seniority_role: member.seniority_role
            }));
        if (teamForm.team_lead_id && !nextMembers.some((member)=>member.user_id === teamForm.team_lead_id)) {
            nextMembers.unshift({
                user_id: teamForm.team_lead_id,
                seniority_role: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"].LEAD
            });
        }
        return [
            ...teams.filter((team)=>team.id !== teamId),
            {
                id: teamId,
                name: teamForm.name,
                team_lead_id: teamForm.team_lead_id,
                members: nextMembers
            }
        ];
    }
    static updateUsersForTeam(users, teamForm, teamId) {
        const memberMap = new Map(teamForm.members.map((member)=>[
                member.user_id,
                member.seniority_role
            ]));
        const memberIds = new Set(teamForm.members.map((member)=>member.user_id));
        memberIds.add(teamForm.team_lead_id);
        return users.map((user)=>{
            if (memberIds.has(user.id)) {
                return {
                    ...user,
                    team_id: teamId,
                    seniority_role: user.id === teamForm.team_lead_id ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"].LEAD : memberMap.get(user.id) || user.seniority_role
                };
            }
            if (user.team_id === teamId) {
                return {
                    ...user,
                    team_id: null
                };
            }
            return user;
        });
    }
    createInitialState() {
        const storedSignature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readJSON"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].seedSignature, "");
        const seedChanged = storedSignature !== this.seedSignature;
        const storedUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readJSON"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].users, null);
        const storedTeams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readJSON"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].teams, null);
        const users = !seedChanged && Array.isArray(storedUsers) && storedUsers.every(UserManagementStore.isValidUser) ? storedUsers : this.seed.users;
        const teams = !seedChanged && Array.isArray(storedTeams) && storedTeams.every(UserManagementStore.isValidTeam) ? storedTeams : this.seed.teams;
        return {
            users,
            teams,
            authUserId: seedChanged ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readJSON"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].authUserId, null),
            page: seedChanged ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].USERS : (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readJSON"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].page, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].USERS),
            modal: null,
            notice: "",
            seedSignature: this.seedSignature
        };
    }
    getCurrentUser(state) {
        return UserManagementStore.getUserById(state.users, state.authUserId);
    }
    getPermissions(currentUser) {
        return {
            canCreateAdmin: currentUser?.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN,
            canCreateEmployee: currentUser?.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN || currentUser?.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].ADMIN,
            canManageTeams: currentUser?.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN || UserManagementStore.canUse(currentUser, "TEAM MANAGE"),
            canEditUsers: currentUser?.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN || UserManagementStore.canUse(currentUser, "USER EDIT"),
            canDeactivateUsers: currentUser?.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN || UserManagementStore.canUse(currentUser, "USER DEACTIVATE"),
            canViewTeams: currentUser?.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN || currentUser?.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].ADMIN || currentUser?.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].EMPLOYEE
        };
    }
    syncSeedIfNeeded(state) {
        if (state.seedSignature === this.seedSignature) {
            return state;
        }
        return {
            ...this.createInitialState(),
            notice: "Seed data refreshed."
        };
    }
    login(state, email, password) {
        const user = state.users.find((item)=>item.email.trim().toLowerCase() === email.trim().toLowerCase() && item.password === password && item.status === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE);
        if (!user) {
            return {
                ok: false,
                message: "Wrong credentials.",
                state
            };
        }
        return {
            ok: true,
            state: {
                ...state,
                authUserId: user.id,
                page: user.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].EMPLOYEE ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].PROFILE : __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].USERS,
                notice: ""
            },
            user
        };
    }
    logout(state) {
        return {
            ...state,
            authUserId: null,
            page: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].USERS,
            modal: null,
            notice: ""
        };
    }
    setPage(state, page) {
        return {
            ...state,
            page
        };
    }
    openUserModal(state, mode, data = null) {
        return {
            ...state,
            modal: {
                type: "user",
                mode,
                data
            },
            notice: ""
        };
    }
    closeUserModal(state) {
        return {
            ...state,
            modal: null
        };
    }
    openTeamModal(state, mode, data = null) {
        return {
            ...state,
            modal: {
                type: "team",
                mode,
                data
            },
            notice: ""
        };
    }
    closeTeamModal(state) {
        return {
            ...state,
            modal: null
        };
    }
    saveUser(state, form) {
        const authUser = UserManagementStore.getUserById(state.users, state.authUserId);
        const isEdit = Boolean(form.id);
        const current = state.users.find((user)=>user.id === form.id);
        if (!isEdit && authUser?.role !== __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN && form.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].ADMIN) {
            return {
                ...state,
                notice: "Only Super Admin can create Admin."
            };
        }
        if (!isEdit && authUser?.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].EMPLOYEE) {
            return {
                ...state,
                notice: "Employee cannot create users."
            };
        }
        if (isEdit && current?.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN && UserManagementStore.countActiveSuperAdmins(state.users) <= 1) {
            return {
                ...state,
                notice: "Last Super Admin cannot be changed."
            };
        }
        const nextUsers = isEdit ? state.users.map((user)=>user.id === form.id ? {
                ...user,
                full_name: form.full_name,
                email: form.email,
                password: form.password || user.password,
                role: form.role,
                status: form.status,
                permissions: form.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].ADMIN ? form.permissions : user.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN ? [
                    "ALL ACCESS"
                ] : [],
                team_id: form.team_id || null,
                seniority_role: form.seniority_role
            } : user) : [
            {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeId"])("user"),
                full_name: form.full_name,
                email: form.email,
                password: form.password,
                role: form.role,
                status: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE,
                permissions: form.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].ADMIN ? form.permissions : form.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN ? [
                    "ALL ACCESS"
                ] : [],
                team_id: form.team_id || null,
                seniority_role: form.seniority_role,
                created_at: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nowStamp"])()
            },
            ...state.users
        ];
        return {
            ...state,
            users: nextUsers,
            modal: null,
            notice: isEdit ? "User updated." : "User created."
        };
    }
    deleteUser(state, userId) {
        const target = state.users.find((user)=>user.id === userId);
        if (!target) {
            return state;
        }
        if (target.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN && UserManagementStore.countActiveSuperAdmins(state.users) <= 1) {
            return {
                ...state,
                notice: "Last Super Admin cannot be deleted."
            };
        }
        const nextUsers = state.users.filter((user)=>user.id !== userId);
        const nextTeams = state.teams.map((team)=>({
                ...team,
                team_lead_id: team.team_lead_id === userId ? null : team.team_lead_id,
                members: team.members.filter((member)=>member.user_id !== userId)
            }));
        return {
            ...state,
            users: nextUsers,
            teams: nextTeams,
            authUserId: state.authUserId === userId ? nextUsers[0]?.id || null : state.authUserId,
            notice: "User deleted."
        };
    }
    toggleUserStatus(state, userId) {
        const target = state.users.find((user)=>user.id === userId);
        if (!target) {
            return state;
        }
        const nextStatus = target.status === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].INACTIVE : __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE;
        if (target.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN && nextStatus !== __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE && UserManagementStore.countActiveSuperAdmins(state.users) <= 1) {
            return {
                ...state,
                notice: "Last Super Admin cannot be deactivated."
            };
        }
        const nextUsers = state.users.map((user)=>user.id === userId ? {
                ...user,
                status: nextStatus
            } : user);
        return {
            ...state,
            users: nextUsers,
            authUserId: state.authUserId === userId && nextStatus !== __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE ? nextUsers.find((user)=>user.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN && user.status === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE)?.id || nextUsers[0]?.id || null : state.authUserId,
            notice: `User set to ${nextStatus.toLowerCase()}.`
        };
    }
    saveTeam(state, form) {
        const teamId = form.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeId"])("team");
        const nextUsers = UserManagementStore.updateUsersForTeam(state.users, form, teamId);
        const nextTeams = UserManagementStore.saveTeamMembers(state.teams, form, teamId);
        return {
            ...state,
            users: nextUsers,
            teams: nextTeams,
            modal: null,
            notice: form.id ? "Team updated." : "Team created."
        };
    }
    deleteTeam(state, teamId) {
        const nextTeams = state.teams.filter((team)=>team.id !== teamId);
        const nextUsers = state.users.map((user)=>user.team_id === teamId ? {
                ...user,
                team_id: null
            } : user);
        return {
            ...state,
            teams: nextTeams,
            users: nextUsers,
            notice: "Team deleted."
        };
    }
    persist(state) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeJSON"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].users, state.users);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeJSON"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].teams, state.teams);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeJSON"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].authUserId, state.authUserId);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeJSON"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].page, state.page);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$localStorageHelper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeJSON"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].seedSignature, state.seedSignature);
    }
}
}),
"[project]/frontend/src/userManagement/index.js [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createUserManagementFactory",
    ()=>createUserManagementFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/store.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$normalizers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/normalizers.js [app-ssr] (ecmascript)");
;
;
;
;
const createUserManagementFactory = ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$store$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserManagementStore"]();
}),
"[project]/frontend/src/userManagement/context/AppContext.jsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppContext",
    ()=>AppContext,
    "AppProvider",
    ()=>AppProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/constants.js [app-ssr] (ecmascript)");
;
;
;
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
;
class AppProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        this.store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createUserManagementFactory"])();
        this.state = this.store.createInitialState();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.setPage = this.setPage.bind(this);
        this.openUserModal = this.openUserModal.bind(this);
        this.closeUserModal = this.closeUserModal.bind(this);
        this.openTeamModal = this.openTeamModal.bind(this);
        this.closeTeamModal = this.closeTeamModal.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.toggleUserStatus = this.toggleUserStatus.bind(this);
        this.saveTeam = this.saveTeam.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);
    }
    componentDidMount() {
        this.setState((prevState)=>this.store.syncSeedIfNeeded(prevState));
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.store.persist(this.state);
        }
    }
    login(email, password) {
        const result = this.store.login(this.state, email, password);
        if (result.ok) {
            this.setState(result.state);
        }
        return result;
    }
    logout() {
        this.setState((prevState)=>this.store.logout(prevState));
    }
    setPage(page) {
        this.setState((prevState)=>this.store.setPage(prevState, page));
    }
    openUserModal(mode, data = null) {
        this.setState((prevState)=>this.store.openUserModal(prevState, mode, data));
    }
    closeUserModal() {
        this.setState((prevState)=>this.store.closeUserModal(prevState));
    }
    openTeamModal(mode, data = null) {
        this.setState((prevState)=>this.store.openTeamModal(prevState, mode, data));
    }
    closeTeamModal() {
        this.setState((prevState)=>this.store.closeTeamModal(prevState));
    }
    saveUser(form) {
        this.setState((prevState)=>this.store.saveUser(prevState, form));
    }
    deleteUser(userId) {
        this.setState((prevState)=>this.store.deleteUser(prevState, userId));
    }
    toggleUserStatus(userId) {
        this.setState((prevState)=>this.store.toggleUserStatus(prevState, userId));
    }
    saveTeam(form) {
        this.setState((prevState)=>this.store.saveTeam(prevState, form));
    }
    deleteTeam(teamId) {
        this.setState((prevState)=>this.store.deleteTeam(prevState, teamId));
    }
    render() {
        const currentUser = this.store.getCurrentUser(this.state);
        const permissions = this.store.getPermissions(currentUser);
        const value = {
            users: this.state.users,
            teams: this.state.teams,
            currentUser,
            page: this.state.page,
            modal: this.state.modal,
            notice: this.state.notice,
            permissions,
            login: this.login,
            logout: this.logout,
            setPage: this.setPage,
            openUserModal: this.openUserModal,
            closeUserModal: this.closeUserModal,
            openTeamModal: this.openTeamModal,
            closeTeamModal: this.closeTeamModal,
            saveUser: this.saveUser,
            deleteUser: this.deleteUser,
            toggleUserStatus: this.toggleUserStatus,
            saveTeam: this.saveTeam,
            deleteTeam: this.deleteTeam
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
            value: value,
            children: this.props.children
        }, void 0, false, {
            fileName: "[project]/frontend/src/userManagement/context/AppContext.jsx",
            lineNumber: 114,
            columnNumber: 12
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/forms/FormButton.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FormButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
class FormButton extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    render() {
        const { type = "button", variant = "action", disabled = false, loading = false, onClick, children } = this.props;
        const variantClass = variant === "primary" ? "primary-button" : variant === "ghost" ? "ghost-button" : variant === "danger" ? "danger-button" : "action-button";
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: type,
            className: variantClass,
            disabled: disabled || loading,
            onClick: onClick,
            children: loading ? "Loading..." : children
        }, void 0, false, {
            fileName: "[project]/frontend/src/userManagement/components/forms/FormButton.jsx",
            lineNumber: 16,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/layout/Sidebar.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/context/AppContext.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormButton.jsx [app-ssr] (ecmascript)");
;
;
;
;
class Sidebar extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    static contextType = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AppContext"];
    render() {
        // Pull the signed-in user and page state from the app context.
        const { currentUser, page, setPage, logout } = this.context;
        const isEmployee = currentUser?.role === "EMPLOYEE";
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "sidebar",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "eyebrow",
                            children: "User system"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            children: currentUser?.role || "Menu"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "sidebar-note",
                            children: currentUser ? currentUser.full_name : ""
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "nav-list",
                    children: isEmployee ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: page === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].PROFILE ? "nav-button active" : "nav-button",
                        onClick: ()=>setPage(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].PROFILE),
                        children: "Profile"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                        lineNumber: 26,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: page === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].USERS ? "nav-button active" : "nav-button",
                                onClick: ()=>setPage(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].USERS),
                                children: "Users"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                                lineNumber: 35,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: page === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].TEAMS ? "nav-button active" : "nav-button",
                                onClick: ()=>setPage(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].TEAMS),
                                children: "Teams"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sidebar-card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "sidebar-note",
                            children: [
                                "Signed in as ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: currentUser?.full_name
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                                    lineNumber: 56,
                                    columnNumber: 26
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            type: "button",
                            variant: "ghost",
                            onClick: logout,
                            children: "Logout"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/components/layout/Sidebar.jsx",
            lineNumber: 15,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/forms/FormInput.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FormInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
class FormInput extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    render() {
        const { label, type = "text", value, onChange, placeholder = "", required = false, disabled = false, rows, autoComplete } = this.props;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "form-field",
            children: [
                label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: label
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/FormInput.jsx",
                    lineNumber: 9,
                    columnNumber: 18
                }, this) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: type,
                    value: value,
                    onChange: (event)=>onChange(event.target.value),
                    placeholder: placeholder,
                    required: required,
                    disabled: disabled,
                    autoComplete: autoComplete
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/FormInput.jsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/components/forms/FormInput.jsx",
            lineNumber: 8,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/pages/LoginPage.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/context/AppContext.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormInput.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormButton.jsx [app-ssr] (ecmascript)");
;
;
;
;
;
class LoginPage extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    static contextType = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AppContext"];
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
        this.submit = this.submit.bind(this);
    }
    submit(event) {
        event.preventDefault();
        const result = this.context.login(this.state.email, this.state.password);
        if (!result.ok) {
            this.setState({
                error: result.message
            });
            return;
        }
        this.setState({
            error: ""
        });
    }
    render() {
        // Login, notice, and the loaded users come from the shared app state.
        const { notice, users } = this.context;
        const demoLogins = users.filter((user)=>user.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].SUPER_ADMIN || user.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].ADMIN || user.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].EMPLOYEE);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "auth-page",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "auth-shell",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    className: "auth-form",
                    onSubmit: this.submit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "auth-form-head",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "eyebrow",
                                    children: "Secure access"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "Sign in"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "auth-text",
                                    children: "Use your role email and password to continue."
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "Email",
                            type: "email",
                            value: this.state.email,
                            onChange: (value)=>this.setState({
                                    email: value
                                }),
                            placeholder: "you@example.com",
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
                            lineNumber: 54,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "Password",
                            type: "password",
                            value: this.state.password,
                            onChange: (value)=>this.setState({
                                    password: value
                                }),
                            placeholder: "Password",
                            required: true
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
                            lineNumber: 63,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            type: "submit",
                            variant: "primary",
                            children: "Login"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this),
                        this.state.error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "error-note",
                            children: this.state.error
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
                            lineNumber: 76,
                            columnNumber: 33
                        }, this) : null,
                        notice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "login-note",
                            children: notice
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
                            lineNumber: 77,
                            columnNumber: 23
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/userManagement/pages/LoginPage.jsx",
            lineNumber: 44,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/layout/PageHeader.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
class PageHeader extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    render() {
        // This keeps every page title in the same layout.
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "page-head",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "eyebrow",
                            children: this.props.eyebrow || "User system"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/layout/PageHeader.jsx",
                            lineNumber: 10,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: this.props.title
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/layout/PageHeader.jsx",
                            lineNumber: 11,
                            columnNumber: 11
                        }, this),
                        this.props.note ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "page-note",
                            children: this.props.note
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/layout/PageHeader.jsx",
                            lineNumber: 12,
                            columnNumber: 30
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/userManagement/components/layout/PageHeader.jsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                this.props.action
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/components/layout/PageHeader.jsx",
            lineNumber: 8,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/tables/StatusBadge.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
class StatusBadge extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    render() {
        const status = String(this.props.status || "").toUpperCase();
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `status-badge status-${status.toLowerCase()}`,
            children: status
        }, void 0, false, {
            fileName: "[project]/frontend/src/userManagement/components/tables/StatusBadge.jsx",
            lineNumber: 6,
            columnNumber: 12
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/forms/ButtonRow.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ButtonRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
class ButtonRow extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    render() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "button-row",
            children: this.props.children
        }, void 0, false, {
            fileName: "[project]/frontend/src/userManagement/components/forms/ButtonRow.jsx",
            lineNumber: 5,
            columnNumber: 12
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/utils/uiHelpers.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "filterUsers",
    ()=>filterUsers,
    "formatRoleLabel",
    ()=>formatRoleLabel,
    "getLabelById",
    ()=>getLabelById,
    "optionsFromStrings",
    ()=>optionsFromStrings,
    "toggleArrayItem",
    ()=>toggleArrayItem
]);
function formatRoleLabel(role = "") {
    return String(role).replace(/_+/g, " ");
}
function getLabelById(items = [], id, labelKey = "name", fallback = "-") {
    const item = items.find((entry)=>entry?.id === id);
    return item ? item[labelKey] : fallback;
}
function filterUsers(users = [], query = "", roleFilter = "ALL", statusFilter = "ALL") {
    const normalizedQuery = String(query).trim().toLowerCase();
    return users.filter((user)=>{
        const matchesSearch = !normalizedQuery || user.full_name.toLowerCase().includes(normalizedQuery) || user.email.toLowerCase().includes(normalizedQuery);
        const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
        const matchesStatus = statusFilter === "ALL" || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });
}
function optionsFromStrings(values = []) {
    return values.map((value)=>({
            value,
            label: String(value)
        }));
}
function toggleArrayItem(list = [], item) {
    return list.includes(item) ? list.filter((value)=>value !== item) : [
        ...list,
        item
    ];
}
}),
"[project]/frontend/src/userManagement/components/tables/UserTable.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$tables$2f$StatusBadge$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/tables/StatusBadge.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$ButtonRow$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/ButtonRow.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormButton.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$uiHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/utils/uiHelpers.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
class UserTable extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    getTeamName(teamId) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$uiHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLabelById"])(this.props.teams, teamId);
    }
    roleLabel(role) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$uiHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatRoleLabel"])(role);
    }
    render() {
        const { users, onEdit, onToggleStatus, onDelete, canEdit, canDeactivate } = this.props;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "table-wrap",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "data-table",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Name"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                    lineNumber: 25,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Email"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                    lineNumber: 26,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Role"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                    lineNumber: 27,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Status"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                    lineNumber: 28,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Team"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                    lineNumber: 29,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Seniority"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                    lineNumber: 30,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Permissions"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                    lineNumber: 31,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Actions"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                    lineNumber: 32,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                            lineNumber: 24,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: user.full_name
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                        lineNumber: 39,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: user.email
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                        lineNumber: 40,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: this.roleLabel(user.role)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                        lineNumber: 41,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$tables$2f$StatusBadge$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            status: user.status
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                            lineNumber: 43,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                        lineNumber: 42,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: this.getTeamName(user.team_id)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: user.seniority_role
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                        lineNumber: 46,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: user.permissions.length ? user.permissions.join(", ") : "-"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                        lineNumber: 47,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$ButtonRow$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    type: "button",
                                                    variant: "action",
                                                    onClick: ()=>onToggleStatus(user.id),
                                                    disabled: !canDeactivate,
                                                    children: user.status === "ACTIVE" ? "Deactivate" : "Activate"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                                    lineNumber: 52,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    type: "button",
                                                    variant: "action",
                                                    onClick: ()=>onEdit(user),
                                                    disabled: !canEdit,
                                                    children: "Edit"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                                    lineNumber: 60,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    type: "button",
                                                    variant: "danger",
                                                    onClick: ()=>onDelete(user.id),
                                                    disabled: !canEdit,
                                                    children: "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                                    lineNumber: 63,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                            lineNumber: 50,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                        lineNumber: 48,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, user.id, true, {
                                fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
                lineNumber: 22,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/userManagement/components/tables/UserTable.jsx",
            lineNumber: 21,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/forms/PermissionSelector.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PermissionSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/context/AppContext.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$uiHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/utils/uiHelpers.js [app-ssr] (ecmascript)");
;
;
;
;
class PermissionSelector extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    togglePermission(permission) {
        if (this.props.disabled) {
            return;
        }
        const nextValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$uiHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toggleArrayItem"])(this.props.value, permission);
        this.props.onChange(nextValue);
    }
    render() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "permission-box",
            children: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PERMISSION_OPTIONS"].map((permission)=>// Each row is a checkbox and a label for one permission.
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    className: "permission-item",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            checked: this.props.value.includes(permission),
                            onChange: ()=>this.togglePermission(permission),
                            disabled: this.props.disabled
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/PermissionSelector.jsx",
                            lineNumber: 22,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: permission
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/PermissionSelector.jsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, permission, true, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/PermissionSelector.jsx",
                    lineNumber: 21,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/frontend/src/userManagement/components/forms/PermissionSelector.jsx",
            lineNumber: 18,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/forms/FormField.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FormField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
class FormField extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    render() {
        // Keep label and input grouped together in one place.
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "form-field",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: this.props.label
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/FormField.jsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                this.props.children
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/components/forms/FormField.jsx",
            lineNumber: 8,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/forms/FormSelect.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FormSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
class FormSelect extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    render() {
        const { label, value, onChange, options = [], disabled = false, required = false } = this.props;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "form-field",
            children: [
                label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: label
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/FormSelect.jsx",
                    lineNumber: 9,
                    columnNumber: 18
                }, this) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: value,
                    onChange: (event)=>onChange(event.target.value),
                    disabled: disabled,
                    required: required,
                    children: options.map((option)=>{
                        if (typeof option === "string") {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: option,
                                children: option
                            }, option, false, {
                                fileName: "[project]/frontend/src/userManagement/components/forms/FormSelect.jsx",
                                lineNumber: 14,
                                columnNumber: 17
                            }, this);
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: option.value,
                            children: option.label
                        }, option.value, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/FormSelect.jsx",
                            lineNumber: 21,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/FormSelect.jsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/components/forms/FormSelect.jsx",
            lineNumber: 8,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/layout/Modal.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormButton.jsx [app-ssr] (ecmascript)");
;
;
;
class Modal extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    render() {
        if (!this.props.open) {
            return null;
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "modal-backdrop",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "modal-head",
                        children: [
                            this.props.header ? this.props.header : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    this.props.subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "eyebrow",
                                        children: this.props.subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/layout/Modal.jsx",
                                        lineNumber: 18,
                                        columnNumber: 40
                                    }, this) : null,
                                    this.props.title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: this.props.title
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/layout/Modal.jsx",
                                        lineNumber: 19,
                                        columnNumber: 37
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/userManagement/components/layout/Modal.jsx",
                                lineNumber: 17,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                type: "button",
                                variant: "ghost",
                                onClick: this.props.onClose,
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/userManagement/components/layout/Modal.jsx",
                                lineNumber: 22,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/userManagement/components/layout/Modal.jsx",
                        lineNumber: 13,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "modal-form",
                        onSubmit: this.props.onSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "modal-body",
                                children: this.props.children
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/userManagement/components/layout/Modal.jsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            this.props.footer || null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/userManagement/components/layout/Modal.jsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/userManagement/components/layout/Modal.jsx",
                lineNumber: 12,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/userManagement/components/layout/Modal.jsx",
            lineNumber: 11,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/layout/ModalForm.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ModalForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
class ModalForm extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    componentDidUpdate(prevProps) {
        if (this.shouldResetForm(prevProps)) {
            this.setState({
                form: this.buildForm(this.props)
            });
        }
    }
    shouldResetForm(prevProps) {
        return false;
    }
    updateField(field, value) {
        this.setState({
            form: {
                ...this.state.form,
                [field]: value
            }
        });
    }
    submitForm(event, callback) {
        event.preventDefault();
        callback(this.state.form);
    }
    render() {
        return null;
    }
}
}),
"[project]/frontend/src/userManagement/components/forms/UserForm.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$PermissionSelector$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/PermissionSelector.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormField.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormInput.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormSelect$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormSelect.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormButton.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$Modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/layout/Modal.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$ButtonRow$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/ButtonRow.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$ModalForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/layout/ModalForm.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$uiHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/utils/uiHelpers.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/context/AppContext.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/constants.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
class UserForm extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$ModalForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] {
    constructor(props){
        super(props);
        this.state = {
            form: this.buildForm(props)
        };
        this.submit = this.submit.bind(this);
    }
    shouldResetForm(prevProps) {
        return !prevProps.open && this.props.open || prevProps.mode !== this.props.mode || prevProps.user?.id !== this.props.user?.id || prevProps.canCreateAdmin !== this.props.canCreateAdmin || prevProps.teams !== this.props.teams;
    }
    buildForm(props) {
        const isEdit = props.mode === "edit";
        if (isEdit && props.user) {
            return {
                id: props.user.id,
                full_name: props.user.full_name,
                email: props.user.email,
                password: "",
                role: props.user.role,
                status: props.user.status,
                permissions: props.user.permissions.filter((permission)=>permission !== "ALL ACCESS"),
                team_id: props.user.team_id || "",
                seniority_role: props.user.seniority_role
            };
        }
        return {
            id: "",
            full_name: "",
            email: "",
            password: "",
            role: props.canCreateAdmin ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].ADMIN : __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].EMPLOYEE,
            status: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE,
            permissions: [],
            team_id: props.teams[0]?.id || "",
            seniority_role: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"].JUNIOR
        };
    }
    submit(event) {
        this.submitForm(event, this.props.onSubmit);
    }
    render() {
        const isEdit = this.props.mode === "edit";
        if (!this.props.open) {
            return null;
        }
        const allowedRoles = this.props.canCreateAdmin ? [
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].ADMIN,
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].EMPLOYEE
        ] : [
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].EMPLOYEE
        ];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$Modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            open: this.props.open,
            onClose: this.props.onClose,
            onSubmit: this.submit,
            title: isEdit ? "Edit User" : "Create User",
            subtitle: isEdit ? "Edit" : "Create",
            footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-actions",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "modal-note",
                        children: isEdit ? "Update the saved user." : "Fill the fields and save the user."
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                        lineNumber: 87,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$ButtonRow$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                type: "button",
                                variant: "ghost",
                                onClick: this.props.onClose,
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                                lineNumber: 89,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                type: "submit",
                                variant: "primary",
                                children: isEdit ? "Save changes" : "Create user"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                                lineNumber: 92,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                        lineNumber: 88,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                lineNumber: 86,
                columnNumber: 11
            }, this),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    label: "Name",
                    value: this.state.form.full_name,
                    onChange: (value)=>this.updateField("full_name", value),
                    required: true
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                    lineNumber: 99,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    label: "Email",
                    type: "email",
                    value: this.state.form.email,
                    onChange: (value)=>this.updateField("email", value),
                    required: true
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                    lineNumber: 106,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormSelect$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    label: "Role",
                    value: this.state.form.role,
                    onChange: (value)=>this.updateField("role", value),
                    options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$uiHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["optionsFromStrings"])(allowedRoles),
                    disabled: isEdit
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                    lineNumber: 114,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "two-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormSelect$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "Team",
                            value: this.state.form.team_id,
                            onChange: (value)=>this.updateField("team_id", value),
                            options: [
                                {
                                    value: "",
                                    label: "No team"
                                },
                                ...this.props.teams.map((team)=>({
                                        value: team.id,
                                        label: team.name
                                    }))
                            ]
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormSelect$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "Seniority",
                            value: this.state.form.seniority_role,
                            onChange: (value)=>this.updateField("seniority_role", value),
                            options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$uiHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["optionsFromStrings"])(Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"]))
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                    lineNumber: 122,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    label: "Password",
                    type: "password",
                    value: this.state.form.password,
                    onChange: (value)=>this.updateField("password", value),
                    placeholder: isEdit ? "Leave empty to keep" : "Password",
                    required: !isEdit
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                    lineNumber: 138,
                    columnNumber: 11
                }, this),
                this.state.form.role === __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"].ADMIN ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormField$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    label: "Permissions",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$PermissionSelector$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        value: this.state.form.permissions,
                        onChange: (permissions)=>this.updateField("permissions", permissions),
                        disabled: !this.props.canCreateAdmin && !isEdit
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                        lineNumber: 149,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                    lineNumber: 148,
                    columnNumber: 11
                }, this) : null,
                isEdit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormSelect$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    label: "Status",
                    value: this.state.form.status,
                    onChange: (value)=>this.updateField("status", value),
                    options: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$uiHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["optionsFromStrings"])(Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"]))
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
                    lineNumber: 158,
                    columnNumber: 11
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/components/forms/UserForm.jsx",
            lineNumber: 79,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/pages/UsersPage.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UsersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/context/AppContext.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$PageHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/layout/PageHeader.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$tables$2f$UserTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/tables/UserTable.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$UserForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/UserForm.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormInput.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormSelect$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormSelect.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormButton.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$uiHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/utils/uiHelpers.js [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
class UsersPage extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    static contextType = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AppContext"];
    constructor(props){
        super(props);
        this.state = {
            search: "",
            roleFilter: "ALL",
            statusFilter: "ALL"
        };
    }
    render() {
        // Read the users, teams, and user actions from the app context.
        const { users, teams, currentUser, modal, permissions, openUserModal, closeUserModal, saveUser, deleteUser, toggleUserStatus } = this.context;
        const filteredUsers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$utils$2f$uiHelpers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["filterUsers"])(users, this.state.search, this.state.roleFilter, this.state.statusFilter);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "page-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$PageHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    title: "Users",
                    note: "Search and manage accounts.",
                    action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "header-actions",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            type: "button",
                            variant: "primary",
                            onClick: ()=>openUserModal("create"),
                            disabled: !permissions.canCreateEmployee && !permissions.canCreateAdmin,
                            children: "Create User"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/UsersPage.jsx",
                            lineNumber: 48,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/userManagement/pages/UsersPage.jsx",
                        lineNumber: 47,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/pages/UsersPage.jsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "filter-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "",
                            value: this.state.search,
                            onChange: (value)=>this.setState({
                                    search: value
                                }),
                            placeholder: "Search by name or email"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/UsersPage.jsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormSelect$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "",
                            value: this.state.roleFilter,
                            onChange: (value)=>this.setState({
                                    roleFilter: value
                                }),
                            options: [
                                {
                                    value: "ALL",
                                    label: "All roles"
                                },
                                ...Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROLE_OPTIONS"]).map((role)=>({
                                        value: role,
                                        label: role
                                    }))
                            ]
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/UsersPage.jsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormSelect$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "",
                            value: this.state.statusFilter,
                            onChange: (value)=>this.setState({
                                    statusFilter: value
                                }),
                            options: [
                                {
                                    value: "ALL",
                                    label: "All status"
                                },
                                {
                                    value: "ACTIVE",
                                    label: "ACTIVE"
                                },
                                {
                                    value: "INACTIVE",
                                    label: "INACTIVE"
                                },
                                {
                                    value: "TERMINATED",
                                    label: "TERMINATED"
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/UsersPage.jsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/userManagement/pages/UsersPage.jsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hint-box",
                    children: currentUser ? `${currentUser.full_name} · ${currentUser.role}` : "No user"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/pages/UsersPage.jsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$tables$2f$UserTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    users: filteredUsers,
                    teams: teams,
                    onEdit: (user)=>openUserModal("edit", user),
                    onToggleStatus: toggleUserStatus,
                    onDelete: deleteUser,
                    canEdit: permissions.canEditUsers,
                    canDeactivate: permissions.canDeactivateUsers
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/pages/UsersPage.jsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$UserForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    open: modal?.type === "user",
                    mode: modal?.mode,
                    user: modal?.data,
                    teams: teams,
                    canCreateAdmin: permissions.canCreateAdmin,
                    onClose: closeUserModal,
                    onSubmit: saveUser
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/pages/UsersPage.jsx",
                    lineNumber: 104,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/pages/UsersPage.jsx",
            lineNumber: 42,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/tables/TeamTable.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeamTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$ButtonRow$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/ButtonRow.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormButton.jsx [app-ssr] (ecmascript)");
;
;
;
;
class TeamTable extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    getUserName(userId) {
        const user = this.props.users.find((item)=>item.id === userId);
        return user ? user.full_name : "-";
    }
    render() {
        const { teams, onEdit, onDelete, canManageTeams } = this.props;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "table-wrap",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "data-table",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Team name"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                    lineNumber: 20,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Team lead"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                    lineNumber: 21,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Members"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                    lineNumber: 22,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    children: "Actions"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                    lineNumber: 23,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                            lineNumber: 19,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: teams.map((team)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: team.name
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                        lineNumber: 30,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: this.getUserName(team.team_lead_id)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                        lineNumber: 31,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: team.members.length
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                        lineNumber: 32,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$ButtonRow$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    type: "button",
                                                    variant: "action",
                                                    onClick: ()=>onEdit(team),
                                                    disabled: !canManageTeams,
                                                    children: "Edit"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                                    lineNumber: 37,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    type: "button",
                                                    variant: "danger",
                                                    onClick: ()=>onDelete(team.id),
                                                    disabled: !canManageTeams,
                                                    children: "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                                    lineNumber: 40,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                            lineNumber: 35,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                        lineNumber: 33,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, team.id, true, {
                                fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                                lineNumber: 28,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
                lineNumber: 17,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/userManagement/components/tables/TeamTable.jsx",
            lineNumber: 16,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/forms/MemberAdder.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MemberAdder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/context/AppContext.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/constants.js [app-ssr] (ecmascript)");
;
;
;
class MemberAdder extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    constructor(props){
        super(props);
        this.state = {
            userId: props.users[0]?.id || "",
            seniorityRole: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"].JUNIOR
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                userId: this.props.users[0]?.id || ""
            });
        }
    }
    render() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "member-adder",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: this.state.userId,
                    onChange: (event)=>this.setState({
                            userId: event.target.value
                        }),
                    children: this.props.users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: user.id,
                            children: user.full_name
                        }, user.id, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/MemberAdder.jsx",
                            lineNumber: 24,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/MemberAdder.jsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: this.state.seniorityRole,
                    onChange: (event)=>this.setState({
                            seniorityRole: event.target.value
                        }),
                    children: Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SENIORITY_OPTIONS"]).map((level)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: level,
                            children: level
                        }, level, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/MemberAdder.jsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/MemberAdder.jsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "ghost-button",
                    onClick: ()=>this.props.onAdd(this.state.userId, this.state.seniorityRole),
                    children: "Add member"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/MemberAdder.jsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/components/forms/MemberAdder.jsx",
            lineNumber: 21,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/forms/TeamForm.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeamForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormInput.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormSelect$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormSelect.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormButton.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$Modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/layout/Modal.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$ModalForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/layout/ModalForm.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$ButtonRow$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/ButtonRow.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$MemberAdder$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/MemberAdder.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/context/AppContext.jsx [app-ssr] (ecmascript) <locals>");
;
;
;
;
;
;
;
;
;
;
class TeamForm extends __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$ModalForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] {
    static contextType = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AppContext"];
    constructor(props){
        super(props);
        this.state = {
            form: this.buildForm(props)
        };
        this.submit = this.submit.bind(this);
    }
    shouldResetForm(prevProps) {
        return !prevProps.open && this.props.open || prevProps.mode !== this.props.mode || prevProps.team?.id !== this.props.team?.id || prevProps.users !== this.props.users;
    }
    buildForm(props) {
        const isEdit = props.mode === "edit";
        const availableUsers = props.users.filter((user)=>user.status === "ACTIVE");
        if (isEdit && props.team) {
            return {
                id: props.team.id,
                name: props.team.name,
                team_lead_id: props.team.team_lead_id || "",
                members: props.team.members.filter((member)=>member.user_id !== props.team.team_lead_id)
            };
        }
        return {
            id: "",
            name: "",
            team_lead_id: availableUsers[0]?.id || "",
            members: []
        };
    }
    addMember(userId, seniorityRole) {
        if (!userId) {
            return;
        }
        this.setState({
            form: {
                ...this.state.form,
                members: [
                    ...this.state.form.members.filter((member)=>member.user_id !== userId),
                    {
                        user_id: userId,
                        seniority_role: seniorityRole
                    }
                ]
            }
        });
    }
    removeMember(userId) {
        this.setState({
            form: {
                ...this.state.form,
                members: this.state.form.members.filter((member)=>member.user_id !== userId)
            }
        });
    }
    submit(event) {
        this.submitForm(event, this.props.onSubmit);
    }
    render() {
        const isEdit = this.props.mode === "edit";
        const availableUsers = this.props.users.filter((user)=>user.status === "ACTIVE");
        if (!this.props.open) {
            return null;
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$Modal$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            open: this.props.open,
            onClose: this.props.onClose,
            onSubmit: this.submit,
            title: isEdit ? "Edit Team" : "Create Team",
            footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-actions",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$ButtonRow$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            type: "button",
                            variant: "ghost",
                            onClick: this.props.onClose,
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                            lineNumber: 101,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            type: "submit",
                            variant: "primary",
                            children: isEdit ? "Save changes" : "Create team"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                            lineNumber: 104,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                    lineNumber: 100,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                lineNumber: 99,
                columnNumber: 11
            }, this),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormInput$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    label: "Team name",
                    value: this.state.form.name,
                    onChange: (value)=>this.setState({
                            form: {
                                ...this.state.form,
                                name: value
                            }
                        }),
                    required: true
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormSelect$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    label: "Team lead",
                    value: this.state.form.team_lead_id,
                    onChange: (value)=>this.setState({
                            form: {
                                ...this.state.form,
                                team_lead_id: value
                            }
                        }),
                    options: availableUsers.map((user)=>({
                            value: user.id,
                            label: user.full_name
                        }))
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "member-editor",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Members"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$MemberAdder$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            users: availableUsers,
                            onAdd: (userId, seniorityRole)=>this.addMember(userId, seniorityRole)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                            lineNumber: 128,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "member-list",
                            children: this.state.form.members.map((member)=>{
                                const user = availableUsers.find((item)=>item.id === member.user_id);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "member-chip",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: user ? user.full_name : member.user_id
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                                            lineNumber: 134,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: member.seniority_role
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                                            lineNumber: 135,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            type: "button",
                                            variant: "ghost",
                                            onClick: ()=>this.removeMember(member.user_id),
                                            children: "Remove"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                                            lineNumber: 136,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, member.user_id, true, {
                                    fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                                    lineNumber: 133,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
                    lineNumber: 125,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/components/forms/TeamForm.jsx",
            lineNumber: 92,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/pages/TeamsPage.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeamsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/context/AppContext.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$PageHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/layout/PageHeader.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$tables$2f$TeamTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/tables/TeamTable.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$TeamForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/TeamForm.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/forms/FormButton.jsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
class TeamsPage extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    static contextType = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AppContext"];
    render() {
        const { teams, users, modal, permissions, openTeamModal, closeTeamModal, saveTeam, deleteTeam } = this.context;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "page-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$PageHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    title: "Teams",
                    note: "Create teams and assign members.",
                    action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "header-actions",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$FormButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            type: "button",
                            variant: "primary",
                            onClick: ()=>openTeamModal("create"),
                            disabled: !permissions.canManageTeams,
                            children: "Create Team"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/TeamsPage.jsx",
                            lineNumber: 31,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/userManagement/pages/TeamsPage.jsx",
                        lineNumber: 30,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/pages/TeamsPage.jsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hint-box",
                    children: "Teams are available for permitted roles."
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/pages/TeamsPage.jsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$tables$2f$TeamTable$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    teams: teams,
                    users: users,
                    onEdit: (team)=>openTeamModal("edit", team),
                    onDelete: deleteTeam,
                    canManageTeams: permissions.canManageTeams
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/pages/TeamsPage.jsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$forms$2f$TeamForm$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    open: modal?.type === "team",
                    mode: modal?.mode,
                    team: modal?.data,
                    users: users,
                    onClose: closeTeamModal,
                    onSubmit: saveTeam
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/pages/TeamsPage.jsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/pages/TeamsPage.jsx",
            lineNumber: 25,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/components/layout/InfoCard.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InfoCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
class InfoCard extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    render() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: this.props.className || "profile-card",
            children: [
                this.props.label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: this.props.label
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/layout/InfoCard.jsx",
                    lineNumber: 7,
                    columnNumber: 29
                }, this) : null,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    children: this.props.value
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/components/layout/InfoCard.jsx",
                    lineNumber: 8,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/components/layout/InfoCard.jsx",
            lineNumber: 6,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/pages/ProfilePage.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/context/AppContext.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$PageHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/layout/PageHeader.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$InfoCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/layout/InfoCard.jsx [app-ssr] (ecmascript)");
;
;
;
;
;
class ProfilePage extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    static contextType = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AppContext"];
    render() {
        const { currentUser, teams } = this.context;
        const team = teams.find((item)=>item.id === currentUser?.team_id);
        const teamName = team ? team.name : "-";
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "page-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$PageHeader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    eyebrow: "Profile",
                    title: currentUser?.full_name
                }, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/pages/ProfilePage.jsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "profile-grid",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$InfoCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "Role",
                            value: currentUser?.role
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/ProfilePage.jsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$InfoCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "Email",
                            value: currentUser?.email
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/ProfilePage.jsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$InfoCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "Team",
                            value: teamName
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/ProfilePage.jsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$InfoCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "Status",
                            value: currentUser?.status
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/pages/ProfilePage.jsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/userManagement/pages/ProfilePage.jsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/pages/ProfilePage.jsx",
            lineNumber: 16,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/userManagement/App.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/context/AppContext.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$Sidebar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/components/layout/Sidebar.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$pages$2f$LoginPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/pages/LoginPage.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$pages$2f$UsersPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/pages/UsersPage.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$pages$2f$TeamsPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/pages/TeamsPage.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$pages$2f$ProfilePage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/pages/ProfilePage.jsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const DASHBOARD_PAGES = {
    [__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].USERS]: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$pages$2f$UsersPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    [__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAGE_OPTIONS"].TEAMS]: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$pages$2f$TeamsPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
};
class AppShell extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    static contextType = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AppContext"];
    render() {
        const app = this.context;
        const currentUser = app?.currentUser;
        const isEmployee = currentUser?.role === "EMPLOYEE";
        if (!currentUser || currentUser.status !== __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STATUS_OPTIONS"].ACTIVE) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$pages$2f$LoginPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/frontend/src/userManagement/App.jsx",
                lineNumber: 23,
                columnNumber: 14
            }, this);
        }
        const DashboardPage = isEmployee ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$pages$2f$ProfilePage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"] : DASHBOARD_PAGES[app.page] || __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$pages$2f$UsersPage$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "app-shell",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$components$2f$layout$2f$Sidebar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/frontend/src/userManagement/App.jsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "main-content",
                    children: [
                        app.notice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "notice-bar",
                            children: app.notice
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/App.jsx",
                            lineNumber: 32,
                            columnNumber: 25
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DashboardPage, {}, void 0, false, {
                            fileName: "[project]/frontend/src/userManagement/App.jsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/userManagement/App.jsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/userManagement/App.jsx",
            lineNumber: 29,
            columnNumber: 7
        }, this);
    }
}
class App extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Component"] {
    render() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$context$2f$AppContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AppProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppShell, {}, void 0, false, {
                fileName: "[project]/frontend/src/userManagement/App.jsx",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/frontend/src/userManagement/App.jsx",
            lineNumber: 43,
            columnNumber: 7
        }, this);
    }
}
}),
"[project]/frontend/src/App.jsx [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$App$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/App.jsx [app-ssr] (ecmascript)");
;
}),
"[project]/frontend/app/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$App$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/src/App.jsx [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$App$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/userManagement/App.jsx [app-ssr] (ecmascript)");
"use client";
;
;
function HomePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$userManagement$2f$App$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/frontend/app/page.jsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=frontend_05gqomn._.js.map