<template>
  <div class="container">
    <div class = "content-details">
        <ul v-if="isDriver" class="content-overview">
            <li><router-link  :to="{ name: 'driver',params:{driver:JSON.stringify(this.content)} }" class="driver-link"> {{content.givenName}} {{content.familyName}}</router-link></li>
           
            <li>{{ content.nationality }}</li>
            <li>{{ content.dateOfBirth }}</li>
            <li v-if="content.position">Rank {{ content.position }}</li>
            <li id="link"><button @click="goToUrl" class="info-button">To wikipedia</button></li>
        </ul>
        <ul v-else class = "content-overview">
            <li>{{ content.circuitName }}</li>
            <li>{{ content.city }}, {{ content.country }}</li>
            <li id="link"><button @click="goToUrl" class="info-button">To wikipedia</button></li>
        </ul>
        
    </div>
  </div>
</template>

<script>
export default {
    name: 'PreviewContent',
    data() {
        return {
            url: ""
        }
    },
    props: {
        content: {
        type: Object,
        required: true
        },
        isDriver: {
            type: Boolean,
            required: true
        }
    },
    methods:
    {
        goToUrl() {
            window.open(this.content.url, "_blank")
            
        },
       
    },    

}
</script>

<style>
.content-details {
  display: inline-block;
  width: 50%;
  padding: 10px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
}
.content-details ul {
  margin: 0;
  padding: 0;
  list-style-type: none; 
}
.content-details li {
  margin: 5px 0; 
}
.container {
  margin: 2vh;
  width:100%
}
.info-button{
  background-color: #e85a4f;
  color: #fff;
  border: none;
  padding: 0.35rem 0.35rem;
  border-radius: 17px;
  cursor: pointer;
}
.info-button:hover {
  background-color: #d8c3a5;
}

.driver-link {
  text-decoration: none; /* Remove underline */
  color: #333; /* Change link color */
  font-weight: bold; /* Add bold font weight */
  /*add transition*/
  transition: 0.3s ease;
}
.driver-link:hover {
  color: #e85a4f; /* Change link color on hover */
  cursor: pointer; /* Add a pointer on hover */
  font-size: 1.05rem;
  
}
</style>