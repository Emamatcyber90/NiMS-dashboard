import Vue from 'vue'
import Router from 'vue-router'
import Navigation from './views/Navigation.vue'
import Profile from './views/Profile.vue'
import Account from './views/Account.vue'
import Email from './views/Email.vue'
import Notification from './views/Notification.vue'
import Billing from './views/Billing.vue'
import Keys from './views/Keys.vue'
import Security from './views/Security.vue'

import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Navigation,
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: Profile
        },
        {
          path: '/account',
          name: 'account',
          component: Account
        },
        {
          path: '/email',
          name: 'email',
          component: Email
        },
        {
          path: '/notification',
          name: 'notification',
          component: Notification
        },
        {
          path: '/billing',
          name: 'billing',
          component: Billing
        },
        {
          path: '/keys',
          name: 'keys',
          component: Keys
        },
        {
          path: '/security',
          name: 'security',
          component: Security
        }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
