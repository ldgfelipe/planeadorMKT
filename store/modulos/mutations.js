export const mutations = {
    ON_AUTH_STATE_CHANGED_MUTATION:(state,ctx)=>{

    },
    cambiaMenu(state,data){
        state.drawer=data
    },
    cambiaLogin(state,data){
        state.is_login=data
    },
    agregaDatosUsuario(state,data){
      console.log(data)
      state.user=data
    },
    ON_AUTH_STATE_CHANGED_MUTATION: (state, {authUser, claims}) => {
        if (!authUser) {
          // claims = null
          // perform logout operations
        } else {
          // Do something with the authUser and the claims object...
 
          var payload={
            uid:authUser.multiFactor.user.uid,
            correo:authUser.multiFactor.user.email
          }

          state.user=payload
          state.is_login=true
          
        }
      }
}