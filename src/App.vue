<template>
   <nav class="navbar is-dark is-fixed-top">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <!--<img src="https://res.cloudinary.com/celestialmk/image/upload/v1656186253/gxba9p09dsp6qs68sipl.png" alt="">
          
        <strong>TOFALI MATERIALS ESTIMATOR</strong>-->
          <img
            src="./assets/tofali_word_logo.png"
            alt=""
          />
        </router-link>

        <a
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-menu"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        class="navbar-menu"
        id="navbar-menu"
        v-bind:class="{ 'is-active': showMobileMenu }"
      >
        <div class="navbar-start"></div>

        <div class="navbar-end has-text-left">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/" class="navbar-item"
            >Carbon Footprint</router-link
          >
          <router-link to="/about" class="navbar-item">About</router-link>

         
        </div>
      </div>
    </nav>
  <router-view/>

  <footer id="footer">
      <div class="widgetized-footer has-text-left">
        <div class="container">
          <div class="row">
                
                  <div class="columns">
                    <div class="column is-offset-5 is-6" >
                      <span class="icon ml-3 mt-3"><a href="https://twitter.com/TofaliAfrica"><i class="fab fa-twitter fa-lg" aria-hidden="true" style="color:#41c373"></i></a></span>
                      <span class="icon ml-3 mt-3"><a href="https://www.facebook.com/profile.php?id=100093655031029"><i class="fab fa-facebook fa-lg" aria-hidden="true" style="color:#41c373"></i></a></span>
                      <span class="icon ml-3 mt-3"><a href="https://instagram.com/tofali_africa?igshid=OGQ5ZDc2ODk2ZA=="><i class="fab fa-instagram fa-lg" aria-hidden="true" style="color:#41c373"></i></a></span>
                      
                    </div>
                  </div>
                
              </div>
              <div class="has-text-centered p-4">
                <p>Tofali Carbon-Footprint December 12 Version</p> 

              </div>
        </div>
      </div>
      <div
        class="copyright-footer pt-2 pl-3"
        style="background-color: rgba(0, 0, 0, 0.9)"
      >
        <div class="container">
          <ul class="mb-2 has-text-left">
            <!--

                  <li><a href="">Team</a></li>
                <li><a href="">Blog</a></li>
                -->

            <!--

                <li><a href="">Contact Us</a></li>
                <li><a href="">Privacy Policy</a></li>
              -->
          </ul>
          <div class="p-4 has-text-centered">
            <p class=" has-text-white">
              &copy; 2023  <a class="has-text-primary" href="https://tofaliafrica.com">Tofali Africa.</a> A platform for Eco Concrete Ltd Clients.
            </p>
          </div>
        </div>
      </div>
    </footer>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default{
  data() {
    return {
      showMobileMenu: false,
      
    };
  },
  beforeCreate() {
    this.$store.commit("initializeStore");



  },
}

</script>

<style lang="scss">
@import "../node_modules/bulma";

#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  a {
    &.router-link-exact-active {
      color: rgb(0, 65, 0);
    }
  }
}

.navbar-brand {
  min-height: 3.25rem;
  display: flex;
}
</style>
