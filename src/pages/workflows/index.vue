<script setup>
definePage({
  meta: {
    navActiveLink: 'workflows',
    subject: 'UserWorkflow',
    action: 'viewAny',
  },
})

import { genQueryObjFilter, genQueryObjFSortBy } from '@/plugins/fake-api/utils/query'
import ApproveSequenceDialog from '@/views/apps/workflows/ApproveSequenceDialog.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import { watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const router = useRouter()
const store = useWorkflowStore()
const approveWorkflowStore = useApproveWorkflowStore()
const searchQuery = ref('')
const showApproveSequenceDialog = ref(false)
const approveSequenceWorkflowId = ref()

// Data table options
const createdAtRangeString = ref()
const perpage = ref(10)
const page = ref(1)
const sortBy = ref([])

const { workflows } = storeToRefs(store)
const total = computed(() => workflows.value?.meta?.total ?? 0)
const createdAtRange = computed(() => createdAtRangeString.value ? createdAtRangeString.value.split(' to ') : [])

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
    title: 'Group',
    key: 'group_name',
    sortable: false,
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
  createdAtRangeString,
], val => fetchList())

onMounted(async () => {
  await fetchList()
})

async function fetchList () {
  let queryRange = {}

  if (createdAtRange.value.length == 2) {
    queryRange['created_at[start]'] = createdAtRange.value[0]
    queryRange['created_at[end]'] = new Date(new Date(createdAtRange.value[1]).getTime() + 86400000).toISOString().split('T')[0]
  } else if (createdAtRange.value.length == 1) {
    queryRange['created_at'] = createdAtRange.value[0]
  }

  await store.fetchWorkflows({
    perpage: perpage.value,
    page: page.value,

    ...genQueryObjFilter(['state', '||state'], '=', ['in_progress', 'returned']),
    ...genQueryObjFilter(['name'], 'like', [searchQuery.value, searchQuery.value]),
    ...genQueryObjFSortBy(sortBy.value),
    ...queryRange,
  })
}

const debouncedFetchList = useDebounceFn(fetchList, 300)

const updateOptions = async options => {
  page.value = options.page
  sortBy.value = options.sortBy
}

const clickRow = (e, { item }) => {
  showApproveSequenceDialog.value = true
  approveSequenceWorkflowId.value = item.id
}

const approveWorkflow = async id => {
  await approveWorkflowStore.approveWorkflow(id)
  fetchList()
}

const rejectWorkflow = async id => {
  await approveWorkflowStore.rejectWorkflow(id)
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
              v-model="createdAtRangeString"
              label="Range"
              placeholder="Select date"
              :config="{ mode: 'range' }"
              class="range-picker"
              clearable
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
        @click:row="clickRow"
      >
        <!-- Actions -->
        <template #item.actions="{ item }">
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
                <VListItem @click="approveWorkflow(item.id)">
                  <template #prepend>
                    <VIcon icon="tabler-circle-check" />
                  </template>
                  <VListItemTitle>Approve</VListItemTitle>
                </VListItem>
                <VListItem @click="rejectWorkflow(item.id)">
                  <template #prepend>
                    <VIcon icon="tabler-ban" />
                  </template>
                  <VListItemTitle>Reject</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
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
  <ApproveSequenceDialog
    v-model="showApproveSequenceDialog"
    :workflow-id="approveSequenceWorkflowId"
    is-user
  />
</template>

<style lang="scss">
.range-picker {
  .flat-picker-custom-style {
    margin-block-start: 0.5rem !important;
  }
}
</style>
