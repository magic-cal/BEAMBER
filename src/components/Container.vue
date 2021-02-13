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
        <container-preview />
      </v-col>
      <v-col>
        <div>Name: {{ value.name || "-" }}</div>
        <div>Capacity: {{ value.capacity || "-" }}</div>
        <div>Current Process: {{ value.capacity || "-" }}</div>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-col :cols="12">
        <v-btn @click.stop.prevent class="pb-0" style="width: 100%">Actions</v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Resource } from "@/../utils/classes/resources"
import Guid from "utils/classes/common/guid"
import ContainerPreview from "@/components/ContainerPreview.vue"
import Vue from "vue"
import { Component, Model, Prop } from "vue-property-decorator"
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
