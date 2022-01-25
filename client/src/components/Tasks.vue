<template>
  <div class="border-2 rounded-xl m-2.5 p-2.5">
    <task v-for="(t, i) in 5" :key="i" />
  </div>
</template>

<script>
import Task from './Task'
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