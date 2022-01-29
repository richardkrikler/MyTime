<template>
  <div class="border-2 rounded-xl m-2.5 p-1.5" @drop="drop" @dragover="dragOver" @dragleave="dragLeave" @dragenter="dragEnter">
    <task v-for="t in $store.getters.tasks" :task="t" :key="t.id"/>
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
      const draggable = document.getElementById(id)
      e.target.appendChild(draggable)
      draggable.classList.remove('invisible')
      draggable.classList.remove('container')
    },

    dragOver(e) {
      e.preventDefault()
    },

    dragLeave() {},

    dragEnter(e) {
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
</style>