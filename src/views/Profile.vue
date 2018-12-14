<template>
  <div class="profile">
    <b-container class="main">
        <b-row>
            <b-col>
              <h5>Profile</h5>
              <hr class="my-4">
            </b-col>
        </b-row>
        <b-row>
          <b-col cols="9">
            <b-form @submit="onSubmit">
              <b-form-group id="exampleInputGroup2" label="Your Name:" label-for="exampleInput2">
                <b-form-input id="exampleInput2" type="text" v-model="form.name" required placeholder="Enter name"></b-form-input>
              </b-form-group>
              
              <b-form-group id="emailInputGroup" label="Email" label-for="exampleInput1" description="We'll never share your email with anyone else.">
                <b-form-input id="exampleInput1" type="email" v-model="form.email"></b-form-input>
              </b-form-group>
              
              <b-form-group id="bioInputGroup" label="Bio" label-for="bioInput">
                <b-form-textarea id="bioInput" v-model="form.bio" placeholder="Share something about yourself" :rows="3" :max-rows="6"></b-form-textarea>
              </b-form-group>

              <b-form-group id="urlInputGroup" label="URL" label-for="urlInputGroup" description="">
                <b-form-input id="urlInput" type="url" v-model="form.url"></b-form-input>
              </b-form-group>
              
              <b-form-group id="companyInputGroup" label="Company" label-for="companyInputGroup" description="">
                <b-form-input id="companyInput" type="text" v-model="form.company"></b-form-input>
              </b-form-group>
              <br>
              <b-button type="submit" variant="primary">Update Profile</b-button>
            </b-form>
          </b-col>
          <b-col>
            Profile Picture
            <b-img rounded fluid-grow blank-color="#424242" alt="img" :src="form.picture" />
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
  name: 'profile',
  components: {
    
  },
  mounted () {
    let self = this;
    let cookie = this.$cookies.get('nims');
    let apikey = cookie.NiMS_API_KEY,
      uid = cookie.NiMS_UID,
      picture = cookie.NiMS_ProfilePicture;

    axiosCache.get('http://dashboard.api.nims.june07.com:3002/api/v1/form/' + uid, {
      headers: { 'Authorization': JSON.stringify({ apikey: apikey }) }
    })
    .then(response => {
        Object.assign(self.form, {
          type: 'profile',
          email: response.data.email || '',
          name: response.data.name || '',
          bio: response.data.bio || '',
          url: response.data.url || '',
          company: response.data.company || '',
          picture: response.data.picture || picture
        });
    });
  },
  data () {
    return {
      form: {
        email: '',
        name: '',
        bio: '',
        url: '',
        company: '',
        picture: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      axiosCache.post('http://dashboard.api.nims.june07.com:3002/api/v1/form', {
        uid: this.$cookies.get('NiMS_UID'),
        type: 'profile',
        data: this.form
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
