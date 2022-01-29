<template>
  <div class="border-t-2 pl-2.5 flex flex-row" @drop="drop" @dragover="dragOver" @dragleave="dragLeave" @dragenter="dragEnter">
    <span class="text-gray-500 py-1 pr-2 w-6 text-right">
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