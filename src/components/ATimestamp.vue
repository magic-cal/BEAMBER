<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template #activator="{ on }">
      <v-text-field
        v-model="formattedDateTime"
        class="bm-text"
        prepend-icon="mdi-calendar-clock"
        readonly
        color="brand02"
        v-bind="$attrs"
        :clearable="clearable"
        v-on="on"
        @input="textFieldChanged"
      >
      </v-text-field>
    </template>
    <v-card>
      <v-date-picker v-model="date" no-title scrollable> </v-date-picker>
      <v-time-picker v-if="menu" v-model="time" :format="format"></v-time-picker>
      <!-- <v-card-actions>
        <v-btn button-type="ghost">{{ $t("cancel") }}</v-btn>
        <v-spacer />
        <v-btn button-type="ghost">{{ $t("ok") }}</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

@Component({
  inheritAttrs: false
})
export default class ATimestamp extends Vue {
  @Prop(Date) public value!: Date
  @Prop(Boolean) public clearable!: boolean
  @Prop({ type: String, default: "24hr", required: false })
  public format!: string

  dateTime: Date | null = null
  date: string | null = ""
  time: string | null = ""
  menu = false // Whether the menu is opened or not

  @Watch("value", { immediate: true })
  public valueWatch(val: Date) {
    // Remove Extra Precision causing update issues
    this.dateTime = val ? val : null
    this.time = val ? val.toLocaleTimeString() : null
    this.date = val ? val.toISOString() : null
  }

  public textFieldChanged(val: Date | null) {
    // ensure we clear the date if the value is cleared via the textbox
    if (val === null) {
      this.time = null
      this.date = null
      this.dateTime = null
    }
  }

  get formattedDateTime() {
    console.log(this.dateTime)
    return this.dateTime?.toLocaleString() ?? null
  }

  @Watch("date")
  @Watch("time")
  public dateTimeWatch() {
    if (!this.time || !this.date) {
      this.$emit("input", undefined)
    } else {
      this.$emit("input", new Date(new Date(this.date).toDateString() + " " + this.time))
    }
  }

  // protected save(time: string | null) {
  //   ;(this.$refs.menu as any).save(time)
  // }
}
</script>
