<template>
  <div>
    {{ task.properties['Beschreibung'].title[0].text.content }}
  </div>
</template>

<script>
export default {
  name: 'Task',

  props: {
    task: {
      type: Object
    }
  }
}
</script>

<style scoped>
</style>