<template>
  <div>
    <h1>Welcome to Meteor 1!</h1>
    <!-- <hello/> -->
    <!-- <info/> -->
    <!-- <Task /> -->
    <TaskForm />
    <ul>
      <Task
          v-for="task in tasks"
          v-bind:key="task._id"
          v-bind:task="task"
      />
    </ul>
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import Info from './components/Info.vue'
import Task from "./components/Task.vue";
import TaskForm from "./components/TaskForm.vue";


import Tasks from './../api/collections/Tasks'

import { subscribe, autorun } from "vue-meteor-tracker";


export default {
  components: {
    Hello,
    Info,
    Task,
    TaskForm
  },
  data() {
    return {
      tasks: []
    }
  },
  mounted() {
    subscribe('tasks')
    autorun(() => {
      this.tasks = Tasks.find().fetch()
    })
  }
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
</style>
