<template>
  <div class="home">
    <v-row>
      <v-col align="center">
    <h1>Amber</h1>
      </v-col>
    </v-row>
  <v-container>

    <v-row >
      <v-col align="center"> 
        <v-btn>Hi</v-btn> 
      </v-col>
      <v-col align="center">
        <v-btn>Hi</v-btn> 
      </v-col>
      <v-col align="center">
        <v-btn>Hi</v-btn> 
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import Vue from "vue"
import Component from "vue-class-component"
@Component
export default class Home extends Vue {}
</script>
