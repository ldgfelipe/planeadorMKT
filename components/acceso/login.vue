<template>
  <v-card max-width="500" class="ma-auto">
    <v-card-title>
      Accesa a tu cuenta
    </v-card-title>
    <v-card-text>
      <v-text-field outlined v-model="datos.user"></v-text-field>
      <v-text-field
        type="password"
        v-model="datos.pass"
        outlined
      ></v-text-field>
    </v-card-text>
    <v-card-text class="text-center">
      <v-btn class="primary" @click="login()">Entrar</v-btn
      ><v-btn class="primary" @click="registro()">Registrar</v-btn>

      <hr />
      {{ mensaje }}
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      datos: {
        user: "",
        pass: ""
      },
      mensaje:""
    };
  },
  computed: {
    ...mapState(["is_login"])
  },
  methods: {
    ...mapMutations(["cambiaLogin"]),
    async login() {
        this.mensaje=""
      await this.$fire.auth
        .signInWithEmailAndPassword(this.datos.user, this.datos.pass)
        .then(auth => {
          var payload={
            uid:auth.user.uid,
            correo:auth.user.email
          }
          if (auth.user.email === this.datos.user) {
            this.cambiaLogin(true)
            this.agregaDatosUsuario(payload)
          }
        })
        .catch((error)=>{
           this.mensaje="Verifique su correo o contraseña e intentelo nuevamente"
         
        })
    },
    async registro() {
        this.mensaje=""
      await this.$fire.auth
        .createUserWithEmailAndPassword(this.datos.user, this.datos.pass)
        .then(auth => {
          if (auth.user.uid) {
            ///registro de usuarios
            var payload = {
              area: 1,
              correo: this.datos.user,
              lvl: 1,
              uid: auth.user.uid
            };
            this.$fire.firestore
              .collection("usuarios")
              .add(payload)
              .then(reg => {
                this.cambiaLogin(true);
              });
          }
        });
    }
  }
};
</script>
