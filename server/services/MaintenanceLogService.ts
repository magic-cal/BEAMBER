import { sqlToDB } from "../util/PgDatabase"
import { MaintenanceLog, MaintenanceLogFilter } from "../../utils/classes/maintenanceLog"
import Guid from "../../utils/classes/common/guid"
import { QueryResultRow } from "pg"
import { Body, Controller, Delete, Post, Put, Route, Tags } from "tsoa"

@Tags("MaintenanceLog")
@Route("maintenanceLog")
export class MaintenanceLogController extends Controller {
  dbToMaintenanceLog(maintenanceLogResultRow: QueryResultRow) {
    const maintenanceLog: MaintenanceLog = new MaintenanceLog()
    maintenanceLog.id = Guid.fromString(maintenanceLogResultRow.maintenance_log_id)
    maintenanceLog.resourceId = Guid.fromString(maintenanceLogResultRow.maintenance_log_resource_id)
    maintenanceLog.details = maintenanceLogResultRow.maintenance_log_details ?? ""
    maintenanceLog.type = maintenanceLogResultRow.maintenance_log_type ?? ""
    if (maintenanceLogResultRow.maintenance_log_timestamp)
      maintenanceLog.timestamp = maintenanceLogResultRow.maintenance_log_timestamp ?? ""
    console.log("maintenanceLogResultRow", maintenanceLogResultRow)
    console.log("RECIPEGG", maintenanceLog)

    return maintenanceLog
  }

  @Post("get")
  async getMaintenanceLog(@Body() maintenanceLogId: Guid) {
    const result = await sqlToDB("SELECT * FROM maintenance_logs WHERE maintenance_log_id = $1", [
      maintenanceLogId.value
    ])
    // @TODO: Remove duplication
    console.log(
      "result.rows.map(maintenanceLogResult => dbToMaintenanceLog(maintenanceLogResult))[0]",
      result.rows.map((maintenanceLogResult) => this.dbToMaintenanceLog(maintenanceLogResult))[0]
    )
    return result.rows.map((maintenanceLogResult) => this.dbToMaintenanceLog(maintenanceLogResult))[0]
  }

  @Post("get-by")
  async getMaintenanceLogsByFilter(@Body() filter?: MaintenanceLogFilter) {
    let query =
      "\
SELECT DISTINCT ON (maintenance_logs.maintenance_log_id) maintenance_logs.*\
FROM maintenance_logs \
LEFT JOIN resources ON (maintenance_logs.maintenance_log_resource_id = resources.resource_id)\
"
    const queryClauses: string[] = []
    if (filter?.resourceIds?.length) {
      queryClauses.push(`resources.resource_id IN (${filter.resourceIds.map((ri) => `'${ri.value}'`)})`)
    }
    query += queryClauses.length ? " WHERE " + queryClauses.join(" AND ") : ";"
    const result = await sqlToDB(query)
    return result.rows.map((maintenanceLogResult) => this.dbToMaintenanceLog(maintenanceLogResult))
  }

  @Delete("delete")
  async deleteMaintenanceLog(@Body() maintenanceLogId: Guid) {
    // await updateResourceRelation([], maintenanceLogId)
    const result = await sqlToDB("DELETE FROM maintenance_logs WHERE maintenance_log_id = $1", [maintenanceLogId.value])
    return !!result.rowCount
  }

  @Put("update")
  async updateOrCreateMaintenanceLog(@Body() maintenanceLog: MaintenanceLog) {
    console.log(
      maintenanceLog.id.value !== Guid.createEmpty().value,
      "maintenanceLog.id.value !== Guid.createEmpty().value"
    )
    if (maintenanceLog.id.value !== Guid.createEmpty().value && (await this.getMaintenanceLog(maintenanceLog.id))) {
      return await sqlToDB(
        "UPDATE maintenance_logs SET maintenance_log_id = $1, maintenance_log_resource_id = $2, maintenance_log_details = $3, maintenance_log_type = $4, maintenance_log_timestamp = $5 WHERE maintenance_log_id = $1;",
        [
          maintenanceLog.id.value,
          maintenanceLog.resourceId.value,
          maintenanceLog.details,
          maintenanceLog.type,
          maintenanceLog.timestamp
        ]
      )
    }
    return await this.addMaintenanceLog(maintenanceLog)
  }

  async addMaintenanceLog(maintenanceLog: MaintenanceLog) {
    // const fieldParams = maintenanceLogToDb(maintenanceLog)
    return await sqlToDB(
      `INSERT INTO maintenance_logs (
maintenance_log_id,
maintenance_log_resource_id,
maintenance_log_details,
maintenance_log_type,
maintenance_log_timestamp
) VALUES ($1, $2, $3, $4, $5)`,
      [
        maintenanceLog.id.value,
        maintenanceLog.resourceId.value,
        maintenanceLog.details,
        maintenanceLog.type,
        maintenanceLog.timestamp
      ]
    )
  }
}
// ;(maintenance_log_id = $1),
// (maintenance_log_resource_id = $2),
// (maintenance_log_details = $3),
// (maintenance_log_type = $4)
//

// maintenance_log_id,
// maintenance_log_resource_id,
// maintenance_log_details,
// maintenance_log_type,
