import { useToast } from "vue-toast-notification"

export const useAdminUserStore = defineStore('admin-user', () => {
  const user = ref({})
  const users = ref([])
  const toast = useToast()

  async function fetchUsers(query)
  {
    const response = await $api(`/admin/users`, { 
      method: 'GET', 
      query,
    })

    users.value = response

    return response
  }

  function flushUser()
  {
    user.value = null
  }

  async function showUser(id)
  {
    try {
      const response = await $api(`/admin/users/${id}`, { 
        method: 'GET', 
      })

      user.value = response.data
    } catch(err) {}
  }

  async function storeUser(data)
  {
    try {
      await $api(`/admin/users`, { 
        method: 'POST', 
        body: data,
      })

      toast.success('Success!')
    } catch(err) {}
  }

  async function updateUser(id, data)
  {
    try {
      await $api(`/admin/users/${id}`, { 
        method: 'PUT', 
        body: removeEmptyKeys(data),
      })

      toast.success('Success!')
    } catch(err) {}
  }

  async function deleteUser(id)
  {
    try {
      await $api(`/admin/users/${id}`, { 
        method: 'DELETE', 
      })

      toast.success('User deleted!')
    } catch(err) {}
  }

  return {
    user,
    users,
    flushUser,
    fetchUsers,
    showUser,
    storeUser,
    updateUser,
    deleteUser,
  }
})
