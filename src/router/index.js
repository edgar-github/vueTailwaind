import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Products',
      component: import('../components/Products.vue')
    },
    {
      path: '/products/:slug',
      name: 'product-details',
      component: () => import('../components/ProductDetails.vue')
    },
    {
      path: "/:pathMatch(.*)*",  component: () => import('../components/templates/404.vue')
    }
  ]
})

export default router
