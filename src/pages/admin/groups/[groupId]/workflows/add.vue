<script setup>
definePage({
  meta: {
    subject: 'Group',
    action: 'viewAny',
  },
})

const adminWorkflowStore = useAdminWorkflowStore()
const route = useRoute('admin-groups-groupId-workflows-add')
const router = useRouter()

import Edit from '@/views/apps/workflows/Edit.vue'

const save = () => {
  router.push({ name: 'admin-workflows' })
}
</script>

<template>
  <Edit
    :group-id="route.params.groupId"
    @save="save"
  />
</template>
