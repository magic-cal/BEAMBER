<template>
  <v-container>
    <v-card class="">
      <v-container>
        <v-row>
          <v-col
            ><h1>{{ tagId ? "Edit Tag: " + currentTag.name : "Create Tag" }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="12" :sm="6">
            <v-text-field label="Name" v-model="currentTag.name"></v-text-field>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-text-field label="Description" v-model="currentTag.description"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-footer
        ><v-row>
          <v-col> <v-btn @click="deleteTag" v-if="tagId"> Delete </v-btn></v-col>
          <v-col align="right"
            ><v-btn @click="update">{{ tagId ? "Update" : "Create" }}</v-btn></v-col
          ></v-row
        ></v-footer
      >
    </v-card>
    <v-footer fixed outlined
      ><v-row>
        <v-col> <v-btn @click="back">Back</v-btn></v-col>
      </v-row></v-footer
    >
  </v-container>
</template>

<script lang="ts">
import api from "@/api/api"
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { WithLoading } from "@/store/modules/appStore"
import { Tag } from "@/../utils/classes/resources"
import Guid from "@/../utils/classes/common/guid"

@Component
export default class EditTags extends Vue {
  @Prop({ type: String, required: false, default: () => null })
  private tagId!: string | null

  currentTag: Tag = new Tag()

  @WithLoading
  async mounted() {
    console.log("mounted", this.tagId)

    if (this.tagId) {
      this.currentTag = await api.getTag(Guid.fromString(this.tagId))
      console.log(this.currentTag)
    }
  }

  @WithLoading
  async update() {
    console.log("this.currentTag", this.currentTag)

    await api.updateOrCreateTag(this.currentTag)
  }

  @WithLoading
  async deleteTag() {
    await api.deleteTag(this.currentTag.id)
    this.back()
  }

  async back() {
    this.$router.push({ name: "TagList" })
  }
}
</script>
