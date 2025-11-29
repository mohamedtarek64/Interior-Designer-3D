import { createRouter, createWebHistory, type Router } from 'vue-router';

import routes from './routes';
import { setupRouterGuards } from './guards';

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' };
  },
});

setupRouterGuards(router);

export default router;
