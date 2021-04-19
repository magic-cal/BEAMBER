<template>
  <a-page>
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
          <v-row>
            <v-expansion-panels v-model="panel" multiple>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><h2>{{ $t("opening_hours") }}</h2></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-form v-model="valid">
                    <v-col :cols="12" v-for="dow in daysOfTheWeek" :key="dow.key">
                      <h3>
                        {{ $t(dow.translationKey) }}
                      </h3>

                      <v-row v-for="wbh in getBusinessHours(dow)" :key="wbh.id.value">
                        <v-col :cols="12" :sm="4">
                          <a-time
                            :label="$t('start_time')"
                            v-model="wbh.startTime"
                            :disabled="wbh.id !== editingId"
                            clearable
                            :rules="[$ruleSet.requiredConditional(!!wbh.endTime)]"
                          />
                        </v-col>
                        <v-col :cols="12" :sm="4">
                          <a-time
                            :label="$t('end_time')"
                            v-model="wbh.endTime"
                            :disabled="wbh.id !== editingId"
                            clearable
                            :rules="[$ruleSet.requiredConditional(!!wbh.startTime)]"
                          />
                        </v-col>
                        <v-col :cols="12" :sm="2">
                          <v-switch :label="$t('open')" v-model="wbh.isOpen" :disabled="wbh.id !== editingId" />
                        </v-col>
                        <v-col :cols="12" :sm="2" v-if="wbh.id === editingId">
                          <v-btn :disabled="!valid" icon @click="updateBusinessHour(wbh)" class="mx-1"
                            ><v-icon>mdi-content-save</v-icon>
                          </v-btn>
                          <v-btn icon @click="deleteBusinessHour(wbh)" class="mx-1"><v-icon>mdi-delete</v-icon> </v-btn>
                        </v-col>
                        <v-col :cols="12" :sm="2" v-else>
                          <v-btn icon @click="editingId = wbh.id"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
                        </v-col>
                      </v-row>
                      <v-col align="center">
                        <v-btn @click="addBusinessHours(true, dow, false)" icon outlined color="primary">
                          <v-icon>mdi-plus</v-icon></v-btn
                        ></v-col
                      >
                    </v-col>
                  </v-form>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><h2>{{ $t("holiday_hours") }}</h2></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-col align="center">
                    <v-btn @click="addBusinessHours(true, EnumDay.none, false)" icon outlined color="primary">
                      <v-icon>mdi-plus</v-icon></v-btn
                    ></v-col
                  >
                  <v-col :cols="12">
                    <v-row v-for="wbh in getBusinessHours(EnumDay.none)" :key="wbh.id.value">
                      <v-col :cols="12" :sm="4">
                        <a-timestamp
                          :label="$t('start_time')"
                          v-model="wbh.startTime"
                          :disabled="wbh.id !== editingId"
                          clearable
                          :rules="[
                            $ruleSet.requiredConditional(!!wbh.endTime),
                            $ruleSet.dateBeforeOrEqual(wbh.endTime, $t('end_time'))
                          ]"
                        />
                      </v-col>
                      <v-col :cols="12" :sm="4">
                        <a-timestamp
                          :label="$t('end_time')"
                          v-model="wbh.endTime"
                          :disabled="wbh.id !== editingId"
                          clearable
                          :rules="[
                            $ruleSet.requiredConditional(!!wbh.startTime),
                            $ruleSet.dateAfterOrEqual(wbh.startTime, $t('start_time'))
                          ]"
                        />
                      </v-col>
                      <v-col :cols="12" :sm="2">
                        <v-switch :label="$t('open')" v-model="wbh.isOpen" :disabled="wbh.id !== editingId"></v-switch>
                      </v-col>
                      <v-col :cols="12" :sm="2" v-if="wbh.id === editingId">
                        <v-btn icon @click="updateBusinessHour(wbh)" class="mx-1"
                          ><v-icon>mdi-content-save</v-icon>
                        </v-btn>
                        <v-btn icon @click="deleteBusinessHour(wbh)" class="mx-1"><v-icon>mdi-delete</v-icon> </v-btn>
                      </v-col>
                      <v-col :cols="12" :sm="2" v-else>
                        <v-btn icon @click="editingId = wbh.id"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><h2>{{ $t("reset_data") }}</h2></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-row>
                    <v-col>
                      <v-btn @click="resetData">{{ $t("reset_data") }}</v-btn>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-container>
      </v-card>
      <v-footer fixed outlined
        ><v-row>
          <v-col>
            <v-btn @click="back">{{ $t("back") }}</v-btn>
          </v-col>
        </v-row>
      </v-footer>
    </v-container>
  </a-page>
</template>

<script lang="ts">
import api from "@/api/api"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { WithLoading } from "@/store/modules/appStore"
import { BusinessHour, EnumDay } from "@/../utils/classes/businessHours"
import Guid from "@/../utils/classes/common/guid"
import { RecipeBreakdown } from "@/api/models"

@Component
export default class Settings extends Vue {
  // @Prop({ type: String, required: false, default: () => null })
  // private businessHourId!: string | null

  allBusinessHours: BusinessHour[] = []
  editingId: Guid | null = null
  recipeBreakdown = ""
  advancedImport = false
  valid = true
  panel = []

  EnumDay = EnumDay

  @WithLoading
  async mounted() {
    await this.loadPrerequisites()
  }

  async loadPrerequisites() {
    this.allBusinessHours = await api.businessHourApi.getBusinessHoursByFilter({})
    for (const day of this.daysOfTheWeek) {
      if (!this.getBusinessHours(day).length) {
        this.addBusinessHours(false, day, true)
      }
    }
    this.editingId = null
  }

  getBusinessHours(day: EnumDay) {
    return this.allBusinessHours.filter((bh) => bh.day.key == day.key)
  }

  addBusinessHours(edit = false, day: EnumDay, isOpen: boolean, startTime?: Date, endTime?: Date, tagId?: Guid) {
    const bh = new BusinessHour(Guid.create(), day.key, isOpen, startTime, endTime)
    bh.tagId = tagId
    this.editingId = edit ? bh.id : this.editingId
    this.allBusinessHours.push(bh)
  }

  get exceptionalBusinessHours() {
    return this.allBusinessHours.filter((bh) => bh.day === EnumDay.none)
  }

  get daysOfTheWeek() {
    return EnumDay.getValues().filter((day) => day !== EnumDay.none)
  }

  @WithLoading
  async updateBusinessHour(businessHour: BusinessHour) {
    console.log("businessHour", businessHour)
    await api.businessHourApi.updateOrCreateBusinessHour({ businessHour: businessHour })
    await this.loadPrerequisites()
  }

  @WithLoading
  async deleteBusinessHour(businessHour: BusinessHour) {
    await api.businessHourApi.deleteBusinessHour({ businessHourId: businessHour.id })
    await this.loadPrerequisites()
  }

  async resetData() {
    await api.dataApi.clearAssemblies()
    this.$router.push({
      name: "Home"
    })
  }

  async createRecipesFromSteps() {
    const recipeBreakdown = JSON.parse(this.recipeBreakdown) as RecipeBreakdown
    await api.dataApi.createRecipesFromSteps({ recipeBreakdown: recipeBreakdown })
  }

  async back() {
    this.$router.back()
  }
}
</script>
