<template>
  <div class="border-2 dark:border-gray-700 rounded-xl m-2.5 p-1.5" @drop="drop" @dragover="dragOver"
       @dragleave="dragLeave" @dragenter="dragEnter">
    <task v-for="t in $store.getters.unassignedTasks" :task="t" :key="t.id"/>
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
  },

  methods: {
    drop(e) {
      e.preventDefault()

      const id = e.dataTransfer.getData('text')

      this.$store.dispatch('updateTaskDate', {
        id: id,
        date: null
      })
    },

    dragOver(e) {
      e.preventDefault()
    },

    dragLeave() {
    },

    dragEnter(e) {
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
</style>