<template>
  <div class="vessel" :style="alterPostion"></div>
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
    background: url(./../assets/coffee.png)
    background-repeat: repeat-x
    // animation: flow 25s infinite
    // animation-direction: alternate
    // transition-timing-function: ease-in-out

@keyframes flow
    0%
        background-position-x: 0%

    100%
        background-position-x : 200%
</style>
