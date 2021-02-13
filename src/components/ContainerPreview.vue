<template>
  <div id="container" :style="alterPostion"></div>
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Model, Prop } from "vue-property-decorator"

@Component
export default class ContainerPreview extends Vue {
  @Prop({ type: Number, required: false, default: () => Math.floor(Math.random() * 100) + 1 })
  public value!: number

  get alterPostion() {
    //   Mapping from -60 => +20
    const multiplier = 0.7
    const skew = -53
    const val = skew + this.value * multiplier
    return `background-position: 0px ${val}%`
  }
}
</script>

<style lang="sass">

#container
    border: solid 1px black
    height: 100%
    width: 100%
    top: 40%
    left: 40%
    box-shadow: 0 0 0 6px #fff
    border-radius: 0 0 20px 20px
    background: url(./../assets/coffee.png)
    background-repeat: no-repeat
    // background-position: 0px 18%
</style>
