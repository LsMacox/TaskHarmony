
export const useGroupStore = defineStore('group', () => {
  const groupsPermissions = ref([])
  const groups = ref([])
  const groupsTree = ref([])
  const attachedUsers = ref([])

  async function fetchGroups(query)
  {
    try {
      const response = await $api(`/user/groups`, { 
        method: 'GET', 
        query,
      })

      groups.value = response

      return response
    } catch(err) {}
  }

  async function fetchGroupsTree(query)
  {
    try {
      const response = await $api(`/user/groups/tree`, { 
        method: 'GET', 
        query,
      })

      groupsTree.value = response.data

      return response
    } catch(err) {}
  }

  async function fetchGroupPermissions()
  {
    try {
      const response = await $api(`/user/groups/permissions`, { 
        method: 'GET', 
      })

      groupsPermissions.value = response.data
    } catch(err) {}
  }

  async function fetchAttachedUsers(id)
  {
    try {
      const response = await $api(`/user/groups/${id}/attached-users`, { 
        method: 'GET', 
      })

      attachedUsers.value = response.data

      return response
    } catch(err) {}
  }

  return {
    groups,
    groupsTree,
    groupsPermissions,
    fetchGroups,
    fetchGroupsTree,
    fetchGroupPermissions,
    fetchAttachedUsers,
    attachedUsers,
  }
})
