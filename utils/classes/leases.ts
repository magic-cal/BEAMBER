import Guid from "./common/guid"
import { AmberApiFields } from "./amberApiFields"
import BaseEnumType from "./common/baseEnumType"
import { LocalDateTime } from "@js-joda/core"

// Lease_id uuid NOT NULL DEFAULT gen_random_uuid(),
// Lease_name character varying COLLATE pg_catalog."default",
// Lease_description character varying COLLATE pg_catalog."default",
// Lease_complete boolean,
// Lease_parent_id uuid,
// recipe_id uuid,
// recipe_product_id uuid,

export class EnumLeaseType implements BaseEnumType {
  private static allValues: EnumLeaseType[] = [] // make sure this is top-most

  public static none = new EnumLeaseType(0, "None", "enum_distribution_status_none")
  public static pending = new EnumLeaseType(1, "Pending", "enum_distribution_status_pending")
  public static successful = new EnumLeaseType(2, "Successful", "enum_distribution_status_successful")
  public static outForDelivery = new EnumLeaseType(3, "OutForDelivery", "enum_distribution_status_out_for_delivery")
  public static exception = new EnumLeaseType(4, "Exception", "enum_distribution_status_exception")
  public static failed = new EnumLeaseType(5, "Failed", "enum_distribution_status_failed")
  public static hasNotes = new EnumLeaseType(6, "HasNotes", "enum_distribution_status_has_notes")

  public key: number
  public value: string
  public translationKey: string

  private constructor(key: number, value: string, translationKey: string) {
    this.key = key
    this.value = value
    this.translationKey = translationKey
    EnumLeaseType.allValues.push(this)
  }

  public static getValues(): EnumLeaseType[] {
    return EnumLeaseType.allValues
  }

  public static getByKey(key: number): EnumLeaseType {
    const found = EnumLeaseType.allValues.find((e) => e.key === key)
    if (found === undefined) {
      throw new Error("Value not found")
    }

    return found
  }
}

export class Lease extends AmberApiFields {
  id: Guid
  name: string
  resourceId: Guid
  endTime: Date
  startTime: Date
  leaseType: EnumLeaseType
  // One of the following OR none
  maintenanceId?: Guid
  assemblyStepId?: Guid
  packagingId?: Guid //@TODO: Implement Field -- unused
  productId?: Guid //@TODO: Implement Field -- unused

  constructor(
    id: Guid = Guid.createEmpty(),
    name = "",
    leaseType = EnumLeaseType.none,
    startTime = new Date(),
    endTime = new Date(),
    resourceId = Guid.createEmpty()
  ) {
    super()
    this.id = id
    this.name = name
    this.leaseType = leaseType
    this.startTime = startTime
    this.endTime = endTime
    this.resourceId = resourceId
  }
}

export class LeaseFilter {
  LeaseStepIds: Guid[] = []
  includeDeleted = false
}
