<!-- eslint-disable -->
<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="time"
            class="bm-text"
            prepend-icon="mdi-clock-outline"
            readonly
            color="brand02"
            v-bind="$attrs"
            :clearable="clearable"
            v-on="on"
            @input="textFieldChanged"
          >
          </v-text-field>
        </template>
        <v-time-picker
          v-if="menu"
          v-model="time"
          :format="format"
          scrollable
          @click:minute="save(time)"
        ></v-time-picker>
      </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator"

@Component({
  inheritAttrs: false
})
export default class BmTime extends Vue {
  @Prop(Date) public value!: Date
  @Prop(String) public placeholder!: string
  @Prop(Boolean) public clearable!: boolean
  @Prop({ type: String, default: "24hr", required: false })
  public format!: string

  menu = false // Whether the menu is opened or not
  time: string | null = ""
  date: string | null = ""

  @Watch("value", { immediate: true })
  public valueWatch(val: Date) {
    // Remove Extra Precision causing update issues
    this.time = val ? val.toLocaleTimeString() : null
    this.date = val ? val.toLocaleDateString() : null
  }

  public textFieldChanged(val: Date | null) {
    // ensure we clear the date if the value is cleared via the textbox
    if (val === null) {
      this.time = null
    }
  }

  @Watch("time")
  public timeWatch(val: string) {
    if (!val) {
      this.$emit("input", undefined)
    } else {
      this.$emit("input", new Date(this.date + val))
    }
  }

  protected save(time: string | null) {
    ;(this.$refs.menu as any).save(time)
  }
}
</script>
