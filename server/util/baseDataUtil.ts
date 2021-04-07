import { QueryResultRow } from "pg"
import { AmberApiFields } from "utils/classes/amberApiFields"
import { sqlToDB } from "./PgDatabase"

export function genBaseFields<T extends AmberApiFields>(resultRow: QueryResultRow, data: T) {
  // Base fields
  data.versionNo = resultRow.version_no
}

export async function validateBaseFields<T extends AmberApiFields>(data: T, query: string, queryParams: any[]) {
  const result = await sqlToDB(query, queryParams)
  if (data.versionNo !== result.rows[0]?.version_no) {
    // console.log("Verions", data.versionNo, result.rows[0]?.version_no)
    return false
  } else {
    return true
  }
}

export function updateBaseFields<T extends AmberApiFields>(data: T) {
  data.versionNo++
  return data
}

export function extractBaseFields<T extends AmberApiFields>(data: T) {
  return [data.versionNo]
}
