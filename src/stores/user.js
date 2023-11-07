export const useUserStore = defineStore('user', () => {
  const users = ref([])

  async function fetchUsers(query, save = true)
  {
    const response = await $api(`/user/users`, { 
      method: 'GET', 
      query,
    })

    if (save) {
      users.value = response
    }

    return response
  }

  return {
    users,
    fetchUsers,
  }
})
