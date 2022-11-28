import React, { useState, useEffect, useContext, createContext } from "react"
import jwt from 'jsonwebtoken'
import {login as appLogin}  from '../api'

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
    const [autenticado, setAutenticado] = useState(false)
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [mensaje, setMensaje] = useState(null)

    useEffect(() => {
        if(localStorage.usertoken){
            setMensaje("Se encontró una sesión")
            setToken(localStorage.usertoken)
        }
        return () => setToken(null)
    }, []);
    
    const login = async (data) => {
        try{

            const res = await appLogin(data)
            if( res.data.status === 'success'){
                localStorage.setItem('usertoken', res.data.token)
                // setToken(res.data.token)
                let decoded = verificaToken(res.data.token)
                
                if(decoded !== null) {
                    setAutenticado(true)
                    setUser({
                        nombre: decoded.nombre,
                        apellido: decoded.apellido,
                        email: decoded.email,
                        level: decoded.level,
                        database: decoded.database,
                        ubicacion: decoded.ubicacion,
                        licenceEnds: decoded.paidPeriodEnds,
                    })
                }
            }
            return {
                status: res.data.status,
                message: res.data.message,
                err: res.data.err
            }
        }catch(err){
            return {
                status: 'error',
                message: "Imposible conectar, revise su conexión a Internet.",
                err
            }
        }
    }

    const verificaToken = (token) => {
        let decoded = null
        try{
            decoded = jwt.verify(token, "muffintop")

            return decoded
        }catch(err){
            return null
        }
    }

    useEffect(() => {
        if(token){
            setMensaje("Verificando la sesión.")
            let decoded = verificaToken(token)
            // console.log(decoded)
            if (decoded !== null){
                setAutenticado(true)
                setUser({
                    nombre: decoded.nombre,
                    apellido: decoded.apellido,
                    email: decoded.email,
                    level: decoded.level,
                    database: decoded.database,
                    ubicacion: decoded.ubicacion,
                    licenceEnds: decoded.paidPeriodEnds,
                })
            }else{
                setAutenticado(false)
                setUser(null)
                // console.log("token invalido.")
            }
        }

        return ()  => {
            setAutenticado(false)
            setUser(null)
        }
    },[token])
    
    const signup = (email, password) => {
        return false
    }
    
    const logout = (cb) => {
        localStorage.removeItem('usertoken')
        setAutenticado(false)
        setToken(null)
        setUser(null)
        return cb()
    };
    const sendPasswordResetEmail = (email) => {
        return false
    };
    const confirmPasswordReset = (code, password) => {
        return false
    };
    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    

    return {
        user,
        token,
        autenticado,
        mensaje,
        login,
        signup,
        logout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}