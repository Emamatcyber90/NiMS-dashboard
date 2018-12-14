<template>
  <div class="email">
    <b-container class="main">
        <b-row>
            <b-col>
              <h5>Email</h5>
              <hr class="my-4">
            </b-col>
        </b-row>
        <b-row>
          <b-col cols="9">
            <b-form @submit="onSubmit">
              <b-table :items="form.emails" thead-class="hidden_header">
              </b-table>

              <b-form-group id="emailInputGroup" label="Add email address:" label-for="email">
                <b-form-input id="email" type="email" v-model="form.email" required placeholder="Enter email address"></b-form-input>
                <b-button href="" v-on="addEmailListener">Add</b-button>
              </b-form-group>
              <hr class="my-4">

              <b-form-group id="primaryInputGroup" label="Primary email address" label-for="primary">
                <b-form-select id="primary" v-model="form.primary" :options="form.emails" class="mb-3" size="sm" />
              </b-form-group>
              <hr class="my-4">

              <!--
              <b-form-group id="backupInputGroup" label="Backup email address" label-for="backup">
                <b-form-select id="backup" v-model="form.backup" :options="form.emails" class="mb-3" size="sm" />
              </b-form-group>
              <hr class="my-4">
              -->
              

              <br>
              <b-button type="submit" variant="primary">Save Email Preferences</b-button>
            </b-form>
          </b-col>
          <b-col>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style>
  .hidden_header {
    display: none;
  }
</style>

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
  name: 'email',
  components: {
    
  },
  mounted () {
    let self = this;
    let apikey = this.$cookies.get('NiMS_API_KEY'),
      user = this.$cookies.get('NiMS_USER');

    axiosCache.get('http://dashboard.api.nims.june07.com:3002/api/v1/form/email/' + user, {
      headers: { 'Authorization': JSON.stringify({ apikey: apikey }) }
    })
    .then(response => {
        Object.assign(self.form, {
          email: response.data.email || '',
          emails: response.data.emails || [],
          backup: response.data.backup || '',
          primary: response.data.primary || '',
          private: response.data.private || true,
          optin: response.data.optin || 'marketing'
        });
    });
  },
  data () {
    return {
      form: {
        email: '',
        emails: [],
        backup: '',
        primary: '',
        private: '',
        optin: '',
        dismissCountDown: 0
      },
      errors: [],
      show: true
    }
  },
  computed: {
    addEmailListener: function () {
      var vm = this
      // `Object.assign` merges objects together to form a new object
      return Object.assign({},
        // We add all the listeners from the parent
        this.$listeners,
        // Then we can add custom listeners or override the
        // behavior of some listeners.
        {
          // This ensures that the component works with v-model
          click: function (event) {
            if(!vm.form.email) {
              vm.errors.push("Email required.");
            } else if(!vm.validEmail(vm.form.email)) {
              vm.errors.push("Valid email required.");        
            }
            if(vm.errors.length) {
              setTimeout(() => { vm.errors = [], 3000});
            } else {
              if (!vm.form.emails.map(i => i.email).includes(vm.form.email)) vm.form.emails.push({ email: vm.form.email });
              vm.$emit('input', event.target.value)
            }
          }
        }
      )
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault();
      axiosCache.put('http://dashboard.api.nims.june07.com:3002/api/v1/form/email', {
        user: this.$cookies.get('NiMS_USER'),
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
    },
    validEmail:function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
</script>

