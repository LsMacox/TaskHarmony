<script setup>
import { nextTick, ref, watch } from 'vue'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
  editId: {
    type: Number,
  },
  isDepartment: {
    type: Boolean,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'data',
])

import { genQueryObjFilter } from '@/plugins/fake-api/utils/query'

const store = useAdminGroupStore()
const isFormValid = ref(false)
const refForm = ref()

const name = ref(store.group?.name ?? '')
const description = ref(store.group?.description ?? '')
const selectedParent = ref({})

const groupsList = ref([])
const parentListPerPage = ref(15)
const parentListTotal = ref(0)
const searchByParentList = ref('')
const isLoadingParentList = ref(false)
const isParentListState = ref()


watch(() => store.group, item => {
  if (item) {
    name.value = item.name
    description.value = item.description

    selectedParent.value = item.parent_id ? {
      id: item.parent_id,
      name: item.parent_name,
    } : null
  }
})

const fetchParentList = async (page, save = true) => {
  isLoadingParentList.value = true

  const query = {
    perpage: parentListPerPage.value,
    page: page ? page : 1,
    ...genQueryObjFilter(['name', '||description'], 'like', [searchByParentList.value, searchByParentList.value]),
  }

  const { data: groups, meta: meta } = await store.fetchGroups(query, false)

  isLoadingParentList.value = false
  parentListTotal.value = meta.total

  if (save) {
    groupsList.value = groups
  }

  return {
    groups, meta,
  }
}

const loadMoreParentList = async () => {
  const start = groupsList.value.length
  const end = start + parentListPerPage.value

  if (end <= parentListTotal.value) {
    const { groups } = await fetchParentList(Math.ceil(parentListTotal.value / start), false)

    groupsList.value = [...groupsList.value, ...groups]
  }
}

const searchFetchParentList = async () => {
  if (isParentListState.value) {
    groupsList.value = []
    await nextTick()
    await fetchParentList()
  }
}

const debouncedSearchFetchParentList = useDebounceFn(searchFetchParentList, 300)

watch(() => searchByParentList.value, () => debouncedSearchFetchParentList())

watch(() => props.isDrawerOpen, async val => {
  if (val) {
    groupsList.value = []
    await fetchParentList()
    if (props.editId) {
      store.showGroup(props.editId)
    } else {
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
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
      emit('data', {
        name: name.value,
        description: description.value,
        is_department: props.isDepartment,
        parent_id: props.editId 
          ? !selectedParent.value ? 'none' : selectedParent.value 
          : selectedParent.value,
      })
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
      :title="'Add/Edit ' + (isDepartment ? 'Department' : 'Group')"
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
              <!-- 👉 Username -->
              <VCol cols="12">
                <AppTextField
                  v-model="name"
                  :rules="[requiredValidator]"
                  label="Name"
                  placeholder="Backend"
                />
              </VCol>

              <!-- 👉 Parent -->
              <VCol
                v-if="!isDepartment"
                cols="12"
              >
                <AppAutocomplete
                  v-model="selectedParent"
                  v-model:search="searchByParentList"
                  :items="groupsList"
                  item-title="name"
                  item-value="id"
                  label="Select Parent"
                  placeholder="Select Parent"
                  clearable
                  clear-icon="tabler-x"
                  @update:menu="(state) => isParentListState = state"
                >
                  <template #append-item>
                    <div
                      v-if="isLoadingParentList"
                      class="text-center my-2"
                    >
                      Loading...
                    </div>
                    <div
                      v-else
                      class="text-center my-2 cursor-pointer"
                      @click="loadMoreParentList"
                    >
                      Load more
                    </div>
                  </template>
                </AppAutocomplete>
              </VCol>

              <!-- 👉 Description -->
              <VCol cols="12">
                <AppTextarea
                  v-model="description"
                  rows="4"
                  label="Description"
                  placeholder="it is for transport affiliate..."
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
