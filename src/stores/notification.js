
export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])

  async function fetchNotifications(query)
  {
    const response = await $api(`/user/notifications`, { 
      method: 'GET', 
      query,
    })

    users.value = response

    return response
  }

  return {
    notifications,
    fetchNotifications,
  }
})
