/**
 * Stringified Guid
 * @pattern [a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}
 */
export type UUID = string

/**
  @example {
    "value": "2d029617-ac69-4409-8191-8452f9cc9882"
  }
 */
export default class Guid {
  public readonly value: UUID

  private constructor(guid: UUID) {
    if (!guid) {
      throw new TypeError("Invalid argument; `value` has no value.")
    }

    this.value = Guid.EMPTY

    if (guid && Guid.isGuid(guid)) {
      this.value = guid
    }
  }

  public static validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i")

  public static EMPTY = "00000000-0000-0000-0000-000000000000"

  public static fromString(guid: UUID): Guid {
    if (this.isGuid(guid)) {
      return Guid.parse(guid)
    }
    return Guid.createEmpty()
  }

  public static isGuid(guid: any): boolean {
    return guid && (guid instanceof Guid || Guid.validator.test(guid.toString()))
  }

  public static create(): Guid {
    return new Guid(Guid.generateGuidString())
  }

  public static createEmpty(): Guid {
    return new Guid("emptyguid")
  }

  public static parse(guid: UUID): Guid {
    return new Guid(guid)
  }

  public static raw(): UUID {
    return Guid.generateGuidString()
  }

  private static gen(count: number): UUID {
    let out = ""
    for (let i = 0; i < count; i++) {
      // tslint:disable-next-line:no-bitwise
      out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return out
  }

  private static generateGuidString() {
    return [Guid.gen(2), Guid.gen(1), Guid.gen(1), Guid.gen(1), Guid.gen(3)].join("-")
  }

  public equals(other: Guid): boolean {
    // Comparing UUID `value` against provided `guid` will auto-call
    // toString on `guid` for comparison
    return Guid.isGuid(other) && this.value === other.toString()
  }

  public isEmpty(): boolean {
    return this.value === Guid.EMPTY
  }

  public toString(): UUID {
    return this.value
  }

  public toJSONObject(): any {
    return {
      value: this.value
    }
  }
}
