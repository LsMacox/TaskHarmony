<script setup>
const props = defineProps({
  groupId: {
    type: Number,
    required: true,
  },
  workflowId: {
    type: Number,
  },
})

import { genQueryObjFilter } from '@/plugins/fake-api/utils/query'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'vue3-dnd'

import Card from '@/views/apps/workflows/DragAndDrop/Card.vue'
import AddGroupDrawer from '@/views/apps/workflows/Drawers/AddGroupDrawer.vue'
import AddUserDrawer from '@/views/apps/workflows/Drawers/AddUserDrawer.vue'
import { computed } from 'vue'

const store = useAdminWorkflowStore()
const adminUserStore = useAdminUserStore()
const adminGroupStore = useAdminGroupStore()
const isAddGroupDrawer = ref(false)
const isAddUserDrawer = ref(false)

const { workflow } = storeToRefs(store)
const approveSequence = ref([])

const approveSequenceGroupIds = computed(() => { 
  return approveSequence.value.filter(seq => seq.is_group).map(seq => seq.id)
})

const approveSequenceUserIds = computed(() => { 
  return approveSequence.value.filter(seq => !seq.is_group).map(seq => seq.id) 
})

watch(() => props.workflowId, workflowId => {
  store.showWorkflow(workflowId)
})

watch(() => workflow, workflow => {
  approveSequence.value = workflow.approve_sequnce
})

const moveCard = (dragIndex, hoverIndex) => {
  const item = approveSequence.value[dragIndex]

  approveSequence.value.splice(dragIndex, 1)
  approveSequence.value.splice(hoverIndex, 0, item)
}

const addGroup = async groupIds => {
  const { data: groups } = await adminGroupStore.fetchGroups({
    ...genQueryObjFilter(['id'], '=', [groupIds]),
    perpage: 5000,
  }, false)

  let groupsMap = groups.map(group => {
    group.is_group = true

    return group
  })

  approveSequence.value = [...approveSequence.value, ...groupsMap]
}

const addUser = async userIds => {
  const { data: users } = await adminUserStore.fetchUsers({
    ...genQueryObjFilter(['id'], '=', [userIds]),
    perpage: 5000,
  }, false)

  let usersMap = users.map(user => {
    user.is_group = false
    user.name = user.email

    return user
  })

  approveSequence.value = [...approveSequence.value, ...usersMap]
}

const removeSeq = id => {
  approveSequence.value = approveSequence.value.filter(seq => {
    return seq.id !== id
  })
}

const showAddGroupDrawer = () => {
  isAddGroupDrawer.value = true
}

const showAddUserDrawer = () => {
  isAddUserDrawer.value = true
}

const save = () => {
}
</script>

<template>
  <section>
    <VCard>
      <VCardText>
        <VRow
          no-gutters
          class="mb-5"
        >
          <VCol cols="8">
            <div class="me-3 d-flex gap-3">
              <AppTextField
                label="Workflow name"
                required
              />
            </div>
          </VCol>
          <VSpacer />
          <VCol cols="4">
            <div class="d-flex align-center justify-end flex-wrap gap-4">
              <VBtn
                prepend-icon="tabler-plus"
                @click="showAddGroupDrawer"
              >
                Add group
              </VBtn>
              <VBtn
                prepend-icon="tabler-plus"
                @click="showAddUserDrawer"
              >
                Add user
              </VBtn>
            </div>
          </VCol>
        </vRow>
        <DndProvider :backend="HTML5Backend">
          <Card
            v-for="(seq, index) in approveSequence"
            :id="seq.id"
            :key="seq.id"
            :text="seq.name"
            :is-group="seq.is_group"
            :index="index"
            :move-card="moveCard"
            @remove="removeSeq"
          />
        </DndProvider>
      </VCardText>
      <VCardActions class="justify-end">
        <VBtn @click="save">
          Save
        </VBtn>
      </VCardActions>
    </VCard>
    <AddGroupDrawer
      v-model:isDrawerOpen="isAddGroupDrawer"
      :group-ids="approveSequenceGroupIds"
      @add="addGroup"
    />
    <AddUserDrawer
      v-model:isDrawerOpen="isAddUserDrawer"
      :group-ids="approveSequenceGroupIds"
      :user-ids="approveSequenceUserIds"
      @add="addUser"
    />
  </section>
</template>
