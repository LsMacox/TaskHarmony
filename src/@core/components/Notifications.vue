<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const props = defineProps({
  notifications: {
    type: Array,
    required: true,
  },
  badgeProps: {
    type: null,
    required: false,
    default: undefined,
  },
  location: {
    type: null,
    required: false,
    default: 'bottom end',
  },
})

const emit = defineEmits([
  'remove',
  'click:notification',
  'open',
])
</script>

<template>
  <IconBtn id="notification-btn">
    <VBadge
      v-bind="props.badgeProps"
      color="error"
      :model-value="notifications.length"
      class="notification-badge"
    >
      <VIcon
        size="26"
        icon="tabler-bell"
      />
    </VBadge>

    <VMenu
      activator="parent"
      width="380px"
      :location="props.location"
      offset="14px"
      :close-on-content-click="false"
      @update:model-value="(val) => $emit('open', val)"
    >
      <VCard class="d-flex flex-column">
        <!-- 👉 Header -->
        <VCardItem class="notification-section">
          <VCardTitle class="text-lg">
            Notifications
          </VCardTitle>
        </VCardItem>

        <VDivider />

        <!-- 👉 Notifications list -->
        <PerfectScrollbar
          :options="{ wheelPropagation: false }"
          style="max-block-size: 23.75rem;"
        >
          <VList class="notification-list rounded-0 py-0">
            <template
              v-for="(notification, index) in props.notifications"
              :key="notification.id"
            >
              <VDivider v-if="index > 0" />
              <VListItem
                link
                lines="one"
                min-height="66px"
                class="list-item-hover-class"
                @click="$emit('click:notification', notification)"
              >
                <!-- Slot: Prepend -->
                <!-- Handles Avatar: Image, Icon, Text -->
                <VListItemTitle class="font-weight-medium">
                  {{ notification.title }}
                </VListItemTitle>
                <VListItemSubtitle>{{ notification.description }}</VListItemSubtitle>

                <!-- Slot: Append -->
                <template #append>
                  <div class="d-flex flex-column align-center gap-4">
                    <div style="block-size: 28px; inline-size: 28px;">
                      <IconBtn
                        size="small"
                        class="visible-in-hover"
                        @click="$emit('remove', notification.id)"
                      >
                        <VIcon
                          size="20"
                          icon="tabler-x"
                        />
                      </IconBtn>
                    </div>
                  </div>
                </template>
              </VListItem>
            </template>

            <VListItem
              v-show="!props.notifications.length"
              class="text-center text-medium-emphasis"
              style="block-size: 56px;"
            >
              <VListItemTitle>No Notification Found!</VListItemTitle>
            </VListItem>
          </VList>
        </PerfectScrollbar>

        <VDivider />

        <!-- 👉 Footer -->
        <!--
          <VCardActions
          v-show="props.notifications.length"
          class="notification-footer"
          >
          <VBtn block>
          View All Notifications
          </VBtn>
          </VCardActions> 
        -->
      </VCard>
    </VMenu>
  </IconBtn>
</template>

<style lang="scss">
.notification-section {
  padding: 14px !important;
}

.notification-footer {
  padding: 6px !important;
}

.list-item-hover-class {
  .visible-in-hover {
    display: none;
  }

  &:hover {
    .visible-in-hover {
      display: block;
    }
  }
}

.notification-list.v-list {
  .v-list-item {
    border-radius: 0 !important;
    margin: 0 !important;

    &[tabindex="-2"]:not(.v-list-item--active) {
      &:hover,
      &:focus-visible {
        color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));

        .v-list-item-subtitle {
          color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
        }
      }
    }
  }
}

// Badge Style Override for Notification Badge
.notification-badge {
  .v-badge__badge {
    /* stylelint-disable-next-line liberty/use-logical-spec */
    min-width: 18px;
    padding: 0;
    block-size: 18px;
  }
}
</style>
