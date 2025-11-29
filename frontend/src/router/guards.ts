import type { NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router';

const setDocumentTitle = (to: RouteLocationNormalized) => {
  if (typeof to.meta.title === 'string') {
    document.title = `${to.meta.title} | Interior Designer 3D`;
  }
};

export function setupRouterGuards(router: Router) {
  router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    setDocumentTitle(to);

    // Placeholder auth logic; integrate with real auth in Stage 5/6.
    const requiresAuth = Boolean(to.meta.requiresAuth);
    const isPublicOnly = Boolean(to.meta.publicOnly);
    const isAuthenticated = false;

    if (requiresAuth && !isAuthenticated) {
      next({ name: 'login', query: { redirect: to.fullPath } });
      return;
    }

    if (isPublicOnly && isAuthenticated) {
      next({ name: 'home' });
      return;
    }

    next();
  });
}
