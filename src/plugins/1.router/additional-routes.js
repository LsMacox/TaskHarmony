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
      if (accessToken.value)
        return { name: 'groups' }

      return { name: 'login', query: to.query }
    },
  },
]
export const routes = [
  // {
  //   path: '/admin/groups/workflows/:id',
  //   name: 'admin-group-workflow',
  //   component: () => import('@/pages/admin/workflows/[id].vue'),
  // },
]
