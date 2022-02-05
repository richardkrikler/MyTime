<template>
  <div class="border-t-2 dark:border-gray-700 pl-2.5 flex flex-row" @drop="drop" @dragover="dragOver"
       @dragleave="dragLeave" @dragenter="dragEnter">
    <span class="text-gray-500 dark:text-gray-300 py-1 pr-2 w-6 text-right">
      {{ hour }}
    </span>

    <task v-for="t in $store.getters.tasksAtHour(this.hour)" :task="t" :key="t.id" class="container"/>

  </div>
</template>

<script>
import Task from '@/components/Task'

export default {
  name: 'TimelineHour',

  components: {
    Task
  },

  props: {
    hour: Number
  },

  methods: {
    drop(e) {
      e.preventDefault()

      const dateTimeStart = new Date()
      dateTimeStart.setHours(this.hour + 1)
      dateTimeStart.setMinutes(0)
      dateTimeStart.setSeconds(0)

      const dateTimeEnd = new Date()
      dateTimeEnd.setHours(this.hour + 2)
      dateTimeEnd.setMinutes(0)
      dateTimeEnd.setSeconds(0)

      const dateToISOButLocal = (date) => {
        const offsetMs = date.getTimezoneOffset() * 60 * 1000
        const msLocal = date.getTime() - offsetMs
        const dateLocal = new Date(msLocal)
        const iso = dateLocal.toISOString()
        return iso.slice(0, 19)
      }


      const data = {
        dateTime: {
          start: dateToISOButLocal(dateTimeStart),
          end: dateToISOButLocal(dateTimeEnd)
        }
      }

      const id = e.dataTransfer.getData('text')
      const taskPos = this.$store.state.tasks.findIndex(t => t.id === id)
      if (taskPos >= 0) {
        this.$store.state.tasks[taskPos].properties['When'].date = data.dateTime
      }

      this.$store.dispatch('updateTaskTime', {
        id: id,
        data: data
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