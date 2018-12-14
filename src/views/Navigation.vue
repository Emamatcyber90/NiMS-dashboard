<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="dark">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#">
                <div class="row">
                    <div class="col">
                        <picture id="logo">
                            <source media="(min-width: 2880px)" srcset="https://june07.github.io/image/icon/icon128@3x.png">
                            <source media="(min-width: 1920px)" srcset="https://june07.github.io/image/icon/icon128@2x.png">
                            <source media="(min-width: 1600px)" srcset="https://june07.github.io/image/icon/icon48@3x.png">
                            <img src="https://june07.github.io/image/icon/icon128.png">
                        </picture>
                    </div>
                    <!--
                    <div class="col" id="nonlogo">
                        <div class="col">
                            <div class="row">Node /-/-inspector Mananger</div>
                            <div class="row crt">node /-/-inspect</div>
                        </div>
                    </div>
                    -->
                </div>
            </b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-form>
                        <b-form-input size="sm" class="ml-auto" type="text" placeholder="Search" />
                    </b-nav-form>
                    <b-nav-item href="https://june07.com">June07</b-nav-item>
                    <b-nav-item href="https://june07.com/nim">Chrome Web Store</b-nav-item>
                </b-navbar-nav>
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="#/notification">Notifications</b-nav-item>
                    <b-nav-item-dropdown right>
                        <!-- Using button-content slot -->
                        <template slot="button-content">
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#/profile">Profile</b-dropdown-item>
                        <b-dropdown-item href="#/signout">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-container class="body">
            <b-row>
                <b-col sm="3" class="navigation">
                    <b-card no-body header="<b>Personal Settings</b>">
                        <b-list-group id="navigation" flush>
                            <b-list-group-item href="#/profile" v-bind:class="{ active: $route.path === '/profile' }">Profile</b-list-group-item>
                            <b-list-group-item href="#/account" v-bind:class="{ active: $route.path === '/account' }">Account</b-list-group-item>
                            <b-list-group-item href="#/email" v-bind:class="{ active: $route.path === '/email' }">Email</b-list-group-item>
                            <!-- <b-list-group-item href="#/notification" v-bind:class="{ active: $route.path === '/notification' }">Notification</b-list-group-item> -->
                            <b-list-group-item href="#/billing" v-bind:class="{ active: $route.path === '/billing' }">Billing</b-list-group-item>
                            <!--
                            <b-list-group-item href="#/keys" v-bind:class="{ active: $route.path === '/keys' }">Keys</b-list-group-item>
                            <b-list-group-item href="#/security" v-bind:class="{ active: $route.path === '/security' }">Security</b-list-group-item>
                            -->
                        </b-list-group>
                        <b-card-body>
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col sm="9" class="main">
                    <router-view/>
                </b-col>
            </b-row>
        </b-container>
        <b-container class="footer">
        </b-container>
    </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    name: 'navigation',
    data () {
        return {
        }
    },
    components: {}
}
</script>