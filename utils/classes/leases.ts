import Guid from "./common/guid"
import { AmberApiFields } from "./amberApiFields"
import BaseEnumType from "./common/baseEnumType"

// Lease_id uuid NOT NULL DEFAULT gen_random_uuid(),
// Lease_name character varying COLLATE pg_catalog."default",
// Lease_description character varying COLLATE pg_catalog."default",
// Lease_complete boolean,
// Lease_parent_id uuid,
// recipe_id uuid,
// recipe_product_id uuid,

export class EnumLeaseType implements BaseEnumType {
  private static allValues: EnumLeaseType[] = [] // make sure this is top-most

  public static none = new EnumLeaseType(0, "None", "enum_lease_type_none")
  public static assemblyStep = new EnumLeaseType(1, "AssemblyStep", "enum_lease_type_assembly_step")
  public static product = new EnumLeaseType(2, "Product", "enum_lease_type_product")
  public static maintenance = new EnumLeaseType(3, "Maintenance", "enum_lease_type_maintenance")
  public static packaging = new EnumLeaseType(4, "Packaging", "enum_lease_type_packaging")

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
  LeaseStepIds?: Guid[] = []
  includeDeleted? = false
  startTime?: Date
  endTime?: Date
}

export interface GantBarConfig {
  color?: string
  opacity?: number
  background?: string
  bundle?: string
  borderRadius?: number
}

export class GanttBar {
  label: string
  startTime: string
  endTime: string
  lease: Lease
  ganttBarConfig?: GantBarConfig
  constructor(lease: Lease = new Lease(), config?: GantBarConfig) {
    this.label = lease.name
    this.startTime = lease.startTime.toISOString()
    this.endTime = lease.endTime.toISOString()
    this.lease = lease
    this.ganttBarConfig = config
  }
  public toLease() {
    this.lease.endTime = new Date(this.endTime)
    this.lease.startTime = new Date(this.startTime)
    return this.lease
  }
}
export class GanttContextMenu {
  contextmenuY = 0
  contextmenuX = 0
  showContextmenu = false
  contextmenuTimeout = 0
  bar = new GanttBar(new Lease())
  constructor(bar: GanttBar = new GanttBar()) {
    this.bar = bar
  }
}
