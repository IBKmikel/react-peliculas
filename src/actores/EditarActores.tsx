// import { Link } from "react-router-dom";
import FormularioActores from "./FormularioActores";
import { actorCreacionDTO, actorDTO } from './actores.module';
import { urlActores } from '../utils/endpoints';
import EditarEntidad from "../utils/EditarEntidad";
import { convertirActorAFormData } from '../utils/formDataUtils';

export default function EditarActores(){

    const transformar = (actor: actorDTO) =>{
        return{
            nombre: actor.nombre,
            fotoURL: actor.foto,
            biografia: actor.biografia,
            fechaNacimiento: new Date(actor.fechaNacimiento)
        }
    }

    return(
        <>
        <EditarEntidad<actorCreacionDTO, actorDTO> url={urlActores} urlIndice='/actores' nombreEntidad="Actores"
        transformarFormData={convertirActorAFormData} 
        transformar={transformar}>
            {(entidad, editar) => 
            <FormularioActores 
                modelo={entidad}
                onSubmit={async valores => await editar(valores)}
            />}
        </EditarEntidad>
        </>
    )
}