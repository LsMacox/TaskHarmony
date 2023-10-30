<script setup>
definePage({
  meta: {
    subject: 'Group',
    action: 'viewAny',
  },
})

const route = useRoute('admin-groups-groupId-workflows-add')

import Edit from '@/views/apps/workflows/Edit.vue'
</script>

<template>
  <Edit :group-id="route.params.groupId" />
</template>
