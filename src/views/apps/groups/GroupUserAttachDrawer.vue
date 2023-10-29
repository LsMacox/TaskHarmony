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
  'syncUsers',
])

import { genQueryObjFilter } from '@/plugins/fake-api/utils/query'

const adminGroupStore = useAdminGroupStore()
const adminUserStore = useAdminUserStore()
const isFormValid = ref(false)
const refForm = ref()

const selectedUsers = ref([])

const usersList = ref([])
const usersPerpage = ref(15)
const usersTotal = ref(0)
const searchByUsers = ref('')
const isUsersLoading = ref(false)
const isMenuState = ref()


watch(() => adminGroupStore.attachedUsers, async users => {
  selectedUsers.value = users
})

const fetchUsers = async (page, save = true) => {
  isUsersLoading.value = true

  const query = {
    perpage: usersPerpage.value,
    page: page ? page : 1,
    ...genQueryObjFilter(['email', '||name'], 'like', searchByUsers.value),
  }

  const { data: users, meta: meta } = await adminUserStore.fetchUsers(query)

  isUsersLoading.value = false
  usersTotal.value = meta.total

  if (save) {
    usersList.value = users
  }

  return {
    users, meta,
  }
}

const loadMoreUsers = async () => {
  const start = usersList.value.length

  if (start <= usersTotal.value) {
    const { users } = await fetchUsers(Math.ceil(usersTotal.value / start), false)

    usersList.value = [...usersList.value, ...users]
  }
}

const fetchSearchUsers = async () => {
  if (isMenuState.value) {
    await fetchUsers()
  }
}

const debouncedSearchUsers = useDebounceFn(fetchSearchUsers, 300)

watch([
  searchByUsers,
], () => debouncedSearchUsers())

watch(() => props.isDrawerOpen, async val => {
  if (val) {
    usersList.value = []
    await fetchUsers()
    await adminGroupStore.fetchAttachedUsers(props.groupId)
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
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('syncUsers', selectedUsers.value)
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
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
      title="Attach users"
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
              <!-- 👉 Attached users -->
              <VCol cols="12">
                <AppAutocomplete
                  v-model="selectedUsers"
                  v-model:search="searchByUsers"
                  :items="usersList"
                  item-title="email"
                  item-value="id"
                  label="Select users to attach"
                  placeholder="Select users to attach"
                  clearable
                  clear-icon="tabler-x"
                  multiple
                  @update:menu="(state) => isMenuState = state"
                >
                  <template #append-item>
                    <div
                      v-if="isUsersLoading"
                      class="text-center my-2"
                    >
                      Loading...
                    </div>
                    <div
                      v-else
                      class="text-center my-2 cursor-pointer"
                      @click="loadMoreUsers"
                    >
                      Load more
                    </div>
                  </template>
                </AppAutocomplete>
              </VCol>

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-3"
                >
                  Attach
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
