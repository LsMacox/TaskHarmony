<script setup>
definePage({
  meta: {
    subject: 'UserGroup',
    action: 'create',
  },
})

const workflowStore = useWorkflowStore()
const route = useRoute('groups-groupId-workflows-add')
const router = useRouter()

import Edit from '@/views/apps/workflows/Edit.vue'

const save = () => {
  router.push({ name: 'workflows' })
}
</script>

<template>
  <Edit
    :group-id="route.params.groupId"
    is-user
    @save="save"
  />
</template>
