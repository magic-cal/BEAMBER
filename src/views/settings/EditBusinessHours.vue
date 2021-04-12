<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col
            ><h1>
              {{ $t("edit_business_hours") }}
            </h1>
          </v-col>
        </v-row>
        <v-row v-for="wbh in weeklyBusinessHours" :key="wbh.id.value">
          <v-col :cols="12" :sm="6">
            <h3>{{ $t(wbh.day.translationKey) }}</h3>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-text-field :label="$t('day')" v-model="currentBusinessHour.name"></v-text-field>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-text-field :label="$t('day')" v-model="currentBusinessHour.description"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-footer
        ><v-row>
          <v-col>
            <v-btn @click="deleteBusinessHour" v-if="businessHourId">{{ $t("delete") }}</v-btn></v-col
          >
          <v-col align="right"
            ><v-btn @click="update">{{ $t(businessHourId ? "update" : "create") }}</v-btn></v-col
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
import { BusinessHour, EnumDay } from "@/../utils/classes/businessHours"
import Guid from "@/../utils/classes/common/guid"

@Component
export default class EditBusinessHours extends Vue {
  // @Prop({ type: String, required: false, default: () => null })
  // private businessHourId!: string | null

  allBusinessHours: BusinessHour[] = []

  @WithLoading
  async mounted() {
    this.allBusinessHours = await api.businessHourApi.getBusinessHoursByFilter({})
  }

  get weeklyBusinessHours() {
    return this.allBusinessHours.filter((bh) => bh.day !== EnumDay.none)
  }

  get exceptionalBusinessHours() {
    return this.allBusinessHours.filter((bh) => bh.day === EnumDay.none)
  }

  @WithLoading
  async update(businessHour: BusinessHour) {
    console.log("businessHour", businessHour)
    await api.businessHourApi.updateOrCreateBusinessHour({ businessHour: businessHour })
    this.back()
  }

  @WithLoading
  async deleteBusinessHour(businessHour: BusinessHour) {
    await api.businessHourApi.deleteBusinessHour({ businessHourId: businessHour.id })
    this.back()
  }

  async back() {
    this.$router.back()
  }
}
</script>
