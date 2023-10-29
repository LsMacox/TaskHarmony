<script setup>
definePage({
  meta: {
    navActiveLink: 'groups',
    subject: 'UserGroup',
    action: 'viewAny',
  },
})
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  />
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
