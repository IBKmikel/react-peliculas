// import { cineDTO } from "../cines/cines.module";
// import { generoDTO } from "../generos/generos.module";
import FormularioPeliculas from "./FormularioPeliculas";
// import { actorPeliculaDTO } from '../actores/actores.module';
import { useState, useEffect } from 'react';
import { peliculaCreacionDTO, peliculasPutGetDTO } from './Peliculas.module';
import axios, { AxiosResponse } from 'axios';
import { urlPeliculas } from "../utils/endpoints";
import { useParams, useNavigate } from 'react-router-dom';
import Cargando from "../utils/Cargando";
import { convertirPeliculaAFormData } from '../utils/formDataUtils';
import MostratErrores from "../utils/MostrarErrores";

export default function EditarPeliculas(){
    // const generosNoSeleccionados: generoDTO[] = [
    //                                 {id: 2, nombre: 'Drama'}]
    
    // const generosSeleccionados: generoDTO[] = [{id: 1, nombre: 'Accion'},
    //                                 {id: 3, nombre: 'comedia'}]

    // const cinesNoSeleccionados: cineDTO[] = [{id:1, nombre: 'Agora'},
    //                                 {id:2, nombre: 'Sambil'}]

    // const cinesSeleccionados: cineDTO[] = [
    //                             {id:3, nombre: 'Puebla'}]

    // const actoresSeleccionados: actorPeliculaDTO[] =[
    //                             {id: 1, nombre: 'Felipe', personaje: '', foto: 'https://imagenes.elpais.com/resizer/b178bGuuCt-BQbPfqoTWi-DvOVI=/980x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/TNHLMTC2IVDHZAHOTIPQ66YI7Y.jpg'
    //                             }]
    const [pelicula, setPelicula] = useState<peliculaCreacionDTO>();
    const [peliculaPutGet, setPeliculaPutGet] = useState<peliculasPutGetDTO>();
    const { id }: any = useParams();
    const history = useNavigate();
    const [errores, setErrores] = useState <string[]>([]);

    useEffect(() => {
        axios.get(`${urlPeliculas}/PutGet/${id}`)
        .then((respuesta: AxiosResponse<peliculasPutGetDTO>) => {
            const modelo: peliculaCreacionDTO = {
                titulo: respuesta.data.pelicula.titulo,
                enCines: respuesta.data.pelicula.enCines,
                trailer: respuesta.data.pelicula.trailer,
                posterURL: respuesta.data.pelicula.poster,
                resumen: respuesta.data.pelicula.resumen,
                fechaLanzamiento: new Date(respuesta.data.pelicula.fechaLanzamiento)
            };
            setPelicula(modelo);
            setPeliculaPutGet(respuesta.data);
        })
    }, [id])

    async function editar(peliculaEditar: peliculaCreacionDTO){
        try{
            const formData = convertirPeliculaAFormData(peliculaEditar);
            await axios({
                method: 'put',
                url: `${urlPeliculas}/${id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            history(`/pelicula/${id}`);
        }
        catch(error){
            setErrores(error.response.data);
        }
    }

    return(
    <>
        <h3>Editar Pelicula</h3>
        <MostratErrores errores={errores} />
        {pelicula && peliculaPutGet ? <FormularioPeliculas
            actoresSeleccionados={peliculaPutGet.actores}
            cinesNoSeleccionados={peliculaPutGet.cinesNoSeleccionados}
            cinesSeleccionados={peliculaPutGet.cinesSeleccionados}
            generosNoSeleccionados={peliculaPutGet.generosNoSeleccionados}
            generosSeleccionados={peliculaPutGet.generosSeleccionados}
            modelo={pelicula}
            onSubmit={async valores => await editar(valores)}
        /> : <Cargando /> }
        
    </>
    )
}