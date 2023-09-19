<template>
    <div class="driver-page">
      
      <section class="drivers-by-year">
        <h2>Drivers by Year</h2>
        <p>Get all drivers' information for a specific year</p>
        <div class="year-search">
          <input v-model="year" placeholder="Year" class="search-input-field">
          <button @click="searchByYear" class="search-button">Search</button>
          <div class="sorting">
            <b-form-select v-model="selected" :options="options" class="sort-select"></b-form-select>
            <button @click="sort" class="sort-button">Sort</button>
          </div>
        </div>
        <div v-if="driversByYear.length > 0" class="year-results">
            <br>
          <h3>Drivers in {{ year }}:</h3>
          <PreviewList :contents="driversByYear" :isDriver="true"></PreviewList>
        </div>
      </section>
      <section class="search-section">
        <h2>Search for a Driver</h2>
        <p>Get specific driver information</p>
        <div class="search-input">
          <input v-model="name" placeholder="Search by ID or Name" class="search-input-field">
          <button @click="searchDriver" class="search-button">Search</button>
        </div>
        <div v-if="drivers.length > 0" class="search-results">
            <br>
          <h3>Search Results:</h3>
          <PreviewList :contents="drivers" :isDriver="true"></PreviewList>
        </div>
      </section>
  
      <section class="driver-standings">
        <h2>Driver Standings</h2>
        <p>Top 3 drivers in 2020-2022</p>
        <div class="standing-tables">
          <div>
            <h3>2022</h3>
            <b-table class="standing" :small="true" :bordered="true" :items="items3"></b-table>
          </div>
          <div>
            <h3>2021</h3>
            <b-table class="standing" :small="true" :bordered="true" :items="items2"></b-table>
          </div>
          <div>
            <h3>2020</h3>
            <b-table class="standing" :small="true" :bordered="true" :items="items1"></b-table>
          </div>
        </div>
      </section>
    </div>
  </template>

<script>
import PreviewList from '@/components/PreviewList.vue';
// import { BFormSelect } from 'bootstrap-vue';
export default {
    name: 'DriverPage',
    components: {
        PreviewList,
        // BFormSelect

    },
    data() {
        return {
            name: "",
            drivers: [],
            year: "",
            driversByYear: [],
            selected: null,
            options: [
                {value:null , text:'Sorting by'},
                {value:"high" , text:'Rank: high to low'},
                {value:"low" , text:'Rank: low to high'},
                {value:"name" , text:'Name: A to Z'},
                {value:"birthday" , text:'By age: young to old'},
            ],
            items1:{},
            items2:{},
            items3:{},


        }
    },
    methods: {
       async searchDriver() {
        try{
            
            const response = await this.$axios.get("http://localhost:3000/drivers/searchDriver", 
            {
                params: {
                    name: this.name
                },
            });
            console.log(response.data)
            this.drivers= response.data;
            
        } catch (error) {
            console.log(error);
        }
    },
    sortDriverByName(){
        this.driversByYear.sort((a,b) => {
            if(a.givenName < b.givenName) { return -1; }
            if(a.givenName > b.givenName) { return 1; }
            return 0;
        })
    },
    sortDriverByAge(){
        this.driversByYear.sort((a,b) => {
            if(a.dateOfBirth > b.dateOfBirth) { return -1; }
            if(a.dateOfBirth < b.dateOfBirth) { return 1; }
            return 0;
        })
    },
    sortDriverByRankHigh(){
        this.driversByYear.sort((a,b) => {
            if(Number(a.position) < Number(b.position)) { return -1; }
            if(Number(a.position) > Number(b.position)) { return 1; }
            return 0;
        })
    },
    sortDriverByRankLow(){
        this.driversByYear.sort((a,b) => {
            if(Number(a.position) > Number(b.position)) { return -1; }
            if(Number(a.position) < Number(b.position)) { return 1; }
            return 0;
        })
    },
    sort(){
        if(this.selected == "name"){
            this.sortDriverByName();
        }
        if(this.selected == "birthday"){
            this.sortDriverByAge();
        }
        if(this.selected == "high"){
            this.sortDriverByRankHigh();
        }
        if(this.selected == "low"){
            this.sortDriverByRankLow();
        }
    },
    async searchByYear(){
        try{
            const response = await this.$axios.get("http://localhost:3000/drivers/driversByYear", 
            {
                params: {
                    year: this.year
                },
            });
            this.driversByYear= response.data;
            if (this.selected == "name"){
                this.sortDriverByName();
            }

        }catch (error) {
            console.log(error);
    }
    } ,
    async getStandings(year) {
        try{
            const response = await this.$axios.get("http://localhost:3000/drivers/driverStandingsByYear", 
            {
                params: {
                    year: year
                },
            });
            
            const constructorName = response.data.map((item) => {
                return item.Constructors[0].name;
            })
            const driverName = response.data.map((item) => {
                return item.Driver.givenName + " " + item.Driver.familyName;
            })
            const points = response.data.map((item) => {
                return item.points;
            })
            // const wins = response.data.map((item) => {
            //     return item.wins;
            // })
            const positions = response.data.map((item) => {
                return item.position;
            })
            const items = [];
            for (let i = 0; i < 3; i++) {
                items.push({
                    positions: positions[i],
                    driverName: driverName[i],
                    points: points[i],
                    constructorName: constructorName[i],
                })
            }
            if(year == 2020){
                this.items1 = items
            }
            if(year == 2021){
                this.items2 = items
            }
            if(year == 2022){
                this.items3 = items
            }
            
        }catch (error) {
            console.log(error);
    }
    } ,
    },
    created() {
        let year = 2020;
        for (let i = 0; i < 3; i++) {
            this.getStandings(year);
            year++;
        }
        
    },

}
</script>


<style scoped>
.driver-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
}

.search-section,
.drivers-by-year,
.driver-standings {
  margin-bottom: 3vh;
  text-align: center;
}

.search-input,
.year-search,
.sorting {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.standing-tables {
  display: flex;
  justify-content: space-between;
}

.standing-tables > div {
  width: calc(33.33% - 20px);
}

/* Media query for smaller screens to stack tables vertically */
@media (max-width: 768px) {
  .standing-tables > div {
    width: 100%;
    margin-right: 0;
  }
}
.search-button,
.sort-button{
    background-color: #e85a4f;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 17px;
  cursor: pointer;

}
.search-button:hover,
.sort-button:hover {
  background-color: #d8c3a5;
}
.sort-select {
  width: 10rem;
  font-size: 1rem;
  border: 1px solid #d8c3a5;
  border-radius: 12px;
  color: #333; /* Text color */
}
.search-input-field,
.year-input-field {
  padding: 0.5rem;
  border: 1px solid #d8c3a5;
  border-radius: 12px;
  font-size: 1rem;
  margin-right: 0.5rem;
  width: 12rem;
  color: #333; /* Text color */
}

</style>