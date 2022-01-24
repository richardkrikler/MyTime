<template>
  <div class="border-2 rounded-xl m-2.5 p-2.5">
    <task v-for="t in 5" />
  </div>
</template>

<script>
import Task from './Task.vue'
export default {
  name: 'Tasks',
  components: {
    Task
  },
  created() {
    this.$store.commit('loadTasks')
  }
}
</script>

<style scoped>
</style>