<template>
  <v-container class="pb-12">
    <slot />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class APage extends Vue {
  @Prop({ type: String, default: "", required: false })
  public title!: string
  @Prop({ type: String, default: "", required: false })
  public subtitle!: string
  @Prop({ type: String, default: "", required: false })
  public status!: string
  @Prop({ type: Boolean, default: false, required: false })
  public removePagePadding!: boolean
}
</script>

<style scoped lang="sass">
// top and left/right padding to match vue container
.a-pagehead
  padding-top: 12px
  padding-left: 12px
  padding-right: 12px

.a-pagehead:not(.a-grid-controls)
  margin-bottom: 20px

.a-grid-divider
  margin-bottom: 10px

.no-flex
  flex: 0 0 auto

.flex-main-scroll
  min-height: 300px
  flex: 1 1 0
  overflow:  auto
</style>
