<script setup>
definePage({
  meta: {
    navActiveLink: 'admin-users',
    subject: 'User',
    action: 'viewAny',
  },
})

import { genQueryObjFilter, genQueryObjFSortBy } from '@/plugins/fake-api/utils/query'
import UserDrawer from '@/views/apps/user/UserDrawer.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import { watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const store = useAdminUserStore()
const searchQuery = ref('')
const selectedRole = ref()
const editId = ref()

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref([])

const { users } = storeToRefs(store)
const total = computed(() => users.value?.meta?.total ?? 0)
const isDrawerVisible = ref(false)


watch(() => searchQuery.value, val => debouncedFetchList())

watch([
  page,
  itemsPerPage,
  sortBy,
  selectedRole,
], val => fetchList())

onMounted(async () => {
  await store.fetchUsers({})
})

async function fetchList () {
  await store.fetchUsers({
    perpage: itemsPerPage.value,
    page: page.value,
    ...genQueryObjFilter(['email', '||name'], 'like', searchQuery.value),
    ...genQueryObjFilter(['r:roles[name]'], '=', selectedRole.value),
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

const handleData = async data => {
  if (editId.value) {
    await store.updateUser(editId.value, data)
  } else {
    await store.storeUser(data)
  }

  fetchList()
}

const deleteUser = async id => {
  await store.deleteUser(id)
  editId.value = null
  fetchList()
}

// Headers
const headers = [
  {
    title: 'ID',
    key: 'id',
  },
  {
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Email',
    key: 'email',
  },
  {
    title: 'Role',
    key: 'role',
    sortable: false,
  },
  {
    title: 'Actions',
    key: 'actions',
    sortable: false,
  },
]

const resolveUserRoleVariant = role => {
  const roleLowerCase = role.toLowerCase()
  if (roleLowerCase === 'Super Admin')
    return {
      color: 'secondary',
      icon: 'tabler-device-laptop',
    }
  if (roleLowerCase === 'Employee')
    return {
      color: 'warning',
      icon: 'tabler-circle-check',
    }

  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const resolveUserStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'
  
  return 'primary'
}
</script>

<template>
  <section>
    <VCard
      title="Filters"
      class="mb-6"
    >
      <VCardText>
        <VRow>
          <!-- 👉 Select Role -->
          <VCol
            cols="12"
            sm="4"
          >
            <AppSelect
              v-model="selectedRole"
              label="Select Role"
              placeholder="Select Role"
              :items="ROLES"
              clearable
              clear-icon="tabler-x"
            />
          </VCol> 
          <!-- 👉 Select Status -->
          <!--
            <VCol
            cols="12"
            sm="4"
            >
            <AppSelect
            v-model="selectedStatus"
            label="Select Status"
            placeholder="Select Status"
            :items="status"
            clearable
            clear-icon="tabler-x"
            />
            </VCol> 
          -->
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
              { value: 100, tinliitle: '100' },
            ]"
            style="ne-size: 6.25rem;"
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
            Add New User
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="users.data"
        :items-length="total"
        :headers="headers"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- User -->
        <template #item.user="{ item }">
          <div class="d-flex align-center">
            <VAvatar
              size="34"
              :variant="!item.avatar ? 'tonal' : undefined"
              :color="!item.avatar ? resolveUserRoleVariant(item.roles[0].name).color : undefined"
              class="me-3"
            >
              <VImg
                v-if="item.avatar"
                :src="item.avatar"
              />
              <span v-else>{{ avatarText(item.name) }}</span>
            </VAvatar>
            <div class="d-flex flex-column">
              <span class="text-sm text-medium-emphasis">{{ item.email }}</span>
            </div>
          </div>
        </template>

        <!-- 👉 Role -->
        <template #item.role="{ item }">
          <div class="d-flex align-center gap-4">
            <VAvatar
              :size="30"
              :color="resolveUserRoleVariant(item.roles[0].name).color"
              variant="tonal"
            >
              <VIcon
                :size="20"
                :icon="resolveUserRoleVariant(item.roles[0].name).icon"
              />
            </VAvatar>
            <span class="text-capitalize">{{ item.roles[0].name }}</span>
          </div>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            :color="resolveUserStatusVariant(item.status)"
            size="small"
            label
            class="text-capitalize"
          >
            {{ item.status }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn @click="deleteUser(item.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>

          <IconBtn>
            <VIcon
              icon="tabler-edit"
              @click="showEdit(item.id)"
            />
          </IconBtn>
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
    <!-- 👉 Add New User -->
    <UserDrawer
      v-model:isDrawerOpen="isDrawerVisible"
      :edit-id="editId"
      @data="handleData"
    />
  </section>
</template>
