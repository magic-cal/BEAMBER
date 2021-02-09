<template>
  <v-container pa-0>
    <v-row>
      <v-col class="mt-6">
        <v-data-table
          disable-pagination
          @click:row="rowClicked"
          :headers="headers"
          :items="resources"
          item-key="id.toString()"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
    <v-footer fixed
      ><v-row>
        <v-col align="right"><v-btn @click="createNew">Create New</v-btn></v-col></v-row
      ></v-footer
    >
  </v-container>
</template>

<script lang="ts">
import api from "@/api/api"
import { WithLoading } from "@/store/modules/appStore"
import { Resource } from "utils/classes/resources"
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
      text: "Resource Tags",
      align: "start",
      sortable: false,
      value: "tags.map((tag)=>tag.name).join(',')"
    }
  ]

  rowClicked(rowItem: Resource) {
    this.$router.push({
      name: "EditResource",
      params: { resourceId: rowItem.id.value }
    })
  }

  createNew() {
    this.$router.push({
      name: "EditResource"
    })
  }

  @WithLoading
  async created() {
    this.resources = await api.getResources()
  }
}
</script>
