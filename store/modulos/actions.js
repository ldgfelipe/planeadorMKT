export const actions = {
    nuxtServerInit({commit},{req}){
        console.log('carga servidor')
    },
    onAuthStateChangedAction: (ctx, {authUser, claims}) => {
        if (!authUser) {
          // claims = null
          // Perform logout operations
        } else {

          var payload={
            uid:authUser.user.uid,
            correo:authUser.user.email
          }
          // Do something with the authUser and the claims object...
          ctx.commit('cambiaLogin',true)
          ctx.commit('agregaDatosUsuario',payload);
        }
      },
      actualizaUsuario(){
        
      }
}