<template>
  <div class="vessel" :class="{ 'requires-clean': requiresClean }" :style="alterPostion"></div>
</template>
<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"

@Component
export default class ContainerPreview extends Vue {
  @Prop({ type: Number, required: false, default: () => Math.floor(Math.random() * 100) + 1 })
  public value!: number

  @Prop({ type: Boolean, required: false, default: false })
  public requiresClean!: boolean

  get alterPostion() {
    //  @TODO: Make a better mapping
    //   Mapping from -60 => +20
    const multiplier = 0.7
    const skew = -53
    const val = skew + this.value * multiplier
    return `background-position-y: ${val}%`
  }
}
</script>

<style lang="sass">

.vessel
    border: solid 1px black
    height: 100%
    width: 100%
    top: 40%
    left: 40%
    box-shadow: 0 0 0 6px #fff
    border-radius: 0 0 30px 30px
    background: url(./../assets/beerLevel.png)
    background-repeat: repeat-x
    animation: flow 20s infinite
    animation-direction: alternate-reverse
    transition-timing-function: ease

.vessel.requires-clean
    background: lightblue

@keyframes flow
    0%
        background-position-x: 0%

    100%
        background-position-x : 2000%
</style>
