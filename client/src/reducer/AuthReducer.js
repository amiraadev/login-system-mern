
const AuthReducer = (state,action) =>{
   switch (action.type) {
    case "LOGIN":
        return  {...state,isAuthorized:action.payload.isAuthorized ,user:action.payload.user}
    case "LOGOUT":
        return {...state,isAuthorized:action.payload.isAuthorized ,user:null}
    case "SET_MESSAGE":
        return {...state,message:action.payload.message}
   
    default:
        return state
        break;
   }
}

export default AuthReducer