import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      layout: 'main',
      title: 'Interior Designer 3D',
    },
  },
  {
    path: '/designs/showcase',
    name: 'design-showcase',
    component: () => import('@/views/DesignShowcase.vue'),
    meta: {
      layout: 'main',
      title: 'Design Showcase',
    },
  },
  {
    path: '/designs/:id',
    name: 'design-detail',
    component: () => import('@/views/DesignDetail.vue'),
    meta: {
      layout: 'main',
      title: 'Design Detail',
    },
  },
  {
    path: '/my-designs',
    name: 'my-designs',
    component: () => import('@/views/MyDesigns.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
      title: 'My Designs',
    },
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/views/Gallery.vue'),
    meta: {
      layout: 'main',
      title: 'Community Gallery',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      layout: 'main',
      requiresAuth: true,
      title: 'Profile',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      layout: 'auth',
      publicOnly: true,
      title: 'Sign In',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
    meta: {
      layout: 'auth',
      publicOnly: true,
      title: 'Create Account',
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPassword.vue'),
    meta: {
      layout: 'auth',
      publicOnly: true,
      title: 'Password Reset',
    },
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/Editor.vue'),
    meta: {
      layout: 'main',
      title: '3D Scene Editor',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      layout: 'main',
      title: 'Page Not Found',
    },
  },
];

export default routes;
