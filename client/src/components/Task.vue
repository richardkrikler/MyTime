<template>
  <div class="border-2 m-2 px-2.5 py-1.5 rounded-md bg-white task container" draggable="true" @dragstart="dragStart" @dragend="dragEnd"
       :id="task.id">

    <p class="text-gray-500 font-bold" v-if="task.properties['Topic'].select !== null">
      {{ task.properties['Topic'].select.name }}
    </p>

    <p class="text-gray-500">
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