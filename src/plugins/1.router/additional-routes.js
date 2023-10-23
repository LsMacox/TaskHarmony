const emailRouteComponent = () => import('@/pages/ui/apps/email/index.vue')

// 👉 Redirects
export const redirects = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/',
    name: 'index',
    redirect: to => {
      // TODO: Get type from backend
      const accessToken = useCookie('accessToken')

      // const userData = useCookie('userData')
      // const userRole = userData.value?.role
      if (accessToken)
        return { name: 'file-archive' }

      // if (userRole === 'client')
      //   return { name: 'access-control' }

      return { name: 'login', query: to.query }
    },
  },
  {
    path: '/ui/pages/user-profile',
    name: 'ui-pages-user-profile',
    redirect: () => ({ name: 'ui-pages-user-profile-tab', params: { tab: 'profile' } }),
  },
  {
    path: '/ui/pages/account-settings',
    name: 'ui-pages-account-settings',
    redirect: () => ({ name: 'ui-pages-account-settings-tab', params: { tab: 'account' } }),
  },
]
export const routes = [
  // Email filter
  {
    path: '/ui/apps/email/filter/:filter',
    name: 'ui-apps-email-filter',
    component: emailRouteComponent,
    meta: {
      navActiveLink: 'ui-apps-email',
      layoutWrapperClasses: 'layout-content-height-fixed',
    },
  },

  // Email label
  {
    path: '/apps/email/label/:label',
    name: 'ui-apps-email-label',
    component: emailRouteComponent,
    meta: {
      // contentClass: 'email-application',
      navActiveLink: 'ui-apps-email',
      layoutWrapperClasses: 'layout-content-height-fixed',
    },
  },
  {
    path: '/ui/dashboards/logistics',
    name: 'ui-dashboards-logistics',
    component: () => import('@/pages/ui/apps/logistics/dashboard.vue'),
  },
  {
    path: '/ui-dashboards/academy',
    name: 'ui-dashboards-academy',
    component: () => import('@/pages/ui/apps/academy/dashboard.vue'),
  },
  {
    path: '/ui/apps/ecommerce/dashboard',
    name: 'ui-apps-ecommerce-dashboard',
    component: () => import('@/pages/ui/dashboards/ecommerce.vue'),
  },
]
