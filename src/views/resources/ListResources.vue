<template>
  <v-container pa-0>
    <v-row>
      <v-col>
        <v-data-table
          @click:row="rowClicked"
          :headers="headers"
          :items="containers"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class ViewContainers extends Vue {
  containers: any[] = [
    { id: "hh", name: "DPV1", tags: ["tag", "tag2", "taggs"] },
  ];
  headers = [
    {
      text: "Resource Name",
      align: "start",
      sortable: true,
      value: "name",
    },
    {
      text: "Resource Name",
      align: "start",
      sortable: false,
      value: "tags",
    },
  ];

  rowClicked(rowItem: any) {
    //Pass in container
    console.log(rowItem);
    this.$router.push({
      name: "EditResource",
      params: { resourceId: "Hi there" },
    });
  }
}
</script>
