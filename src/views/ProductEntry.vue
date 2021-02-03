<template>
  <div>
    <v-card
      title="product Entry"
      class="mx-md-12 my-5"
      v-for="product in brewerySettings.products"
      :key="product.id.toString()"
    >
      <v-container pa-0>
        <v-layout wrap>
          <v-flex xs12 sm7 pa-4>
            <v-text-field
              v-model="product.name"
              label="Product Name"
              :rules="[(v) => !!v || 'Product Name is required']"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm7 pa-2>
            <template v-if="product.image">
              <img class="user-image" :src="product.image" height="250" />
              <v-btn class="mt-2" @click="product.image = ''">Change</v-btn>
            </template>
            <v-file-input
              v-else
              @change="uploadProductImage(product, $event)"
              label="Image Upload"
              prepend-icon="mdi-camera"
              accept="image/png, image/jpeg, image/bmp, image/svg"
              :rules="[
                (value) =>
                  !value ||
                  value.size < 10000000 ||
                  'Image size should be less than 10 MB',
              ]"
            ></v-file-input>
          </v-flex>
          <v-flex xs12 sm7 pa-4>
            <v-textarea
              v-model="product.description"
              label="Product Description"
            ></v-textarea>
          </v-flex>

          <v-flex xs12 pa-2>
            <v-data-table
              disable-pagination
              disable-filtering
              disable-sort
              hide-default-footer
              :headers="getHeaders(product)"
              :items="product.variants"
              class="xs12"
              item-key="id"
            >
              <template v-slot:item.size="props">
                <v-text-field
                  v-if="props.item.option"
                  v-model="props.item.option[0].value"
                  :rules="[(v) => !!v || 'Size is required']"
                  required
                ></v-text-field>
              </template>

              <template v-slot:item.price="props">
                <v-text-field
                  type="number"
                  :rules="[(v) => v >= 0 || 'Product Price is required']"
                  @input="props.item.price = $event === '' ? 0 : Number($event)"
                  :value="props.item.price"
                  :min="0"
                  prefix="£"
                ></v-text-field>
              </template>
              <template v-slot:item.sku="props">
                <v-text-field
                  :rules="[(v) => !!v || 'Brewman Code is required']"
                  v-model="props.item.sku"
                ></v-text-field>
              </template>
              <template v-slot:item.quantityInStock="props">
                <v-text-field
                  type="number"
                  @input="
                    props.item.quantityInStock =
                      $event === '' ? 0 : Number($event)
                  "
                  :value="props.item.quantityInStock"
                ></v-text-field>
              </template>
              <template v-slot:item.actions="props">
                <v-btn
                  v-if="product.variants.length > 1"
                  class="ma-2"
                  color="errorMedium"
                  dark
                  @click="removeVariant(props.item, product)"
                  >Remove</v-btn
                >
              </template>
              <template v-slot:footer>
                <v-flex xs12 class="text-center">
                  <v-btn
                    class="mt-3"
                    color="successMedium"
                    @click="addNewVariant(product)"
                    outlined
                    >Add New Variant</v-btn
                  >
                </v-flex>
              </template>
            </v-data-table>
          </v-flex>
          <v-flex xs12 pa-2 class="text-right">
            <v-divider></v-divider>
            <v-btn
              class="ma-2"
              color="errorMedium"
              dark
              @click="deleteProduct(product)"
              >Delete</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <v-flex xs12 pr-12 pl-3 pt-1 class="text-right">
      <v-btn class="mb-12" dark color="successMedium" @click="addNewProduct"
        >Add New Product</v-btn
      >
    </v-flex>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Model, Watch } from "vue-property-decorator";
import Guid from "@/components/types/guid";
import { BrewerySettings, Product, ProductVariant, saveImage } from "@/store";
import DeliveryCharges from "@/views/DeliveryCharges.vue";

interface Header {
  text: string;
  value: string;
  align?: string;
  sortable?: boolean;
}

@Component({
  components: { DeliveryCharges },
})
export default class ProductEntry extends Vue {
  @Model("input", { type: Object })
  public brewerySettings!: BrewerySettings;

  getHeaders(product: Product) {
    const headers: Header[] = [];
    if (product.variants.length > 1) {
      headers.push({ text: "Size", value: "size" });
    }
    headers.push(
      { text: "Price", value: "price" },
      { text: "Brewman Product Code / SKU", value: "sku" },
      { text: "Quantity In Stock", value: "quantityInStock" },
      { text: "", value: "actions" }
    );
    return headers;
  }

  @Watch("brewerySettings")
  brewerySettingsWatcher() {
    if (this.brewerySettings && this.brewerySettings.products.length < 1) {
      this.addNewProduct();
    }
  }

  async uploadProductImage(product: Product, file: File) {
    if (file) {
      product.image = await saveImage(
        this.brewerySettings.id + "/" + product.id + "/" + file.name,
        file
      );
      this.$forceUpdate();
    }
  }

  addNewProduct() {
    this.brewerySettings?.products.push(this.createNewProduct());
  }

  addNewVariant(product: Product) {
    product.variants.push(this.createNewVariant());
  }

  deleteProduct(productToRemove: Product) {
    if (this.brewerySettings) {
      this.brewerySettings.products = this.brewerySettings?.products.filter(
        (product) => !(product.id === productToRemove.id)
      );
    }
  }

  removeVariant(variantToRemove: ProductVariant, product: Product) {
    product.variants = product.variants.filter(
      (variant) => !(variant.id === variantToRemove.id)
    );
  }

  createNewProduct() {
    const newProduct: Product = {
      id: Guid.create().toString(),
      name: "",
      description: "",
      image: "",
      variants: [this.createNewVariant()],
    };
    return newProduct;
  }

  createNewVariant() {
    const variant: ProductVariant = {
      id: Guid.create().toString(),
      option: [
        {
          name: "size",
          value: "",
        },
      ],
      price: 0,
      sku: "",
    };
    return variant;
  }
}
</script>
