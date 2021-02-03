<template>
  <div>
    <div style="font-size: smaller;" class="pb-1">
      <strong>Name</strong>: The name of the delivery charge the customer will
      see e.g. "Free Delivery", or "Standard Delivery".
    </div>
    <div style="font-size: smaller;" class="pb-1">
      <strong>Price</strong>: The total price the customer will pay (can be
      zero).
    </div>
    <div style="font-size: smaller;" class="pb-1">
      <strong>Postcode Prefix Restriction</strong>: An optional comma separated
      list of postcode prefixes (the part before the space) that this delivery
      option will apply to. e.g. "SW16, SW17, SW19" will accept orders to "SW19
      2LP" but not "KT2 5EU". The prefixes must be in full so "SW" would not be
      acceptable.
      <a
        href="https://www.gbmaps.com/4-digit-postcode-maps/free-uk-postcode-district-maps.htm"
        target="_blank"
        >Map Of Postcode Prefixes</a
      >
    </div>
    <div style="font-size: smaller;" class="pb-1">
      <strong>Restricted To Delivery Radius</strong>: An optional value to
      restrict delivery within a certain mile radius (as the crow flies).
    </div>
    <div style="font-size: smaller;" class="pb-1">
      <strong>Estimated Delivery Days</strong>: The estimated number of days
      after placing an order for the customer to receive it.
    </div>
    <v-data-table
      disable-pagination
      disable-filtering
      disable-sort
      hide-default-footer
      :headers="headers"
      :items="brewerySettings.deliveryOptions"
      item-key="id"
      class="xs12"
    >
      <template v-slot:item.name="props">
        <v-text-field
          v-model="props.item.name"
          required
          :rules="[(v) => !!v || 'Name is required']"
        ></v-text-field>
      </template>

      <template v-slot:item.price="props">
        <v-text-field
          type="number"
          @input="props.item.price = $event === '' ? 0 : Number($event)"
          :value="props.item.price"
          required
          :rules="[(v) => v >= 0 || 'Price is required']"
          :min="0"
          prefix="£"
        ></v-text-field>
      </template>
      <template v-slot:item.restrictedPostcodePrefixes="props">
        <v-text-field
          v-model="props.item.restrictedPostcodePrefixes"
          placeholder="None"
        ></v-text-field>
      </template>
      <template v-slot:item.restrictedDeliveryMiles="props">
        <v-text-field
          type="number"
          @input="
            props.item.restrictedDeliveryMiles =
              $event === '' ? 0 : Number($event)
          "
          :value="props.item.restrictedDeliveryMiles"
          placeholder="Nationwide"
          :suffix="props.item.restrictedDeliveryMiles > 0 ? 'miles' : ''"
        ></v-text-field>
      </template>
      <template v-slot:item.estimatedDeliveryDays="props">
        <v-text-field
          type="number"
          @input="
            props.item.estimatedDeliveryDays =
              $event === '' ? 0 : Number($event)
          "
          :value="props.item.estimatedDeliveryDays"
          suffix="days"
          :min="0"
        ></v-text-field>
      </template>
      <template v-slot:item.actions="props">
        <v-btn
          v-if="brewerySettings.deliveryOptions.length !== 1"
          class="ma-2"
          color="errorMedium"
          dark
          @click="removeDeliveryOption(props.item.id)"
          >Remove</v-btn
        >
      </template>

      <template v-slot:footer>
        <v-flex xs12 class="text-center">
          <v-btn color="successMedium" @click="addNewDelivery" outlined
            >Add New Delivery Option<v-icon>midi-plus</v-icon></v-btn
          >
        </v-flex>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue, Watch } from "vue-property-decorator";
import { BrewerySettings } from "@/store";
import Guid from "@/components/types/guid";

@Component
export default class DeliveryCharges extends Vue {
  @Model("input", { type: Object })
  public brewerySettings!: BrewerySettings;

  @Watch("brewerySettings", { immediate: true })
  public brewerySettingsWatch() {
    if (!this.brewerySettings.deliveryOptions[0]) {
      this.brewerySettings.deliveryOptions.push({
        id: Guid.create().toString(),
        name: "",
        price: 0,
        estimatedDeliveryDays: 0,
      });
    }
  }

  addNewDelivery() {
    this.brewerySettings.deliveryOptions.push({
      id: Guid.create().toString(),
      name: "",
      estimatedDeliveryDays: 0,
      price: 0,
    });
  }

  removeDeliveryOption(id: string) {
    this.brewerySettings.deliveryOptions = this.brewerySettings.deliveryOptions.filter(
      (del) => del.id !== id
    );
  }

  get headers(): object[] {
    return [
      { text: "Name", value: "name" },
      { text: "Price", value: "price" },
      {
        text: "Restricted To Postcode Prefixes",
        value: "restrictedPostcodePrefixes",
      },
      {
        text: "Restricted To Delivery Miles",
        value: "restrictedDeliveryMiles",
      },
      { text: "Estimated Delivery Days", value: "estimatedDeliveryDays" },
      { text: "", value: "actions" },
    ];
  }
}
</script>
