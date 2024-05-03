
import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/components/Login.vue";
import Registration from "@/components/Registration.vue";
import Basket from "@/components/Orders.vue";
import Catalog from "@/components/Cart.vue";
import Orders from "@/components/Orders.vue";
import Cart from "@/components/Cart.vue";


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router