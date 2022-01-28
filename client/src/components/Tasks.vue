<template>
  <div class="border-2 rounded-xl m-2.5 p-2.5">
    <task v-for="(t, i) in $store.getters.tasks" :task="t" :key="i"/>
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
    this.$store.dispatch('loadTasks')
  }
}
</script>

<style scoped>
</style>