import { createRouter, createWebHistory } from 'vue-router'
import MenuDetailView from '../views/MenuDetailView.vue'

import HomeView from '../views/HomeView.vue'
import TrendingView from '../views/TrendingView.vue'
import CartView from '../views/CartView.vue'
import FavoriteView from '../views/FavoriteView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:mejaId?',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/trending',
      name: 'trending',
      component: TrendingView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoriteView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/menu/:id',
      name: 'menu-detail',
      component: MenuDetailView,
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('@/views/PaymentMethodView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue')
    }


  ],
})

export default router
