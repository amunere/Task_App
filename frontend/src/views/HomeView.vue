<template>
  <div id="align-center">
    <b-jumbotron id="task">
      <h1 class="text-uppercase">task app</h1>
      <b-badge pill variant="primary">Total tasks: {{ total }}</b-badge> 
      <b-badge pill variant="success">Complete task: {{ done_count }}</b-badge>
      <b-badge pill variant="warning">Waiting for complete: {{ do_count }}</b-badge>
    </b-jumbotron>    
    
  </div>
</template>

<script>
import crudTasksMixin from "../../mixins/crudTasks.js";

export default {
  name: "TaskHome",
  mixins: [crudTasksMixin],
  data() {
    return {
      tasks: [],
      done_count: 0,
      do_count: 0,
      total: 0
    }
  },
  created() {
    this.getTasks();
  }
};
</script>

<style >
#task {
  background-color: #68A7AD;
}
#task h1 {
  color: #fff;
  font-weight: 700 !important;
  font-size: 11rem !important;
}
#align-center {
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  #task h1 {
    color: #fff;
    font-weight: 700 !important;
    font-size: 5rem !important;
  }
}
</style>
