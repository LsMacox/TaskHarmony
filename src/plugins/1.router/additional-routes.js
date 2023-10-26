const groupRouteComponent = () => import('@/components/groups')

// 👉 Redirects
export const redirects = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/',
    name: 'index',
    redirect: to => {
      const accessToken = useCookie('accessToken')

      // const userRole = userData.value?.roles
      console.log(accessToken)
      if (accessToken.value)
        return { name: 'groups' }

      return { name: 'login', query: to.query }
    },
  },
]
export const routes = [
  // {
  //   path: '/groups',
  //   name: 'groups',
  //   component: () => import('@/pages/groups.vue'),
  //   meta: {
  //     navActiveLink: 'groups',
  //     resource: 'UserGroup',
  //     action: 'viewAny',
  //   },
  // },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('@/pages/archive.vue'),
    meta: {
      navActiveLink: 'archive',
      resource: 'Archive',
      action: 'viewAny',
    },
  },
  {
    path: '/access-groups',
    name: 'access-groups',
    component: () => import('@/pages/access-groups.vue'),
    meta: {
      navActiveLink: 'access-groups',
      resource: 'Group',
      action: 'viewAny',
    },
  },
  {
    path: '/access-users',
    name: 'access-users',
    component: () => import('@/pages/access-users/list/index.vue'),
    meta: {
      navActiveLink: 'access-users',
      resource: 'User',
      action: 'viewAny',
    },
  },
]
