import FormularioPeliculas from "./FormularioPeliculas";
import { generoDTO } from '../generos/generos.module';
import { cineDTO } from '../cines/cines.module';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlPeliculas } from "../utils/endpoints";
import { peliculasPostGetDTO, peliculaCreacionDTO } from './Peliculas.module';
import Cargando from "../utils/Cargando";
import { convertirPeliculaAFormData } from '../utils/formDataUtils';
import { useNavigate } from 'react-router-dom';
import { string } from "yup";
import MostratErrores from "../utils/MostrarErrores";

export default function CrearPeliculas(){
    // const generos: generoDTO[] = [{id: 1, nombre: 'Accion'},
    //                                 {id: 2, nombre: 'Drama'},
    //                                 {id: 3, nombre: 'comedia'}]

    // const cines: cineDTO[] = [{id:1, nombre: 'Agora'},
    //                             {id:2, nombre: 'Sambil'},
    //                             {id:3, nombre: 'Puebla'}]
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState<generoDTO[]>([]);
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState<cineDTO[]>([]);
    const [cargado, setCargado] = useState(false);
    const history = useNavigate();
    const [errores, setErrores] = useState<string[]>([]);

    useEffect(() =>{
        axios.get(`${urlPeliculas}/postget`)
        .then((respuesta: AxiosResponse<peliculasPostGetDTO>) => {
            setGenerosNoSeleccionados(respuesta.data.generos)
            setCinesNoSeleccionados(respuesta.data.cines)
            setCargado(true)
        })
    }, [])

    async function crear(pelicula: peliculaCreacionDTO){
        try{
            const formData = convertirPeliculaAFormData(pelicula);
            await axios({
                method: 'post',
                url: urlPeliculas,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((respuesta: AxiosResponse<number>) =>{
                history(`/pelicula/${respuesta.data}`);
            })
        }catch(error){
            setErrores(error.response.data);
        }
    }

    return(
        <><h3>Crear Peliculas</h3>
        <MostratErrores errores={errores} />
        {cargado ? <FormularioPeliculas 
            actoresSeleccionados={[]}
            cinesNoSeleccionados = {cinesNoSeleccionados}
            cinesSeleccionados = {[]}
            generosNoSeleccionados = {generosNoSeleccionados}
            generosSeleccionados = {[]}
            modelo={{titulo: '', enCines: false, trailer: ''}}
            onSubmit={async valores => crear(valores)}
        /> : <Cargando />}
        
        </>
        
    )
}