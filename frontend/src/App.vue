<template>
  <div id="app">
    <Navbar/>
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'root',
  components: {
    Navbar,
  },
  metaInfo: {
    title: 'Tasks App',
    titleTemplate: '%s - Example.com',
    htmlAttrs: {
      lang: 'en'
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");
  #app{
    font-family: 'Poppins', sans-serif;
    background-color: #68A7AD;
  }
  body {
    height: 100vh;
    background-color: #68A7AD !important;
  }
</style>
