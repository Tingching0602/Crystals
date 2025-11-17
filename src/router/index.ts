import { createWebHistory, createRouter } from 'vue-router'

import Crystal from '../components/crystal.vue'
import Member from '../components/member.vue'
import randomStation from '../components/randomStation.vue'
import Shopping from '../components/shopping.vue'
import Checkout from '../components/checkout.vue'
import OrderHistory from '../components/orderHistory.vue'
import CustomBracelet from '../components/customBracelet.vue'

const routes = [
  { path: '/',name:'crystal', component: Crystal },
  { path: '/member',name:'member', component: Member },
  { path: '/randomStation',name:'randomStation', component: randomStation },
  { path: '/shopcart',name:'shopping', component: Shopping },
  { path: '/checkout',name:'checkout', component: Checkout },
  { path: '/orders',name:'orderHistory', component: OrderHistory },
  { path: '/custom',name:'customBracelet', component: CustomBracelet },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router