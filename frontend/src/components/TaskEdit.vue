<template>
    <div class="container mt-2" v-if="tasks.length != 0">
      <div v-for="(task, index) in tasks" :key="index">
        <b-card :title="task.title" class="mb-2" id="task_card" v-if="!task.complete">
          <b-card-text>{{ task.description }}</b-card-text>
          <b-card-text v-if="task.deadline"><b-badge>Deadline: {{ task.deadline }}</b-badge></b-card-text>

          <b-button variant="outline-secondary" class="mr-2" @click="edit(task, index)"> Edit </b-button>
          <b-button variant="outline-danger" class="mr-2" @click="remove(task, index)"> Delete </b-button>
        </b-card>
      </div>

      <b-modal ref="modalRemove" hide-footer title="Delete task" centered>
        <div class="d-block text-center">
          <p>Do you really want to delete this task?</p>
          <p>Task name: {{ taskSelected.title }}</p>
        </div>
        <div class="mt-3 d-flex justify-content-end">
          <b-button variant="outline-secondary" class="mr-2" @click="hideModal"> Cancel </b-button>
          <b-button variant="outline-danger" class="mr-2" @click="confirmRemoveTask"> Delete </b-button>
        </div> 
      </b-modal>      
    </div>
  <div class="container mt-2" v-else>
    <b-card class="mb-2" id="task_card">
      <b-card-text>You haven't created any tasks yet.</b-card-text>
      <b-card-text>Want to create one?</b-card-text>
      <b-button variant="outline-danger" class="mr-2" to="/form">Just click here!</b-button>
    </b-card>
  </div>
</template>
    
<script>
import crudTasksMixin from "../../mixins/crudTasks.js";

export default {
  name: 'List',
  mixins: [crudTasksMixin],
  data() {
    return {
      tasks: [],
      taskSelected: [],
    }
  },
  created() {
    this.getTasks();
  },
  methods: {
    edit(task, index) {
      this.$router.push({ name: 'form', params: { index, task } });
    },
    remove(task, index) { 
      this.taskSelected = task;
      this.taskSelected.index = index;
      this.$refs.modalRemove.show();
    },
    hideModal() {
      this.$refs.modalRemove.hide();
    },
    confirmRemoveTask(evt) {
      evt.preventDefault();
      this.deleteTask(this.taskSelected.id);
      this.hideModal();
    }
  }
};
</script>

<style>
#task_card {
  background-color: #99C4C8;
  border-radius: 20px;
  color: rgb(100, 101, 120);
  box-shadow: -1px 1px 11px 1px rgba(0,0,0,0.36);
  -webkit-box-shadow: -1px 1px 11px 1px rgba(0,0,0,0.36);
}
#task_card:hover {
  box-shadow: -1px 1px 11px 1px rgba(49, 50, 68);
  -webkit-box-shadow: -1px 1px 11px 1px rgb(49, 50, 68);
}
.modal-content {
  background-color: #99C4C8!important;
}
.modal-content p {
  color: rgb(100, 101, 120);
  font-weight: 600;
}
.modal-title {
  color: #d95526;
}
.modal-header {    
    border-bottom: 1px solid #4a949b!important;
}
@media only screen and (max-width: 768px) {
  .line{    
    width: auto !important;
  }
}
</style>