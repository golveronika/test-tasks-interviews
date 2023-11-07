<template>
  <form class="new-task" @submit.prevent="handleSubmit">
    <input
      type="text"
      placeholder="Type to add new tasks"
      v-model="newTask"
    />
    <button type="submit">Add Task</button>
  </form>
</template>
  
<script>
//   import Vue from "vue";
//   import { TasksCollection } from "../../api/TasksCollection";

export default {
  data() {
    return {
      newTask: ""
    }
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      Meteor.call('createTask', this.newTask, (error) => {
        if (error) {
          alert(error.error)
        } else {
          this.newTask = ''
        }
      })
    }
  },
}

</script>