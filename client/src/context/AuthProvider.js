import { createContext, useContext, useReducer } from "react";
import AuthReducer from "../reducer/AuthReducer";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const initState = {isAuthorized:false,user:null,message:""}
    const [state,dispatch] = useReducer(AuthReducer,initState)
    return <AuthContext.Provider value={{state,dispatch}}>{children}</AuthContext.Provider>
}
export default AuthContext;


// import { createContext ,useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({children}) => {

//     const [auth, setAuth] = useState({})


//     return (<AuthContext.Provider value={{auth, setAuth}} >  
//                 {children} 
//             </AuthContext.Provider>)
// }

// export default AuthContext