<template>
   <nav class="navbar is-dark is-fixed-top">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <!--<img src="https://res.cloudinary.com/celestialmk/image/upload/v1656186253/gxba9p09dsp6qs68sipl.png" alt="">
          
        <strong>TOFALI MATERIALS ESTIMATOR</strong>-->
          <img
            src="https://res.cloudinary.com/celestialmk/image/upload/v1656789200/owpuw98v7us7vnd6fvok.png"
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
          <router-link
            to="/materials-calculator"
            class="navbar-item"
            @click="clearCart()"
            >Materials Calculator</router-link
          >
          <router-link to="/carbon-footprint-calculator" class="navbar-item"
            >Carbon Footprint</router-link
          >
          <router-link to="/documents" class="navbar-item"
            >Documents</router-link
          >

          <router-link to="/about" class="navbar-item">About</router-link>

          <div class="navbar-item" v-if="$store.state.isAuthenticated">
            <h5 class="">Logged in as {{ $store.state.username }}</h5>
          </div>
          <div class="navbar-item" v-if="$store.state.isAuthenticated">
            <button
              @click="logout()"
              class="button is-success"
              style="background-color: #004100"
            >
              Log out
            </button>
          </div>
          <div class="navbar-item" v-else>
            <router-link
              to="/sign-up"
              class="button is-success mr-2"
              style="background-color: #004100"
              >Sign Up</router-link
            >
            <router-link
              to="/log-in"
              class="button is-success"
              style="background-color: #004100"
              >Log In</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  <router-view/>

  <footer id="footer">
      <div class="widgetized-footer has-text-left">
        <div class="container">
          <div class="row">
            <div class="column is-4">
              <div class="footer-widget">
                <img
                  src="https://res.cloudinary.com/celestialmk/image/upload/v1656789200/owpuw98v7us7vnd6fvok.png"
                  class="mb-1"
                  alt=""
                />
                <p class="has-text-white">
                  Eco Concrete Ltd runs a business model of producing cement
                  based materials (blocks, planters, pipes and pavers etc.) on
                  construction sites. By deploying our industrial scale machines
                  on construction sites, including the remotest places in
                  Uganda, we reduce the cost of the materials we provide by
                  about 30% and construction costs by up to 20%.
                </p>
              </div>
            </div>
            <div class="column is-4">
              <div class="footer-widget">
                <div class="">
                  <h3 class="widget-title">Get In Touch</h3>
                </div>
                <ul class="menu-links has-text-white">
                  <li class="">
                    ECO CONCRETE LIMITED
                    <br />
                    Plot. No. 39b, Naguru drive;
                  </li>
                  <li>P.O. Box 37, Ntinda - Kampala</li>
                  <li>+256 393240090</li>
                  <li>
                    Email:
                    <a href="admin@ecoconcrete.co.ug"
                      >tofali@ecoconcrete.co.ug</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="column is-4">
              <div class="footer-widget">
                <div class="">
                  <h3 class="widget-title">Important Links</h3>
                </div>
                <ul class="mb-2">
                  <li>
                    <router-link to="/about">
                      <a class="has-green-text">About Us</a>
                    </router-link>
                  </li>
                  <li>
                    <a href="https://ecoconcrete.co.ug/">Company Profile</a>
                  </li>
                  <li>
                    <router-link to="/">
                      <a class="">Home</a>
                    </router-link>
                  </li>
                  <div class="columns is-12 is-mobile">
                    <div class="is-4" >
                      <span class="icon ml-3 mt-3"><a href="https://twitter.com/TofaliAfrica"><i class="fab fa-twitter fa-lg" aria-hidden="true" style="color:#41c373"></i></a></span>
                      
                    </div>
                    <div class="is-4">
                      <span class="icon ml-3 mt-3"><a href="https://www.facebook.com/profile.php?id=100093655031029"><i class="fab fa-facebook fa-lg" aria-hidden="true" style="color:#41c373"></i></a></span>
                    </div>
                    <div class="is-4">
                      <span class="icon ml-3 mt-3"><a href="https://instagram.com/tofali_africa?igshid=OGQ5ZDc2ODk2ZA=="><i class="fab fa-instagram fa-lg" aria-hidden="true" style="color:#41c373"></i></a></span>
                    </div>
                  </div>
                  <!--
                  <li>
                      <router-link to="/portfolio">
                        <a class="">Portfolio</a>
                      </router-link>
                    </li>
                    <li>
                      <a href='https://play.google.com/store/apps/details?id=com.tofaliafrica.client.twa&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
                      <img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
                    </li>
                  -->
                  <li>TofaliAfrica December 12 Version</li>
                </ul>
              </div>
            </div>
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
          <p class="has-text-center has-text-white">
            &copy; 2023 Tofali Africa. A platform for Eco Concrete Ltd Clients.
          </p>
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
      cart: {
        items: [],
      },
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
