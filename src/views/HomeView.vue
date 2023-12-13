<template>
 <div class="section">
<div class="container column is-half-desktop">
    <h3 class="has-text-left is-size-5 has-text-weight-bold">Carbon Footprint Calculator For a Building</h3>
    <div class="has-text-left">
        <h3><strong>SITE LOCATION</strong></h3>
    </div>   
        <vue-google-autocomplete
            ref="address"
            id="map"
            class="input"
            placeholder="Enter site location for the building"
            v-on:placechanged="getAddressData"
            country="ug"
            types=""
            >
        </vue-google-autocomplete>
</div>
</div>

<div class="section pt-2 mb-3 has-text-left">
    <div class="container column is-half-desktop">
        <div class="dropdown" id="drop">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" onclick="this.parentNode.parentNode.classList.toggle('is-active')">   
            <span class="pr-3"><strong>Concrete Strength Class :  </strong></span>
                <span v-if="this.selectedValue ==''">Select Strength Class:</span>
                <span v-else>{{ selectedValue }}</span>
                <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <a class="dropdown-item is-size-6" v-for="concrete in $store.state.concrete_class" :key="concrete.id" @click="selectOption(concrete)">
                {{ concrete.name }}
                </a>
            </div>
            </div>
        </div>
        <h4>If Concrete class is not specified, default value is C20</h4>
    </div>
</div>

<div class="section pt-2 pb-2">
    <div class="container column is-half-desktop">
        <h4 class="has-text-left has-text-weight-bold">Ground floor Area (Square meters)</h4>
        <input type="number" class="input mb-3" @change="setGFArea()"
                placeholder="Enter Ground floor area"
                v-model="groundQuantity">
                <h4 class="has-text-left has-text-weight-bold">Subsequent floor Area (Square meters)</h4>
        <input type="number" class="input" @change="setTotalArea()"
        placeholder="Enter Total floor area"
        v-model="totalQuantity">
    </div>
</div>

<div class="section pt-2 pb-2">
    <div class="container column is-half-desktop">
          <a class="button is-success pb-2">
            Calculate Total
          </a>
    </div>
</div>



<div class="section pt-2" v-if="this.getTotalEmissions() != ''" >
 <div class="container column is-half-desktop">
    <article class="message is-primary">
        <div class="message-body">
            <h2 class="is-size-5">Total Carbon dioxide emissions:
            <strong>{{ getTotalEmissions().toLocaleString() }} kgCO2-e</strong></h2>
        </div>
    </article>
    </div>
</div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import store from "@/store";


export default {
  name: 'HomeView',
  components:{
        VueGoogleAutocomplete,
    },
    data(){
        return{
            groundQuantity: '',
            totalQuantity: '',
            selectedValue: 'C20',
            isOpen: false,
            selected:'',
        }
    },
    computed:{

    },
    methods:{
        getAddressData: function (addressData, placeResultData, id) {
        this.address = addressData;
        this.placeResultData = placeResultData
        
        const destination = new google.maps.LatLng(this.address.latitude, this.address.longitude)

        console.log(this.address.latitude, this.address.longitude)
        console.log(this.address.administrative_area_level_1)
        console.log(this.address.locality)

        const carbon_site_location = this.address
        store.commit('setCarbonSiteLocation', carbon_site_location)

        
        const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
        const matrixOptions = {
            origins: store.state.stone_quarries, // stone quarry locations
            destinations: [destination], // customer address
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.metric
        };
      // Call Distance Matrix service
        service.getDistanceMatrix(matrixOptions, callback);

      // Callback function used to process Distance Matrix response
        function callback(response, status) {
            if (status !== "OK") {
            alert("Error with distance matrix");
            return;
            }
        //console.log(response);
        const routes = response.rows
          let leastseconds = 86400; // 24 hours
          let drivetime = "";
          let  closest = "";
          let location_distance = "";

          for (let i=0; i<routes.length; i++) {
            let routeseconds = routes[i].elements[0].duration.value;
            if (routeseconds > 0 && routeseconds < leastseconds) {
              leastseconds = routeseconds; // this route is the shortest (so far)
              drivetime = routes[i].elements[0].duration.text; // hours and minutes
              location_distance = routes[i].elements[0].distance.value
              closest = response.originAddresses[i]; // city name from destinations
            }
          }
          store.commit('setNearestQuarryDistance', location_distance)
          console.log(store.state.nearest_stone_quarry_distance)
        }
        },

        selectOption(concrete){
        this.selectedValue = concrete.name
        //Obtaining values of cement, sand and stone in 1 cubic metre of conrete
        const total = concrete.cement + concrete.sand + concrete.stone
        const cement_value = Math.ceil((1440) / total)
        const sand_value = Math.ceil((1620 * concrete.sand) / total)
        const stone_value = Math.ceil((2700 * concrete.stone) / total)
        store.commit('setCarbonCement', cement_value)
        store.commit('setCarbonSand', sand_value)
        store.commit('setCarbonStone', stone_value)

        const element = document.getElementById('drop')
        element.classList.remove('is-active')
        },

        setGFArea(){
            if (isNaN(this.groundQuantity) || this.groundQuantity < 1){
                this.groundQuantity = 0
            }
            store.commit('setGroundFloorArea', this.groundQuantity)
            console.log(store.state.ground_floor_area)
        },
        setTotalArea(){
            if (isNaN(this.totalQuantity) || this.totalQuantity < 1){
                this.totalQuantity = 0
            }
            store.commit('setTotalFloorArea', this.totalQuantity)
            console.log(store.state.total_floor_area)
        },

        getTotalEmissions(){
            if(store.state.carbon_cement == ''){
                store.commit('setCarbonCement', 205.7)
            }
            const diesel_emission_factor = 2.86767
            const cement_emission_factor = 370 //CEM IV emission factor
            const distance_travelled = (store.state.nearest_stone_quarry_distance / 1000)
            const gf_volume_per_square_metre = 0.3241
            const tf_volume_per_square_metre = 0.2536
            const total_volume = gf_volume_per_square_metre * store.state.ground_floor_area
                    + tf_volume_per_square_metre * store.state.total_floor_area 
            return Math.round(total_volume * store.state.carbon_cement * cement_emission_factor
             + diesel_emission_factor * distance_travelled)
        },

        scrollToTop(){
          window.scrollTo(0,0)
        },

    }
}
</script>
