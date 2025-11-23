import { createWebHistory, createRouter } from 'vue-router'

import Crystal from '../components/crystal.vue'
import Member from '../components/member.vue'
import randomStation from '../components/randomStation.vue'
import Shopping from '../components/shopping.vue'
import Checkout from '../components/checkout.vue'
import OrderHistory from '../components/orderHistory.vue'
import CustomBracelet from '../components/customBracelet.vue'
import Admin from '../components/admin.vue'

const routes = [
  { path: '/',name:'crystal', component: Crystal },
  { path: '/member',name:'member', component: Member },
  { path: '/randomStation',name:'randomStation', component: randomStation },
  { path: '/shopcart',name:'shopping', component: Shopping },
  { path: '/checkout',name:'checkout', component: Checkout },
  { path: '/orders',name:'orderHistory', component: OrderHistory },
  { path: '/custom',name:'customBracelet', component: CustomBracelet },
  { 
    path: '/admin',
    name:'admin', 
    component: Admin,
    meta: { requiresAdmin: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守衛 - 保護 admin 路由
router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAdmin) {
    const currentUser = sessionStorage.getItem('currentUser');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (isLoggedIn && currentUser === 'Admin') {
      next();
    } else {
      alert('無權限訪問此頁面');
      next('/');
    }
  } else {
    next();
  }
})

export default router