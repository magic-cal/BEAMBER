<template>
  <div class="">
    <v-row class="ml-4">
      <v-col :cols="12" sm="6"> <h1>Schedule</h1> </v-col>
      <v-col :cols="12" sm="6">
        <v-btn icon @click="zoom(false)"><v-icon>mdi-magnify-plus-outline</v-icon></v-btn>
        <v-btn icon @click="changeDate(true)"><v-icon>mdi-plus</v-icon></v-btn>
        <v-btn icon @click="changeDate(false)"><v-icon>mdi-minus</v-icon></v-btn>
        <v-btn icon @click="zoom(true)"><v-icon>mdi-magnify-minus-outline</v-icon></v-btn>
      </v-col>
    </v-row>

    <g-gantt-chart
      grid
      :chart-start="myChartStart.toISOString()"
      :chart-end="myChartEnd.toISOString()"
      theme="flare"
      :highlighted-hours="[currentHour]"
    >
      <g-gantt-row
        v-for="row in rows"
        :key="row.label"
        :label="row.label"
        :bars="row.bars"
        bar-start="startTime"
        bar-end="endTime"
      >
        <template #bar-label="{bar}">
          <!-- <img v-if="bar.image" :src="require(`@/assets/${bar.image}`)" height="20" width="20" class="mr-1" /> -->
          <span>{{ bar.label }}</span>
        </template>
      </g-gantt-row>
    </g-gantt-chart>
    <v-btn @click="save">SAVE</v-btn>
  </div>
</template>

<script lang="ts">
import { Lease, QueryResultAny, Resource } from "@/api"
import api from "@/api/api"
import { WithLoading } from "@/store/modules/appStore"
import { LocalDateTime } from "@js-joda/core/dist/js-joda"
import Vue from "vue"
import Component from "vue-class-component"
import { GGanttChart, GGanttRow } from "vue-ganttastic"
import Guid from "utils/classes/common/guid"
import { EnumLeaseType, GantBarConfig, GanttBar } from "./../../../utils/classes/leases"

export interface GanttRow {
  label: string
  bars: GanttBar[]
}

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
  rows: GanttRow[] = []
  currentHour = new Date().getHours()

  @WithLoading
  async mounted() {
    await this.loadPrerequisites()
    console.log(this.currentHour)
  }

  async loadPrerequisites() {
    this.resources = await api.resourceApi.getResourcesByFilter({})
    this.leases = await api.leaseApi.getLeasesByFilter({})
    this.createGanttRows()
  }

  createGanttRows() {
    this.rows = this.resources.map((res) => {
      const filteredLeases = this.leases
        .filter((l) => l.resourceId.equals(res.id))
        .map((l) => {
          return new GanttBar(l, this.leaseToGanttConfig(l))
        })
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

  zoom(increase: boolean) {
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

  leaseToGanttConfig(lease: Lease) {
    const config: GantBarConfig = {}
    let colour = "#2fad3e"
    console.log("NONE", lease.leaseType)

    switch (lease.leaseType) {
      case EnumLeaseType.none:
        colour = "#FF0000"
        console.log("NONE")
        break
      case EnumLeaseType.assemblyStep:
        colour = "#0000FF"
        break
    }
    config.background = colour
    config.color = "#ffff"
    config.opacity = 0.9
    return config
  }

  @WithLoading
  async save() {
    const leases = this.rows.flatMap((row: GanttRow) =>
      row.bars.map((bar) => api.leaseApi.updateOrCreateLease({ lease: bar.toLease() }))
    )

    console.log(leases, "leases")
    await Promise.all(leases)
    await this.loadPrerequisites()
  }
}
</script>
