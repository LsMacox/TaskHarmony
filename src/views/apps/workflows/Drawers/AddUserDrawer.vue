<script setup>
import { nextTick, ref, watch } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  groupIds: {
    type: Array,
  },
  userIds: {
    type: Array,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'add',
])

import { genQueryObjFilter } from '@/plugins/fake-api/utils/query'

const adminUserStore = useAdminUserStore()
const isFormValid = ref(false)
const refForm = ref()

const selected = ref([])

const list = ref([])
const perpage = ref(15)
const total = ref(0)
const searchBy = ref('')
const isLoading = ref(false)
const isMenuState = ref()

const fetchUsers = async (page, save = true) => {
  isLoading.value = true

  const query = {
    perpage: perpage.value,
    page: page ? page : 1,
    ...genQueryObjFilter(['email', '||name'], 'like', searchBy.value),
    ...genQueryObjFilter('exclude_from_groups', '=', props.groupIds),
    ...genQueryObjFilter('id', '!=', props.userIds),
  }

  const { data: users, meta: meta } = await adminUserStore.fetchUsers(query, false)

  isLoading.value = false
  total.value = meta.total

  if (save) {
    list.value = users
  }

  return {
    users, meta,
  }
}

const loadMoreUsers = async () => {
  const start = list.value.length

  if (start < total.value) {
    const { users } = await fetchUsers(Math.ceil(total.value / start), false)

    list.value = [...list.value, ...users]
  }
}

const fetchSearchUsers = async () => {
  if (isMenuState.value) {
    await fetchUsers()
  }
}

const debouncedSearchUsers = useDebounceFn(fetchSearchUsers, 300)

watch([
  searchBy,
], () => debouncedSearchUsers())

watch(() => props.isDrawerOpen, async val => {
  if (val) {
    list.value = []
    await fetchUsers()
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
      emit('add', selected.value)
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
      title="Add users"
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
                  label="Select users to add"
                  placeholder="Select users to add"
                  clearable
                  clear-icon="tabler-x"
                  multiple
                  @update:menu="(state) => isMenuState = state"
                >
                  <template #append-item>
                    <div
                      v-if="isLoading"
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
                  Add
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
