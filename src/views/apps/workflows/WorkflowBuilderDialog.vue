<script setup>
const props = defineProps({
  isDialogOpen: {
    type: Boolean,
  },
})


const emit = defineEmits([
  'update:isDialogOpen',
])

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'vue3-dnd'


import Card from '@/views/apps/workflows/DragAndDrop/Card.vue'

const cards = ref([
  {
    id: 1,
    text: 'Write a cool JS library',
  },
  {
    id: 2,
    text: 'Make it generic enough',
  },
  {
    id: 3,
    text: 'Write README',
  },
  {
    id: 4,
    text: 'Create some examples',
  },
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
  },
  {
    id: 6,
    text: '???',
  },
  {
    id: 7,
    text: 'PROFIT',
  },
])

const moveCard = (dragIndex, hoverIndex) => {
  const item = cards.value[dragIndex]

  cards.value.splice(dragIndex, 1)
  cards.value.splice(hoverIndex, 0, item)
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDialogOpen', val)
}
</script>

<template>
  <VRow justify="center">
    <VDialog
      :model-value="props.isDialogOpen"
      persistent
      width="1024"
      @update:model-value="handleDrawerModelValueUpdate"
    >
      <VCard>
        <VCardTitle>
          <span class="text-h5">Workflow builder</span>
        </VCardTitle>
        <VCardText>
          <VContainer>
            <VRow>
              <VCol
                cols="4"
                md="4"
                sm="12"
              >
                <AppTextField
                  label="Workflow name"
                  required
                />
              </VCol>
              <VSpacer />
              <VCol cols="auto">
                <VBtn prepend-icon="tabler-plus">
                  Add group
                </VBtn>
              </VCol>
              <VCol cols="auto">
                <VBtn prepend-icon="tabler-plus">
                  Add user
                </VBtn>
              </VCol>
              <VCol cols="12">
                <DndProvider :backend="HTML5Backend">
                  <Card
                    v-for="(card, index) in cards"
                    :id="card.id"
                    :key="card.id"
                    :text="card.text"
                    :index="index"
                    :move-card="moveCard"
                  />
                </DndProvider>
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="blue-darken-1"
            variant="text"
            @click="emit('update:isDialogOpen', false)"
          >
            Close
          </VBtn>
          <VBtn
            variant="text"
            @click="emit('update:isDialogOpen', false)"
          >
            Save
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VRow>
</template>
