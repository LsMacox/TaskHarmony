<script setup>
import { nextTick, ref, watch } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  groupId: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
])

const adminGroupStore = useAdminGroupStore()
const adminUserGroupStore = useAdminUserGroupStore()
const isFormValid = ref(false)
const refForm = ref()

const selectedUser = ref()
const selectedPermission = ref()

const usersList = ref([])
const searchByUser = ref('')
const isUsersLoading = ref(false)
const isMenuState = ref()

watch(() => selectedUser.value, async user => {
  const response = await adminUserGroupStore.fetchGroupPermissions(user, props.groupId)

  if (response.permissions) {
    selectedPermission.value = response.permissions
  }
})

const fetchAttachedUsers = async (save = true) => {
  isUsersLoading.value = true

  const { data: users } = await adminGroupStore.fetchAttachedUsers(props.groupId, false)

  isUsersLoading.value = false

  if (save) {
    usersList.value = users
  }

  return {
    users,
  }
}

const fetchSearchUsers = async () => {
  if (isMenuState.value) {
    await fetchAttachedUsers()
  }
}

const debouncedSearchUsers = useDebounceFn(fetchSearchUsers, 300)

watch([
  searchByUser,
], () => debouncedSearchUsers())

watch(() => props.isDrawerOpen, async val => {
  if (val) {
    usersList.value = []
    await fetchAttachedUsers()
  }
})

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      await adminUserGroupStore.updateGroupPermissions(selectedUser.value, props.groupId, {
        permissions: selectedPermission.value,
      })
      await nextTick()
      refForm.value?.reset()
      refForm.value?.resetValidation()
    }
  })
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Users permissions"
      @cancel="closeNavigationDrawer"
    />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol cols="12">
                <AppAutocomplete
                  v-model="selectedUser"
                  v-model:search="searchByUser"
                  :items="usersList"
                  item-title="email"
                  item-value="id"
                  label="Select user for configure"
                  placeholder="Select user for configure"
                  clearable
                  clear-icon="tabler-x"
                  :rules="[requiredValidator]"
                  @update:menu="(state) => isMenuState = state"
                />
              </VCol>

              <VCol cols="12">
                <AppSelect
                  v-model="selectedPermission"
                  :items="GROUP_PERMISSIONS"
                  label="Select permission"
                  placeholder="Select permission"
                  clearable
                  clear-icon="tabler-x"
                  multiple
                  :rules="[requiredValidator]"
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="outlined"
                  color="secondary"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
