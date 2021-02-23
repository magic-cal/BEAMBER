<template>
  <v-row>
    <v-col>
      <drop-list :items="items" class="list" @insert="onInsert" @reorder="$event.apply(items)">
        <template #item="{ item }">
          <drag :key="getValue(item)"
            ><v-card class="pa-2 ma-1">
              <v-icon>mdi-drag-vertical</v-icon>
              {{ getText(item) }}
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
  @Prop({ type: Array, required: false, default: () => [{ name: "hi", id: "d" }] })
  public items!: (string | object)[]

  @Prop({ type: Function, default: (item: any) => item.name, required: false })
  public text!: (item: any) => string | number

  @Prop({ type: Function, default: (item: any) => item.id, required: false })
  public value!: (item: any) => string | number | Guid

  onInsert(event: InsertEvent) {
    this.items.splice(event.index, 0, event.data)
  }

  getValue(item: any) {
    return this.value(item).toString()
  }

  getText(item: any) {
    return this.text(item)
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
