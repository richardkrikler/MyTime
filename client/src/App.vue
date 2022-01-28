<template>
  <div class="flex flex-col justify-center h-screen place-items-center">
    <div class="container">
      <h1 class="text-3xl font-bold text-center border-2 rounded-xl p-3.5 m-2.5 text-gray-600">
        MyTime
      </h1>

      <div class="flex flex-row">
        <timeline class="container"/>

        <tasks class="container"/>
      </div>
    </div>
  </div>
</template>

<script>
import Timeline from './components/Timeline'
import Tasks from './components/Tasks'

export default {
  name: 'App',
  components: {
    Timeline,
    Tasks
  },
};
</script>

<style scoped>
</style>