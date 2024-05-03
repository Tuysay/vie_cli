<template>
  <div class="home">
    <nav class="navbar">
      <router-link to="/">Main</router-link>
      <router-link to="/cart">Cart</router-link>
      <router-link to="/orders">My orders</router-link>
      <button @click="sortByPrice">Sort by Price</button>
    </nav>
    <div>
      <div v-if="Orders.length === 0">
        <p>Empty!</p>
      </div>
      <div>
        <div v-for="order in sortedOrders" :key="order.id">
          <span>
            <div><p>Order №{{ order.id }}</p></div>
            <div>
              <span>Products: {{ order.products.length }}</span>
              <p class="price">Total cost: {{ order.order_price }}rub.</p>
            </div>
          </span>
        </div>
      </div>
      <button v-if="Orders.length !== 0" @click="toMain">Back</button>
    </div>
  </div>
</template>

<script>
import {thisUrl} from "@/utils/api";

export default {
  data() {
    return {
      Orders: [],
      sortBy: "asc",
      error: '',
    };
  },
  created() {
    this.getProductOrder();
  },
  methods: {
    async getProductOrder() {
      const localToken = localStorage.getItem('userToken');
      if (!localToken) {
        return;
      }
      const url = thisUrl() + "/order";
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localToken}`
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.Orders = result.data;
      }
    },
    toMain() {
      this.$router.push('/');
    },
    sortByPrice() {
      if (this.sortBy === "asc") {
        this.Orders.sort((a, b) => a.order_price - b.order_price);
        this.sortBy = "desc";
      } else {
        this.Orders.sort((a, b) => b.order_price - a.order_price);
        this.sortBy = "asc";
      }
    },
  },
  computed: {
    sortedOrders() {
      return [...this.Orders];
    },
  },
};
</script>

<style>
.home {
  padding: 20px;
}

.navbar {
  background-color: #f4ede6;
  padding: 10px;
  margin-bottom: 20px;
}

.navbar a {
  margin-right: 10px;
  color: #333;
  text-decoration: none;
}

.navbar a:hover {
  color: #b39025;
}

.price {
  font-weight: bold;
}

button {
  background-color: #d4af37;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 5px;
}

button:hover {
  background-color: #b39025;
}

span {
  margin: 0 5px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>