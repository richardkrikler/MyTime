<template>
  <div class="border-t-2 dark:border-gray-700 pl-2.5 flex flex-row" @drop="drop" @dragover="dragOver"
       @dragleave="dragLeave" @dragenter="dragEnter">
    <span class="text-gray-500 dark:text-gray-300 py-1 pr-2 w-6 text-right">
      {{ hour }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TimelineHour',

  props: {
    hour: Number
  },

  methods: {
    drop(e) {
      e.preventDefault()
      const id = e.dataTransfer.getData('text')
      const draggable = document.getElementById(id)

      e.target.appendChild(draggable)
      draggable.classList.remove('invisible')
      draggable.classList.add('container')

      // this.$store.dispatch('updateTaskTime', {id: draggable.id, when: {when: null}})

      const dateTimeStart = new Date()
      dateTimeStart.setHours(this.hour)
      dateTimeStart.setMinutes(0)
      dateTimeStart.setSeconds(0)

      const dateTimeEnd = new Date()
      dateTimeEnd.setHours(this.hour + 1)
      dateTimeEnd.setMinutes(0)
      dateTimeEnd.setSeconds(0)

      const dateToISOButLocal = (date) => {
        const offsetMs = date.getTimezoneOffset() * 60 * 1000;
        const msLocal = date.getTime() - offsetMs;
        const dateLocal = new Date(msLocal);
        const iso = dateLocal.toISOString();
        return iso.slice(0, 19);
      }

      console.log(dateToISOButLocal(dateTimeStart))

      this.$store.dispatch('updateTaskTime', {
        id: draggable.id,
        when: {
          when: {
            start: dateToISOButLocal(dateTimeStart),
            end: dateToISOButLocal(dateTimeEnd)
          }
        }
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