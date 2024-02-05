<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      <v-list-item>
        <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn @click="cerrarSesion()">Salir</v-btn>
            </v-list-item-title>
          </v-list-item-content>
    </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      v-if="is_login"
    >
      <v-app-bar-nav-icon @click="changestatusmenu()" />
     

    
      <v-spacer />
    
    </v-app-bar>
    <v-main>

<Login v-if="!is_login"></Login>

      <v-container>
        <Nuxt v-if="is_login" />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Login from '~/components/acceso/login.vue'
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Campañas',
          to: '/campanas'
        },
        {
          icon: 'mdi-apps',
          title: 'Listas',
          to: '/lista'
        },
        {
          icon: 'mdi-apps',
          title: 'Calendarios',
          to: '/calendarios'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed:{
    ...mapState(['drawer','is_login'])
  },
  components:{
    Login
  },
  methods:{
    ...mapMutations(['cambiaMenu','cambiaLogin','agregaDatosUsuario']),
    changestatusmenu(){
      this.drawer ? this.cambiaMenu(false) : this.cambiaMenu(true)
 
    },
    cerrarSesion(){
      this.$fire.auth.signOut().then(() => {
  this.cambiaLogin(false)
    this.cambiaMenu(false) 
    this.agregaDatosUsuario({})
}).catch((error) => {
  // An error happened.
});
    }
  }
}
</script>
