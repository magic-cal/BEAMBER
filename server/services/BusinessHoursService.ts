import { sqlToDB } from "../util/PgDatabase"
import Guid from "../../utils/classes/common/guid"
import { QueryResultRow } from "pg"
import { Body, Controller, Delete, Post, Put, Route, Tags, Response } from "tsoa"
import { extractBaseFields, genBaseFields, updateBaseFields, validateBaseFields } from "../util/baseDataUtil"
import { BusinessHour, BusinessHourFilter, EnumDay } from "../../utils/classes/businessHours"

@Tags("BusinessHour")
@Route("BusinessHour")
export class BusinessHourController extends Controller {
  dbToBusinessHour(businessHourRow: QueryResultRow) {
    const businessHour: BusinessHour = new BusinessHour()
    genBaseFields(businessHourRow, businessHour)
    businessHour.id = Guid.fromString(businessHourRow.business_hour_id)
    businessHour.tagId = businessHour.tagId ? Guid.fromString(businessHourRow.business_hour_tag_id) : undefined
    // businessHour.dayInt = businessHourRow.business_hour_day
    businessHour.day = EnumDay.getByKey(businessHourRow.business_hour_day ?? 0)
    businessHour.startTime = businessHourRow.business_hour_start_time
      ? new Date(businessHourRow.business_hour_start_time)
      : businessHourRow.business_hour_start_time
    businessHour.endTime = businessHourRow.business_hour_end_time
      ? new Date(businessHourRow.business_hour_end_time)
      : businessHourRow.business_hour_end_time
    businessHour.isOpen = businessHourRow.business_hour_is_open
    return businessHour
  }

  async addBusinessHour(businessHour: BusinessHour) {
    // const fieldParams = businessHourToDb(businessHour)
    if (businessHour.id.value === Guid.createEmpty().value) {
      businessHour.id = Guid.create()
    }
    return await sqlToDB(
      `INSERT INTO business_hours (
business_hour_id, business_hour_tag_id, business_hour_day, business_hour_start_time, business_hour_end_time, business_hour_is_open, version_no) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        businessHour.id.value,
        businessHour.tagId?.value,
        businessHour.day.key,
        businessHour.startTime?.toISOString() ?? null,
        businessHour.endTime?.toISOString() ?? null,
        businessHour.isOpen,
        ...extractBaseFields(businessHour)
      ]
    )
  }
  @Post("get")
  async getBusinessHour(@Body() businessHourId: Guid) {
    const result = await sqlToDB("SELECT * FROM business_hours WHERE business_hour_id = $1", [businessHourId.value])
    const businessHour = result.rows.map((businessHourResult) => this.dbToBusinessHour(businessHourResult))[0]
    return businessHour
  }

  @Post("get-by")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getBusinessHoursByFilter(@Body() filter?: BusinessHourFilter) {
    let query = "SELECT DISTINCT ON (business_hours.business_hour_id) business_hours.* FROM business_hours \
    "
    // LEFT JOIN resource_business_hours ON (business_hours.business_hour_id = resource_business_hours.business_hour_id)\
    const queryClauses: string[] = []
    // if (filter.resourceIds?.length) {
    //   queryClauses.push(`resource_business_hours.resource_id IN (${filter.resourceIds.map(ri => `'${ri.value}'`)})`)
    // }
    query += queryClauses.length ? " WHERE " + queryClauses.join(" AND ") : ";"
    const result = await sqlToDB(query)
    return result.rows.map((businessHourResult) => this.dbToBusinessHour(businessHourResult))
  }

  @Delete("delete")
  async deleteBusinessHour(@Body() businessHourId: Guid) {
    const result = await sqlToDB("DELETE FROM business_hours WHERE business_hour_id = $1", [businessHourId.value])
    return !!result.rowCount
  }
  @Response(412, "Update failed, data has been changed by another process")
  @Put("update")
  async updateOrCreateBusinessHour(@Body() businessHour: BusinessHour) {
    if (businessHour.id.value === Guid.createEmpty().value || !(await this.getBusinessHour(businessHour.id))) {
      return await this.addBusinessHour(businessHour)
    }
    if (
      !(await validateBaseFields(businessHour, "SELECT * FROM business_hours WHERE business_hour_id = $1", [
        businessHour.id.value
      ]))
    ) {
      this.setStatus(412)
    }
    businessHour = updateBaseFields(businessHour)
    // @TODO: Look at validation Updates
    return await sqlToDB(
      "UPDATE business_hours SET business_hour_tag_id = $2, business_hour_day = $3, business_hour_start_time = $4, business_hour_end_time = $5, business_hour_is_open = $6, version_no = $7  WHERE business_hour_id = $1;",
      [
        businessHour.id.value,
        businessHour.tagId?.value,
        businessHour.day.key,
        businessHour.startTime?.toISOString() ?? null,
        businessHour.endTime?.toISOString() ?? null,
        businessHour.isOpen,
        ...extractBaseFields(businessHour)
      ]
    )
  }
  createDefault() {
    throw new Error("Not Implemented")
  }
}

// business_hour_id = $1, business_hour_tag_id = $2, business_hour_day = $3, business_hour_start_time = $4, business_hour_end_time = $5, business_hour_is_open = $6, version_no = $7

// id
// tagId
// day
// startTime
// endTime
// isOpen
