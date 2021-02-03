<template>
  <v-container pa-0>
    <v-row>
      <v-col class="mt-6">
        <v-data-table
          @click:row="rowClicked"
          :headers="headers"
          :items="resources"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import api from "@/api/api"
import { Resource } from "utils/types/resources"
import Vue from "vue"
import { Component } from "vue-property-decorator"
@Component
export default class ListResources extends Vue {
  resources: Resource[] = []

  headers = [
    {
      text: "Resource Name",
      align: "start",
      sortable: true,
      value: "name"
    },
    {
      text: "Resource Name",
      align: "start",
      sortable: false,
      value: "tags"
    }
  ]

  rowClicked(rowItem: Resource) {
    this.$router.push({
      name: "EditResource",
      params: { resourceId: rowItem.id }
    })
  }
  async created() {
    this.resources = await api.getResources()
  }
}
</script>
