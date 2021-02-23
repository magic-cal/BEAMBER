/**
 Open source implementation taken from: https://github.com/NicolasDeveloper/guid-typescript

 Copyright 2019 NicolasDeveloper

 Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted,
 provided that the above copyright notice and this permission notice appear in all copies.

 THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
 OF THIS SOFTWARE.
 */
export default class Guid {
  public static validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i")

  public static EMPTY = "00000000-0000-0000-0000-000000000000"

  public static fromString(guid: string): Guid {
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

  public static parse(guid: string): Guid {
    return new Guid(guid)
  }

  public static raw(): string {
    return Guid.generateGuidString()
  }

  private static gen(count: number): string {
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

  public readonly value: string

  private constructor(guid: string) {
    if (!guid) {
      throw new TypeError("Invalid argument; `value` has no value.")
    }

    this.value = Guid.EMPTY

    if (guid && Guid.isGuid(guid)) {
      this.value = guid
    }
  }

  public equals(other: Guid): boolean {
    // Comparing string `value` against provided `guid` will auto-call
    // toString on `guid` for comparison
    return Guid.isGuid(other) && this.value === other.toString()
  }

  public isEmpty(): boolean {
    return this.value === Guid.EMPTY
  }

  public toString(): string {
    return this.value
  }

  public toJSON(): any {
    return {
      value: this.value
    }
  }
}
