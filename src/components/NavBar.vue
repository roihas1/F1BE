<template>
    <div>
      <b-navbar sticky="true" togglable="lg" class="navbar">
          <b-navbar-nav class="nav-items">
            <router-link class="nav-link" id="Home" :to="{ name: 'main' }">F1</router-link>
            <router-link class="nav-link" :to="{ name: 'drivers' }">Drivers</router-link>
            <!-- <router-link class="nav-link" > Circuits</router-link> -->
          </b-navbar-nav>
       
      </b-navbar>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  }
  </script>
  
  <style>
  .navbar {
    background-color: #e85a4f;
    position: fixed;
    /* width: 100%;
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 75px; */ 
  }
  
  .nav-items {
    display: flex;
    align-items: center;
   
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    padding-left: 2vw;
    padding-right: 2vw;
    font-size: 5vh; 
    transition: 0.3s ease;
  }
  
  .nav-link:hover {
    background-color: #d8c3a5;
    border-radius: 1.5vw;
    cursor: pointer;
  }
  .navbar-expand .navbar-nav .nav-link{
    font-size: 3.5vh;
  }
  
  #Home{
    font-size: 5vh;
    font-weight: bold;
    margin-right: 1vw;
  }
  </style>
  