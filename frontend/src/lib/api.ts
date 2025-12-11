import { BACKEND_URL } from "@/utils/constant";

export async function createWorkspace(name: string) {
  const res = await fetch(`${BACKEND_URL}/workspace/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function createTable(workspaceId: string, tableName: string, columns: any[]) {
  const res = await fetch(`${BACKEND_URL}/sql/create-table`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workspaceId, tableName, columns }),
  });
  return res.json();
}

export async function insertRow(workspaceId: string, tableName: string, row: any) {
  const res = await fetch(`${BACKEND_URL}/sql/insert-table`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workspaceId, tableName, row }),
  });
  return res.json();
}

export async function runQuery(workspaceId: string, query: string) {
  const res = await fetch(`${BACKEND_URL}/sql/run-query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ workspaceId, query }),
  });
  return res.json();
}
