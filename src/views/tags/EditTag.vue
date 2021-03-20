<template>
  <v-container>
    <v-card>
      <v-container>
        <v-row>
          <v-col
            ><h1>{{ tagId ? $t("edit_tag") + ": " + currentTag.name : $t("create_tag") }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col :cols="12" :sm="6">
            <v-text-field :label="$t('name')" v-model="currentTag.name"></v-text-field>
          </v-col>
          <v-col :cols="12" :sm="6">
            <v-text-field :label="$t('description')" v-model="currentTag.description"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-footer
        ><v-row>
          <v-col>
            <v-btn @click="deleteTag" v-if="tagId">{{ $t("delete") }}</v-btn></v-col
          >
          <v-col align="right"
            ><v-btn @click="update">{{ $t(tagId ? "update" : "create") }}</v-btn></v-col
          ></v-row
        ></v-footer
      >
    </v-card>
    <v-footer fixed outlined
      ><v-row>
        <v-col>
          <v-btn @click="back">{{ $t("back") }}</v-btn></v-col
        >
      </v-row></v-footer
    >
  </v-container>
</template>

<script lang="ts">
import api from "@/api1/api"
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
      this.currentTag = await api.tagApi.getTag({ tagId: Guid.fromString(this.tagId) })
      console.log(this.currentTag)
    }
  }

  @WithLoading
  async update() {
    console.log("this.currentTag", this.currentTag)
    await api.tagApi.updateOrCreateTag({ tag: this.currentTag })
    this.back()
  }

  @WithLoading
  async deleteTag() {
    await api.tagApi.deleteTag({ tagId: this.currentTag.id })
    this.back()
  }

  async back() {
    this.$router.push({ name: "TagList" })
  }
}
</script>
