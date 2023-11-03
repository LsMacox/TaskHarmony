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

const emit = defineEmits([
  'save',
])

import { genQueryObjFilter } from '@/plugins/fake-api/utils/query'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'vue3-dnd'

import { requiredValidator } from '@/@core/utils/validators'
import Card from '@/views/apps/workflows/DragAndDrop/Card.vue'
import AddGroupDrawer from '@/views/apps/workflows/Drawers/AddGroupDrawer.vue'
import AddUserDrawer from '@/views/apps/workflows/Drawers/AddUserDrawer.vue'
import { computed } from 'vue'

const store = useAdminWorkflowStore()
const adminUserStore = useAdminUserStore()
const adminGroupStore = useAdminGroupStore()
const isAddGroupDrawer = ref(false)
const isAddUserDrawer = ref(false)
const isFormValid = ref(false)
const refForm = ref()
const name = ref('')

const { workflow } = storeToRefs(store)
const approveSequence = ref([])

const approveSequenceGroupIds = computed(() => { 
  return approveSequence.value.filter(seq => seq.is_group).map(seq => seq.id)
})

const approveSequenceUserIds = computed(() => { 
  return approveSequence.value.filter(seq => !seq.is_group).map(seq => seq.id) 
})

const preparedApproveSequence = computed(() => {
  return approveSequence.value.map(seq => {
    if (seq.is_group) {
      return { group_id: seq.id }
    } else {
      return { user_id: seq.id }
    }
  })
})

watch(() => props.workflowId, workflowId => {
  store.showWorkflow(workflowId)
})

watch(() => workflow, workflow => {
  name.value = workflow.name
  approveSequence.value = workflow.approve_sequnce
})

const moveCard = (dragIndex, hoverIndex) => {
  const item = approveSequence.value[dragIndex]

  approveSequence.value.splice(dragIndex, 1)
  approveSequence.value.splice(hoverIndex, 0, item)
}

const addGroup = async groupIds => {
  const { data: groups } = await adminGroupStore.fetchGroups({
    ...genQueryObjFilter('id', '=', groupIds),
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
    ...genQueryObjFilter('id', '=', userIds),
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

const onSubmit = () => {
  refForm.value?.validate().then(async ({ valid }) => {
    if (valid) {
      let data = {
        name: name.value,
        group_id: props.groupId,
        approve_sequence: preparedApproveSequence.value,
      }

      const response = props.workflowId 
        ? await store.updateWorkflow(props.workflowId, data)
        : await store.storeWorkflow(data)

      emit('save', response)

      await nextTick()
      
      refForm.value?.reset()
      refForm.value?.resetValidation()
      approveSequence.value = []
    }
  })
}
</script>

<template>
  <section>
    <VCard>
      <VForm
        ref="refForm"
        v-model="isFormValid"
        @submit.prevent="onSubmit"
      >
        <VCardText>
          <VRow
            no-gutters
            class="mb-5"
          >
            <VCol cols="8">
              <div class="me-3 d-flex gap-3">
                <AppTextField
                  v-model="name"
                  label="Workflow name"
                  :rules="[requiredValidator]"
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
          <VCardText>
            <h6 class="text-lg">
              Approve sequence
            </h6>
          </VCardText>
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
          <VBtn type="submit">
            Save
          </VBtn>
        </VCardActions>
      </VForm>
    </VCard>
    <AddGroupDrawer
      v-model:isDrawerOpen="isAddGroupDrawer"
      :group-ids="[props.groupId, ...approveSequenceGroupIds]"
      @add="addGroup"
    />
    <AddUserDrawer
      v-model:isDrawerOpen="isAddUserDrawer"
      :group-ids="[props.groupId, ...approveSequenceGroupIds]"
      :user-ids="approveSequenceUserIds"
      @add="addUser"
    />
  </section>
</template>
