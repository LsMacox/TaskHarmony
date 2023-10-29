
export const useAdminGroupStore = defineStore('admin-group', () => {
  const groups = ref([])
  const group = ref({})
  const groupsTree = ref([])
  const attachedUsers = ref([])

  async function fetchGroups(query, save = true)
  {
    const response = await $api(`/admin/groups`, { 
      method: 'GET', 
      query,
    })

    if (save) {
      groups.value = response
    }

    return response
  }

  async function fetchGroupsTree(query)
  {
    try {
      const response = await $api(`/admin/groups/tree`, { 
        method: 'GET', 
        query,
      })

      groupsTree.value = response.data

      return response
    } catch(err) {}
  }

  async function fetchAttachedUsers(id)
  {
    try {
      const response = await $api(`/admin/groups/${id}/attached-users`, { 
        method: 'GET', 
      })

      attachedUsers.value = response.data

      return response
    } catch(err) {}
  }

  async function showGroup(id)
  {
    try {
      const response = await $api(`/admin/groups/${id}`, { 
        method: 'GET', 
      })

      group.value = response.data
    } catch(err) {}
  }

  async function storeGroup(data)
  {
    try {
      await $api(`/admin/groups`, { 
        method: 'POST', 
        body: data,
      })

      toast.success('Success!')
    } catch(err) {}
  }

  async function updateGroup(id, data)
  {
    try {
      await $api(`/admin/groups/${id}`, { 
        method: 'PATCH', 
        body: removeEmptyKeys(data),
      })

      toast.success('Success!')
    } catch(err) {}
  }

  async function deleteGroup(id)
  {
    try {
      await $api(`/admin/groups/${id}`, { 
        method: 'DELETE', 
      })

      toast.success('Group deleted!')
    } catch(err) {}
  }

  return {
    groups,
    group,
    groupsTree,
    attachedUsers,
    fetchGroups,
    fetchGroupsTree,
    fetchAttachedUsers,
    showGroup,
    storeGroup,
    updateGroup,
    deleteGroup,
  }
})
