import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/AuthLoginView.vue';
import AuthRegister from '@/views/AuthRegisterView.vue';  

const routes = [

  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: AuthRegister,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/layouts/default/DefaultLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API_HOST.BASE_URL),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   // const authStore = useAuthStore()
//   const publicPages = ['/login', '/register'];
//   const isPublic = publicPages.includes(to.path);
//   if (!authStore.isAuthenticated) {

//     try {
//       await authStore.fetchUser()
//     } catch (error) {
//       console.error(error)
//     }
//   }
//   if (!authStore.isAuthenticated && isPublic) {

//     return next()
//   }

//   if (isPublic && authStore.isAuthenticated) {
//     return next('/dashboard')
//   }
//   if (!authStore.isAuthenticated) {
//     return isPublic ? next() : next('/login')
//   } 
//   return next()
// });

export default router
