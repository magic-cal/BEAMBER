import { QueryResultRow } from "pg"
import { AmberApiFields } from "utils/classes/amberApiFields"
import { sqlToDB } from "./PgDatabase"

export function genBaseFields<T extends AmberApiFields>(resultRow: QueryResultRow, data: T) {
  // Base fields
  data.versionNo = resultRow.version_no
}

export async function validateBaseFields<T extends AmberApiFields>(data: T, query: string, queryParams: any[]) {
  const result = await sqlToDB(query, queryParams)
  // Check that the version number is the most up to date version
  if (data.versionNo !== result.rows[0]?.version_no) {
    return false
  } else {
    return true
  }
}

export function updateBaseFields<T extends AmberApiFields>(data: T) {
  // Increment the version Number
  data.versionNo++
  return data
}

export function extractBaseFields<T extends AmberApiFields>(data: T) {
  // Return all Base Fields added
  return [data.versionNo]
}
