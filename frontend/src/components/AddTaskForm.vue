<template>
  <div>
    <b-form @submit.prevent="saveTask">
      <b-form-group label="Title" label-for="title" class="text">
        <b-form-input
          id="title"
          v-model="AddTaskForm.title"
          name="title"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

     <b-form-group label="Description" label-for="description" class="text">
        <b-form-textarea
          id="description"
          v-model="AddTaskForm.description"
          type="text"
          required
        ></b-form-textarea>
      </b-form-group>
      <b-form-group label="Select deadline" label-for="deadline" class="text">
        <b-form-datepicker
          id="deadline"
          v-model="AddTaskForm.deadline"
          :date-format-options="{ day: 'numeric', month: 'numeric', year: 'numeric' }"
          :min="current_date"
          today-button
          reset-button
          locale="en"
        ></b-form-datepicker>
      </b-form-group>

      <b-form-group label="Task complete?" label-for="complete" class="text" v-if="methodSave != 'new'">
        <b-form-checkbox
          id="complete"
          v-model="AddTaskForm.complete"
          value="true"
          unchecked-value="false"
        >
          Done
        </b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="outline-success">
        Save 
      </b-button>
    </b-form>
  </div>
</template>

<script>
import crudTasksMixin from "../../mixins/crudTasks.js";

export default {
  name: "AddTaskForm",
  mixins: [crudTasksMixin],
  data() {
    return {
      tasks: [],      
      AddTaskForm: {
        title: '',
        description: '',
        deadline: '',
        complete: [],
      },
      methodSave: "new",
      current_date: '',
    };
  },
  created() {    
    this.getTasks();
    this.saveMethod();   
    this.getCurrentDate();     
  },
  methods: { 
    saveMethod() {    
      if (this.$route.params.index === 0 || this.$route.params.index !== undefined) {     
        this.methodSave = "update"; 
        this.AddTaskForm = this.$route.params.task;       
      } else {
        this.methodSave = "new";
      }
    },
    initForm() {
      this.AddTaskForm.title = '';
      this.AddTaskForm.description = '';
      this.AddTaskForm.deadline = '';
      this.AddTaskForm.complete = [];
    },
    saveTask(evt) {
      if (this.methodSave === "update") {        
        evt.preventDefault();
        let complete = false;
        if (this.AddTaskForm.complete) complete = true;
        const load = {
          title: this.AddTaskForm.title,
          description: this.AddTaskForm.description,
          deadline: this.AddTaskForm.deadline,
          complete,
        };
        this.updateTask(load, this.AddTaskForm.id);
        this.initForm();
        return;
      }
      evt.preventDefault();
      let complete = false;
      const load = {
        title: this.AddTaskForm.title,
        description: this.AddTaskForm.description,
        deadline: this.AddTaskForm.deadline,
        complete, 
      };
      this.addTask(load);
      this.initForm();  
      return;
    },
  },
};
</script>

<style>
.container {
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 30px;
}
.text {
  color: rgb(100, 101, 120);
  font-weight: 600;
}
#description,
#title,
#deadline,
#deadline__outer_ {
  background-color: #99c4c8;
  border-radius: 7px;
  color: rgb(255, 255, 255);
  box-shadow: -1px 1px 11px 1px rgba(0, 0, 0, 0.36);
  -webkit-box-shadow: -1px 1px 11px 1px rgba(0, 0, 0, 0.36);
  border: none;
}
</style>
