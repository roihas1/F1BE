<template>
    <div  class="driver-info">
      <div class="driver-header">
        <h1>{{ driver.givenName }} {{ driver.familyName }}</h1>
        <p class="driver-info-text">
          Born on {{ driver.dateOfBirth }} in {{ driver.nationality }}
        </p>
      </div>
      
      <div class="driver-details">
        <div v-if="stats" class="driver-stats">
          <h2>Total Career Stats</h2>
          <div class="stats-item">
            <p class="stats-label">Total Points:</p>
            <p class="stats-value">{{ stats.totalPoints }}</p>
          </div>
          <div class="stats-item">
            <p class="stats-label">Total Wins:</p>
            <p class="stats-value">{{ stats.totalWins }}</p>
          </div>
        </div>
        
        <div v-if="stats" class="driver-career">
          <h2>Career Overview</h2>
          <ul class="career-list">
            <li v-for="(yearStats, year) in stats.standingPerYear" :key="year">
              <div class="year">{{ year }}</div>
              <div class="year-stats">
                <p class="year-label">Position:</p>
                <p class="year-value">{{ yearStats.position }}</p>
                <p class="year-label">Points:</p>
                <p class="year-value">{{ yearStats.points }}</p>
                <p class="year-label">Wins:</p>
                <p class="year-value">{{ yearStats.wins }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
      name: 'DriverInfo',
      errorCaptured(err, vm, info) {
    // Handle the error
    console.error("An error occurred in this component:", err, info);
    // Return true to stop the error from propagating further
    return true;
  },
     
      components: {
      
      },
      data() {
          return {
              driver: null,
              stats: null,
      
          }
      },
      methods: {
           async getAllInfo(){
              try{
                  const response = await this.$axios.get("http://localhost:3000/drivers/driverInfo",{
                      params: {
                          driverId: this.driver.driverId
                      },
                  })
                  this.stats = response.data;
                  
              }catch(error){
                  console.log(error)
              }
          },
        
         
      },
      created() {
          // console.log(JSON.parse(this.$route.params.driver).driverId)
          this.driver = JSON.parse(this.$route.params.driver)
          this.getAllInfo()
  
            
      }
  
  
  }
  </script>
  
  
  <style scoped>
  .driver-info {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  
  .driver-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .driver-header h1 {
    font-size: 24px;
    color: #333;
  }
  
  .driver-info-text {
    font-size: 14px;
    color: #666;
  }
  
  .driver-details {
    display: flex;
   
  }
  
  .driver-stats,
  .driver-career {
    flex: 1;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    margin-right: 10px;
  }
  
  .driver-stats h2,
  .driver-career h2 {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }
  
  .stats-item,
  .year-stats {
    display: flex;
    justify-content: space-around;
    margin-bottom: 5px;
  }
  
  .stats-label,
  .year-label {
    font-weight: bold;
    color: #555;
  }
  
  .stats-value,
  .year-value {
    color: #333;
  }
  
  .career-list {
    list-style-type: none;
    padding: 0;
  }
  
  .year {
    font-size: 16px;
    margin-bottom: 5px;
    color: #444;
    font-weight: bold;
    text-decoration: underline;
  }
  </style>
  