<template>
   <div class="home-container">
     <div class="column">
       <div class="column-header">
         <h1>Drivers</h1>
       </div>
       <PreviewList :contents="drivers" :isDriver="true"></PreviewList>
     </div>
     <div class="column">
       <div class="column-header">
         <h1>Circuits</h1>
       </div>
       <PreviewList :contents="circuits" :isDriver="false"></PreviewList>
     </div>
   </div>
 </template>
 
<script>
import PreviewList from '@/components/PreviewList.vue';
export default {
   name: 'HomePage',
   components: {
      PreviewList
   },
   data() {
      return {
         drivers: [],
         circuits: []
      }
   },
   
   methods: {
      async getDrivers() {
         const response = await this.$axios.get("http://localhost:3000/drivers/randomDrivers")
         
         this.drivers.push(...response.data)
         
      },
      async getCircuits() {
         const response = await this.$axios.get("http://localhost:3000/circuits/randomCircuits")
         
         this.circuits.push(...response.data)
         
      }


      
   },mounted() {
      this.getDrivers()
      this.getCircuits()
   },



}
</script>

<style>
.home-container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.column {
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally within the column */
}

.column-header {
  text-align: center; /* Center the text horizontally */
  margin-bottom: 10px; /* Add some space below the header */
}
</style>
