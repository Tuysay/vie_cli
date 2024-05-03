<template>
  <div>
    <nav>
      <router-link to="/">Main</router-link>
      |
      <router-link to="/cart">Cart</router-link>
      |
      <router-link to="/orders">My orders</router-link>
    </nav>
    <div>
      <h1>Orders</h1>
      <div v-if="productsCart.length === 0">
        <p>Empty!</p>
      </div>
      <div>
        <div v-for="product in productsCart" :key="product.id">
      <span>
        <div>
          {{ product.name }}
        </div>
        <div>
            <span>
            {{ product.description }}
          </span>
          <p>
            {{ product.price }}rub.
          </p>
          <div>

          </div>
        </div>
      </span>
        </div>
      </div>
      <div>
        <button v-if="productsCart.length !== 0" @click="toMain">Back</button>
        <button v-if="productsCart.length !== 0" @click="addToMyOrder(product)" type="submit">Order</button>
      </div>
    </div>
  </div>
</template>

<script>
import {thisUrl} from "@/utils/api";
export default {
  name: 'Cart',
  data() {
    return {
      productsCart: [],
      myOrder: [],
      quantity: 1
    };
  },
  created() {
    this.getProductCart();
  },
  mounted() {
    if (localStorage.getItem('quantity')) {
      this.quantity = JSON.parse(localStorage.getItem('quantity'));
    }
  },
  methods: {
    async getProductCart() {
      const localToken = localStorage.getItem('userToken');
      if (!localToken) {
        return;
      }
      const url = thisUrl() + "/cart";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localToken}`
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.productsCart = result.data
      }

    },




    async addToMyOrder(product) {
      const url = thisUrl() + '/order';
      const userToken = localStorage.getItem('userToken');
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userToken}`
        }
      });
    }
  }
}


</script>
