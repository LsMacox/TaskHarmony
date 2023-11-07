<script setup>
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  workflowId: {
    type: Number,
    required: true,
  },
  isUser: {
    type: Boolean,
  },
})

const emit = defineEmits([
  'update:modelValue',
])

let store = useAdminWorkflowStore()

if (props.isUser) {
  store = useWorkflowStore()
}

const dialogInternal = ref(false)

const { workflow, approvalsCount } = storeToRefs(store)

watch(() => props.modelValue, async val => {
  dialogInternal.value = val

  if (val && props.workflowId) {
    await store.showWorkflow(props.workflowId)
    store.getApprovalsCount(props.workflowId)
  }
})

watch(() => dialogInternal.value, val => {
  emit('update:modelValue', val)
})

const getApprovalsCount = seq => {
  if (seq?.is_group) {
    const approvalCount = approvalsCount.value?.group_count_list?.filter(gc => {
      return seq.id == gc.id
    })[0]

    if (approvalCount) {
      return approvalCount.approved_count + ' / ' + approvalCount.total_possible_approvals
    }
  }

  return ''
}
</script>

<template>
  <VRow justify="center">
    <VDialog
      v-model="dialogInternal"
      width="1024"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="slotProps"
      >
        <slot
          :name="name"
          v-bind="slotProps || {}"
        />
      </template>
      <VCard>
        <VCardTitle>
          <span class="text-h5">Approve sequence</span>
        </VCardTitle>
        <VCardText>
          <VContainer>
            <VList>
              <template v-if="!workflow?.approve_sequence?.length">
                <VListItem>
                  <template #prepend>
                    <h2 :class="{'text-success': seq?.is_approve}">
                      There are no sequence approvals
                    </h2>
                  </template>
                </VListItem>
              </template>
              <template v-else>
                <VListItem
                  v-for="seq in workflow.approve_sequence"
                  :key="seq.id"
                >
                  <template #prepend>
                    <h3 :class="{'text-success': seq?.is_approve}">
                      {{ seq?.is_group ? seq.name : seq.email }}
                    </h3>
                  </template>
                  
                  <template #append>
                    {{ getApprovalsCount(seq) }}
                    <VTooltip location="top">
                      <template #activator="{ props }">
                        <IconBtn
                          v-bind="props"
                          :color="seq?.is_approve ? 'rgb(var(--v-theme-success))' : ''"
                          :icon="seq?.is_approve ? 'tabler-circle-check-filled' : 'tabler-circle-dotted'"
                          variant="text"
                        />
                      </template>
                      {{ seq?.is_approve ? 'Approved' : 'Waiting...' }}
                    </VTooltip>
                  </template>
                </VListItem>
              </template>
            </VList>
          </VContainer>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="blue-darken-1"
            variant="text"
            @click="dialogInternal = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>
