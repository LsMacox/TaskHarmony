<script setup>
definePage({
  meta: {
    navActiveLink: 'admin-workflows',
    subject: 'Workflow',
    action: 'viewAny',
  },
})

import { genQueryObjFilter, genQueryObjFSortBy } from '@/plugins/fake-api/utils/query'
import { paginationMeta } from '@api-utils/paginationMeta'
import { watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const router = useRouter()
const store = useAdminWorkflowStore()
const searchQuery = ref('')
const editId = ref()

// Data table options
const createdAtRange = ref()
const perpage = ref(10)
const page = ref(1)
const sortBy = ref([])

const { workflows } = storeToRefs(store)
const total = computed(() => workflows.value?.meta?.total ?? 0)

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
    title: 'State',
    key: 'state',
  },
  {
    title: 'Created at',
    key: 'created_at',
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
  perpage,
  sortBy,
], val => fetchList())

onMounted(async () => {
  await fetchList()
})

async function fetchList () {
  await store.fetchWorkflows({
    perpage: perpage.value,
    page: page.value,
    ...genQueryObjFilter('name', 'like', searchQuery.value),
    ...genQueryObjFSortBy(sortBy.value),
  })
}

const debouncedFetchList = useDebounceFn(fetchList, 300)

const updateOptions = async options => {
  page.value = options.page
  sortBy.value = options.sortBy
}

const showCreate = () => {
  router.push(`/admin/workflows`)
}

const showEdit = id => {
  router.push(`/admin/workflows/${id}`)
}

const fetchDelete = async id => {
  await store.deleteWorkflow(id)
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
            <AppDateTimePicker
              v-model="createdAtRange"
              label="Range"
              placeholder="Select date"
              :config="{ mode: 'range' }"
              class="range-picker"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
    <VCard>
      <VCardText class="d-flex flex-wrap py-4 gap-4">
        <div class="me-3 d-flex gap-3">
          <AppSelect
            :model-value="perpage"
            :items="[
              { value: 10, title: '10' },
              { value: 25, title: '25' },
              { value: 50, title: '50' },
              { value: 100, title: '100' },
            ]"
            style="inline-size: 6.25rem;"
            @update:model-value="perpage = parseInt($event, 10)"
          />
        </div>
        <VSpacer />

        <div class="d-flex align-center flex-wrap gap-4">
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
            Add new Workflow
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="perpage"
        v-model:page="page"
        :items="workflows.data"
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
        </template>

        <template #item.created_at="{ item }">
          {{ formatDate(item.created_at) }}
        </template>

        <!-- pagination -->
        <template #bottom>
          <VDivider />
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, perpage }, total) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(total / perpage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.ceil(total / perpage)"
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
  </section>
</template>

<style lang="scss">
.range-picker {
  .flat-picker-custom-style {
    margin-block-start: 0.5rem !important;
  }
}
</style>
