import FormularioAuth from "./FormularioAuth";
import { credencialesUsuario, respuestaAutenticacion } from './auth.model.s';
import axios from 'axios';
import { urlCuentas } from "../utils/endpoints";
import { useState, useContext } from 'react';
import MostratErrores from "../utils/MostrarErrores";
import { guardarTokenLocalStorage, obtenerClaims } from './manejadorJWT';
import AutenticacionContext from './AutenticacionContext';
import { useNavigate } from "react-router-dom";

export default function Login(){
    const {actualizar} = useContext(AutenticacionContext);
    const [errores, setErrores] = useState<string[]>([]);
    const history = useNavigate();

    async function login(credenciales: credencialesUsuario){
        try{
            const respuesta = await 
                axios.post<respuestaAutenticacion>(`${urlCuentas}/login`, credenciales);

                guardarTokenLocalStorage(respuesta.data);
                actualizar(obtenerClaims());
                history("/");
            console.log(respuesta);
        }catch(error){
            setErrores(error.response.data)
        }
    }

    return(
    <>
        <h3>Login</h3>
        <MostratErrores errores={errores} />
        <FormularioAuth
            modelo={{email: '', password: ''}}
            onSubmit={async valores => await login(valores)}
        />

    </>)
}