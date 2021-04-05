<template>
  <g-gantt-chart :chart-start="myChartStart" :chart-end="myChartEnd" theme="flare">
    <g-gantt-row
      v-for="row in rows"
      :key="row.label"
      :label="row.label"
      :bars="row.bars"
      bar-start="myStart"
      bar-end="myEnd"
    />
  </g-gantt-chart>
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
    .plusDays(5)
    .toString()
  // @TODO: Add Types for Rows
  rows: any = [
    {
      label: "Resource 1",
      bars: [
        {
          myStart: "2020-03-01 12:10",
          myEnd: "2020-03-01 16:35"
        }
      ]
    },
    {
      label: "Res 2",
      bars: [
        {
          myStart: "2020-03-02 01:00",
          myEnd: "2020-03-02 12:00"
        },
        {
          myStart: "2020-03-02 13:00",
          myEnd: "2020-03-02 22:00"
        }
      ]
    }
  ]

  @WithLoading
  async mounted() {
    this.resources = await api.resourceApi.getResourcesByFilter({})
    const length = 3
    let timeSkew = length + 1
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
            myStart: dateTime.toString(),
            myEnd: dateTime.plusHours(length).toString(),
            id: timeSkew
          },
          {
            myStart: dateTime.plusHours(length + 1).toString(),
            myEnd: dateTime.plusHours(length * 2).toString(),
            id: timeSkew
          }
        ]
      }
    })
  }
}
</script>
