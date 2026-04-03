import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const dataDir = path.join(process.cwd(), "src", "userManagement", "data");
const runtimePath = path.join(dataDir, "runtimeData.json");
const seedPath = path.join(dataDir, "seedData.json");

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

function isValidPayload(payload) {
  return (
    payload &&
    typeof payload === "object" &&
    Array.isArray(payload.users) &&
    Array.isArray(payload.teams)
  );
}

export async function GET() {
  try {
    const data = await loadData();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to load user management data." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();

    if (!isValidPayload(payload)) {
      return NextResponse.json({ message: "Invalid payload." }, { status: 400 });
    }

    const nextData = {
      users: payload.users,
      teams: payload.teams,
    };

    await fs.writeFile(runtimePath, `${JSON.stringify(nextData, null, 2)}\n`, "utf8");

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Failed to save user management data." }, { status: 500 });
  }
}
