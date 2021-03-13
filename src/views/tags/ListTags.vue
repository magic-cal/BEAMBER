<template>
  <v-container pa-0>
    <v-row>
      <v-col class="mt-6">
        <v-data-table
          disable-pagination
          @click:row="rowClicked"
          :headers="headers"
          :items="tags"
          item-key="id.toString()"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
    <v-footer fixed
      ><v-row>
        <v-col align="right"
          ><v-btn @click="createNew">{{ $t("create_new") }}</v-btn></v-col
        ></v-row
      ></v-footer
    >
  </v-container>
</template>

<script lang="ts">
// import api from "@/api/api"
import { TagsApi } from "@/api1/index"
import { WithLoading } from "@/store/modules/appStore"
import { Tag } from "utils/classes/resources"
import Vue from "vue"
import { Component } from "vue-property-decorator"
@Component
export default class ListTags extends Vue {
  tags: Tag[] = []

  headers = [
    {
      text: this.$t("tag_name"),
      align: "start",
      sortable: true,
      value: "name"
    },
    {
      text: this.$t("tag_description"),
      align: "start",
      sortable: false,
      value: "description"
    }
  ]

  rowClicked(rowItem: Tag) {
    this.$router.push({
      name: "EditTag",
      params: { tagId: rowItem.id.value }
    })
  }

  createNew() {
    this.$router.push({
      name: "EditTag"
    })
  }

  @WithLoading
  async created() {
    const i = new TagsApi()
    this.tags = await i.getTagsByFilter()
    // this.tags = await i.getTagsByFilter()
    // this.tags = await api.getTags()
  }
}
</script>
