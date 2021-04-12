<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template #activator="{ on }">
      <v-text-field
        :value="formattedDate"
        class="bm-text"
        prepend-icon="mdi-calendar-today"
        readonly
        v-bind="$attrs"
        :clearable="clearable"
        color="brand02"
        v-on="on"
        @input="textFieldChanged"
      >
      </v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable @input="menu = false" :events="events"> </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator"

@Component({
  inheritAttrs: false
})
export default class BmDate extends Vue {
  // Uses JS Date
  @Prop(Date) public value!: Date
  // @Prop(String) public placeholder!: string
  @Prop(Boolean) public clearable!: boolean
  @Prop({ type: Function, default: () => [], required: false })
  public events!: (item: any) => string | boolean | string[] | boolean[]

  menu = false // Whether the menu is opened or not
  date: string | null = "" // ISO 8601 format, YY-mm-dd or YY-mm

  @Watch("value", { immediate: true })
  public valueWatch(val: Date) {
    this.date = val ? val.toISOString() : null
  }

  get formattedDate(): string {
    if (!this.date) {
      return ""
    }

    return new Date(this.date).toLocaleDateString()
  }

  public textFieldChanged(val: string | null) {
    // ensure we clear the date if the value is cleared via the textbox
    if (val === null) {
      this.date = null
    }
  }

  @Watch("date")
  public dateWatch(val: string) {
    if (!val) {
      this.$emit("input", undefined)
    } else {
      this.$emit("input", new Date(val))
    }
  }
}
</script>
