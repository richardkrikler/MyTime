<template>
  <div class="border-t-2 dark:border-gray-700 pl-2.5 flex flex-row" @drop="drop" @dragover="dragOver"
       @dragleave="dragLeave" @dragenter="dragEnter">
    <span class="text-gray-500 dark:text-gray-300 py-1 pr-2 w-6 text-right">
      {{ hour }}
    </span>

    <div class="container">
      <task v-for="t in $store.getters.tasksAtHour(this.hour)" :task="t" :key="t.id"/>
    </div>

  </div>
</template>

<script>
import Task from '@/components/Task'
import {NotionDate} from '@/models/NotionDate'

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

      const dateSetter = (date, hour) => {
        date.setHours(hour)
        date.setMinutes(0)
        date.setSeconds(0)

        const offsetMs = date.getTimezoneOffset() * 60 * 1000
        const msLocal = date.getTime() - offsetMs
        const dateLocal = new Date(msLocal)
        const iso = dateLocal.toISOString()
        return iso.slice(0, 19) + '.000+00:00'
      }

      const id = e.dataTransfer.getData('text')

      const notionDate = new NotionDate(dateSetter(new Date(), this.hour), dateSetter(new Date(), this.hour + 1))

      this.$store.dispatch('updateTaskDate', {
        id: id,
        date: notionDate
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