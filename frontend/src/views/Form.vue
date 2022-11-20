<template>
    <div class="container mt-2">
      <AddTaskForm />
    </div>
</template>

<script>
import AddTaskForm from '../components/AddTaskForm.vue';

export default {
  name: 'Form',
  components: {
    AddTaskForm,
  },
};
</script>

<style>
  .container{
    height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 30px;
  }
</style>
