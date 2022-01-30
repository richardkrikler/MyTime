<template>
  <div class="border-2 dark:border-gray-700 rounded-xl m-2.5 p-3">
    <timeline-hour v-for="(h, i) in 24" :key="i" :hour="h"></timeline-hour>
  </div>
</template>

<script>
import TimelineHour from './TimelineHour'
export default {
  name: 'Timeline',

  components: {
    TimelineHour
  },
};
</script>

<style scoped>
</style>