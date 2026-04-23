import { Children, createContext, useEffect, useState } from "react";
import api from "../API/Axios/api";

 export const AuthContext = createContext();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        api.get('auth/me')
            .then(res => setUser(res.data.payload.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);
    

    console.log(user);

    const value = {
        user, setUser, loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;