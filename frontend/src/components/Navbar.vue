<template>
  <b-navbar class="navbar" type="dark">
    <b-navbar-brand class="title" to="/">Task List</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="flex">
        <b-nav-item to="/tasklist">
          <b-icon icon="list-task"></b-icon>
          Tasks</b-nav-item>
        <b-nav-item to="/form">
          <b-icon icon="plus-circle-fill"></b-icon>
        Add New Task</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "AddTaskForm",
  data() {
    return {
      
    }    
  }
};
</script>

<style>
.title {
  font-weight: 600;
}
.navbar {
  background-color: #4a949b;
  box-shadow: 0px 1px 5px -2px rgba(0, 0, 0, 0.45);
  -webkit-box-shadow: 0px 1px 5px -2px rgba(0, 0, 0, 0.45);
}
#app .nav-link:hover {
  color: rgba(0, 0, 0, 0.45)!important;
}
.b-icon.bi {
  position: relative!important;
  top: -2px!important;
}
</style>