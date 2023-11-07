<script setup>
import { genQueryObjFilter } from '@/plugins/fake-api/utils/query'

const store = useNotificationStore()

const { notifications } = storeToRefs(store)

const removeNotification = async notificationId => {
  await store.mark([notificationId])
  fetchNotifications()
} 

const fetchNotifications = async () => {
  await store.fetchNotifications({
    ...genQueryObjFilter('mark', '=', 0),
  }) 
}

const onOpen = val => {
  if (val) {
    fetchNotifications()
  }
}

onMounted(() => {
  fetchNotifications()
})
</script>

<template>
  <Notifications
    :notifications="notifications"
    @remove="removeNotification"
    @open="onOpen"
  />
</template>
