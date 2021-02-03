<template>
  <v-form ref="form" lazy-validation v-model="valid">
    <div v-if="brewerySettings">
      <v-container pb-12>
        <v-row justify="center" class="pb-4">
          <h1>Craft Beer Drop - Brewery Setup Form</h1>
        </v-row>
        <h2>1. Brewery Information</h2>
        <h3>
          This information will be used to set the tone for your brand and to
          let customers get to know your brewery.
        </h3>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="brewerySettings.name"
              label="Brewery Name"
              required
              disabled
              :rules="[(v) => !!v || 'Name is required']"
            >
            </v-text-field>
            <v-text-field
              v-model="brewerySettings.addressPostcode"
              label="Brewery Postcode"
              hint="Used to calculate delivery distances"
              placeholder="e.g. AB13 9DA"
              required
              :rules="[(v) => !!v || 'Postcode is required']"
            >
            </v-text-field>
            <template v-if="brewerySettings.image">
              <h4>Company Logo</h4>
              <img
                class="user-image"
                :src="brewerySettings.image"
                height="250"
              />
              <v-btn class="mb-4 mt-1" @click="brewerySettings.image = ''"
                >Change</v-btn
              >
            </template>
            <v-file-input
              v-else
              @change="uploadBreweryImage($event)"
              label="Company Logo"
              prepend-icon="mdi-camera"
              accept="image/png, image/jpeg, image/bmp, image/svg"
              :rules="[
                (value) =>
                  !value ||
                  value.size < 10000000 ||
                  'Image size should be less than 10 MB',
              ]"
              class="mb-4"
            ></v-file-input>

            <template v-if="brewerySettings.coverImage">
              <h4>Cover Image</h4>
              <img
                class="user-image"
                :src="brewerySettings.coverImage"
                height="250"
              />
              <v-btn class="mb-4 mt-1" @click="brewerySettings.coverImage = ''"
                >Change</v-btn
              >
            </template>
            <v-file-input
              v-else
              @change="uploadBreweryCoverImage($event)"
              label="Cover Image"
              persistent-hint
              hint="This image will be used on the page that lists breweries
              delivering to the customer and the product list page.
              (We would recommend an image that has a ration of 16:9 and is
              at least 2000px wide to prevent fuzziness)"
              prepend-icon="mdi-camera"
              accept="image/png, image/jpeg, image/bmp, image/svg"
              :rules="[
                (value) =>
                  !value ||
                  value.size < 10000000 ||
                  'Image size should be less than 10 MB',
              ]"
              class="mb-4"
            ></v-file-input>

            <v-textarea
              v-model="brewerySettings.description"
              label="Brewery Page Description"
              :rules="[(v) => !!v || 'Brewery page description is required']"
              hint="Approx. 100 words to describe your brewery. This will appear above your products on the product list page."
            ></v-textarea>
            <v-text-field
              v-model="brewerySettings.brewmanTenant"
              label="Your Brewman account name"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <h2>2. Delivery Options</h2>
        <h3>Add delivery information and costs to the table below</h3>

        <v-row>
          <v-col>
            <delivery-charges v-model="brewerySettings" />
          </v-col>
        </v-row>
        <h2>3. Products</h2>
        <h3>
          Let us know what products you would like to sell through the site
        </h3>
        <v-row>
          <product-entry v-model="brewerySettings" />
        </v-row>

        <h2>Got Questions?</h2>
        <p>
          Get in touch, you can email us at
          <a href="mailto:support@premiersystems.com"
            >support@premiersystems.com</a
          >
          or give us a call on
          <a href="tel:+44 (0)2380 811 100">+44 (0)2380 811 100</a>
        </p>
      </v-container>
    </div>
    <v-app-bar fixed bottom color="primary accent-4" dense class="text-right">
      <v-container fluid>
        <v-row>
          <v-col>
            <span v-if="!valid" style="color: lightsalmon; margin-right: 10px;"
              >There are errors on the form above, please fix them to save</span
            >
            <v-btn :disabled="!valid" @click="save">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import Guid from "@/components/types/guid";
import {
  BrewerySettings,
  getBrewerySettings,
  saveBrewerySettings,
  saveImage,
} from "@/store";
import DeliveryCharges from "@/views/DeliveryCharges.vue";
import ProductEntry from "@/views/ProductEntry.vue";

@Component({
  components: { ProductEntry, DeliveryCharges },
})
export default class Brewery extends Vue {
  @Prop({ type: String, default: "", required: false })
  public breweryId!: string;

  private brewerySettings: BrewerySettings | null = null;
  private valid = true;

  @Watch("breweryId", { immediate: true })
  public async breweryIdWatch() {
    if (Guid.isGuid(this.breweryId)) {
      const breweryGuid = Guid.parse(this.breweryId);
      this.brewerySettings = await getBrewerySettings(breweryGuid.toString());
    }

    if (this.brewerySettings === null) {
      await this.$router.push("/");
    }
  }

  async uploadBreweryImage(file: File) {
    if (this.brewerySettings && file) {
      this.brewerySettings.image = await saveImage(
        this.brewerySettings.id + "/" + file.name,
        file
      );
      this.$forceUpdate();
    }
  }

  async uploadBreweryCoverImage(file: File) {
    if (this.brewerySettings && file) {
      this.brewerySettings.coverImage = await saveImage(
        this.brewerySettings.id + "/cover/" + file.name,
        file
      );
      this.$forceUpdate();
    }
  }

  save() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (this.brewerySettings && (this.$refs["form"] as any).validate()) {
      saveBrewerySettings(this.breweryId, this.brewerySettings);
      alert("Saved!");
    } else {
      alert("Save unsuccessful. Please fix errors on the page and try again");
    }
  }
}
</script>

<style lang="stylus">
.user-image
  max-width: 100%
  height: auto
  display: block
</style>
