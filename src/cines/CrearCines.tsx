import { Link, useNavigate } from 'react-router-dom';
import FormularioCines from "./FormularioCines";
import { cineCreacionDTO } from './cines.module';
import axios from 'axios';
import { urlCines } from '../utils/endpoints';
import { useState } from 'react';
import MostratErrores from '../utils/MostrarErrores';

export default function CrearCines(){
    const history = useNavigate();
    const [errores, setErrores] = useState<string[]>([])

    async function crear(cine: cineCreacionDTO){
        try{
            await axios.post(urlCines, cine);
            history('/cines')
        }
        catch(error){
            setErrores(error.response.data);
        }
    }

    return(
        <>
        <h3>Crear Cine</h3>
        <MostratErrores errores={errores} />
        <FormularioCines 
            modelo={{nombre: ''}}
            onSubmit={async valores => await crear(valores)}
        />
        </>
    )
}