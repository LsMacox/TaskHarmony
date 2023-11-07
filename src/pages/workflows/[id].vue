<script setup>
definePage({
  meta: {
    subject: 'Group',
    action: 'viewAny',
  },
})

const route = useRoute('admin-workflows-id')
const router = useRouter()

import Edit from '@/views/apps/workflows/Edit.vue'

const save = () => {
  router.push({ name: 'admin-workflows' })
}
</script>

<template>
  <Edit
    :workflow-id="route.params.id"
    @save="save"
  />
</template>
