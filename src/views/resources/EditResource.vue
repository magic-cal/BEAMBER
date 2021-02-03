<template>
  <v-container pa-0>
    <v-row>
      <v-col> Edit Resource resouceId: {{ resourceId }} </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class ViewContainers extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private resourceId!: string;
}
</script>
