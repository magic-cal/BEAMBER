export class AmberApiFields {
  /**
   * @minimum 0 Minimum version cannot be negative
   * @isInt
   */
  versionNo: number
  constructor(versionNo = 1) {
    this.versionNo = versionNo
  }
}
