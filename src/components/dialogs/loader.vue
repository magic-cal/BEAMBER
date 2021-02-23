<template>
  <v-dialog ref="loadingDialog" :value="active" persistent max-width="300">
    <v-card color="primary" dark>
      <v-card-text
        >Loading, Please wait...
        <v-progress-linear indeterminate color="white" class="mb-0" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator"
import appStore from "@/store/modules/appStore"

/**
 * Unfortunately when this dialog comes and goes quickly the overlay can sometimes get stuck active. Presumably this is
 * an issue with Vuetify 2.0 - worth removing this complexity once it matures a bit and seeing if the issue still exists.
 */
@Component
export default class Loader extends Vue {
  timer = 0
  active = false

  get loading() {
    // Prompts change in loading when the page becomes visible to stop loading state freezing on hidden reload
    return appStore.loading && !document.hidden
  }

  @Watch("loading", { immediate: true })
  public loadingWatch(val: boolean) {
    clearTimeout(this.timer)

    this.active = val

    if (!val) {
      this.timer = window.setTimeout(() => {
        ;(this.$refs.loadingDialog as any).removeOverlay()
      }, 100)
    }
  }
}
</script>
