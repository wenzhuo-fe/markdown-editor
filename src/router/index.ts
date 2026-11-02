import { createRouter, createWebHistory } from 'vue-router'
import EditorLayout from '@/views/EditorLayout/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    component: EditorLayout
  }],
})

export default router
