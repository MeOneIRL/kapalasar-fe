<template>
  <div>
    <Navbar />
    <div>
      <v-container>
        <v-card color="#a6cb26">
          <v-container>
            <span class="white--text text-h6 font-weight-medium"
              >Kantong Belanja</span
            >
          </v-container>
        </v-card>
        <v-alert
          class="my-5"
          border="top"
          colored-border
          color="#F99F39"
          elevation="2"
        >
          <v-container>
            <span
              class="label text-h6 font-weight-medium"
              style="color: #54595f"
              >Informasi Pembeli</span
            >
            <div class="mx-md-16 mt-md-10 mt-2">
              <v-form>
                <div>
                  <span class="label font-weight-bold">Nama</span>
                  <v-text-field
                    placeholder="Naufal Bimantara"
                    single-line
                    outlined
                    dense
                    v-model="nama"
                  ></v-text-field>
                </div>
                <div>
                  <span class="label font-weight-bold">Nomor Telepon</span>
                  <v-text-field
                    placeholder="081224327653"
                    outlined
                    single-line
                    dense
                    v-model="telepon"
                  ></v-text-field>
                </div>
                <div>
                  <span class="label font-weight-bold">Alamat Pengiriman</span>
                  <v-textarea
                    placeholder="Jalan Ibrahim Adjie No.103"
                    outlined
                    rows="2"
                    auto-grow
                    v-model="alamat"
                  ></v-textarea>
                </div>
              </v-form>
            </div>
          </v-container>
        </v-alert>
        <v-alert
          class="my-5"
          border="top"
          colored-border
          color="#F99F39"
          elevation="2"
        >
          <v-container>
            <span
              class="label text-h6 font-weight-medium"
              style="color: #54595f"
              >Produk</span
            >
            <div class="mx-md-16">
              <div>
                <v-row class="mx-1">
                  <v-checkbox color="#a6cb26"></v-checkbox>
                  <span class="label pa-4 font-weight-medium">
                    Pilih Semua Produk</span
                  >
                </v-row>
              </div>
              <div v-for="(product, i) in listCart" :key="i">
                <product-cart-list
                  @getTotalPrice="getTotalPrice"
                  :listCart="product"
                />
                <v-divider class="mt-3"></v-divider>
              </div>
            </div>
            <div class="mt-6 mx-md-16">
              <v-row class="mx-1">
                <div class="label text-h6">Total Belanja</div>
                <v-spacer></v-spacer>
                <div class="totalPrice text-h6">
                  {{ parseRupiah(totalPrice) }}
                </div>
              </v-row>
            </div>
          </v-container>
        </v-alert>
        <div class="text-center">
          <v-btn @click="addBuyersInfo" color="#a6cb26" dark to="/payment">
            Lanjut Pembayaran
          </v-btn>
        </div>
      </v-container>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import ProductCartList from "../components/productCartList";
import { products } from "../dummyData/dummy.js";

export default {
  components: {
    Navbar,
    Footer,
    ProductCartList
  },
  data() {
    return {
      products,
      nama: "",
      telepon: "",
      alamat: "",
      listCart: [],
      totalPrice: 0
    };
  },
  methods: {
    parseRupiah(strMoney) {
      return parseInt(strMoney).toLocaleString("id", {
        style: "currency",
        currency: "IDR"
      });
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    addBuyersInfo() {
      const data = {
        nama: this.nama,
        telepon: this.telepon,
        alamat: this.alamat
      };
      console.log(data);
    },
    getProductList() {
      const state = this.$store.state.cart.listCarts;
      products.forEach(product => {
        state.forEach(item => {
          if (item.id == product.id) {
            const cart = {
              qty: item.qty,
              ...product
            };
            this.listCart.push(cart);
          }
        });
      });
      console.log(this.listCart);
    },
    getTotalPrice() {
      this.totalPrice = this.$store.state.cart.totalPrice;
    }
  },
  mounted() {
    this.scrollToTop();
    this.getProductList();
  }
};

Navbar;
</script>

<style scoped>
.label {
  color: #54595f;
}
.totalPrice {
  color: #f99f39;
}
</style>
