<template>
  <a-page>
    <v-container>
      <v-container>
        <v-row>
          <v-col>
            <v-data-table
              disable-pagination
              :headers="headers"
              @click:row="rowClicked"
              :items="maintenenceLogs"
              item-key="id.toString()"
              class="elevation-1"
            ></v-data-table></v-col
        ></v-row>
      </v-container>

      <v-footer fixed outlined
        ><v-row>
          <v-col>
            <v-btn @click="back">{{ $t("back") }}</v-btn></v-col
          >
          <v-col align="right"
            ><v-btn @click="createNew">{{ $t("create_new") }}</v-btn></v-col
          >
        </v-row></v-footer
      >
    </v-container>
  </a-page>
</template>

<script lang="ts">
import Guid from "@/../utils/classes/common/guid"
import { MaintenanceLog } from "@/api"
import api from "@/api/api"
import SortableList from "@/components/SortableList.vue"
import { WithLoading } from "@/store/modules/appStore"
import { Resource, Tag } from "utils/classes/resources"
import Vue from "vue"
import { Drag, DropList } from "vue-easy-dnd"
import { Component, Prop } from "vue-property-decorator"

@Component({ components: { SortableList, DropList, Drag } })
export default class ManageMaintenanceLog extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private resourceId!: string | null
  allResources: Resource[] = []
  maintenenceLogs: MaintenanceLog[] = []

  @WithLoading
  async mounted() {
    this.allResources = await api.resourceApi.getResourcesByFilter({})
    if (this.resourceId) {
      this.maintenenceLogs = await api.maintenanceLogApi.getMaintenanceLogsByFilter({
        filter: { resourceIds: [Guid.fromString(this.resourceId)] }
      })
    }
  }

  headers = [
    {
      text: this.$t("log_date"),
      align: "start",
      sortable: true,
      value: "timestamp"
    },
    {
      text: this.$t("log_type"),
      align: "start",
      sortable: true,
      value: "type"
    },
    {
      text: this.$t("log_details"),
      align: "start",
      sortable: false,
      value: "details"
    }
  ]

  rowClicked(rowItem: MaintenanceLog) {
    this.$router.push({
      name: "EditMaintenanceLog",
      params: { maintenanceLogId: rowItem.id.value }
    })
  }

  createNew() {
    if (this.resourceId) {
      this.$router.push({
        name: "CreateMaintenanceLog",
        params: { resourceId: this.resourceId }
      })
    } else {
      throw new Error("Cannot find resource id" + this.resourceId)
    }
  }

  async back() {
    this.$router.push({ name: "RecipeList" })
  }
}
</script>
