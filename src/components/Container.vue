<template>
  <v-card v-if="value" hover @click.stop="editResource(value)">
    <v-card-title>
      <span>{{ value.name }}</span>
    </v-card-title>
    <v-row>
      <v-col :cols="4" class="ml-5">
        <!-- <v-img
          class="ma-2"
          src="https://www.pngkit.com/png/detail/61-610226_holland-juice-glass-svg-glass-clipart.png"
        /> -->
        <!-- Add value -->
        <container-preview :requires-clean="value.maintananceRequired" />
      </v-col>
      <v-col>
        <div>{{ $t("name") }}: {{ value.name || "-" }}</div>
        <div>{{ $t("capacity") }}: {{ value.capacity || "-" }}</div>
        <div>{{ $t("current_process") }}: {{ value.process || "-" }}</div>
        <div>{{ $t("requires_clean") }}: {{ $t(value.maintananceRequired.toString()) || "-" }}</div>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-col :cols="12">
        <v-btn @click.stop.prevent="editResource(value)" class="pb-0" style="width: 100%">{{ $t("actions") }}</v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Resource } from "@/../utils/classes/resources"
import ContainerPreview from "@/components/ContainerPreview.vue"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
@Component({ components: { ContainerPreview } })
export default class Container extends Vue {
  // @Model("input", {type: Boolean, required: true})
  // public drawer!: boolean;
  @Prop({ type: Object, required: true })
  public value!: Resource

  editResource(rowItem: Resource) {
    this.$router.push({
      name: "EditResource",
      params: { resourceId: rowItem.id.value }
    })
  }

  containerFillPercentage = 50
}
</script>
