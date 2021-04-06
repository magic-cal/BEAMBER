<template>
  <div class="">
    <v-row class="ml-4">
      <v-col :cols="12" sm="6">
        <h1>{{ tagId ? $t("edit_tag") + ": " + currentTag.name : $t("create_tag") }}</h1>
      </v-col>
      <v-col :cols="12" sm="6">
        <v-btn icon @click="changeDate(fasle)"><v-icon>mdi-minus</v-icon></v-btn>
        <v-btn icon @click="changeDate(true)"><v-icon>mdi-plus</v-icon></v-btn>
      </v-col>
    </v-row>

    <g-gantt-chart :chart-start="myChartStart" :chart-end="myChartEnd" theme="flare">
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
import { Resource } from "@/api"
import api from "@/api/api"
import { WithLoading } from "@/store/modules/appStore"
import { LocalDateTime } from "@js-joda/core/dist/js-joda"
import Vue from "vue"
import Component from "vue-class-component"
import { GGanttChart, GGanttRow } from "vue-ganttastic"
import moment from "moment"
@Component({
  components: {
    GGanttChart,
    GGanttRow
  }
})
export default class EditRecipes extends Vue {
  resources: Resource[] = []
  myChartStart = LocalDateTime.now()
    .withHour(0)
    .withMinute(0)
    .toString()
  myChartEnd = LocalDateTime.now()
    .withHour(0)
    .withMinute(0)
    .plusDays(this.isMobile ? 1 : 5)
    .toString()
  // @TODO: Add Types for Rows
  rows: any = []

  @WithLoading
  async mounted() {
    this.resources = await api.resourceApi.getResourcesByFilter({})
    const length = 3
    let timeSkew = length + 1
    // @TODO: Remove testdata
    this.rows = this.resources.map((res) => {
      const dateTime = LocalDateTime.now()
        .withHour(0)
        .plusHours(timeSkew)
      console.log("dateTime ", dateTime)
      timeSkew *= 1.5
      return {
        label: res.name,
        bars: [
          {
            startTime: dateTime.toString(),
            endTime: dateTime.plusHours(length).toString(),
            id: timeSkew
          },
          {
            startTime: dateTime.plusHours(length + 1).toString(),
            endTime: dateTime.plusHours(length * 2).toString(),
            id: timeSkew
          }
        ]
      }
    })
  }
  changeDate(increase: boolean) {
    this.myChartStart = LocalDateTime.parse(this.myChartStart)
      .plusDays(increase ? 1 : -1)
      .toString()
    this.myChartEnd = LocalDateTime.parse(this.myChartEnd)
      .plusDays(increase ? 1 : -1)
      .toString()
  }

  get isMobile() {
    return this.$vuetify.breakpoint.smAndDown
  }
}
</script>
