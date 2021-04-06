import Guid from "utils/classes/common/guid"
import { Lease } from "utils/classes/leases"
import { LeaseController } from "./LeaseService"

export class DataService {
  leaseService: LeaseController
  constructor() {
    this.leaseService = new LeaseController()
  }

  async loadTestData() {
    await this.leaseService.addLease(new Lease(Guid.create(), "Test 1", undefined, undefined, undefined, undefined))
  }
}
