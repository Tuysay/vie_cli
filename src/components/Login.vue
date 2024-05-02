<template>
  <div>
    <nav>
      <router-link to="/">Main</router-link>
      |
      <router-link to="/registration">Sign up</router-link>
      |
      <router-link to="/login">Sign in</router-link>
    </nav>
    <h1>Sign in</h1>
    <div>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="email" required>
        <input type="password" v-model="password" placeholder="Password" minlength="4" required>
        <div>
          <button @click="toMain">Back</button>
          <button type="submit">Login</button>
          <!-- Добавлено -->
          <div v-if="loading" class="loading">Загрузка...</div>
        </div>
      </form>
    </div>
    <!-- Перемещено внутрь блока form -->
    <div v-if="errors" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { thisUrl } from "@/utils/api";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false,
      errors: false,
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        const url = thisUrl() + "/login";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        if (response.ok) {
          const userToken = await response.json();
          localStorage.setItem("userToken", userToken.data.user_token);
          this.$router.push("/");
        } else {
          if (response.status === 401) {
            this.error = "Неправильный логин или пароль";
          } else {
            this.error = "Ошибка входа";
          }
          this.email = "";
          this.password = "";
          this.errors = true;
          setTimeout(() => {
            this.errors = false;
          }, 3000);
        }
      } catch (error) {
        console.error("Ошибка:", error);
        this.error = "Ошибка входа";
        this.email = "";
        this.password = "";
        this.errors = true;
        setTimeout(() => {
          this.errors = false;
        }, 3000);
      } finally {
        this.loading = false;
      }
    },
    toMain() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.loading {
  color: #007bff; /* Цвет загрузки */
  font-size: 14px;
  margin-top: 10px;
}

</style>
