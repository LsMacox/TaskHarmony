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
  isUser: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
])

let groupStore = useAdminGroupStore()
let userGroupStore = useAdminUserGroupStore()

if (props.isUser) {
  groupStore = useGroupStore()
  userGroupStore = useUserGroupStore()
}

const isFormValid = ref(false)
const refForm = ref()

const selected = ref()
const selectedPermission = ref()

const list = ref([])
const searchBy = ref('')
const isLoading = ref(false)
const isMenuState = ref()

watch(() => selected.value, async userId => {
  if (userId) {
    const response = await userGroupStore.fetchGroupPermissions(userId, props.groupId)

    if (response?.permissions) {
      selectedPermission.value = response.permissions
    }
  }
})

const fetchAttachedUsers = async (save = true) => {
  isLoading.value = true

  const { data: users } = await groupStore.fetchAttachedUsers(props.groupId, false)

  isLoading.value = false

  if (save) {
    list.value = users
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
  searchBy,
], () => debouncedSearchUsers())

watch(() => props.isDrawerOpen, async val => {
  if (val) {
    list.value = []
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
      await userGroupStore.updateGroupPermissions(selected.value, props.groupId, {
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
                  v-model="selected"
                  v-model:search="searchBy"
                  :items="list"
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
                />
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Save
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
