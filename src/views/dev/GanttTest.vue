<template>
  <div class="">
    <v-row class="ml-4">
      <v-col :cols="12" sm="6"> <h1>Schedule</h1> </v-col>
      <v-col :cols="12" sm="6">
        <v-btn icon @click="changeDate(false)"><v-icon>mdi-minus</v-icon></v-btn>
        <v-btn icon @click="changeDate(true)"><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
    </v-row>

    <g-gantt-chart :chart-start="myChartStart.toISOString()" :chart-end="myChartEnd.toISOString()" theme="flare">
      <g-gantt-row
        v-for="row in rows"
        :key="row.label"
        :label="row.label"
        :bars="row.bars"
        bar-start="startTime"
        bar-end="endTime"
      />
    </g-gantt-chart>
  </div>
</template>

<script lang="ts">
import { Lease, Resource } from "@/api"
import api from "@/api/api"
import { WithLoading } from "@/store/modules/appStore"
import { LocalDateTime } from "@js-joda/core/dist/js-joda"
import Vue from "vue"
import Component from "vue-class-component"
import { GGanttChart, GGanttRow } from "vue-ganttastic"
import Guid from "utils/classes/common/guid"

@Component({
  components: {
    GGanttChart,
    GGanttRow
  }
})
export default class Schedule extends Vue {
  resources: Resource[] = []
  leases: Lease[] = []
  myChartStart = new Date(new Date().setHours(0, 0, 0))
  myChartEnd = this.addDays(new Date(new Date().setHours(23, 59, 59)), this.isMobile ? 0 : 4)
  // @TODO: Add Types for Rows
  rows: any = []

  @WithLoading
  async mounted() {
    this.resources = await api.resourceApi.getResourcesByFilter({})
    this.leases = await api.leaseApi.getLeasesByFilter({})
    const length = 3
    let timeSkew = length + 1
    // @TODO: Remove testdata
    this.rows = this.resources.map((res) => {
      const dateTime: Date = new Date()
      // const dateTimeAfter: Date = this.addDays(new Date(new Date().setHours(23, 59, 59)), this.isMobile ? 0 : 4)
      timeSkew *= 1.5
      const filteredLeases = this.leases.filter((l) => l.resourceId.equals(res.id))
      return {
        label: res.name,
        bars: filteredLeases
      }
    })
  }
  changeDate(increase: boolean) {
    this.myChartStart = this.addDays(this.myChartStart, increase ? 1 : -1)
    this.myChartEnd = this.addDays(this.myChartEnd, increase ? 1 : -1)
  }

  get isMobile() {
    return this.$vuetify.breakpoint.smAndDown
  }

  addDays(date: Date, days: number) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return copy
  }
}
</script>
