<script setup>
const props = defineProps({
  id: Number,
  text: String,
  isGroup: Boolean,
  index: Number,
  moveCard: Function,
})

defineEmits([
  'remove',
])

import { toRefs } from '@vueuse/core'
import { computed, ref, unref } from 'vue'
import { useDrag, useDrop } from 'vue3-dnd'

const card = ref()

const ItemTypes = ref({
  CARD: 'card',
})

const [dropCollect, drop] = useDrop({
  accept: ItemTypes.value.CARD,
  collect(monitor) {
    return {
      handlerId: monitor.getHandlerId(),
    }
  },
  hover(item, monitor) {
    if (!card.value) {
      return
    }
    const dragIndex = item.index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = card.value?.getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    const clientOffset = monitor.getClientOffset()

    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.moveCard(dragIndex, hoverIndex)

    item.index = hoverIndex
  },
})

const [collect, drag] = useDrag({
  type: ItemTypes.value.CARD,
  item: () => {
    return { id: props.id, index: props.index }
  },
  collect: monitor => ({
    isDragging: monitor.isDragging(),
  }),
})

const { handlerId } = toRefs(dropCollect)
const { isDragging } = toRefs(collect)
const opacity = computed(() => (unref(isDragging) ? 0 : 1))

const setRef = el => {
  card.value = drag(drop(el))
}
</script>

<template>
  <div
    :ref="setRef"
    class="card"
    :style="{ opacity }"
    :data-handler-id="handlerId"
  >
    <VRow
      align="center"
      justify="space-between"
    >
      <VCol cols="auto">
        {{ (props.isGroup ? 'Group: ' : 'User: ') + text }}
      </VCol>
      <VCol cols="auto">
        <VBtn @click="$emit('remove', id)">
          Remove
        </VBtn>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: 1px dashed gray;
  background-color: white;
  cursor: move;
  margin-block-end: 0.5rem;
  padding-block: 0.5rem;
  padding-inline: 1rem;
}
</style>
