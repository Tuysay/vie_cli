<template>
  <div>
    <nav>
      <router-link to="/">Main</router-link>
      |
      <router-link to="/registration">Sign up</router-link>
    </nav>
    <h1>Sign up</h1>
    <div>
      <form @submit.prevent="register" class="register">
        <input v-model="fio" placeholder="fio">
        <input type="email" v-model="email" placeholder="email" required>
        <input type="password" v-model="password" placeholder="Password" minlength="4" required>
        <div>
          <button @click="toMain">Back</button>
          <button type="submit">Sign up</button>
          <div v-if="loading" class="loading">Загрузка...</div>
        </div>

      </form>

    </div>
    <div v-if="errors">
      {{ error }}
    </div>
  </div>
</template>

<script>
import {thisUrl} from "@/utils/api";
export default {
  data() {
    return {
      fio: '',
      email: '',
      password: '',
      error: '',
      loading: false,
      errors: ''
    }
  },
  methods: {
    async register() {
      try {
        this.loading = true;
        const url = thisUrl() + "/signup";
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fio: this.fio,
            email: this.email,
            password: this.password
          })
        });

        if (response.ok) {
          this.$router.push('/login');
        } else {
          if (response.status === 409) {
            this.error = 'Пользователь с таким email уже существует';
          } else {
            this.error = 'Ошибка регистрации';
          }
          this.fio = ''
          this.email = ''
          this.password = ''
          this.errors = true;
          setTimeout(() => {
            this.errors = false;
          }, 3000);
        }
      } catch (error) {
        console.error('Ошибка:', error);
        this.error = 'Ошибка регистрации';
        this.fio = ''
        this.email = ''
        this.password = ''
        this.errors = true;
        setTimeout(() => {
          this.errors = false;
        }, 3000);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>