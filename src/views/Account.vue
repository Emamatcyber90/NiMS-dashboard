<template>
  <div class="account">
    <b-container class="main">
        <b-row>
            <b-col>
              <h5>Account</h5>
              <hr class="my-4">
            </b-col>
        </b-row>
        <b-row>
          <b-col cols="9">
            <b-form @submit="onSubmit">
              <h6>Delete Account</h6>
              <hr class="my-4">
              <div>
              "Measure once, cut twice...?"  Oh, wait!<br>
              </div>
              <br>
              <b-form-group id="delete" label-for="companyInputGroup" description="PLEASE be sure this is what you want to do.  Once it's gone, it's gone.">
                <b-button type="submit" variant="danger">Delete Account</b-button>
              </b-form-group>
              
            </b-form>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueCookies from 'vue-cookies'
import axios from 'axios';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

const axiosCache = axios.create({
    baseURL: '/',
    headers: { 'Cache-Control': 'no-cache' },
    adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
});

Vue.use(BootstrapVue);
Vue.use(VueCookies);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'account',
  components: {
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      axiosCache.post('http://dashboard.api.nims.june07.com:3002/api/v1/account', {
        data: { user: this.$cookies.get('NiMS_USER') },
        action: 'delete'
      }, {
        headers: { 'Authorization': JSON.stringify({ apikey: this.$cookies.get('NiMS_API_KEY') }) }
      })
      .then(response => {
           this.console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        this.console.log(error);
      })
    }
  }
}
</script>
