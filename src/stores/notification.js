
export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])

  async function fetchNotifications(query)
  {
    const response = await $api(`/user/notifications`, { 
      method: 'GET', 
      query,
    })

    notifications.value = response.data

    return response
  }

  async function mark(ids)
  {
    return await $api(`/user/notifications/mark`, { 
      method: 'PUT', 
      body: { ids },
    })
  }

  return {
    notifications,
    fetchNotifications,
    mark,
  }
})
