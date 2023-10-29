<script setup>
definePage({
  meta: {
    navActiveLink: 'admin-groups',
    subject: 'Group',
    action: 'viewAny',
  },
})

import { genQueryObjFilter, genQueryObjFSortBy } from '@/plugins/fake-api/utils/query'
import GroupDrawer from '@/views/apps/groups/GroupDrawer.vue'
import GroupUserAttachDrawer from '@/views/apps/groups/GroupUserAttachDrawer.vue'
import GroupUserPermissionDrawer from '@/views/apps/groups/GroupUserPermissionDrawer.vue'
import WorkflowBuilderDialog from '@/views/apps/workflows/WorkflowBuilderDialog.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import { watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const store = useAdminGroupStore()
const adminUserGroupStore = useAdminUserGroupStore()
const searchQuery = ref('')
const editId = ref()
const userAttachGroupId = ref()
const userPermissionGroupId = ref()

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref([])

const { groups } = storeToRefs(store)
const total = computed(() => groups.value?.meta?.total ?? 0)
const isDrawerVisible = ref(false)
const isUserAttachDrawerVisible = ref(false)
const isUserPermissionDrawerVisible = ref(false)
const isWorkflowDialogOpen = ref(false)
const selectedDepartmentRadio = ref('department')
const isDepartment = computed(() => selectedDepartmentRadio.value === 'department')

const departmentRadioList = [
  { title: 'Department', desc: 'example: IT', value: 'department' },
  { title: 'Group', desc: 'example: back', value: 'group' },
]

// Headers
const headers = ref([
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Parent',
    key: 'parent_name',
    sortable: false,
  },
  {
    title: 'Description',
    key: 'description',
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
])

watch(() => searchQuery.value, val => debouncedFetchList())

watch([
  page,
  itemsPerPage,
  sortBy,
  selectedDepartmentRadio,
], val => fetchList())

watch(() => selectedDepartmentRadio.value, val => {
  if (val === 'department') {
    headers.value = headers.value.filter(header => header.key !== 'parent_name')
  } else {
    if (!headers.value.some(header => header.key === 'parent_name')) {
      headers.value.splice(2, 0, {
        title: 'Parent',
        key: 'parent_name',
        sortable: false,
      })
    }
  }
})

onMounted(async () => {
  await fetchList()
})

async function fetchList () {
  await store.fetchGroups({
    perpage: itemsPerPage.value,
    page: page.value,
    ...genQueryObjFilter(['name'], 'like', searchQuery.value),
    ...genQueryObjFilter(['v:is_department'], '=', selectedDepartmentRadio.value === 'department' ? '1' : '0'),
    ...genQueryObjFSortBy(sortBy.value),
  })
}

const debouncedFetchList = useDebounceFn(fetchList, 300)

const updateOptions = async options => {
  page.value = options.page
  sortBy.value = options.sortBy
}

const showCreate = () => {
  editId.value = null
  isDrawerVisible.value = true 
}

const showEdit = id => {
  editId.value = id
  isDrawerVisible.value = true 
}

const showUserAttachDrawer = id => {
  userAttachGroupId.value = id
  isUserAttachDrawerVisible.value = true 
}

const showUserPermissionDrawer = id => {
  userPermissionGroupId.value = id
  isUserPermissionDrawerVisible.value = true 
}

const openWorkflowDialog = id => {
  isWorkflowDialogOpen.value = true
}

const handleData = async data => {
  if (editId.value) {
    await store.updateGroup(editId.value, data)
  } else {
    await store.storeGroup(data)
  }

  fetchList()
}

const attachGroupUsers = userIds => {
  adminUserGroupStore.syncUsers(userAttachGroupId.value, userIds)
  userAttachGroupId.value = null
}

const fetchDelete = async id => {
  await store.deleteGroup(id)
  editId.value = null
  fetchList()
}
</script>

<template>
  <section>
    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow class="justify-space-between"> 
          <!-- 👉 Select department radio -->
          <VCol
            cols="12"
            sm="4"
          >
            <CustomRadios
              v-model:selected-radio="selectedDepartmentRadio"
              :radio-content="departmentRadioList"
              :grid-column="{ cols: '12', sm: '6' }"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
    <VCard>
      <VCardText class="d-flex flex-wrap py-4 gap-4">
        <div class="me-3 d-flex gap-3">
          <AppSelect
            :model-value="itemsPerPage"
            :items="[
              { value: 10, title: '10' },
              { value: 25, title: '25' },
              { value: 50, title: '50' },
              { value: 100, title: '100' },
            ]"
            style="inline-size: 6.25rem;"
            @update:model-value="itemsPerPage = parseInt($event, 10)"
          />
        </div>
        <VSpacer />

        <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
          <!-- 👉 Search  -->
          <div style="inline-size: 10rem;">
            <AppTextField
              v-model="searchQuery"
              placeholder="Search"
              density="compact"
            />
          </div>

          <!-- 👉 Add user button -->
          <VBtn
            prepend-icon="tabler-plus"
            @click="showCreate"
          >
            Add New {{ isDepartment ? 'Department' : 'Group' }}
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="groups.data"
        :items-length="total"
        :headers="headers"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn @click="fetchDelete(item.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>

          <IconBtn>
            <VIcon
              icon="tabler-edit"
              @click="showEdit(item.id)"
            />
          </IconBtn>
          
          <VBtn
            icon
            variant="text"
            size="small"
            color="medium-emphasis"
          >
            <VIcon
              size="24"
              icon="tabler-dots-vertical"
            />
            <VMenu activator="parent">
              <VList>
                <VListItem @click="openWorkflowDialog(item.id)">
                  <template #prepend>
                    <VIcon icon="tabler-tornado" />
                  </template>
                  <VListItemTitle>Workflows</VListItemTitle>
                </VListItem>
                <VListItem @click="showUserAttachDrawer(item.id)">
                  <template #prepend>
                    <VIcon icon="tabler-user-bolt" />
                  </template>
                  <VListItemTitle>Users attach</VListItemTitle>
                </VListItem>
                <VListItem @click="showUserPermissionDrawer(item.id)">
                  <template #prepend>
                    <VIcon icon="tabler-user-cog" />
                  </template>
                  <VListItemTitle>Users permissions</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </template>

        <!-- pagination -->
        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, total) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(total / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(total / itemsPerPage)"
            >
              <template #prev="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Previous
                </VBtn>
              </template>

              <template #next="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Next
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>
    <!-- 👉 Add New Group -->
    <GroupDrawer
      v-model:isDrawerOpen="isDrawerVisible"
      :edit-id="editId"
      :is-department="isDepartment"
      @data="handleData"
    />
    <GroupUserAttachDrawer
      v-model:isDrawerOpen="isUserAttachDrawerVisible"
      :group-id="userAttachGroupId"
      @sync-users="attachGroupUsers"
    />
    <GroupUserPermissionDrawer
      v-model:isDrawerOpen="isUserPermissionDrawerVisible"
      :group-id="userPermissionGroupId"
    />
    <WorkflowBuilderDialog v-model:isDialogOpen="isWorkflowDialogOpen" />
  </section>
</template>
