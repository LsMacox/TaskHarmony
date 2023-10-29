import { useToast } from "vue-toast-notification"

export const useAdminUserGroupStore = defineStore('admin-user-group', () => {
  const userGroups = ref([])
  const userGroupsTree = ref([])
  const userGroupPermissions = ref()

  const toast = useToast()

  async function fetchUserGroups(id)
  {
    try {
      const response = await $api(`/admin/users/${id}/groups`, { 
        method: 'POST', 
      })

      userGroups.value = response

      return response
    } catch(err) {}
  }

  async function fetchUserGroupsTree(id)
  {
    try {
      const response = await $api(`/admin/users/${id}/groups`, { 
        method: 'POST', 
      })

      userGroupsTree.value = response.data

      return response
    } catch(err) {}
  }

  async function syncUsers(groupId, userIds)
  {
    try {
      await $api(`/admin/users/groups/${groupId}/sync-users`, { 
        method: 'POST', 
        body: {
          user_ids: userIds,
        },
      })

      toast.success('User attached to group succesfully!')

      return response
    } catch(err) {}
  }

  async function fetchGroupPermissions(userId, groupId)
  {
    try {
      const response = await $api(`/admin/users/${userId}/groups/${groupId}/group-permissions`, { 
        method: 'GET', 
      })

      userGroupPermissions.value = response.permissions

      return response
    } catch(err) {}
  }

  async function updateGroupPermissions(userId, groupId, permissions)
  {
    try {
      await $api(`/admin/users/${userId}/groups/${groupId}/update-group-permissions`, { 
        method: 'POST', 
        body: permissions,
      })

      toast.success('Permissions updated!')
    } catch(err) {}
  }

  return {
    userGroups,
    userGroupsTree,
    fetchUserGroups,
    fetchUserGroupsTree,
    fetchGroupPermissions,
    userGroupPermissions,
    syncUsers,
    updateGroupPermissions,
  }
})
