<template>
  <div>

    <nav>
      <router-link to="/">Main</router-link>
      |
      <router-link to="/registration">Sign up</router-link>
      |
      <router-link to="/login">Sign in</router-link>
    </nav>
    <h1>Home Page</h1>
    <div>

      <form @submit.prevent="loadData">
        <div>

          <button type="submit">Load Data</button>

          <div v-if="loading" class="loading">Loading...</div>
        </div>
      </form>
    </div>
    <!-- Сообщение об ошибке -->
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="data">{{ data }}</div>
  </div>
</template>

<script>
import { thisUrl } from "@/utils/api";

export default {
  data() {
    return {
      loading: false,
      error: "",
      data: null,
    };
  },
  methods: {
    async loadData() {
      try {
        this.loading = true;
        const url = thisUrl() + "/data";
        const response = await fetch(url);
        if (response.ok) {
          this.data = await response.json();
        } else {
          throw new Error("Failed to load data");
        }
      } catch (error) {
        console.error("Error:", error);
        this.error = "Failed to load data";
        throw error;
      } finally {
        this.loading = false;
      }
    }
  },
};
</script>
<style>
form {
  margin-top: 20px;
}

.loading {
  color: #333;
  font-size: 18px;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}




button {
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

button:hover {
  background-color: #b39025;
}

input {
  border: 1px solid #d4af37;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #b39025;
}

textarea {
  border: 1px solid #d4af37;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  height: 50px;
  resize: none;
}
</style>

