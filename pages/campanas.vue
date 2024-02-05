<template>
  <v-card>
    <v-card-title>
      Campañas
    </v-card-title>
    <v-card-text>
      <v-dialog v-model="addcamp" max-width="600">
        <v-card>
          <v-card-text>
            <v-text-field
              label="Nombre de campaña"
              v-model="formulario.nombre"
              outlined
            ></v-text-field>
            <v-text-field
              type="date"
              label="Fecha Inicio"
              v-model="formulario.fechaIni"
              outlined
            ></v-text-field>
            <v-text-field
              type="date"
              label="Fecha Fin"
              v-model="formulario.fechaFin"
              outlined
            ></v-text-field>

            <v-btn class="primary" @click="agregacampana()">Guardar</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-btn class="primary" @click="addcamp = true"
        ><v-icon>mdi-plus</v-icon></v-btn
      >

      <v-data-table :headers="cabecera" :items="datosuser.camp">
        <template v-slot:item.post="{ item }">
            <v-btn @click="selectCampana()">Ver</v-btn>
        </template>
        
    </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      formulario: {},
      addcamp: false,
      lista: [],
      campanas: [],
      datos_id:"",
      datosuser:{},
      cabecera: [
        {
          text: "Campaña",
          value: "nombre"
        },
        {
          text: "Fecha Inicio",
          value: "fechaIni"
        },
        {
          text: "Fecha Fin",
          value: "fechaFin"
        },
        {
          text: "Publicaciones",
          value: "post"
        }
      ]
    };
  },
  computed: {
    ...mapState(["user"])
  },
  mounted(){
    this.cargalistacampanas()
  },
  methods: {
    cargalistacampanas() {
        this.$fire.firestore
        .collection("usuarios")
        .where("correo", "==", this.user.correo)
        .get()
        .then(doc => {
           this.datosuser=doc.docs[0].data();
           console.log(doc)
           this.datos_id=doc.docs[0].id;
        });
    },
    agregacampana() {
      this.campanas.push(this.formulario);
            var datos =  this.datosuser;
            if (!datos.camp) {
              datos.camp = [];
            }
            datos.camp.push(this.formulario);
            console.log(datos)
            console.log(this.datos_id)
            this.$fire.firestore
              .collection("usuarios")
              .doc(this.datos_id)
              .update(datos)
              .then(ser => {
                this.addcamp = false;
              });
    },
    selectCampana(){
        
    }
  }
};
</script>
