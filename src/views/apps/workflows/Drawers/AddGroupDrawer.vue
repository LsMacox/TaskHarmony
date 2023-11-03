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
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'add',
])


import { genQueryObjFilter } from '@/plugins/fake-api/utils/query'

const adminGroupStore = useAdminGroupStore()
const isFormValid = ref(false)
const refForm = ref()

const selected = ref([])

const list = ref([])
const perpage = ref(15)
const total = ref(0)
const searchBy = ref('')
const isLoading = ref(false)
const isMenuState = ref()

const fetchGroups = async (page, save = true) => {
  isLoading.value = true

  const query = {
    perpage: perpage.value,
    page: page ? page : 1,
    ...genQueryObjFilter('include_children_of', '=', [props.groupIds[0]]),
    ...genQueryObjFilter('exclude_children_of', '=', props.groupIds.slice(1)),
  }

  const { data: groups, meta: meta } = await adminGroupStore.fetchGroups(query, false)

  isLoading.value = false
  total.value = meta.total

  if (save) {
    list.value = groups
  }

  return {
    groups, meta,
  }
}

const loadMore = async () => {
  const start = list.value.length

  if (start < total.value) {
    const { groups } = await fetchGroups(Math.ceil(total.value / start), false)

    list.value = [...list.value, ...groups]
  }
}

const fetchSearch = async () => {
  if (isMenuState.value) {
    await fetchGroups()
  }
}

const debouncedSearch = useDebounceFn(fetchSearch, 300)

watch([
  searchBy,
], () => debouncedSearch())

watch(() => props.isDrawerOpen, async val => {
  if (val) {
    list.value = []
    await fetchGroups()
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
      title="Add groups"
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
                  item-title="name"
                  item-value="id"
                  label="Select groups to add"
                  placeholder="Select groups to add"
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
                      @click="loadMore"
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
