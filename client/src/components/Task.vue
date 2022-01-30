<template>
  <div class="border-2 dark:border-gray-700 my-2 mx-2 px-2.5 py-1.5 rounded-md bg-white dark:bg-gray-800 task" draggable="true" @dragstart="dragStart" @dragend="dragEnd"
       :id="task.id">

    <p class="font-bold text-gray-600 dark:text-gray-200" v-if="task.properties['Topic'].select !== null">
      {{ task.properties['Topic'].select.name }}
    </p>

    <p class="text-gray-500 dark:text-gray-300">
      {{ task.properties['Beschreibung'].title[0].text.content }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Task',

  props: {
    task: {
      type: Object
    }
  },

  data() {
    return {
      visible: true
    }
  },

  methods: {
    dragStart(e) {
      e.dataTransfer.setData('text', e.target.id)
      setTimeout(() => {
        e.target.classList.add('invisible')
      }, 0)
    },

    dragEnd(e) {
      e.target.classList.remove('invisible')
    }
  }
}
</script>

<style scoped>
</style>