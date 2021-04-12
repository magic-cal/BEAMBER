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

export class EnumDay implements BaseEnumType {
  private static allValues: EnumDay[] = [] // make sure this is top-most

  public static none = new EnumDay(0, "None", "enum_day_none")
  public static monday = new EnumDay(1, "Monday", "enum_day_monday")
  public static tuesday = new EnumDay(2, "Tuesday", "enum_day_tuesday")
  public static wednesday = new EnumDay(3, "Wednesday", "enum_day_wednesday")
  public static thursday = new EnumDay(4, "Thursday", "enum_day_thursday")
  public static friday = new EnumDay(5, "Friday", "enum_day_friday")
  public static saturday = new EnumDay(6, "Saturday", "enum_day_saturday")
  public static sunday = new EnumDay(7, "Sunday", "enum_day_sunday")

  public key: number
  public value: string
  public translationKey: string

  private constructor(key: number, value: string, translationKey: string) {
    this.key = key
    this.value = value
    this.translationKey = translationKey
    EnumDay.allValues.push(this)
  }

  public static getValues(): EnumDay[] {
    return EnumDay.allValues
  }

  public static getByKey(key: number): EnumDay {
    const found = EnumDay.allValues.find((e) => e.key === key)
    if (found === undefined) {
      throw new Error("Value not found")
    }

    return found
  }
}

export class BusinessHour extends AmberApiFields {
  id: Guid
  day: EnumDay // If present - Opening hours - otherwise - Special Day
  // dayInt?: number // If present - Opening hours - otherwise - Special Day
  startTime?: Date = undefined
  endTime?: Date = undefined
  tagId?: Guid = undefined
  isOpen: boolean

  constructor(id: Guid = Guid.createEmpty(), dayInt = 0, startTime = new Date(), endTime = new Date(), isOpen = false) {
    super()
    this.id = id
    // this.dayInt = dayInt
    this.day = EnumDay.getByKey(dayInt)
    this.startTime = startTime
    this.endTime = endTime
    this.isOpen = isOpen
  }
}

export class BusinessHourFilter {
  onlyBusinessHours = false
  dateStart = false
  dateEnd = false
  includeDeleted = false
}
