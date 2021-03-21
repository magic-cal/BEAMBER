<template>
  <v-row>
    <v-col align="start">
      <drop-list :items="items" class="list" @insert="onInsert" @reorder="reorder">
        <template #item="{ item }">
          <drag :key="getValue(item)"
            ><v-card class="pa-2 ma-1">
              <v-row justify="center">
                <v-col justify="center">
                  <v-icon>mdi-drag-vertical</v-icon>
                  <template v-if="showIndex">
                    {{ getIndex(item) + 1 + "." }}
                  </template>
                  {{ getText(item) }}
                </v-col>
                <v-col align="end">
                  <v-btn v-if="withDelete" class="mx-1" small @click="$emit('delete', value(item))">{{
                    $t("Delete")
                  }}</v-btn>
                  <v-btn v-if="withEdit" class="mx-1" small @click="$emit('edit', value(item))">{{ $t("edit") }}</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </drag>
        </template>
      </drop-list>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Drag, DropList, InsertEvent } from "vue-easy-dnd"

import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import Guid from "utils/classes/common/guid"

@Component({ components: { DropList, Drag } })
export default class SortableList extends Vue {
  @Prop({ type: Array, required: false, default: () => [] })
  public items!: (string | object)[]

  @Prop({ type: Function, default: (item: any) => item.name, required: false })
  public text!: (item: any) => string | number

  @Prop({ type: Function, default: (item: any) => item.id, required: false })
  public value!: (item: any) => string | number | Guid

  @Prop({ type: Boolean, default: false, required: false })
  public withEdit!: boolean

  @Prop({ type: Boolean, default: false, required: false })
  public withDelete!: boolean

  @Prop({ type: Boolean, default: false, required: false })
  public showIndex!: boolean

  onInsert(event: InsertEvent) {
    this.items.splice(event.index, 0, event.data)
  }

  reorder($event: any) {
    $event.apply(this.items)
    this.$emit("reorder", this.items)
  }

  getValue(item: any) {
    return this.value(item).toString()
  }

  getText(item: any) {
    return this.text(item)
  }

  getIndex(item: any) {
    return this.items.indexOf(item)
  }
}
</script>

<style lang="scss">
html,
body,
#app,
.v-application--wrap,
.v-content,
.v-content__wrap {
  height: 100%;
}

.drop-in {
  box-shadow: 0 0 10px rgba(0, 0, 255, 0.3);
}
</style>

<style scoped lang="scss">
.wrapper {
  .list {
    border: 1px solid black;
    margin: 100px auto;
    width: 200px;

    .item {
      padding: 20px;
      margin: 10px;
      background-color: rgb(220, 220, 255);
      display: flex;
      align-items: center;
      justify-content: center;

      &.feedback {
        background-color: rgb(255, 220, 220);
        border: 2px dashed black;
      }

      &.drag-image {
        background-color: rgb(220, 255, 220);
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
