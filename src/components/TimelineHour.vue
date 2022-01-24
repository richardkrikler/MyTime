<template>
  <div class="first:border-t-0 border-t-2 px-2.5 py-1">
    <span class="text-gray-500">
      {{ hour }}
    </span>

  </div>
</template>

<script>
export default {
  name: 'TimelineHour',
  props: {
    hour: Number
  }
}
</script>

<style scoped>
</style>