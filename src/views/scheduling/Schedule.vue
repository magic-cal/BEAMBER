<template>
  <div>
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
      class="pb-12"
      push-on-overlap
      grid
      :chart-start="myChartStart.toISOString()"
      :chart-end="myChartEnd.toISOString()"
      theme="flare"
      :highlighted-hours="[currentHour]"
      @contextmenu-bar="onContextmenuBar($event)"
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

    <v-footer fixed
      ><v-row>
        <v-col>
          <v-btn @click="back">{{ $t("back") }}</v-btn></v-col
        >
        <v-col align="right"
          ><v-btn @click="save">{{ $t("save") }}</v-btn></v-col
        ></v-row
      ></v-footer
    >
    <v-menu
      v-model="contextMenu.showContextmenu"
      :position-x="contextMenu.contextmenuX"
      :position-y="contextMenu.contextmenuY"
    >
      <v-list v-if="contextMenu.bar.lease">
        <v-list-item> {{ $t("lease_name") }}: {{ contextMenu.bar.label }} </v-list-item>
        <v-list-item v-if="contextMenu.bar.lease.leaseType.key === EnumLeaseType.assemblyStep.key">
          {{ $t("step") }}: {{ getAssemblyStep(contextMenu.bar.lease.assemblyStepId).sequence + 1 }} -
          {{ getAssemblyStep(contextMenu.bar.lease.assemblyStepId).description }}
        </v-list-item>
        <v-list-item> {{ $t("lease_start_time") }}: {{ formatDate(contextMenu.bar.startTime) }} </v-list-item>
        <v-list-item> {{ $t("lease_end_time") }}: {{ formatDate(contextMenu.bar.endTime) }} </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import api from "@/api/api"
import { WithLoading } from "@/store/modules/appStore"
import { LocalDateTime } from "@js-joda/core/dist/js-joda"
import Vue from "vue"
import Component from "vue-class-component"
import { GGanttChart, GGanttRow } from "vue-ganttastic"
import Guid from "utils/classes/common/guid"
import { EnumLeaseType, GantBarConfig, GanttBar, GanttContextMenu, Lease } from "./../../../utils/classes/leases"
import { Resource } from "utils/classes/resources"
import { AssemblyStep } from "./../../../utils/classes/assemblySteps"

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
  assemblySteps: AssemblyStep[] = []
  myChartStart = new Date(new Date().setHours(0, 0, 0))
  myChartEnd = this.addDays(new Date(new Date().setHours(23, 59, 59)), this.isMobile ? 0 : 4)
  rows: GanttRow[] = []
  currentHour = new Date().getHours()
  contextMenu = new GanttContextMenu()

  EnumLeaseType = EnumLeaseType
  leaseAssemblyIds: Guid[] = []

  colorArray = [
    "#2fad3e",
    "#FF0000",
    "#0000FF",
    "#6666FF",
    "#00B3E6",
    "#3366E6",
    "#6680B3",
    "#33FFCC",
    "#66664D",
    "#4DB3FF",
    "#1AB399",
    "#33991A",
    "#00E680",
    "#4D8066",
    "#1AFF33",
    "#4D80CC",
    "#4DB380",
    "#6666FF"
  ]

  @WithLoading
  async mounted() {
    await this.loadPrerequisites()
  }

  async loadPrerequisites() {
    this.resources = await api.resourceApi.getResourcesByFilter({})
    this.leases = await api.leaseApi.getLeasesByFilter({})
    this.assemblySteps = await api.assemblyStepApi.getAssemblyStepsByFilter({})
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

    if (lease.assemblyStepId) {
      // Assign a different colour to each of the assemblies
      const assemblyId = this.getAssemblyStep(lease.assemblyStepId).assemblyId
      let assemblyIndex = this.leaseAssemblyIds.findIndex((lai) => lai.equals(assemblyId))
      if (assemblyIndex == -1) {
        this.leaseAssemblyIds.push(assemblyId)
        assemblyIndex = this.leaseAssemblyIds.length - 1
      }
      colour = this.colorArray[assemblyIndex]
    }

    // switch (lease.leaseType) {
    //   case EnumLeaseType.none:
    //     colour = "#FF0000"
    //
    //     break
    //   case EnumLeaseType.assemblyStep:
    //     colour = "#0000FF"
    //     break
    // }
    config.background = colour
    config.color = "#ffff"
    config.opacity = 0.9
    return config
  }

  onContextmenuBar(e: any) {
    e.event.preventDefault()
    this.contextMenu.contextmenuY = e.event.clientY
    this.contextMenu.contextmenuX = e.event.clientX
    this.contextMenu.showContextmenu = true
    this.contextMenu.bar = e.bar
    if (this.contextMenu.contextmenuTimeout) {
      clearTimeout(this.contextMenu.contextmenuTimeout)
    }
    this.contextMenu.contextmenuTimeout = window.setTimeout(() => (this.contextMenu.showContextmenu = false), 3000)
  }

  formatDate(date: Date | string | number) {
    return new Date(date).toLocaleString()
  }

  @WithLoading
  async save() {
    const leases = this.rows.flatMap((row: GanttRow) =>
      row.bars.map((bar) => api.leaseApi.updateOrCreateLease({ lease: bar.toLease() }))
    )

    await Promise.all(leases)
    await this.loadPrerequisites()
  }

  isNotNullOrUndefined<T>(t: T | undefined | null | void): t is T {
    return t !== undefined && t !== null
  }

  getAssemblyStep(assemblyStepId: Guid) {
    const assemblyStep = this.assemblySteps.find((a) => a.id.equals(assemblyStepId))
    if (!assemblyStep) {
      throw new Error("Assembly Step Not Found")
    }
    return assemblyStep
  }

  async back() {
    this.$router.back()
  }
}
</script>

<style>
.g-gantt-bar {
  border-radius: 0 !important;
  border: 1px solid black;
}
</style>
