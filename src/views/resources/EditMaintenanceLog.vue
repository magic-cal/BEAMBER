<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col
            ><h1>
              {{
                maintenanceLogId
                  ? $t("edit_maintenance_log") + ": " + currentMaintenanceLog.type
                  : $t("create_maintenance_log")
              }}
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="12" :sm="6">
            <v-text-field :label="$t('type')" v-model="currentMaintenanceLog.type" required />
          </v-col>
          <v-col :cols="12" :sm="6">
            <a-date :label="$t('timestamp')" v-model="currentMaintenanceLog.timestamp" required />
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-textarea :label="$t('details')" v-model="currentMaintenanceLog.details" />
          </v-col>
        </v-row>
      </v-container>
      <v-footer
        ><v-row>
          <v-col>
            <v-btn @click="deleteMaintenanceLog" v-if="maintenanceLogId">{{ $t("delete") }}</v-btn></v-col
          >
          <v-col align="right"
            ><v-btn @click="update">{{ $t(maintenanceLogId ? "update" : "create") }}</v-btn></v-col
          ></v-row
        ></v-footer
      >
    </v-card>
    <v-footer fixed outlined
      ><v-row>
        <v-col>
          <v-btn @click="back">{{ $t("back") }}</v-btn></v-col
        >
      </v-row></v-footer
    >
  </v-container>
</template>

<script lang="ts">
import api from "@/api/api"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { WithLoading } from "@/store/modules/appStore"
import Guid from "@/../utils/classes/common/guid"
import { MaintenanceLog } from "@/../utils/classes/maintenanceLog"

@Component
export default class EditMaintenanceLog extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private maintenanceLogId!: string | null
  @Prop({ type: String, required: false, default: () => null })
  private resourceId!: string | null

  currentMaintenanceLog: MaintenanceLog = new MaintenanceLog()

  @WithLoading
  async mounted() {
    console.log("mounted", this.maintenanceLogId)

    if (this.maintenanceLogId) {
      this.currentMaintenanceLog = await api.maintenanceLogApi.getMaintenanceLog({
        maintenanceLogId: Guid.fromString(this.maintenanceLogId)
      })
      console.log(this.currentMaintenanceLog)
    } else if (this.resourceId) {
      this.currentMaintenanceLog.id = Guid.create()
      this.currentMaintenanceLog.resourceId = Guid.fromString(this.resourceId)
    }
  }

  @WithLoading
  async update() {
    console.log("this.currentMaintenanceLog", this.currentMaintenanceLog)
    await api.maintenanceLogApi.updateOrCreateMaintenanceLog({ maintenanceLog: this.currentMaintenanceLog })
    this.back()
  }

  @WithLoading
  async deleteMaintenanceLog() {
    await api.maintenanceLogApi.deleteMaintenanceLog({ maintenanceLogId: this.currentMaintenanceLog.id })
    this.back()
  }

  async back() {
    this.$router.back()
  }
}
</script>
