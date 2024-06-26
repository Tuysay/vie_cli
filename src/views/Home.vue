<template>
  <div class="home">
    <nav class="navbar">
      <router-link to="/">Main</router-link>
      |
      <span v-if="!isAuthenticated">
          <router-link to="/registration">Sing up</router-link>
        |
          <router-link to="/login">Sign in</router-link>
        |
        </span>
      <span v-if="isAuthenticated">
          <router-link to="/" @click="logout">Sign out</router-link>
        |
          <router-link to="/cart">Catalog</router-link>
        |
          <router-link to="/orders">My orders</router-link>
        <a href="#" class="tooltip">
        <span>Hover me</span>
        <div class="tooltip-text">
          <img src="../assets/Screenshot%202024-05-03%20150332.png" alt="Image">
        </div>
      </a>
        </span>
    </nav>
    <div>
      <h1>Product list:</h1>
      <div>
        <div v-for="product in products" :key="product.id" class="product">
          <div>
            <h2>{{ product.name }}</h2>
          </div>
          <div>
            <span>{{ product.description }}</span>
            <p>{{ product.price }}rub.</p>
            <button v-if="isAuthenticated" @click="addToCart(product)" type="submit" class="btn">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="added" class="success-message">
      <p>Товар успешно добавлен в корзину!</p>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

  </div>
</template>

<script>
import { thisUrl } from "@/utils/api";

export default {
  name: 'Home',
  data() {
    return {
      products: [],
      productsInCart: [],
      added: false,
      error: '',
    }
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      const url = thisUrl() + "/products";
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          this.products = result.data;
        } else {
          Error("Error fetching products");
        }
      } catch (error) {
        console.error("Error:", error);
        this.error = "Error fetching products";
      }
    },
    async addToCart(product) {
      try {
        const productId = product.id;
        const url = thisUrl() + `/cart/${productId}`;
        const userToken = localStorage.getItem('userToken');

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          }
        });

        if (!response.ok) {
          Error("Failed to add product to cart");
        }

        const existingItemIndex = this.productsInCart.findIndex(item => item.id === product.id);
        if (existingItemIndex !== -1) {
          this.productsInCart[existingItemIndex].quantity++;
        } else {
          this.productsInCart.push({ ...product, quantity: 1 });
        }

        this.added = true;
        await new Promise(resolve => setTimeout(resolve, 2000)); // Ожидание 2 секунды
        this.added = false;
      } catch (error) {
        console.error("Error:", error);
        this.error = error.message || "Failed to add product to cart";
      }
    },
    logout() {
      localStorage.removeItem('userToken');
      this.$router.push('/');
      location.reload();
    }
  },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('userToken');
    }
  }
}
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

.product {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}

.success-message {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}

.btn {
  background-color: #d4af37;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #b39025;
}

.tooltip {
  position: relative;
  display: inline-block;
  text-decoration: none;
}

.tooltip-text {
  visibility: hidden;
  width: 120px;
  background-color: #fff;
  color: #000;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 1;
  top: 110%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>