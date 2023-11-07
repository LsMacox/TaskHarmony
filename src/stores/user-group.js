import { useToast } from "vue-toast-notification"

export const useUserGroupStore = defineStore('user-group', () => {
  const userGroupPermissions = ref()

  const toast = useToast()

  async function syncUsers(groupId, userIds)
  {
    try {
      await $api(`/user/users/groups/${groupId}/sync-users`, { 
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
      const response = await $api(`/user/users/${userId}/groups/${groupId}/group-permissions`, { 
        method: 'GET', 
      })

      userGroupPermissions.value = response.permissions

      return response
    } catch(err) {}
  }

  async function updateGroupPermissions(userId, groupId, permissions)
  {
    try {
      await $api(`/user/users/${userId}/groups/${groupId}/update-group-permissions`, { 
        method: 'POST', 
        body: permissions,
      })

      toast.success('Permissions updated!')
    } catch(err) {}
  }

  return {
    fetchGroupPermissions,
    userGroupPermissions,
    syncUsers,
    updateGroupPermissions,
  }
})
